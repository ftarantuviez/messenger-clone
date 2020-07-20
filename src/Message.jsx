import React from 'react'

function Message(props) {
    return (
        <div className="message-container">
            {props.username}: <h2>{props.text}</h2>
        </div>
    )
}

export default Message;
