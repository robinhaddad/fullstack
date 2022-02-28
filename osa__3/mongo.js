const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length<3) {
  console.log('give password as argument')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]
// eslint-disable-next-line no-undef
const name = process.argv[3]
console.log('name',name)
// eslint-disable-next-line no-undef
const number = process.argv[4]
console.log('number',number)

const url =
    `mongodb+srv://fullstack:${password}@cluster0.3ie7p.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)



if(name&&number){
  const person = new Person({
    name: name,
    number: number
  })
  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else if (!name&&!number) {
  Person
    .find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}


