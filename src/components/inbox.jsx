import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
// import io from 'socket.io-client';



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
     {Array.isArray(previousChats.chattedUsers) ? (previousChats.chattedUsers.map((chat, index) => (
                    <h1 key={index} onClick={()=>handleChatClick(chat)}>{chat.name}</h1>
                ))) : (
                <p>Loading...</p>
            )}
    </>
  )
}

export default Inbox