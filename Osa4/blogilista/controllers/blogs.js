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

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
  
  }
})


blogsRouter.delete('/:id', async (request, response) => { //asyncversio
  let blog = await Blog //let, jotta voi muuttua. (const pysyvä)käy hakemassa blogi ja ODOTA että saat vastauksen. Jos ei olisi await, niin ei odotettaisi vastausta. Ilman awaittia se olisi promise eli saat joskus tulevaisuudessa blogin.
    .findById(request.params.id)
  blog.delete()
  response.status(201).json('jee')


// blogsRouter.delete('/:id', (request, response) => { //promiseversio
//   //const id = Number(request.params.id)
//   Blog
//     .findById(request.params.id).then(blog => {
//       blog.delete()
//       response.status(201).json('jee')
//     })
 
})

module.exports = blogsRouter