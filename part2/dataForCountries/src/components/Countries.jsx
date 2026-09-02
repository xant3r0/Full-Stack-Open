import Country from "./Country.jsx"

const Countries = ({countries}) => {

    if(countries.length >= 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if(countries.length === 1) {
        return (
            <Country country={countries[0]}></Country>
        )
    } else if(!countries.length) {
        return (
            <p>No match, specify another filter</p>
        )
    }

    return (
        <>
            {
                countries.map((country) =>
                    <div key={country.name.common}>
                         <div>{country.name.common}</div>
                    </div>
                )
            }
        </>
    )
}

export default Countries