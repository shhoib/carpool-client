import { Button,Container,Image } from 'react-bootstrap';
import '../stylings/joinRide.css'
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Row,Col} from 'react-bootstrap'
import {AiOutlineUser,AiOutlineUnorderedList} from 'react-icons/ai'
import {MdOutlineFlashOn} from 'react-icons/md'
import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import MapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs'; 
import axiosInstance from '../api/axios';
import {useNavigate} from 'react-router-dom'
import { MDBCard, MDBCardBody,MDBCardTitle,MDBCardText,MDBBtn } from 'mdb-react-ui-kit';


const JoinRide = () => {

 const [fromValue, setFromValue] = useState('');
 const [toValue, setToValue] = useState('');
 const [dateValue, setDateValue] = useState('');
 const [rides, setRides] = useState([]);
 const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])

  const navigate = useNavigate();

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      if(fromValue === '' || toValue === "" || dateValue === '' ){
        toast.error('please fill all details');
      }else{            
      const response = await axiosInstance.get(`/joinRide?from=${fromValue}&to=${toValue}&date=${dayjs(dateValue).format('YYYY/MM/DD')}`) // TODO: change the endpoint name;
      setRides(response.data.rides);
    }}catch(error){
      console.log(error);
    }
  } 

  mapboxgl.accessToken = 'pk.eyJ1Ijoieml5YWR1IiwiYSI6ImNsa2tyb3hycjBmMHQza28zY2JyeGE5bXEifQ.uK6EfNoLf37b1K6oFdjFJw'; 
  const geocodingClient = MapboxSdk({ accessToken: mapboxgl.accessToken });

  const handleFromInputChange = async (event) => {
    const query = event.target.value;
        setFromValue(event.target.value)
    if (query) {
        try {
          const bbox = [74.9799, 6.0002, 77.3885, 10.5245];
            const response = await geocodingClient.forwardGeocode({
                query: query,
                limit: 5,
                bbox:bbox
            }).send();

            setFromSuggestions(response.body.features);
            
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    } else {
      setFromSuggestions([]);
    }};

    const handleToInputChange = async (event) => {
    const query = event.target.value;
    setToValue(event.target.value)
    if (query) {
        try {
          const bbox = [74.9799, 6.0002, 77.3885, 10.5245];
            const response = await geocodingClient.forwardGeocode({
                query: query,
                limit: 5,
                bbox:bbox
            }).send();

            setToSuggestions(response.body.features);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    } else {
      setToSuggestions([]);
    }
    };

    const handleFromSuggestionClick = (suggestion) => {
      setFromValue(suggestion.place_name);
      setFromSuggestions([]);
    };
    const handleToSuggestionClick = (suggestion) => {
      setToValue(suggestion.place_name);
      setToSuggestions([]);
    };

    
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target)) {
        setFromSuggestions([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
   }, []);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (toInputRef.current && !toInputRef.current.contains(event.target)) {
        setToSuggestions([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
   }, []);

   const handleRideClick = (id)=>{
      navigate(`/RideDetails/${id}`)
   }
  
  return (
    <> 
    <Row className='d-flex align-items-center justify-content-center w-100'>
    <ToastContainer/>
     <Col lg={4} className="d-flex justify-content-center">
      <Image className='bgIMG' src='https://images.template.net/83682/free-simple-car-illustration-3v7wz.jpg'/>
    </Col>

    <Col lg={8} className='inputBoxWithImage'>
      <h1 className='mainTXT text-center'>PICK YOUR RIDE AT LOW PRICE!!</h1> 

      <div  className='wholeInputBoxes d-flex justify-content-center'>
        <div>
        <TextField  ref={fromInputRef} onChange={handleFromInputChange} autoComplete="off"  className='inputBoxes bg-white rounded m-2'
         name="from" id="-basic" value={fromValue==''?'':fromValue} label="from..." variant="outlined" />
        {fromSuggestions.length > 0 && (
        <ul className='suggestion'>
        {fromSuggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleFromSuggestionClick(suggestion)} >
                {suggestion.place_name}
            </li>
        ))}</ul>)}
        </div>
          <div>
        <TextField ref={toInputRef} onChange={handleToInputChange} autoComplete="off"  className='bg-white rounded m-2'
         id="-basic" name="to" label="to..." value={toValue==''?'':toValue} variant="outlined" />
          {toSuggestions.length > 0 && (
        <ul className='suggestion'>
        {toSuggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleToSuggestionClick(suggestion)} >
                {suggestion.place_name}
            </li>
        ))}
    </ul>
    )}
    </div>

        <LocalizationProvider  className='' dateAdapter={AdapterDayjs}>
        <DemoContainer  components={['DatePicker']}>
         <DatePicker className='bg-white rounded mb-2 d-flex' label="date" value={dateValue}
        onChange={(newValue) => setDateValue(newValue)} /></DemoContainer>
        </LocalizationProvider>

        <Button onClick={handleSubmit} className='m-2'>Submit</Button>
      </div>  

     <div className='tipss d-flex mt-3'>
       <div className='d-flex flex-column align-items-center px-2'>
         <h3><AiOutlineUnorderedList/></h3>
         <h5 className='text-center'>Your pick of rides at low prices</h5>
         <h className='text-center'>No matter where you’re going, find the perfect ride from our wide range of destinations and routes at low prices.</h>
       </div>

       <div className='d-flex flex-column align-items-center px-2'>
         <h3><MdOutlineFlashOn/></h3>
         <h5 className='text-center'>Scroll, click, tap and go!</h5>
         <h className='text-center'>Booking a ride has never been easier! Thanks to our simple app powered
             by great technology, you can book a ride close to you in just minutes.</h>
        </div>
     </div>
    </Col>
    </Row>

    <hr className='horizontal-line'/>   
    
    {rides.length<0 ?<div><h1>no rides available</h1></div>: 
     rides.map((ride,index)=>(
      <div key={index}>
     <MDBCard className='ride_list px-1 m-3'>
      <MDBCardBody>
        <div className='d-flex justify-content-between'>
        <h4 className='name'>{ride.hoster.charAt(0).toUpperCase() + ride.hoster.slice(1)}</h4>
          <div>
          <h3 className='rate'>₹{ride.amount}</h3>
          <h6 style={{color:'grey'}}>per seat</h6>
          </div>
        </div>

        <div className='d-flex justify-content-between'>
          <div>
            <h6 className='from'>{ride.from.split(', ').slice(0, 2).join(', ').charAt(0).toUpperCase() + ride.from.slice(1)}</h6>
            <h4 className='to'>{ride.to.split(', ').slice(0, 2).join(', ').charAt(0).toUpperCase() + ride.to.slice(1)}</h4>
           </div>
            <h5 className='vehicle'>vehicle : {ride.vehicle.charAt(0).toUpperCase() + ride.vehicle.slice(1)}</h5>
          </div>

         <div className='d-flex justify-content-between'>
          <h6 className='date'>{ride.date}</h6>
          <MDBBtn onClick={()=>handleRideClick(ride._id)} outline className='join_button mx-2' color='secondary'> Join </MDBBtn>
          </div>    
      </MDBCardBody>
    </MDBCard>
    </div>
    ))
    }
    </>
  )
}

export default JoinRide