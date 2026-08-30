const Filter = ({filterName,filterHandler}) => {
    return (
        <div>
            Filter shown with
            <input value={filterName} onChange={filterHandler}/>
        </div>
    )
}

export default Filter