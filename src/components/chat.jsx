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
    // const [loading, setLoading] = useState(true)

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

    await socket.emit('send_message',messageData)
    setMessageList((previous)=>[...previous,messageData])
      setmessage('')
    }

    useEffect(()=>{
      socket.on('receive_message',(data)=>{
        setMessageList((previous)=>[...previous,data])
      })
    }, [socket])
    
    // console.log(messageList);

    return ( 
      <>
      {/* {loading ? 
      <p>loading...</p>: */}
    <Container className='chat-container'>
        <Container className='messages-container'>
        {messageList.map((messages, index)=>(
            <div key={index}>  

            <div className={USER.name==messages.author?'you':"other"}>
              <div className='message-content'>
                <p className='m-0'>{messages.message}</p>
              {/* </div> */}

              {/* <div className='message-meta'> */}
                <p className ='time m-0'>{messages.time}</p>
              </div> 

            </div>
            </div>     
        ))}
        </Container>

      <Container className=''>
      <input value={message} placeholder='Message...' onChange={(e)=>setmessage(e.target.value)} className='message-input'/>
      <button className='sendButton' onClick={()=>sendMessage()}>Send <RiSendPlaneLine/></button>
      </Container>

    </Container>
      {/* } */}
      </>
    )
  }

  export default Chat;