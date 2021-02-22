import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'
//import blog from '../../../blogapp-backend/models/blog'


test('renders content without author, url or likes', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url',
    likes: '120'
  }

  const component = render(
    <Blog blog={blog} />
  )
  const author=component.getByText('Test author')
  expect(author).not.toBeVisible()
  const url=component.getByText('Test author')
  expect(url).not.toBeVisible()
  const likes=component.container.querySelector('.likes')
  expect(likes).not.toBeVisible()
})

test('renders content with author, url or likes when button clicked', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url',
    likes: '120'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('View bloginfo')
  fireEvent.click(button)


  const author=component.getByText('Test author')
  expect(author).toBeVisible()
  const url=component.getByText('Test author')
  expect(url).toBeVisible()
  const likes=component.container.querySelector('.likes')
  expect(likes).toBeVisible()
})

test('clicking the likebutton twice calls event handler twice', async () => {

  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url',
    likes: '120'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLikeButton={mockHandler} />
  )

  const button = component.getByText('View bloginfo')
  fireEvent.click(button)
  const buttonLike = component.getByText('Like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})