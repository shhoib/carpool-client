// import React from 'react'
import {Container} from 'react-bootstrap'
import './chat.css'
import io from 'socket.io-client';
import { useState,useEffect } from 'react';

// const api = import.meta.env.VITE_SOCKET_IO_URL;
// console.log(api);

const socket = io.connect('http://localhost:3000')


const Chat = () => {

  const [message, setmessage] = useState('')
  const [room, setroom] = useState('')
  const [messageRecieved, setMessageRecieved] = useState('')

  useEffect(()=>{
    
  })

  const sendMessage = ()=>{
    socket.emit('send_message',{message,room})
  }
  const joinRoom = ()=>{
    console.log(`joined in room ${room}`);
    socket.emit('join_room',room)
  }
  useEffect(()=>{
    socket.on('receive_message',(data)=>{
      setMessageRecieved(data.message)
      console.log(messageRecieved);
    })
  },[socket])
  console.log(messageRecieved);


  return (
    <>
  <Container className='chat-container'>
  <div className=''>
  <input onChange={(e)=>setmessage(e.target.value)} className='message-input'/>
  </div>
  <button onClick={sendMessage}>Send</button>
  <input type="number" onChange={(e)=>setroom(e.target.value)} placeholder='room...' />
      <button onClick={joinRoom}>join</button>
      <h1>{messageRecieved}</h1>
    
  </Container>
    </>
  )
}

export default Chat;