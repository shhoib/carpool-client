  // import React from 'react'
  import {Container} from 'react-bootstrap'
  import '../stylings/chat.css'
  // import io from 'socket.io-client';
  import { useState,useEffect, useRef } from 'react';
  import axiosInstance from '../api/axios';
  import { useSelector } from 'react-redux';
  import { useNavigate, useParams } from 'react-router-dom';
  import {RiSendPlaneLine} from 'react-icons/ri'
  import socket from '../api/socketIO.js'
  import Lottie from 'react-lottie'
  import loading from '../animations/typing.json'
  import {AiOutlineEdit} from 'react-icons/ai'
  import {RiRadioButtonLine} from 'react-icons/ri'
  import {FcVideoCall,FcPhone} from 'react-icons/fc'
  import Peer from 'simple-peer'

 



  

  const Chat = () => {

    const [message, setmessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [previousChats, setPreviousChats] = useState([])
    const [chatDetails, setChatDetails] = useState({})
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [me, setMe] = useState('')
    const [stream, setStream] = useState(null)
    // const [callAccepted, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState('')
    const [callerSignal, setCallerSignal] = useState()
    const [idToCall, setIdToCall] = useState('')
    const [callEnded, setCallEnded] = useState(false)
    const [callAccepted, setCallAccepted] = useState(false)
    const [call, setCall] = useState(null)
   


    const USER = useSelector((state)=>state.userAuth);
    const userID = USER.userID 
    const name = USER.name 

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    const navigate = useNavigate();

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
  
    },[id, userID])

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



    useEffect(()=>{
      socket.on('receive_message',(data)=>{
        setMessageList((previous)=>[...previous,data])
      })
      socket.on('typing',()=>setIsTyping(true))
      socket.on('stop typing',()=>setIsTyping(false))
    }, []) 
    
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
;

    useEffect(()=>{
      navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((currentStream)=>{
        setStream(currentStream)
        myVideo.current.srcObject = currentStream
      })
      socket.on('me',(id)=>{
        setMe(id)
      })

      socket.on('calluser',({from,name:callerName,signal})=>{
        setCall({isReceiveCall:true, from, name:callerName, signal})
      })

    },[])

    const handleVideoCall = ()=>{
     
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
      })
      peer.on("signal", (data) => {
        socket.emit("calluser", {
          userToCall: room,
          signalData: data,
          from: me,
          name: name
        })
      })
      peer.on("stream", (currentStream) => {       
          userVideo.current.srcObject = currentStream
        
      })
      socket.on("callaccepted", (signal) => {
        setCallAccepted(true)
        peer.signal(signal)
      })
  
      connectionRef.current = peer
      }


    const answerCall =() =>  { 

		setCallAccepted(true)
		const peer = new Peer({ initiator: false,	trickle: false,stream })

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: call.from })
		})
		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream
		})

		peer.signal(call.signal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

  const handlePreviousChatNavigate = (chattedUser)=>{
    navigate(`/chat/${chattedUser._id}`)
  }



    return ( 

      <>
      {/* {loading ? 
      <p>loading...</p>: */}   
    <div className='whole-chat-container d-flex'>
      <div className='previous-chats'>
        <div className='chat-heading p-2 d-flex align-items-center justify-content-evenly'>
          <div className='profile'  style={{ backgroundImage:`url(${USER.profile || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}}></div>
          <h4 className='username px-2'>{USER.name}</h4>
          {/* <h5><MDBIcon fas icon="user-edit" /></h5> */}
          <h4> <AiOutlineEdit/></h4>
        </div>
        
        <input type="text" className="search-box" placeholder="Search users..."/>

        {previousChats?.map((chattedUser,index)=>(
         <div onClick={()=>handlePreviousChatNavigate(chattedUser)} key={index} className='each-chat px-2 py-1 my-2'>
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
              <h2 style={{color:"white",padding:"8px",fontFamily:"cursive",fontWeight:"500"}}>{chatDetails?.toUser?.name}</h2>
              <RiRadioButtonLine style={{color:'green'}}/>
         </div> 
          <div className='call-icon d-flex align-items-center justify-content-end'>
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
              <div className='inside-chat-profile m-1' style={{ backgroundImage: `url(${ USER.name === messages.author
           ? USER.profile || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' : chatDetails?.toUser?.profileURL|| 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
             })`, backgroundSize: 'cover' }}></div>
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
    </div> 

    {/* <MDBBtn onClick={answerCall}>accept</MDBBtn>
    <MDBBtn onClick={leaveCall}>leave</MDBBtn> */}
    
    <video src="" muted ref={myVideo} style={{width:'60px',height:'60px'}}/>
    <video src="" muted ref={userVideo} style={{width:'60px',height:'60px'}}/>
      
      </>
    )
  }

  export default Chat;