const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const pubsub = new PubSub()
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
  type User {
    username:String!
    favoriteGenre: String!
    id: ID!
  },
  type Token {
    value: String!
  },
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  },
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () =>{
      console.log('book Count')
      return Book.collection.countDocuments()
    },
    authorCount: () => Author.collection.countDocuments(),
    allBooks:async (root, args) => {
      try{
        if (!args.author && !args.genre) {
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
        return books.filter(book => book.author.name.toLowerCase() === args.author?.toLowerCase())
      }catch(e) {
        console.log(e)
      }
    },
    allAuthors:() =>{
      console.log('resolver: allAuthors')
      return Author.find({}) 
    },
    me: (root, args, context) => context.currentUser
  },
  Book: {
    genres: (root) => {
      return root.genres
    }
  },
  Author : {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook:async (root, args, context) => {
      if(!context || !context.currentUser) {
        console.log('not connected')
        return null
      }
      const authors = await Author.find({})
      let author = authors.find(author => author.name.toLowerCase() === args.author.toLowerCase())
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          books:[],
        })
        try{
          author = await newAuthor.save() 
        }catch(error){
          console.log('auth error')
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      try{
        const book = new Book({ ...args, author: author._id })
        let savedBook = await book.save()
        console.log(savedBook)
        await Author.findByIdAndUpdate({ _id: author.id},{ books: author.books.concat(savedBook._id)})
        savedBook = await savedBook.populate('author').execPopulate()
        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
        console.log(savedBook)
        return savedBook
      }catch(error){
        console.log('error')
        throw new UserInputError(error.message,{
          invalidArgs: args,
        })
      }
    },
    editAuthor:async (root, args, context) => {
      if(!context || !context.currentUser){
        return null
      }
      const matching = await Author.findOne({ name: args.name })
      if (!matching || matching.length === 0) {
        return null
      }
      return Author.findByIdAndUpdate(matching._id, {born: args.setBornTo}, {new:true}) 
    },
    createUser: async (root, args) => {
      try{
        console.log('resolver: create user')
        const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        const savedUser = await newUser.save()
        return savedUser
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if(user && args.password === 'asd'){
        const userForToken = {
          username: user.username,
          id: user._id
        }
        const token = { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        return token
      }
      return null
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth =req ? req.headers.authorization : null
    if( auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
    return null
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions at ${subscriptionsUrl}`)
})
