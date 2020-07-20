import React from 'react'

function Message({text, username}) {
    return (
        <div className="message-container">
            {username}: <p>{text}</p>
        </div>
    )
}

export default Message
