import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />', () => {
  let component
  beforeEach(() => {
    const user = {
      username: 'käyttäjä',
      name: 'nimi',
      id: 123,
    }
    const blog = {
      author: 'author',
      title: 'title',
      url: 'url',
      likes: 1,
      user,
    }
    const mockHandlerRemove = jest.fn()
    const mockHandlerIncrease = jest.fn()
    component = render(
      <Blog blog={blog} user={user} removeFromServer={mockHandlerRemove} increase={mockHandlerIncrease} />
    )
  })

  test('renders content', () => {
    const staticContent = component.container.querySelector('.content')
    expect(staticContent).toHaveTextContent(
      'author', ' title'
    )
  })
  test('at start author and title is displayed', () => {
    const staticContent = component.container.querySelector('.content')
    expect(staticContent).not.toHaveStyle('display: none')
  })
  test('at start url and likes arent displayed', () => {
    const togglable = component.container.querySelector('.togglableContent')
    expect(togglable).toHaveStyle('display: none')
  })
  
})
