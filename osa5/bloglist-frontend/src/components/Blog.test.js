import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    id:     11234,
    title:  'Blog title is here',
    author: 'Some author',
    likes:  5,
    url:    'http://localhost/'
  }
  const updateBlogPost = () => {}
  const removeBlogPost = () => {}

  const component = render(
    <Blog key={blog.id} blog={blog} updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
})