  // import React from 'react'
  import {Container} from 'react-bootstrap'
  import './chat.css'
  // import io from 'socket.io-client';
  import { useState,useEffect } from 'react';
  import axiosInstance from '../api/axios';
  import { useSelector } from 'react-redux';
  import { useParams } from 'react-router-dom';
  import {RiSendPlaneLine} from 'react-icons/ri'
  import socket from '../api/socketIO.js'
  import Lottie from 'react-lottie'
  import loading from '../animations/typing.json'


  // const api = import.meta.env.VITE_SOCKET_IO_URL;
  // console.log(api);

  // const socket = io.connect('http://localhost:3000')
  

  const Chat = () => {

    const [message, setmessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [chatDetails, setChatDetails] = useState({})
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const USER = useSelector((state)=>state.userAuth);
    const userID = USER.userID 

    const {id} = useParams();
    // console.log(id);
    // console.log(userID);

    useEffect(()=>{
      const fetchChat = async()=>{
        const response = await axiosInstance.get(`/fetchChat?fromId=${userID}&toId=${id}`)
        if(response.status==200){
          setChatDetails(response.data)
        }else{
          setChatDetails(response.data)
        }
      }
      fetchChat();
  
    },[])

    const room = chatDetails.chat?._id;
    // console.log(room);    

    useEffect(()=>{
      socket.emit('join_room',room)
      },[room]);
      

    const sendMessage = async()=>{
      const messageData = {
        room : room,
        author : USER.name,
        message : message,
        time : new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
      }
    socket.emit('stop typing', room)
    await socket.emit('send_message',messageData)
    setMessageList((previous)=>[...previous,messageData])
      setmessage('')
    }

    useEffect(()=>{
      socket.on('receive_message',(data)=>{
        setMessageList((previous)=>[...previous,data])
      })
      socket.on('typing',()=>setIsTyping(true))
      socket.on('stop typing',()=>setIsTyping(false))
    }, [])  //TODO:include socket if not working
    
    const typingHandler = (e)=>{
      setmessage(e.target.value)

      if(!typing){
        setTyping(true)
        socket.emit('typing',room)
      }
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;

      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime

        if(timeDiff >= timerLength && typing){
          socket.emit('stop typing', room)
          setTyping(false)
        }
      }, timerLength);
    }

    return ( 
      <>
      {/* {loading ? 
      <p>loading...</p>: */}      
    <Container className='chat-container'>

        <Container className='messages-container'>
        {messageList.map((messages, index)=>(
            <div key={index}>  

            <div className={USER.name==messages.author?'you':"other"}>
              <div className={USER.name==messages.author?'you-message-content px-2 py-1':"other-message-content px-2 py-1"}>
                <h6 className='message m-0'>{messages.message}</h6>  
                <p className ='time m-0'>{messages.time}</p>
              </div> 
            </div>

            </div>     
        ))}
        {isTyping? <div className='typing-animation'>
          <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loading,
           }}
            />
        </div>:null}
        </Container>

      <Container className=''>
      <input value={message} placeholder='Message...' onChange={(e)=>typingHandler(e)} className='message-input'/>
      <button className='sendButton' onClick={()=>sendMessage()}>Send <RiSendPlaneLine/></button>
      </Container>

    </Container>
      {/* } */}
      </>
    )
  }

  export default Chat;