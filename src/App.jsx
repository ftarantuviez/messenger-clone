import React, {useState, useEffect} from 'react'
import {Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'

function App(){
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState('')

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection('messages').add({
           message: input,
           username: username,
           sendAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        setMessages([...messages, {username: username, message: input}])
        setInput('')
    }

    useEffect(() => {
        setUsername(prompt("Please enter your name"))
    }, [])

    useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
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
                    <Message key={Math.random() * 10000000} message={message} username={username} />
                ))
            }
        </div>
            
    )
}


export default App;