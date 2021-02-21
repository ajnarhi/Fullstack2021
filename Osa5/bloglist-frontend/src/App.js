import React, { useState, useEffect } from 'react'
//import blog from '../../blogapp-backend/models/blog'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage]=useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
//käyttäjän tieto pysyvästi tietoon, ettei se refreshaamalla sivu katoa
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])//tyhjä taulukko: efekti suoritetaan vain kun komponentti renderöidään ensimmäistä kertaa
//sisäänkirjautumisen käsittely
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
//uloskirjautumisnappula
  const handleLogout = (event) => {
    event.preventDefault()
    console.log('clicked')
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    console.log(user)
  }

  //Uuden blogin luominen
  const handleNewblog=(event)=>{
    event.preventDefault()
    console.log('clicked')
    const newBlog= {title,author,url}
    blogService.create(newBlog)
    .then (returnedBlog=>{
      setBlogs(blogs.concat(returnedBlog))
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  if (user === null) {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <p> </p>
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        <p></p>
          Password:
          <p></p>
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <p> </p>
        <button type="submit">Log in</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in!
      <p> </p>
      <button onClick={handleLogout}>Log out!</button>
      <p> </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
<h2>Create new blog</h2>
<p> </p>
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
    </div>
  )
}

export default App