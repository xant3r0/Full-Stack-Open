const Notification = ({message,className}) => {

    if(message === null) {
        return
    }

    return (
        <div className={className}>
            <p>{message}</p>
        </div>
    )
}

export default Notification