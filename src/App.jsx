import React, {useState, useEffect} from 'react'
import {Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import './App.css'
import {IconButton} from '@material-ui/core'
import SendIcon from '@material-ui/icons'

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
            .orderBy('sendAt','desc')
            .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
        })
    }, [])

    const handleEnterKey = e => {
        if(e.codeKey === 13){
            e.preventDefault()
            sendMessage()
        }
    }
    

    return(
        <div className="app">
            <h1>This is a h1</h1>
            <h2>Welcome {username} </h2>
            <form className="app__form">
                <FormControl>
                    <InputLabel>Enter a message</InputLabel>
                    <Input onChange={event => setInput(event.target.value)} value={input}/>
                    <IconButton disabled={!input} variant="contained" color="primary" onClick={sendMessage}><SendIcon /></IconButton>
                </FormControl>
            </form>
            <FlipMove>
                {
                    messages.map(({message, id}) => (
                        <Message key={id} message={message} username={username} />
                    ))
                }
            </FlipMove>
        </div>
            
    )
}


export default App;