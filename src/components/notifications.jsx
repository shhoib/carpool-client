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
        // console.log(response.data);
        
        const requestNotifications = response?.data?.notification?.notifications?.filter(
          (noti) => noti?.notificationType === 'request'
        );
    
        const acceptNotifications = response?.data?.notification?.notifications?.filter(
          (noti) => noti?.notificationType !== 'request'
        );
    
        setRequestNotifications(requestNotifications);
        setAcceptNotifications(acceptNotifications);
      };
    
      fetchNotification();
    }, [userID]);
    

        // console.log(acceptNotifications);
        // console.log(requestNotifications);

        const handleAcceptRide = async (noti) => {
          const acceptObject = {
            message: `${userNAME} accepted your join request`,
            senderName: userNAME,
            senderID: userID,
            type: 'accept',
            receiverID: noti.senderID,
            rideID:noti.rideID
          };
          // console.log(acceptObject.receiverID);
        
          try {
            const response = await axiosInstance.post('/sendNotification', acceptObject);
            console.log(response.data);
        
            const deleteNotification = async () => {
              try {
                const response = await axiosInstance.delete(`/deleteNotification/${noti._id}`);
                console.log(response.data);
        
                setRequestNotifications((prevNotifications) =>
                  prevNotifications?.filter((notification) => notification?._id !== noti._id)
                );
        
                setAcceptNotifications((prevNotifications) =>
                  prevNotifications?.filter((notification) => notification?._id !== noti._id)
                );
              } catch (error) {
                console.log(error);
              }
            };

            // console.log(noti.rideID);
            const rideID = noti.rideID
            const changeStatus = await axiosInstance.post(`/changeRideStatus`,{rideID,receiverID:noti.senderID})
            console.log(changeStatus.data);

            // changeStatus();
            deleteNotification();

          } catch (error) {
            console.log(error);
          }
        };
        

        const handleRejectRide = async(noti)=>{
          const acceptObject = {
            message: `${userNAME} rejected your join request`,
            senderName:userNAME,
            senderID:userID,
            type:'accept',
            receiverID:noti.senderID,
          }
            const response = await axiosInstance.post('/sendNotification',acceptObject)
            console.log(response.data);

            const deleteNotification = async()=>{
              try{
                const response = await axiosInstance.delete(`/deleteNotification/${noti._id}`);
                console.log(response.data);
                setRequestNotifications((prevNotifications) =>
               prevNotifications?.filter((notification) => notification?._id !== noti._id)
               );
              }catch(error){
                console.log(error);
              }
            }
            deleteNotification();
        }
  
        const handleDelete = async (noti) => {
          try {
            const response = await axiosInstance.delete(`/deleteNotification/${noti._id}`);
            console.log(response.data);
        
            setRequestNotifications((prevNotifications) =>
              prevNotifications?.filter((notification) => notification._id !== noti._id)
            );
        
            setAcceptNotifications((prevNotifications) =>
              prevNotifications?.filter((notification) => notification._id !== noti._id)
            );
          } catch (error) {
            console.log(error);
          }
        };
        


        return (
     <div>
     {requestNotifications?.length<=0 && acceptNotifications?.length<=0?(
      <Container className='d-flex justify-content-center align-items-center' style={{width:'100%',height:'100vh'}}>
      <h1><MDBIcon fas icon="bell-slash" /> No new Notifications</h1></Container>
     ):(

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
            <MDBBtn onClick={()=>handleRejectRide(noti)} className='me-1' color='danger'><MDBIcon fas icon="ban" /> REJECT </MDBBtn>
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
            <MDBBtn onClick={()=>handleDelete(noti)} className='me-1' color='success'><MDBIcon far icon="check-circle" /> OK </MDBBtn>
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