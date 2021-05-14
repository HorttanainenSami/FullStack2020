import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
describe('<BlogForm />', () => {
  let component
  let mockHandler
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <BlogForm createBlog={mockHandler} />
    )
  })
  test('blogForm renders', () => {
    const element = component.container.querySelector('#title')
    expect(element).toBeDefined()
  })
  test('Click of submit button calls eventhandler once', () => {
    const button = component.container.querySelector('#submitButton')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
  test('submit provides correct data', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    fireEvent.change(title, {
      target: { value: 'title' },
    })
    fireEvent.change(author, {
      target: { value: 'author' },
    })
    fireEvent.change(url, {
      target: { value: 'url' },
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    expect(mockHandler.mock.calls).toHaveLength(1)
    console.log((mockHandler.mock.calls[0][0]))
    expect(mockHandler.mock.calls[0][0].content.toBe({
      title: 'title',
      author: 'author',
      url: 'url',
    }))
  })

})
