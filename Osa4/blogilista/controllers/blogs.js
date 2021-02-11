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
  console.log(blog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter