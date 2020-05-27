import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import addLike, {Blog} from './Blog'

import { prettyDOM } from '@testing-library/dom'

const blog = {
  id:     11234,
  title:  'Blog title is here',
  author: 'Some author',
  likes:  5,
  url:    'http://localhost/',
  user: { id: 123, _id: 1234 }
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

test('clicking the button shows likes', async () => {
  //const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>
  )

  const button = component.getByText('show')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(`likes ${blog.likes}`)

})

test('clicking the button twice calls addLike event handler twice', async () => {
  const mockHandler = jest.fn()

  /*
  addLike function is inside so we have to overwrite it
  // Pain in ass to test this...
  //  https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4
  jest.mock('./Blog', () => {
    return function addLike(props) {
      return (<div>DEBUG</div>)
    }
  })
  // jest.mock('./Blog')
  // addLike.mockReturnValue(Promise.resolve(new Response('4')))

  // jest.mock('./Blog', () => () => (<div>Hello World</div>))
  // addLike = jest.fn().mockReturnValue('mock full name')
  Blog.addLike = jest.fn().mockReturnValue('mock full name')
  */
  const component = render(
    <Blog key={blog.id} blog={blog} likeButton={mockHandler} updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>
  )
  // component.debug()

  const openButton = component.getByText('show')
  fireEvent.click(openButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  // expect(mockHandler.mock.calls).toHaveTextContent(blog.title)
  expect(mockHandler.mock.calls).toHaveLength(2)

})