const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.username===null){
    return response.status(400).json({ error: 'username cannot be null' })
  }
  else if(body.password===null){
    return response.status(400).json({ error: 'password can not be null' })
  }
  else if(body.username.length < 3){
    return response.status(400).json({ error: 'username too short' })
  }
  else if(body.password.length < 3 ){
    return response.status(400).json({ error: 'password too short' })
  }else{
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
}
})


usersRouter.get('/', async (request, response) => { //async await 
  const users = await User
  .find({}).populate('blogs',{ url: 1, title: 1, author:1, likes:1 })
  response.json(users.map(u => u.toJSON()))
})

// usersRouter.get('/', async (request, response) => { //async await 
//   const users = await User.find({})
//   response.json(users.map(u => u.toJSON()))
// })

  // usersRouter.get('/', (request, response) => { //promise
  //   User
  //     .find({})
  //     .then(blogs => {
  //       response.json(blogs)
  //     })
  //   })
  module.exports = usersRouter