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
// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')

//   expect(response.body[0].content).toBe('HTML is easy')
// })


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


afterAll(() => {
  mongoose.connection.close()
})