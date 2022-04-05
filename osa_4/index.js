const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Blog = require('./models/note')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
        blog
            .save()
            .then(result => {
            response.status(201).json(result)
            })
})

/*
const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
 */

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}