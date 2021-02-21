import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs,blogs}) => {
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

  const handleLikeButton = async (event) => {
    event.preventDefault()
    console.log('clicked like button')
    const newLike= {title:blog.title,author:blog.author, url:blog.url,likes:blog.likes+1, user:blog.user.id, id:blog.id}
    const returnedBlog=await blogService.likeBlog(newLike)
    setBlogs(blogs.map(blog=>{
      if(blog.id!==returnedBlog.id){
        return blog
      }else{
        return returnedBlog
      }

    }))
  }  

  return (
    <div style={blogStyle}>


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

        <p> Likes {blog.likes} { } <button onClick={handleLikeButton}>Like</button></p> 

        <p>  {blog.author}</p>

      </div>
    </div>
  )
}

export default Blog