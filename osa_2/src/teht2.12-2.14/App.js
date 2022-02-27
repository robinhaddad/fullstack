import React, {useEffect, useState} from 'react'
import axios from 'axios'

const MyWeather = ({country,capital}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather,setWeather] = useState([])
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = {
        access_key: api_key,
        query: capital[0]+", "+country
    }
    console.log("params.query : ",params.query)
    
    useEffect(() => {
        console.log("weather effect")
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                console.log("weather response data ",response.data)
                setWeather(response.data)
        })
    }, [params])
    console.log("weather : ",weather[0])

    /*
        return (
        <div>{weather.map(item=>item)}</div>
    )
     */
    return (
        <div>  </div>
    )
}
const App = () => {
    /*
    TO DO: appi jää jumiin yksittäisen maan näyttö tilaan kun nappia on kerran painettu
     */

    const [notes, setNotes] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                console.log("response: ",response)
                setNotes(response.data)
            })
    }, [])
    console.log('render', notes.length, 'notes')

    const [filterValue, setFilterValue] = useState("sw")

    const handleFilterValueChange = (event) => {
        console.log(event.target.value)
        setFilterValue(event.target.value)
    }

    let [selectedCountry,setSelectedCountry] = useState([])

    function showSelected(country,capital) {
        console.log("value of country in showSelected",country)
        console.log("value of capital in showSelected",capital)

        //should pass params to myWeather here...
        
        setSelectedCountry(notes.filter(note => note.name.common
            .toString()
            .toLowerCase()
            .includes(country.toLowerCase()))
            .map(note => (
                <div key={note.name.common}>
                    <h2>{note.name.common}</h2>
                    <p>capital: {note.capital}</p>
                    <p>population: {note.population}</p>
                    {/*<p>languages: {note.languages.msa}</p>*/}
                    <img src={note.flags.png} alt={"flag of the country"}/>
                    {/*<div>{weather}</div>*/}
                    {/*should use myWeather component here..or pass params here and make it return the propers stuff*/}
                    {/*i think it will loop in the webbrowser because of this component*/}
                    <MyWeather country={country} capital={capital}/>
                </div>)))
    }

    function displayFiltered() {
        if(filterValue===""){
            return (<div> </div>)
        } else if (filterValue!==""){
            let result = notes.filter(note => note.name.common
                .toString()
                .toLowerCase()
                .includes(filterValue.toLowerCase()))
                .map(note => (
                <div key={note.name.common}>
                    <h2>{note.name.common}</h2>
                    <p>capital: {note.capital}</p>
                    <p>population: {note.population}</p>
                    {/*<p>languages: {note.languages.msa}</p>*/}
                    <img src={note.flags.png} alt={"flag of the country"}/>
                </div>))
            console.log("debug 1",result)
            if(result.length>10){
                const myString = "Too many matches, specify another filter"
                result = [myString]
            } else if ((result.length<=10)&&(result.length>1)) {
                // eslint-disable-next-line no-unused-vars
                let country = ""
                // eslint-disable-next-line no-unused-vars
                let capital = ""
                result = notes.filter(note => note.name.common
                    .toString()
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()))
                    .map(note => (
                        <div key={note.name.common}>
                            <p>{note.name.common}
                                <button onClick={()=>showSelected(country=note.name.common,capital=note.capital)}> show </button></p>
                        </div>))
                //alempi if seuraa arvoa kokoajan koska se on useState avulla...
                //alempi if menee yksittäisen maan näyttötilaan
                if(selectedCountry.length>0){
                    return (<div>{selectedCountry}</div>)
                }
            } else if (result.length===1) {
                return (<div>{result}</div>)
            }
            /*
            const secondResult = notes.filter(note => note.name.common
                .toString()
                .toLowerCase()
                .includes(filterValue.toLowerCase()))
                .map(note => note.languages)
            console.log("debug 2",secondResult)

            console.log("debug 3",secondResult[0])

                        for (const property in secondResult[0]) {
                console.log("\nproperty:",property,
                    "\nobject[property]",secondResult[0][property]);
            }
             */
            return (<div>{result}</div>)
        }
    }

    return (
        <div>
            <div>
                find countries:
                <input
                    value={filterValue}
                    onChange={handleFilterValueChange}/>
            </div>
            {displayFiltered()}
        </div>
    )

}

export {App}