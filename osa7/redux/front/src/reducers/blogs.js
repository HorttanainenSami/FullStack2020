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
export const newBlog = (blog) => {
  return  {
    type: 'NEW_BLOG',
    data: blog
  }
}
const blogReducer = (state=[], action) => {
  switch(action.type) {
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data:blog)
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}


export default blogReducer
