import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs,blogs, handleLikeButton }) => {
  const [bloginfoVisible, setBloginfoVisible] = useState(false)


  const hideWhenVisible = { display: bloginfoVisible ? 'none' : '' }//jos blogininfoVisible true niin ei näytetä ollenkaan View bloginfo nappulaa
  const showWhenVisible = { display: bloginfoVisible ? '' : 'none' }
  //1) asia joka voi olla tosi tai ei 2) jos eka asia totta niin annetaan tyhjä arvo '' displaylle
  //3) jos eka asia epätosi niin annetaan none
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleDeleteBlogButton = async (event) => {
    event.preventDefault()
    const deleteBlog= { id:blog.id }
    await blogService.deleteBlog(deleteBlog)
    setBlogs(blogs.filter(blog => {
      if(blog.id!==deleteBlog.id){
        return true //halutaan säästää ne blogit joiden id ei ole deletoidun, filtterill siis true
      }else{
        return false
      }

    }))


  }

  return (
    <div style={blogStyle} className='blog'>


      <h3>{blog.title} { }
        <span style={hideWhenVisible}>
          <button onClick={() => setBloginfoVisible(true)}>View bloginfo</button>
        </span>
        <span style={showWhenVisible}>
          <button onClick={() => setBloginfoVisible(false)}>Hide</button>
        </span>
      </h3>
      <div style={showWhenVisible}>

        <p>  {blog.url}</p>

        <p className='likes'> Likes {blog.likes} { } <button onClick={handleLikeButton}>Like</button></p>

        <p>  {blog.author}</p>

        <button onClick={handleDeleteBlogButton}>Delete blog</button>

      </div>
    </div>
  )
}

export default Blog