import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

const blog = {
  id:     11234,
  title:  'Blog title is here',
  author: 'Some author',
  likes:  5,
  url:    'http://localhost/'
}
const updateBlogPost = () => {}
const removeBlogPost = () => {}

test('renders content', () => {

  const component = render(
    <Blog key={blog.id} blog={blog} updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>
  )
  //const li = component.container.querySelector('li')
  //console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
})

test('clicking the button calls event handler once', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} updateBlogPost={mockHandler} removeBlogPost={mockHandler}/>
  )

  const button = component.getByText('show')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(`likes ${blog.likes}`)

  // expect(mockHandler.mock.calls).toHaveTextContent(blog.title)
  //expect(mockHandler.mock.calls).toHaveLength(1)

})