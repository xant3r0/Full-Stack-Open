import Filter from "./components/Filter.jsx";
import {useEffect, useState} from "react";
import CountriesService from "./services/Countries.js"
import Countries from "./components/Countries.jsx"

const App = () => {

  const [filterValue,setFilterValue] = useState('')
  const [countries,setCountries] = useState([])
  const [filteredCountries,setFilteredCountries] = useState([])

  const filterEvent = (event) => {
    setFilterValue(event.target.value)
  }

  const effectEvent = () => {
      CountriesService.getCountries().then(data => {
          setCountries(data)
          setFilteredCountries(data)
      })
  }

  const showFilteredCountries = () => {
          setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().startsWith(filterValue.toLowerCase())))
  }


  useEffect(() => {
    if(filterValue === '') {
        setFilteredCountries(countries)
    } else {
        showFilteredCountries()
    }
  }, [filterValue]);

  useEffect(effectEvent,[])
  return (
      <div>
        <Filter value={filterValue} onChange={filterEvent}></Filter>
        <Countries countries={filteredCountries}></Countries>
      </div>
  )
}

export default App