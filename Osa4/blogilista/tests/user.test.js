const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const usernamenull={  
  "username": null,
     "name": "Annu Närkii",
    "password": "null"
}

const passwordnull={  
  "username": "annu",
     "name": "Annu Närkii",
    "password": null
}

const usernamelessthan3={  
  "username": "an",
     "name": "Annu Närkii",
    "password": "null"
}

const passwordlessthan3={  
  "username": "annu",
     "name": "Annu Närkii",
    "password": "nu"
}



test('username can not be null', async () => {

  const response = await api
    .post('/api/users')
    .send(usernamenull)
    .expect(400)
    
    expect(response.body.error).toContain('username can not be null')
  
})

test('password can not be null', async() => {

  const response = await api
    .post('/api/users')
    .send(passwordnull)
    .expect(400)
    
    expect(response.body.error).toContain('password can not be null')
 
})
test('username can not be shorter than 3 characters"', async() => {
  const response = await api
  .post('/api/users')
  .send(usernamelessthan3)
  .expect(400)
  
  expect(response.body.error).toContain('username too short')

})
test('password can not be shorter than 3 characters"', async() => {
  const response = await api
    .post('/api/users')
    .send( passwordlessthan3)
    .expect(400)
    
    expect(response.body.error).toContain('password too short')
 
})
