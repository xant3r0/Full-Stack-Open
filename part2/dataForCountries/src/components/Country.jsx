import Weather from "../components/Weather.jsx";

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>{country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([code,lang]) => <li key={code}>{lang}</li>)}
            </ul>
            <img src={country.flags.svg} style={{width: "500px", height: "300px"}}/>
            <Weather capital={country.capital}></Weather>
        </div>
    )
}

export default Country