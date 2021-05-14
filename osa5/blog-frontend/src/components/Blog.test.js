import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />', () => {
  let component
  let mockRemove, mockIncrease
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
    mockRemove = jest.fn()
    mockIncrease = jest.fn()
    component = render(
      <Blog blog={blog} user={user} removeFromServer={mockRemove} increase={mockIncrease} />
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
  test('Clicking button reveals url and likes', async () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const togglable = component.container.querySelector('.togglableContent')
    expect(togglable).not.toHaveStyle('display: none')
  })
  test('Cliking like button once calls eventhandler once', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    expect(mockIncrease.mock.calls).toHaveLength(1)
  })
  test('Cliking like button twice calls eventhandler once', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockIncrease.mock.calls).toHaveLength(2)
  })
})
