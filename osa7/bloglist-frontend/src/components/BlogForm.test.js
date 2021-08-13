import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
// import { prettyDOM } from '@testing-library/dom'

test('creating a new blog post has all fields', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm addBlogPost={mockHandler} />
  )
  // component.debug()

  const form = component.container.querySelector('form')

  // Search form input fields
  const title = component.container.querySelector('input[name="title"]')
  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  const author = component.container.querySelector('input[name="author"]')
  fireEvent.change(author, {
    target: { value: 'Author' }
  })
  const url = component.container.querySelector('input[name="url"]')
  fireEvent.change(url, {
    target: { value: 'http://localhost.localdomain' }
  })
  // console.log(url)

  fireEvent.submit(form)

  const result = mockHandler.mock.calls[0][0]

  // expect(mockHandler.mock.calls).toHaveTextContent(blog.title)
  expect(result.author).toContain('Author')
  expect(result.title).toContain('testing of forms could be easier')
  expect(result.url).toContain('http://localhost.localdomain')
  // expect(mockHandler.mock.calls).toHaveContent('[[{"author": "Author", "title": "testing of forms could be easier", "url": ""}]]')
})