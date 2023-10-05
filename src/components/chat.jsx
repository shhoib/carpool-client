  // import React from 'react'
  import {Container} from 'react-bootstrap'
  import './chat.css'
  // import io from 'socket.io-client';
  import { useState,useEffect, useCallback } from 'react';
  import axiosInstance from '../api/axios';
  import { useSelector } from 'react-redux';
  import { useParams } from 'react-router-dom';
  import {RiSendPlaneLine} from 'react-icons/ri'
  import socket from '../api/socketIO.js'
  import Lottie from 'react-lottie'
  import loading from '../animations/typing.json'
  import {AiOutlineEdit} from 'react-icons/ai'
  import {RiRadioButtonLine} from 'react-icons/ri'
  import {FcVideoCall,FcPhone} from 'react-icons/fc'
  import ReactPlayer from 'react-player'
  import peer from '../services/peer';
  import { MDBBtn } from 'mdb-react-ui-kit';



  

  const Chat = () => {

    const [message, setmessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [chatDetails, setChatDetails] = useState({})
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [previousChats, setPreviousChats] = useState([])
    const [myStream, setmyStream] = useState()
    const [remoteStream, setRemoteStream] = useState()


    const USER = useSelector((state)=>state.userAuth);
    const userID = USER.userID 

    const {id} = useParams();
    

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
      
      const fetchPreviuosChatDetails = async()=>{
        const response = await axiosInstance.get(`fetchPreviuosChatDetails?userID=${userID}`)
        setPreviousChats(response.data.chattedUsers);
        }   
        fetchPreviuosChatDetails();
  
    },[])

    const room = chatDetails.chat?._id;

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

    const handleNegoNeedeIncomming = useCallback(async({from,offer})=>{
       const ans = await peer.getAnswer(offer);
      socket.emit('peer:nego:done',{to:from,ans})
    },[])

    const handleNegoNeedeFinal = useCallback(async({ans})=>{
      await peer.setLocalDescription(ans)
    },[])

    useEffect(()=>{
      socket.on('receive_message',(data)=>{
        setMessageList((previous)=>[...previous,data])
      })
      socket.on('typing',()=>setIsTyping(true))
      socket.on('stop typing',()=>setIsTyping(false))

      socket.on('incoming:call',handleIncomingCall)
      socket.on('call:accepted',handleCallAccepted)
      socket.on('peer:nego:needed',handleNegoNeedeIncomming)
      socket.on('peer:nego:final',handleNegoNeedeFinal)


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

    const handleVideoCall = async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
      const offer = await peer.getOffer();
      socket.emit('user:call',{to:room,offer})
      setmyStream(stream)
    }

    const handleIncomingCall = useCallback(async ({from,offer})=>{
      const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
      setmyStream(stream)
      console.log('incoming call',from,offer);
      const ans =  await peer.getAnswer(offer)
      socket.emit('call:accepted',{to:room,ans})
    },[room])

    // const sendStreams = useCallback(()=>{
    //   for (const track of myStream.getTracks()){
    //     peer.peer.addTrack(track,myStream)
    //   }
    // },[myStream])
    const sendStreams = useCallback(() => {
      for (const track of myStream.getTracks()) {
        const sender = peer.peer.getSenders().find(s => s.track === track);
        if (!sender) {
          peer.peer.addTrack(track, myStream);
        }else{
          console.log('already track');
        }
      }
    }, [myStream]);
    

    const handleCallAccepted = useCallback(async({from,ans})=>{
      peer.setLocalDescription(ans);
      console.log('call accepted');
      sendStreams();
    },[sendStreams])

    useEffect(() => {
      peer.peer.addEventListener('track',async ev =>{
        const remoteStream = ev.streams;
        console.log('got tracks');
        setRemoteStream(remoteStream[0])
      })
    }, [])

    const handleNegoNeeded = useCallback(async()=>{
      const offer = await peer.getOffer();
        socket.emit('peer:nego:needed',{offer,to:room})
    },[room])

    useEffect(()=>{
      peer.peer.addEventListener('negotiationneeded',handleNegoNeeded);
      return()=>{
        peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded);
      }
    },[handleNegoNeeded])
    
    console.log(remoteStream);

    return ( 
      <>
      {/* {loading ? 
      <p>loading...</p>: */}   
    <div className='whole-chat-container d-flex'>
      <div className='previous-chats'>
        <div className='chat-heading p-2 d-flex align-items-center justify-content-evenly'>
          <div className='profile'  style={{ backgroundImage:`url(${USER.profileURL || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}}></div>
          <h4 className='username px-2'>{USER.name}</h4>
          {/* <h5><MDBIcon fas icon="user-edit" /></h5> */}
          <h4> <AiOutlineEdit/></h4>
        </div>
        <hr className="hr hr-blurry"/>
        
        <input type="text" className="search-box" placeholder="Search users..."/>

        {previousChats?.map((chattedUser,index)=>(
         <div key={index} className='each-chat px-2 py-1 my-2'>
         <div className='profile_in_chat' style={{backgroundImage:`url(${chattedUser?.profileURL|| 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}} ></div>
         <h6 style={{color:'#007bff',fontFamily:'cursive'}}>{chattedUser?.name}</h6>
         </div>
        ))
        }      
        
      </div>
      
    <div className='chat-container d-flex flex-column justify-content-center align-items-center'>
        <div className='to-whom d-flex align-items-center justify-content-between p-3'>
         <div className='to-whom-profile-name d-flex align-items-center justify-content-around'>
            <div className='current-chat-profile' style={{backgroundImage:`url(${chatDetails?.toUser?.profileURL|| 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}}></div>
            <h3 className=''>{chatDetails?.toUser?.name}</h3>
            <RiRadioButtonLine style={{color:'green'}}/>
          </div> 
        <div className='call-icon d-flex align-items-center justify-content-around'>
          <h2 onClick={handleVideoCall}><FcVideoCall/></h2>
          <h2><FcPhone/></h2>
        </div>
        </div>
        <hr className="hr hr-blurry w-100 m-0"/>

        <Container className='messages-container'>
        {messageList.map((messages, index)=>(
            <div key={index}>  

            <div className={USER.name==messages.author?'you d-flex align-items-end':"other"}>
              <div className={USER.name==messages.author?'you-message-content px-2 py-1':"other-message-content px-2 py-1"}>
                <h6 className='message m-0'>{messages.message}</h6>  
                <p className ='time m-0'>{messages.time}</p>
              </div> 
              <div className='inside-chat-profile m-1'  style={{ backgroundImage:`url(${USER.profileURL || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}}></div>
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
      <input value={message} placeholder='Write Something...' onChange={(e)=>typingHandler(e)} className='message-input'/>
      <button className='sendButton' onClick={()=>sendMessage()}>Send <RiSendPlaneLine/></button>
      </Container>

    </div>
    <ReactPlayer playing muted height='100px' width='200px' url = {myStream}/>
      <MDBBtn onClick={sendStreams}>send stream</MDBBtn>
    {remoteStream && (
      <>
        <h3>remoteStream</h3>
        <ReactPlayer playing muted height='100px' width='200px' url = {remoteStream}/>
      </>
    )}
    </div>   
      {/* } */}
      </>
    )
  }

  export default Chat;