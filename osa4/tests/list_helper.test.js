const listHelper = require('../utils/list_helper')
const emptyList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
const mostLikes =
   {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }
const mostLikesInAllBlogs=
  {
    author: "Edsger W. Dijkstra",
    likes: 17
  }
const mostBlogs ={
  author: "Robert C. Martin",
  blogs: 3
}
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  
  test('when list is empty return zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })
  
  test('of bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})
describe('FavoriteBlog', () => {
  
  test('of bigger list is correct', () => {
    const favorite = listHelper.favoriteBlog(blogs)
    expect(favorite).toEqual(mostLikes)
  })

  test('empty list return null', () => {
  expect(listHelper.favoriteBlog(emptyList)).toBe(null)
  })
})

describe('author with most blogs', () => {
  test('of bigger list return author with most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual(mostBlogs)
  })

  test('of bigger list with reversed order', () => {
    expect(listHelper.mostBlogs(blogs.reverse())).toEqual(mostBlogs)
  })
  
  test('empty list returns null', () => {
    expect(listHelper.mostBlogs(emptyList)).toBe(null)
  })
})

describe('author with most likes between blogs', () => {
  test('empty list returns null', () => {
    expect(listHelper.mostLikes(emptyList)).toBe(null)
  })
  test('of bigger list return correct author and sum of likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual(mostLikesInAllBlogs)
  })
})
