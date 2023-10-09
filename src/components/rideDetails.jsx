import {Container,Button} from 'react-bootstrap'
import '../stylings/rideDetails.css'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {AiOutlineThunderbolt} from 'react-icons/ai'
import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'



const RideDetails = () => {

  const {id} = useParams();
  const [rideDetails, setRideDetails] = useState({})
  // const [isChat, setIsChat] = useState({})
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(1); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const navigate = useNavigate();


  const USER = useSelector((state)=>state.userAuth);
  const userID = USER.userID;
  const toID = rideDetails.hosterID;



  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`rideDetails/${id}`);
        setRideDetails(response.data.ride);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const hosterID = rideDetails.hosterID;

  const handleProfileClick = ()=> {
    navigate(`/hosterDetails/${hosterID}`)
  }


  const incrementCounter = () => {
    if(counter < rideDetails.passengers){
    setCounter(counter + 1);
    }else {
    toast.warn(`only ${rideDetails.passengers} seat available`, {
      position: 'top-right',
      autoClose: 2000, 
    });
  }
  };

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const handleBookRide= async()=>{
    const message = `${USER.name} would like to join ride you`;
    const sendingObject = {
      senderID : userID,
      receiverID : toID,
      message:message,
      senderName:USER.name,
      type:'request', 
      rideID:id
    }
    try{
      const response = await axiosInstance.post('/sendNotification',sendingObject) 
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
    handleClose();
   }
   

  return (
    <Container  className=' d-flex flex-column justify-content-center align-items-center'>
    <ToastContainer/>
    <div className='p-4'>
        <h1>{rideDetails.date}</h1>
    </div>

    <Container  className='rideDetails d-flex flex-column justify-content-center align-items-center'>
      <div className='d-flex p-3'>
        <div className='d-flex flex-column justify-content-between px-3'>
            <h6 className=''>FROM</h6>
            <h6 className=''>TO</h6>
        </div>

          <div>
            <div className='circleInRidDetails m-0'></div>
            <div className='verticleLine'></div>
            <div className='circleInRidDetails'></div>
          </div>
          
          <div className='d-flex flex-column justify-content-between px-5'>
            <h4 className='fromLocation'>{rideDetails.from}</h4>
            <h4 className='toLocation'>{rideDetails.to}</h4>
          </div>

    </div>
    </Container>

    <hr className='connectingLine m-3'/>

    <Container className='d-flex justify-content-around p-2'>
        <h5>Total price for 1 passenger</h5>
        <h4 className='price'>{`₹${rideDetails.amount}.00`}</h4>
    </Container>

    <Container className='hosterSection d-flex justify-content-between p-4' onClick={handleProfileClick}>
     <div>
        <h3 className='vehicleANDpassengerDetails'>{rideDetails.hoster}</h3>
        <h6>4.3 rating</h6>
     </div>
     <div className='d-flex align-items-center'>
        <div className='imageSection'></div>
        <h2 className=''><MdKeyboardArrowRight/></h2>
     </div>
    </Container>

    <Container onClick={()=>navigate(`/chat/${hosterID}`)} className='chatWith d-flex justify-content-between px-3 py-2'>
        <h5>{`Chat with ${rideDetails.hoster}`}</h5>
        <h2><MdKeyboardArrowRight/></h2>
    </Container>

    <Container className='carName d-flex px-3 py-1'>
        <h5>vehicle type : <span className='vehicleANDpassengerDetails'>{rideDetails.vehicle}</span></h5>
    </Container>

    <Container className='carName px-3 py-3'>
        <h5>Available seats : <span className='vehicleANDpassengerDetails'>{rideDetails.passengers}</span></h5>
    </Container>

    <Container className='d-flex justify-content-center p-4'>
        <button onClick={handleShow} className='bookButton d-flex align-items-center px-4 py-2'><AiOutlineThunderbolt/>
        <h6 className='px-1 pt-1'>Book</h6></button>
    </Container>

    <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton> </Modal.Header>

        <Modal.Body><h5>How many seats did you want?</h5>
        <div className="counter-container">
      <button className="counter-button" onClick={decrementCounter}>-</button>
      <span className="counter-value">{counter}</span>
      <button className="counter-button" onClick={incrementCounter}>+</button>
    </div></Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> CLOSE </Button>
          <Button variant="primary" onClick={()=>handleBookRide()}>BOOK</Button>
        </Modal.Footer>

      </Modal>

    </Container>
  )
}

export default RideDetails