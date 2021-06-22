import React from 'react'
const Recomended = ({show, books, user}) => {

  if(!show){
    return null
  }
  const booksToShow = () => {
    if(!books){
      return null
    }
    if(books.length === 0 ) {
      return books
    }
      return(
        books.filter(book => book.genres.includes(user.favoriteGenre))
      )
  }
  return (
   <>
    <div>
    <h3><b>recommendations</b ></h3>
    books in your your favorite genre <i>{user.favoriteGenre}</i>
    </div>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th><b>author</b></th>
          <th><b>published </b></th>
        </tr>
        {booksToShow().map(book => (
          <tr key={book.id}> 
            <td> {book.title} </td>
            <td> {book.author.name} </td>
            <td> {book.published} </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default Recomended
