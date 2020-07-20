import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './Message.css'

function Message({message, username}) {
    
    const isUser = username === message.username;

    return (
        <div>
            <Card className={`message ${isUser && 'message__user'}`}>
                <CardContent className={isUser ? 'message__useCard' : "message__guestCard"}>
                    <Typography
                        variant="h5"
                        component="h2"
                    >
                        {message.username} :{message.text}
                    </Typography>
                </CardContent>
            </Card> 
        </div>            
    )
}

export default Message;
