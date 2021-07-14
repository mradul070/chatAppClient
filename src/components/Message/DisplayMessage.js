import React from 'react'
import './DisplayMessage.css'
const DisplayMessage = ({message: {name, userId, text}, current_uid}) => {
    let isCurrentUser = false;
    if (userId === current_uid) {
        isCurrentUser = true
    }
    return (
        isCurrentUser? (<div className="row right-align">
            <div className="col s12 m8 16 right"> 
                <p className="chat sentbyme">
                    {name}: {text}
                </p>
            </div>
        </div>) : (<div className="row left-align">
        <div className="col s12 m8 16 left"> 
        <p className="chat opponent">
            {name}: {text}
        </p>
        </div>
        </div>)
    )
}

export default DisplayMessage
