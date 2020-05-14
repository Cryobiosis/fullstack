const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password  = process.argv[2]
const name      = process.argv[3]
const number    = process.argv[4]

//const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
const url = `mongodb+srv://fullstack:${password}@cluster0-yryvz.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

// TODO: Error checkign + notify if name or number missing..
if (name && number) { // Save new
  // console.log('save')
  const person = new Person({
    name: name,
    number: number,
    date: new Date(),
  })
  // console.log(person)
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else { // List all persons
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

