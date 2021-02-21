import React, { useState } from 'react'
import Notification from './Notification'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'



const BlogForm = ({
  setBlogs,
  blogs
})  => {


  const [blogaddVisible, setBlogaddVisible] = useState(false)
  const [positiveMessage, setPositiveMessage]=useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage]=useState(null)
  const hideWhenVisible = { display: blogaddVisible ? 'none' : '' }
  const showWhenVisible = { display: blogaddVisible ? '' : 'none' }

  //Uuden blogin luominen
  const handleNewblog=(event) => {
    event.preventDefault()
    console.log('clicked')
    const newBlog= { title,author,url }
    blogService.create(newBlog)
      .then (returnedBlog => { //luodaan uusi blogi ja luodaan uusi lista johon lisätään palautettu blogi
        setBlogs(blogs.concat(returnedBlog))

        setPositiveMessage(title + ' added to bloglist')
        setTimeout(() => {
          setPositiveMessage(null)
        }, 5000)
      }).catch (exception => {
        console.log('error:',exception)
        setErrorMessage('Is title or url empty? Should not be.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  BlogForm.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired
  }
  return(
    <div>
      <h2>Create new blog</h2>
      <Notification message={positiveMessage} isError={false}/>
      <Notification message={errorMessage} isError={true} />
      <p> </p>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogaddVisible(true)}>Create blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={handleNewblog}>
          <div>
          Title:
            <p> </p>
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            <p></p>
          Author:
            <p></p>
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            <p></p>
          URL:
            <p></p>
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <p> </p>
          <button type="submit">Create blog</button>
        </form>
        <button onClick={() => setBlogaddVisible(false)}>cancel</button>
      </div>
    </div>
  )
}



export default BlogForm