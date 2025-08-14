import { useState, useEffect } from 'react'
import axios from 'axios'
import { use } from 'react'

const api_key = import.meta.env.VITE_SOME_KEY
const Country = (props) => {

  return (

    <div>find countries: <input value={props.newName} onChange={props.handleNameChange} /></div>


  )

}

const CountryList = (props) => {

  return(
    <div>
      {props.country.map(country => <div key={country.cca3}> {country.name.common} <button onClick={() => props.onShow(country)}>show</button>
        </div> )}
    </div>
  )
}

const CountryDetails = (props) => {

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
     if (!props.country || !props.country.capital || !props.country.capital[0]) {
    return
  }

    const name = props.country.capital[0]
    setLoading(true)
    setError(null)
    setWeather(null)

   axios
   .get('https://api.openweathermap.org/data/2.5/weather?', {params: {q: name, appid: api_key, units: 'metric'}})
   .then(res => setWeather(res.data))
    .catch(() => setError('Failed to load weather'))
    .finally(() => setLoading(false))
  }, [props.country])


  if (!props.country) return null

  const c = props.country
  return (
    <div>
      <h2>{c.name && c.name.common}</h2>

      <div>capital: {c.capital && c.capital.join(', ')}</div>
      <div>area: {c.area}</div> {/* <-- label fixed */}

      <h2>Languages</h2>
      <ul>
        {c.languages && Object.values(c.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      {c.flags && (c.flags.svg || c.flags.png) && (
        <img src={c.flags.svg || c.flags.png} alt="flag" width="100" />
      )}

      <h2>Weather</h2>
      {loading && <div>loading weather…</div>}
      {error && <div>{error}</div>}
      {weather && (
       <div>
         <div>temperature: {weather.main && weather.main.temp} °C</div>
      <div>wind: {weather.wind && weather.wind.speed} m/s</div>
      {weather.weather && weather.weather[0] && (
       <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description || 'weather icon'}
      />
    )}
  </div>
  )}

    </div>
  )
}
const App = () => {

 const [query, setQuery] = useState('')
 const [list, setList] = useState([])
const [selectedCountry, setSelectedCountry] = useState(null)

 const handleFilterChange = (event) => {setQuery(event.target.value)
    setSelectedCountry(null)
  }

  
  const hook = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setList(response.data)
      })
  }

  useEffect(hook, [])

  const filteredCountry = list.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
 


 let display; 
 if(query === ''){
   display = <div>Type to search for countries</div>
 }else if(filteredCountry.length > 10){

   display = <div>Too many countries</div>

 }else if(filteredCountry.length === 1){
    display = <CountryDetails country = {filteredCountry[0]}/>
 }else if (selectedCountry) {
    display = <CountryDetails country={selectedCountry} />
 }else {
    display = <CountryList country={filteredCountry} onShow={setSelectedCountry} />
  }


  return(

    <div>

    <Country newName = {query} handleNameChange = {handleFilterChange}/>
    {display}
    </div>
   
  )
}

export default App
