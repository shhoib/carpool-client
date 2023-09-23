import {Container} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import axiosInstance from '../api/axios'
import { useSelector } from 'react-redux'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';



const Notifications = () => {

    const [requestNotifications, setRequestNotifications] = useState([])
    const [acceptNotifications, setAcceptNotifications] = useState([])

    const userDetails = useSelector((state)=>state.userAuth)
    const userID = userDetails?.userID;
    const userNAME = userDetails?.name;

    const navigate = useNavigate();

    useEffect(() => {
      const fetchNotification = async () => {
        const response = await axiosInstance.get(`/fetchNotification?id=${userID}`);
    
        // const { notifications } = response?.data?.notification;
    
        const requestNotifications = response?.data?.notification?.notifications.filter(
          (noti) => noti.notificationType === 'request'
        );
    
        const acceptNotifications = response?.data?.notification?.notifications.filter(
          (noti) => noti.notificationType !== 'request'
        );
    
        setRequestNotifications(requestNotifications);
        setAcceptNotifications(acceptNotifications);
      };
    
      fetchNotification();
    }, [userID]);
    

        // console.log(requestNotifications?.notifications);
        console.log(acceptNotifications);
        console.log(requestNotifications);

        const handleAcceptRide= async(noti)=>{
          // console.log(noti);
          const acceptObject = {
            message: `${userNAME} accepted your join request`,
            senderName:userNAME,
            senderID:userID,
            type:'accept',
            receiverID:noti.senderID
          }
            const response = await axiosInstance.post('/sendNotification',acceptObject)
            console.log(response.data);
        }

        return (
  <div>
  
      <Container>
        <Container className='d-flex justify-content-center p-3'>
          <h2>Your Notifications</h2>
        </Container>
        <hr className="hr hr-blurry"/>

        <Container>
          {requestNotifications?.map((noti, index) => (
            <div key={index} className='d-flex justify-content-between p-3'>
            <div className='d-flex align-items-center'>
            <h5>{noti.message}</h5> 
           <MDBBtn rounded className='mx-2' onClick={()=>navigate(`/hosterDetails/${noti.senderID}`)}>
           <MDBIcon fas icon="user" /> view profile</MDBBtn>
           </div>
            <div>
            <MDBBtn className='me-1' color='danger'><MDBIcon fas icon="ban" /> REJECT </MDBBtn>
            <MDBBtn onClick={()=>handleAcceptRide(noti)} className='me-1' color='success'><MDBIcon far icon="check-circle" /> ACCEPT </MDBBtn>
            </div>
            </div>
          ))}
          {acceptNotifications?.map((noti, index) => (
            <div key={index} className='d-flex justify-content-between p-3'>
            <div className='d-flex align-items-center'>
            <h5>{noti.message}</h5> 
           <MDBBtn rounded className='mx-2' onClick={()=>navigate(`/hosterDetails/${noti.senderID}`)}>
           <MDBIcon fas icon="user" /> view profile</MDBBtn>
           </div>
            <div>
            <MDBBtn className='me-1' color='success'><MDBIcon far icon="check-circle" /> OK </MDBBtn>
            </div>
            </div>
          ))}
        </Container>
      </Container>
    
  </div>
);


}

export default Notifications