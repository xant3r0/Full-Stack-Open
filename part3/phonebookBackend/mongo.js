const mongoose = require('mongoose')
const dns = require('node:dns')

dns.setServers(["8.8.8.8"])

if(process.argv.length < 3) {
    console.log("Provide password as a argument!")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.f9ihldt.mongodb.net/Persons_DB?appName=Cluster0`

mongoose.connect(url,{family: 4})

const personSchema = new mongoose.Schema({
    name:String,
    number:Number
})

const People = mongoose.model('person',personSchema)

if(process.argv.length === 3) {
    People.find({}).then(people => {
        console.log("Phonebook:")
        people.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
    })
}

if(process.argv.length > 3) {
    const person = new People({
        name:process.argv[3],
        number:process.argv[4]
    })

    person.save().then(() => {
        console.log(`Added ${person.name} number ${person.number} to phonebook!`)
        mongoose.connection.close()
    })
}

