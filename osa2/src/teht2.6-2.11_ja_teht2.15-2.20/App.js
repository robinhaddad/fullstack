import React, {useEffect, useState} from 'react'
import Filter from "../components/Filter"
import FilterForm from "../components/FilterForm"
import PersonForm from "../components/PersonForm"
import personService from '../services/persons'
import '../index.css'
import Notification from "../components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newPhoneNumber, setNewPhoneNumber] = useState("")
    const [filterValue, setFilterValue] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        console.log(event.target.value)
        setNewPhoneNumber(event.target.value)
    }

    const handleFilterValueChange = (event) => {
        console.log(event.target.value)
        setFilterValue(event.target.value)
    }

    const deleteFromPersons = (id) => {
        console.log("id:",id)

        const personToDelete = persons.find(person => person.id === id)
        let result = window.confirm(`Do you really want to delete ${personToDelete.name} ?`)
        console.log("result:",result)

        if(result===true){
            personService.removePerson(id)
                .then(response =>
                    console.log(response))

            const myAry = persons.filter(person => person.id !== id)
            setPersons([...myAry])

            console.log("myAry:",myAry)
            console.log("persons:",persons)

            let msg = `${personToDelete.name} was deleted from the phonebook`
            setErrorMessage(msg)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    const addName = (event) => {
        event.preventDefault()

        let nameAlreadyInArray = ""
        let phoneNumberAlreadyInArray = ""

        persons.forEach(function (person,index){
            console.log("person.name: ",person.name," index: ",index)

            if(person.name===newName){
                nameAlreadyInArray = person.name
                phoneNumberAlreadyInArray = person.number
            }
        })
        console.log("newName: ",newName)
        console.log("nameAlreadyInArray: ",nameAlreadyInArray)
        console.log("phoneNumberAlreadyInArray: ",phoneNumberAlreadyInArray)

        if (nameAlreadyInArray!==newName){
            const personsObject = {
                name: newName,
                number: newPhoneNumber,
                id: persons.length + 1
            }

            personService
            .create(personsObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewPhoneNumber("")

                let msg = `${newName} was added to the phonebook!`
                setErrorMessage(msg)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)

                })
        } else if ( (nameAlreadyInArray === newName && newName && phoneNumberAlreadyInArray === newPhoneNumber)
            || (nameAlreadyInArray===newName && !newPhoneNumber) ){
            let msg = `${newName} is already added to phonebook`
            setErrorMessage(msg)
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000)
            setNewName("")
            setNewPhoneNumber("")

        } else if ((!newName)) {
            setErrorMessage(`please give a proper name...`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000)

            setNewName("")
            setNewPhoneNumber("")
        } else if ((nameAlreadyInArray===newName)&&(newName)&&(phoneNumberAlreadyInArray!==newPhoneNumber)&&(newPhoneNumber)) {
            let updateDialogResult = window.confirm(`Do you really want to update ${nameAlreadyInArray}'s phone number\n
            from ${phoneNumberAlreadyInArray}\n
            to ${newPhoneNumber} ?`)

            if(updateDialogResult){
                const person = persons.find(p => p.number === phoneNumberAlreadyInArray)
                const changedPerson = {...person, number: newPhoneNumber}
                let id = person.id

                personService
                    .update(id, changedPerson)
                    .then(response => {
                        console.log(response)

                        setPersons(persons.filter(p => p.id !== response.data))

                        let changedName = changedPerson.name
                        let msg = `Successfully changed ${changedName}'s phonenumber from\n
                        ${phoneNumberAlreadyInArray} to ${newPhoneNumber}`

                        setErrorMessage(msg)

                        setTimeout(() => {
                            setErrorMessage(null)
                            window.location.reload();
                        }, 3000)

                    }).catch(error => {
                        console.log("error:",error)
                        let msg = `Information of ${changedPerson.name} has already been removed from server`
                        setErrorMessage(msg)

                        setTimeout(() => {
                        setErrorMessage(null)
                        window.location.reload();
                        }, 5000)
                })
            }
        }
    }

    console.log("persons in App",persons)
    return (
        <div>
            <div>
                <h2>Phonebook</h2>
                <Notification message={errorMessage}/>
                <FilterForm filterValue={filterValue}
                            handleFilterValueChange={handleFilterValueChange}/>
            </div>
            <h2>Add a new</h2>
            <PersonForm addName={addName}
                        newName={newName}
                        handleNameChange={handleNameChange}
                        newPhoneNumber={newPhoneNumber}
                        handlePhoneNumberChange={handlePhoneNumberChange}
            />
            <h2>Numbers</h2>
            <Filter filterValue={filterValue} persons={persons}
                    deleteFromPersons={deleteFromPersons}/>
        </div>
    )
}

export {App}