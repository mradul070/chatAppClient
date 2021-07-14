import React from 'react'
import DisplayMessage from './DisplayMessage'
const Message = ({messages, user_id}) => {
    return (
        <div>
            {messages.map((message, i)=> (
                <DisplayMessage key={message._id+user_id} message={message} current_uid={user_id}/>
            ))}
        </div>
    )
}

export default Message
