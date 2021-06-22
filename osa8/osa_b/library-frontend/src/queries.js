import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(title: $title, author: $author, published: $published, genres: $genres){
  title,
  author{name,born},
  published,
  genres,
  } 
}
`
export const ALL_BOOKS = gql`
  query($author:String, $genre: String) {
    allBooks(author:$author, genre:$genre){
      title,
      author{
        name,
        id
      },
      published,
      id,
      genres
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      name,
      born,
      bookCount
    }
  }
`
export const SET_BIRTHYEAR = gql`
  mutation setBirthYear($author: String!, $birthYear: Int!){
    editAuthor(name: $author, setBornTo: $birthYear){
      name,
      id,
      born,
      bookCount
    }
  }
`
export const LOGIN = gql`
  mutation login($username:String!, $password: String!){
    login(username:$username,password:$password){
      value
      }
  }
`
export const ME = gql`
  query {
    me{
      username,
      favoriteGenre,
      id
    }
  }
`
