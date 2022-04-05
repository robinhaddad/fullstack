const mongoose = require('mongoose')
/*
const mongoUrl = 'mongodb://localhost/bloglist'
 */

/*
const mongoUrl = process.env.MONGODB_URI

console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)
// eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
*/

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)