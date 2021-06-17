const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const Author = require('./models/Author')
const Book = require('./models/Book')

console.log('connecting to Atlas DB')
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true 
}).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to mongoDB: ', error.message)
})

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  },
  type Book {
   title: String!
   published: Int!
   author: Author!
   genres: [String!]!
   id: ID!
  },
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  },
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.coutnDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks:async (root, args) => {
      try{
        console.log(args.genre)
        if (!args) {
          return Book.find({}).populate('author')
        }
        if(args.author && args.genre ) {
          const books = await Book.find({genres: { $in: [args.genre]}}).populate('author')
          return books.filter(book => book.author.name.toLowerCase() === args.author.toLowerCase())
        }
        if (args.genre) {
          return Book.find({genres: { $in: [args.genre]}}).populate('author')
        }
        const books = await Book.find({}).populate('author')
        console.log(books)
        return books.filter(book => book.author.name.toLowerCase() === args.author?.toLowerCase())
      }catch(e) {
        console.log(e)
      }
    },
    allAuthors:() => Author.find({}),
  },
  Book: {
    genres: (root) => {
      return root.genres
    }
  },
  Author: {
    bookCount:async (root) => {
      const count = await Book.find({author : root.id})
      return (
        count.length
      )
    }
  },
  Mutation: {
    addBook:async (root, args) => {
      const authors = await Author.find({})
      let author = authors.find(author => author.name.toLowerCase() === args.author.toLowerCase())
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        })
        author = await newAuthor.save() 
      }
      const book = new Book({ ...args, author: author._id })
      let savedBook = await book.save()
      savedBook = await savedBook.populate('author').execPopulate()
      return savedBook
    },
    editAuthor:async (root, args) => {
      const matching = await Author.findOne({ name: args.name })
      if (!matching || matching.length === 0) {
        return null
      }
      return Author.findByIdAndUpdate(matching._id, {born: args.setBornTo}, {new:true}) 
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
