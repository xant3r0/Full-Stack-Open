const Country = ({country}) => {
    console.log(country[0])
    return (
        <div>
            <h1>{country[0].name.official}</h1>
            <p>{country[0].capital}</p>
            <p>Area {country[0].area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country[0].languages).map(([code,lang]) => <li key={code}>{lang}</li>)}
            </ul>
            <img src={country[0].flags.svg} style={{width: "500px", height: "300px"}}/>
        </div>
    )
}

export default Country