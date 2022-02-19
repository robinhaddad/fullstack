const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}
/*
0 node
1 mongo.js
2 supersalasana00
3 nimi
4 numero
 */

const password = process.argv[2]
const name = process.argv[3]
console.log("name",name)
const number = process.argv[4]
console.log("number",number)

const url =
    `mongodb+srv://fullstack:${password}@cluster0.3ie7p.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

/*
Person.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
 */

/*
const person = new Person({
        name: 'mikko mallikas',
        number: '0700-123123'
})
 */

if(name&&number){
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else if (!name&&!number) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}


