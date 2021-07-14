import React from 'react'

const Input = ({message, sendMessage, setMessage}) => {
    return (
        <div>
            <form className="form" onSubmit={sendMessage}>
                <input className="input" type="text" value={message} placeholder="Type a Message"
                onChange={e => setMessage(e.target.value)}
                onKeyPress={event => event.key === 'Enter'? sendMessage(event) : null} />
                <button className="sendButtton">Send Message</button>
            </form>
        </div>
    )
}

export default Input
