const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')



// blogsRouter.get('/', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)
  let blog = new Blog({ ...request.body, user: user._id }//aaltosulkeet kertoo, että luodaan uusi olio, jonka perusteella new Blog luo siitä uuden olion. 
    //... kertoo, että aaltosulkeiden sisällä oleva olio on kuin request.body ja sitten annetaan lisäksi user:user._id
  )

  if (blog.title === '' && blog.url === '') {
    blog
      .save()
      .then(result => {
        response.status(400).json(result)
      })
  } else {

    if (blog.likes === null) {
      blog.likes = 0
    }

    const savedBlog = await blog.save() //katso alla vastaava then muodossa
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

    


  }
})
//TOIMIVA KOODI ALLA

// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   if (blog.title==='' && blog.url ===''){
//     blog
//     .save()
//     .then(result => {
//       response.status(400).json(result)
//     })
//   }else{

//   if (blog.likes===null){
//     blog.likes=0
//   }

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })

//   }
// })


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