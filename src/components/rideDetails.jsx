// import React from 'react'
import {Container,Button} from 'react-bootstrap'
import './rideDetails.css'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {AiOutlineThunderbolt} from 'react-icons/ai'
import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';


const RideDetails = () => {

  const {id} = useParams();
  const [rideDetails, setRideDetails] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

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

  return (
    <Container  className=' d-flex flex-column justify-content-center align-items-center'>
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

    <Container className='chatWith d-flex justify-content-between px-3 py-2'>
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

        <Modal.Header closeButton> <Modal.Title>Modal heading</Modal.Title> </Modal.Header>

        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleClose}>  Save Changes</Button>
        </Modal.Footer>
        
      </Modal>

    </Container>
  )
}

export default RideDetails