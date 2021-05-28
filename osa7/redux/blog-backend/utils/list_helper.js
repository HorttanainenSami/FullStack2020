const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0)

const favoriteBlog = (blogs) => {
  const moreLikes = (item, item2) => {
    if (item.likes > item2.likes) {
      return item
    }
    return item2
  }
  blogs = blogs.map(blog => (
    {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }))
  return blogs.length === 0
    ? null
    : blogs.reduce((sum, item) => moreLikes(sum, item), { likes: -1 })
}

const mostBlogs = (blogs) => {
  const manageAuthors = (authors, blog) => {
    const hasBlog = authors.find(item => item.author === blog.author)

    if (hasBlog) {
      authors.map(item => {
        if (item.author === blog.author) {
          item.blogs += 1
        }
        return item
      })
    } else {
      const author = {
        author: blog.author,
        blogs: 1,
      }
      authors = authors.concat(author)
    }
    return authors
  }
  const authors = blogs.reduce((allAuthors, blog) => manageAuthors(allAuthors, blog), [])
  return blogs.length === 0
    ? null
    : authors.reduce((most, author) => {
      const moreBlogs = (author1, author2) => {
        if (author1.blogs > author2.blogs) return author1
        return author2
      }
      return moreBlogs(most, author)
    })
}

const mostLikes = (blogs) => {
  const manageAuthors = (authors, blog) => {
    const hasBlog = authors.find(item => item.author === blog.author)
    if (hasBlog) {
      authors.map(item => {
        if (item.author === blog.author) {
          item.likes+=blog.likes
        }
        return item
      })
    } else {
      const author = {
        author: blog.author,
        likes: blog.likes,
      }
      authors = authors.concat(author)
    }
    return authors
  }
  const authors = blogs.reduce((allAuthors, blog) => manageAuthors(allAuthors, blog), [])
  return blogs.length === 0
    ? null
    : authors.reduce((most, author) => {
      const moreBlogs = (author1, author2) => {
        if (author1.likes > author2.likes) return author1
        return author2
      }
      return moreBlogs(most, author)
    })
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
