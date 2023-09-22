import {Container} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import axiosInstance from '../api/axios'
import { useSelector } from 'react-redux'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';



const Notifications = () => {

    const [notifications, setnotifications] = useState([])

    const userDetails = useSelector((state)=>state.userAuth)
    const userID = userDetails.userID

    const navigate = useNavigate();
    useEffect(()=>{
        const fetchNotification = async()=>{
         const response = await axiosInstance.get(`/fetchNotification?id=${userID}`)
         setnotifications(response.data.notification)
        }
        fetchNotification();
    },[userID])
        console.log(notifications.notifications);

        const handleAcceptRide= async()=>{
            const response = await axiosInstance('/handleacceptRide')
        }

        return (
  <div>
    {notifications?.notifications?.length <= 0 ? (
      <div><h1>no notifications</h1></div>
    ) : (
      <Container>
        <Container className='d-flex justify-content-center p-3'>
          <h2>Your Notifications</h2>
        </Container>
        <hr className="hr hr-blurry"/>

        <Container>
          {notifications?.notifications?.map((noti, index) => (
            <div key={index} className='d-flex justify-content-between p-3'>
            <div className='d-flex align-items-center'>
            <h5>{noti.message}</h5> 
           <MDBBtn rounded className='mx-2' onClick={()=>navigate(`/hosterDetails/${noti.senderID}`)}>
           <MDBIcon fas icon="user" /> view profile</MDBBtn>
           </div>
            <div>
            <MDBBtn onClick={()=>handleAcceptRide()} className='me-1' color='danger'><MDBIcon fas icon="ban" /> REJECT </MDBBtn>
            <MDBBtn className='me-1' color='success'><MDBIcon far icon="check-circle" /> ACCEPT </MDBBtn>
            </div>
            </div>
          ))}
        </Container>
      </Container>
    )}
  </div>
);


}

export default Notifications