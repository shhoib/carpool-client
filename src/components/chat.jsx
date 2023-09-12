// import React from 'react'
import {Container} from 'react-bootstrap'
import './chat.css'
import io from 'socket.io-client';
import { useState,useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


// const api = import.meta.env.VITE_SOCKET_IO_URL;
// console.log(api);

const socket = io.connect('http://localhost:3000')


const Chat = () => {

  const [message, setmessage] = useState('')
  const [messageRecieved, setMessageRecieved] = useState('')
  const [chatDetails, setChatDetails] = useState({})

  const USER = useSelector((state)=>state.userAuth);
  const userID = USER.userID 

  const {id} = useParams();

  useEffect(()=>{
    const fetchChat = async()=>{
      const response = await axiosInstance.get(`/fetchChat?userId=${userID}&hosterId=${id}`)
      if(response.status==200){
        setChatDetails(response.data)
      }else{
        setChatDetails(response.data)
      }
    }
    fetchChat();
  },[])

  const room = chatDetails.chat?._id;
  console.log(room);

  socket.emit('join_room',room)

  console.log(chatDetails);
  const sendMessage = ()=>{
    socket.emit('send_message',{message,room})
    setmessage('')
  }

  useEffect(()=>{
    socket.on('receive_message',(data)=>{
      setMessageRecieved(data.message)
      console.log(messageRecieved);
    })
  },[socket])
  

  return (
    <>
  <Container className='chat-container'>
  <div className=''>
  <input value={message} onChange={(e)=>setmessage(e.target.value)} className='message-input'/>
  </div>
  <button onClick={()=>sendMessage()}>Send</button>
      <h1>{messageRecieved}</h1>
    
  </Container>
    </>
  )
}

export default Chat;