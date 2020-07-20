import React, {useState, useEffect} from 'react'
import {Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message'

function App(){
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([{username: 'zonny',text: "hello"}, {username: 'zonadot',text: "het"} ])
    const [username, setUsername] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()
        setMessages([...messages, {username: username, text: input}])
        setInput('')
    }

    useEffect(() => {
        setUsername(prompt("Please enter your name"))
    }, [])
    

    return(
        <div className="app">
            <h1>This is a h1</h1>
            <h2>Welcome {username} </h2>
            <form>
                <FormControl>
                    <InputLabel>Enter a message</InputLabel>
                    <Input onChange={event => setInput(event.target.value)} value={input}/>
                    <Button disabled={!input} variant="contained" color="primary" onClick={sendMessage}>Send message</Button>
                </FormControl>
            </form>
            
            {
                messages.map(message => (
                    <Message key={Math.random() * 10000000} text={message.text} username={message.username} />
                ))
            }
        </div>
            
    )
}


export default App;