import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const Country = (props) => {
  // NOTE: onClick must have () =>
  return (
    <li>
      {props.country.name} <button onClick={() => props.callback(props.country.name)}>Show</button>
    </li>
  )
}

const CountryFull = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang, i) => 
          <li key={lang.iso639_1}>{lang.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={country.name} height='100px'/>
    </div>
  )
}

const Countries = (props) => {
  return (
      <div>
          <ul>
          {props.countries.map((country, i) => 
              <Country key={country.cioc} country={country} callback={props.callback}/>
          )}
          </ul>
      </div>
      )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [useFilter, setFilter]    = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const setFilterCallback = (value) => {
    // console.log('SET FILTER2', value)
    setFilter(value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log(response)
        //console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  // [] Render also 1st time
  //console.log('countries',countries)

  var countriesToShow = []
  if (useFilter) {
    countriesToShow = countries.filter(country => country.name.toLowerCase().includes(useFilter.toLowerCase()))
  }

  let tooLong = ''
  if (countriesToShow.length > 10) 
    tooLong = `Too many matches, specify another filter`;

  // TODO: Rewrite this mess...
  return (
    <div>
      <Filter name={countries} callback={handleFilterChange} />

      {tooLong.length > 1 ? (tooLong) : (<Countries countries={countriesToShow} callback={setFilterCallback}/>) }
      {(countriesToShow.length == 1) ? <CountryFull country={countriesToShow[0]}/> : null }

    </div>
  )
}

export default App