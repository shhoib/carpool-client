// import React from 'react'
import {Container} from 'react-bootstrap'
import './chat.css'

const Chat = () => {


  return (
    <>
  <Container className='chat-container'>
  <div className=''>
  <input className='message-input'/>
  </div>
  <button>Send</button>
    
  </Container>
    </>
  )
}

export default Chat;