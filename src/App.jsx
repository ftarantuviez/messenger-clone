import React, {useState} from 'react'
import {Button} from '@material-ui/core'

function App(){
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState(["hello", "hi", "whats up"])

    const sendMessage = (e) => {
        e.preventDefault()
        setMessages([...messages, input])
        setInput('')
    }

    return(
        <div className="app">
            <h1>This is a h1</h1>
            
            <form>
                <input 
                    type="text"
                    onChange={event => setInput(event.target.value)}
                    value={input}
                />
                <Button disabled={!input} variant="contained" color="primary" onClick={sendMessage}>Send message</Button>

            </form>
            {
                messages.map(message => (
                    <p key={message}>{message}</p>
                ))
            }
        </div>
            
    )
}


export default App;