// import React from 'react'
import {Container} from 'react-bootstrap'
import './chat.css'
import io from 'socket.io-client';
import { useState,useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {RiSendPlaneLine} from 'react-icons/ri'


// const api = import.meta.env.VITE_SOCKET_IO_URL;
// console.log(api);

const socket = io.connect('http://localhost:3000')


const Chat = () => {

  const [message, setmessage] = useState('')
  const [messageList, setMessageList] = useState([])
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

  socket.emit('join_room',room)

  const sendMessage = async()=>{
    const messageData = {
      room : room,
      author : USER.name,
      message : message,
      time : new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
    }

   await socket.emit('send_message',{messageData})
   setMessageList((previous)=>[...previous,messageData])
    setmessage('')
  }

  useEffect(()=>{
    socket.on('receive_message',(data)=>{
      console.log(data);
      setMessageList((previous)=>[...previous,data])
      console.log(messageList);
    })
  },[socket])
  

  return (
    <>
  <Container className='chat-container'>
      <Container className='messages-container'>
      {messageList.map((messages, index)=>(
          <div key={index} className={USER.name==messages.author?'you':"other"}>
            <div><p>{messages.message}</p></div>
            <div><p>{messages.time}</p></div>
          </div>
      ))}
      </Container>

    <Container className=''>
    <input value={message} placeholder='Message...' onChange={(e)=>setmessage(e.target.value)} className='message-input'/>
    <button className='sendButton' onClick={()=>sendMessage()}>Send <RiSendPlaneLine/></button>
    </Container>

  </Container>
    </>
  )
}

export default Chat;