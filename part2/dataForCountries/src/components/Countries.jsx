import Country from "./Country.jsx"

const Countries = ({countries}) => {
    if(countries.length >= 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if(countries.length === 1) {
        return (
            <Country country={countries}></Country>
        )
    } else if(!countries.length) {
        return (
            <p>No match, specify another filter</p>
        )
    }

    return (
        <>
            {
                countries.map(country => <p key={country.name.common}>{country.name.common}</p>)
            }
        </>
    )
}

export default Countries