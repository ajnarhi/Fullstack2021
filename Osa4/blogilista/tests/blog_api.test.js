const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blogs')
const initialBlogs = [
  {
    title: 'My superblog',
    author: 'Annu',
    url: 'www.annujee.fi',
    likes: 1000
  },
  {
    title: 'My stupidblog',
    author: 'Annuninnu',
    url: 'www.annunotsojee.fi',
    likes: 24
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})


test('Identification is id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body[0].id).toBeDefined();
});


test('POST adds a blog to bloglist', async () => {
  const newBlog = {
    title: 'Im a testgenius',
    author: 'Annu Taas',
    url: 'www.annugenius.fi',
    likes: 1500
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'Im a testgenius'
  )
})

test('POST sets likes to 0 if null', async () => {
  const newBlog = {
    title: 'Zero likes blog',
    author: 'Annu Zero',
    url: 'www.annuzero.fi',
    likes: null
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.likes)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
  0
  )
})


test('POST responds with bad request if title and url are empty', async () => {
  const newBlog = {
    title: '',
    author: 'Annu Zero',
    url: '',
    likes: 2000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
})



afterAll(() => {
  mongoose.connection.close()
})