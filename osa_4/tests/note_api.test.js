const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const listHelper = require("../utils/list_helper");

const api = supertest(app)

/*
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
 */

describe('test for http GET (4.8: blogilistan testit, step 1)', () => {
  test('...............', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('test for http POST (4.10: blogilistan testit, step3)', () => {
  test('http post works', async () => {
    await api
      .post('/api/notes')
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})