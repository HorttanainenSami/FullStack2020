import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <h1> create new </h1>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input id='title' type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input id='author' type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input id='url' type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button id='submitButton' type="submit">create</button>
        </div>
      </form>
    </div>
  )

}

export default BlogForm
