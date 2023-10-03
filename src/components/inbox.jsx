import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { Container } from 'react-bootstrap'
// import { HiOutlineChatBubbleLeft } from 'react-icons/hi'
import './inbox.css'



// const socket = io.connect('http://localhost:3000')


const Inbox = () => {

    const [previousChats, setPreviousChats] = useState([])
    const navigate = useNavigate()

    const USER = useSelector((state)=>state.userAuth)
    const userID = USER.userID

    useEffect(()=>{
        const fetchPreviuosChatDetails = async()=>{
            const response = await axiosInstance.get(`fetchPreviuosChatDetails?userID=${userID}`)
            setPreviousChats(response.data);
            console.log(response.data);
        }   
        fetchPreviuosChatDetails();
    },[USER])

    const handleChatClick=(chat)=>{
        navigate(`/chat/${chat._id}/`)
        // console.log(chat);
    }

  return (
    <>
    <Container className='chat d-flex flex-column align-items-center p-5'>

     {Array.isArray(previousChats.chattedUsers)&&
      <div className='previousChat-banner d-flex flex-column align-items-center'>
        <h3>previous chats</h3>
      </div> }

      {Array.isArray(previousChats.chattedUsers) ? (previousChats.chattedUsers.map((chat, index) => (

        <div key={index} onClick={()=>handleChatClick(chat)} className='chatted-user'>
           <div className=' d-flex align-items-center justify-content-between p-3'>
           <div className='d-flex align-items-center'>
              <div className='profile' style={{ backgroundImage:`url(${chat.profileURL || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}}></div>
              <h4 className='px-3' >{chat.name}</h4>
           </div>
           <h6>time</h6>
           </div>

           <hr className="hr hr-blurry w-100" />
           
        </div>

          ))) : (
        <p>Loading...</p>
            )}
     </Container>
    </>
  )
}

export default Inbox