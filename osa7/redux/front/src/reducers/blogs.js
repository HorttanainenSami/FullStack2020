export const initializeBlogs = (blogs) => {
  return {
    type: 'INITIALIZE_BLOGS',
    data: blogs
  }
}
export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog
  }
}
export const createBlog = (blog) => {
  return  {
    type: 'NEW_BLOG',
    data: blog
  }
}
export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: id
  }
}
const blogReducer = (state=[], action) => {
  switch(action.type) {
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data:blog)
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    default:
      return state
  }
}


export default blogReducer
