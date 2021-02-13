const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')



blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})



blogsRouter.post('/', (request, response) => {
  console.log(request, request.params, request.headers)

  const blog = new Blog(request.body)
  if (blog.title==='' && blog.url ===''){
    blog
    .save()
    .then(result => {
      response.status(400).json(result)
    })
  }else{

  if (blog.likes===null){
    blog.likes=0
  }
  console.log(blog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
  
  }
})


blogsRouter.delete('/:id', (request, response) => {
  //const id = Number(request.params.id)
  Blog
    .findById(request.params.id).then(blog => {
      blog.delete()
      response.status(201).json('jee')
    })
 
})

module.exports = blogsRouter