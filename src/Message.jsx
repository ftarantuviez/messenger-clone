import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './Message.css'

function Message(props) {
    return (
    
        <Card >
            <CardContent>
                <Typography
                    color="white"
                    variant="h5"
                    component="h2"
                >
                    {props.username.length > 0 ? props.username : "Undefined user"}:{props.text}
                </Typography>
            </CardContent>
        </Card>
            
        
    )
}

export default Message;
