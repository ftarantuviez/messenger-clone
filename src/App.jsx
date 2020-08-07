import React, {useState, useEffect} from 'react'
import {FormControl, InputLabel, Input } from '@material-ui/core'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import './App.css'
import {IconButton} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

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
    

    return(
        <div className="app">
            <header>
                <img src="https://seeklogo.com/images/F/facebook-messenger-logo-36376366E2-seeklogo.com.png" alt="" srcset=""/>
                <h1>Messenger</h1>
                <h2>Welcome {username} </h2>
            </header>
            <form className="app__form">
                <FormControl className="app__formControl">
                    <InputLabel>Enter a message</InputLabel>
                    <Input className="app__input" onChange={event => setInput(event.target.value)} value={input}/>
                    <IconButton className="app__iconButton" disabled={!input} type="submit" variant="contained" color="primary" onClick={sendMessage}><SendIcon /></IconButton>
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