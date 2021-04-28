const listHelper = require('../utils/list_helper')
const helper = require('./test_helper.js')
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(helper.blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(helper.listWithOneBlog[0].likes)
  })
  
  test('when list is empty return zero', () => {
    expect(listHelper.totalLikes(helper.emptyList)).toBe(0)
  })
  
  test('of bigger list is calculated right', () => {
    expect(listHelper.totalLikes(helper.blogs)).toBe(36)
  })
})
describe('FavoriteBlog', () => {
  
  test('of bigger list is correct', () => {
    const favorite = listHelper.favoriteBlog(helper.blogs)
    expect(favorite).toEqual(helper.mostLikes)
  })

  test('empty list return null', () => {
  expect(listHelper.favoriteBlog(helper.emptyList)).toBe(null)
  })
})

describe('author with most blogs', () => {
  test('of bigger list return author with most blogs', () => {
    expect(listHelper.mostBlogs(helper.blogs)).toEqual(helper.mostBlogs)
  })

  test('of bigger list with reversed order', () => {
    expect(listHelper.mostBlogs(helper.blogs.reverse())).toEqual(helper.mostBlogs)
  })
  
  test('empty list returns null', () => {
    expect(listHelper.mostBlogs(helper.emptyList)).toBe(null)
  })
})

describe('author with most likes between blogs', () => {
  test('empty list returns null', () => {
    expect(listHelper.mostLikes(helper.emptyList)).toBe(null)
  })
  test('of bigger list return correct author and sum of likes', () => {
    expect(listHelper.mostLikes(helper.blogs)).toEqual(helper.mostLikesInAllBlogs)
  })
})
