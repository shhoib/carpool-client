//  import {Col,Row} from 'react-bootstrap'
//  import React from 'react';
//  import { Image, Form, Button } from 'react-bootstrap';
//  import '../stylings/hostRide.css'
//  import { GiReceiveMoney } from 'react-icons/gi';
//  import { VscWorkspaceTrusted } from 'react-icons/vsc';
//  import { TiTickOutline } from 'react-icons/ti';
//  import { AiOutlineUserAdd,AiOutlineCar } from 'react-icons/ai';
//  import { useState, useRef,useEffect } from 'react';
//   import axios from 'axios';
//  import mapboxgl from 'mapbox-gl';
//  import MapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';
//  import { ToastContainer, toast } from 'react-toastify';
//  import Stack from '@mui/material/Stack';
//  import Snackbar from '@mui/material/Snackbar';
//  import MuiAlert from '@mui/material/Alert';
//  import axiosInstance from '../api/axios'
//  import { useSelector } from 'react-redux';
//  import {MDBBtn,MDBModal,MDBModalDialog,MDBModalContent,MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,} from 'mdb-react-ui-kit';



//  const HostRide = () => {

//    const [fromSuggestions, setFromSuggestions] = useState([])
//    const [toSuggestions, setToSuggestions] = useState([])
//    const [from, setFrom] = useState('');
//    const [to,setTo] = useState('');
//    const [formSubmitted, setFormSubmitted] = useState(false);
  

//    const Alert = React.forwardRef(function Alert(props, ref) {
//    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//  });

//   const inputRef = useRef(null);

//   const USER = useSelector((state)=>state.userAuth);
 

//   const handleSubmit = async (e) => {
//    e.preventDefault();
  
//    try {
//      const DATE = inputRef.current.date.value;
//      const dateValue = DATE.replace(/-/g, '/');
//      const passengersValue = inputRef.current.passengers.value;
//      const vehicle = inputRef.current.vehicle.value;
//      const amount = inputRef.current.amount.value;

//      const requestData = {
//        from: from,
//        to: to,
//        date: dateValue,
//        passengers: passengersValue,
//        vehicle: vehicle,
//        amount: amount,
//        hoster:USER.name,
//        hosterID:USER.userID,
//        status:"hosted"
//      };

//      if (from === '' || to === '' || dateValue === '' || passengersValue === '' || amount === '') {
//        toast.error("Please fill in all details");
//      } else {
//        try {
//          const response = await axiosInstance.post("/HostRide", requestData);
//          if(response.status==201){
//            setFrom('');
//            setTo('')
//            inputRef.current.date.value = '';  
//            inputRef.current.passengers.value = ''; 
//            inputRef.current.vehicle.value = ''; 
//            inputRef.current.amount.value = ''; 
//            setFormSubmitted(true)
//          }
//        } catch (error) {
//          console.error(error.message);
//        }
//      }
//    } catch (error) {
//      console.error(error);
//       alert(error);
//    }
//  };


//    mapboxgl.accessToken = 'pk.eyJ1Ijoieml5YWR1IiwiYSI6ImNsa2tyb3hycjBmMHQza28zY2JyeGE5bXEifQ.uK6EfNoLf37b1K6oFdjFJw'; 
//    const geocodingClient = MapboxSdk({ accessToken: mapboxgl.accessToken });

//    const handleFromInputChange = async (event) => {
//      const query = event.target.value;
//      setFrom(event.target.value);
//      if (query) {
//          try {
//            const bbox = [74.9799, 6.0002, 77.3885, 10.5245];
//              const response = await geocodingClient.forwardGeocode({
//                  query: query,
//                  limit: 5,
//                  bbox:bbox
//              }).send();

//              setFromSuggestions(response.body.features);
//          } catch (error) {
//              console.error('Error fetching suggestions:', error);
//          }
//      } else {
//        setFromSuggestions([]);
//      }
//      };


//    const handleToInputChange = async (event) => {
//      const query = event.target.value;
//      setTo(event.target.value);
//      if (query) {
//          try {
//            const bbox = [74.9799, 6.0002, 77.3885, 10.5245];
//              const response = await geocodingClient.forwardGeocode({
//                  query: query,
//                  limit: 5,
//                  bbox:bbox
//              }).send();

//              setToSuggestions(response.body.features);
//          } catch (error) {
//              console.error('Error fetching suggestions:', error);
//          }
//      } else {
//        setToSuggestions([]);
//      }
//      };

    
//        const handleFromSuggestionClick = (suggestion) => {
//        setFrom(suggestion.place_name);
//        setFromSuggestions([]);
//      };
//        const handleToSuggestionClick = (suggestion) => {
//        setTo(suggestion.place_name);
//        setToSuggestions([]);
//      };

//      useEffect(() => {
//      const handleClickOutside = (event) => {
//        if (inputRef.current.from && !inputRef.current.from.contains(event.target)) {
//          setFromSuggestions([]);
//        }
//      };
//      document.addEventListener('click', handleClickOutside);
//      return () => {
//        document.removeEventListener('click', handleClickOutside);
//      };
//     }, []);

//      useEffect(() => {
//      const handleClickOutside = (event) => {
//        if (inputRef.current.to && !inputRef.current.to.contains(event.target)) {
//          setToSuggestions([]);
//        }
//      };
//      document.addEventListener('click', handleClickOutside);
//      return () => {
//        document.removeEventListener('click', handleClickOutside);
//      };
//     }, []);


//    return (
//      <>
//      <ToastContainer/>
//      <Stack spacing={2} sx={{ width: '100%' }}>
//          <Snackbar open={formSubmitted} autoHideDuration={6000} onClose={() => setFormSubmitted(false)}>
//            <Alert onClose={() => setFormSubmitted(false)} severity="success" sx={{ width: '100%' }}>
//              Ride hosted succesfully
//            </Alert>
//          </Snackbar>
//        </Stack>
//      <Row className='d-flex justify-content-center align-items-start w-100'>
//      <Col md={5} xs={10} className='hostImg d-flex justify-content-center align-items-center m-3 position-relative'>
//        <Form className='overlay-form' ref={inputRef} onSubmit={handleSubmit}>
//          <Form.Label>From</Form.Label>
//          <Form.Control className='inputBox' autoComplete="off" type='text' value={from}  name='from' onChange={handleFromInputChange} />
//          {fromSuggestions.length > 0 && (
//          <ul className='suggestions'>
//          {fromSuggestions.map((suggestion) => (
//              <li key={suggestion.id} onClick={() => handleFromSuggestionClick(suggestion)} >
//                  {suggestion.place_name}
//              </li>
//          ))}
//      </ul>
//      )}
//          <Form.Label>To</Form.Label>
//          <Form.Control className='inputBox' autoComplete="off"  type='text' value={to} name='to' onChange={handleToInputChange} />
//          {toSuggestions.length > 0 && (
//          <ul className='suggestions'>
//          {toSuggestions.map((suggestion) => (
//              <li key={suggestion.id} onClick={() => handleToSuggestionClick(suggestion)} >
//                  {suggestion.place_name}
//              </li>
//          ))}
//      </ul>
//      )}
//          <Form.Label>Date</Form.Label>
//          <Form.Control className='inputBox' placeholder='date' type='date' name='date'/>
//          <Form.Label>vehicle</Form.Label>
//          <Form.Control className='inputBox'  placeholder='Vehicle' type='text' name='vehicle'/>

//          <div className='d-flex'>
//          <div>
//          <Form.Label>Amount</Form.Label>
//          <Form.Control className='inputBox' placeholder='    Rate..' type='number' name='amount'/>
//          </div><div>
//          <Form.Label>Passengers</Form.Label>
//          <Form.Control className='inputBox' placeholder='available seats ..' type='number' name='passengers'/>
//          </div></div>

//          <Button className='mt-2' type='submit'>Submit</Button>
//        </Form>
//        <Image src='https:res.cloudinary.com/dzhfutnjh/image/upload/v1691386474/pexels-photo-876228_rfvfyy.jpg' className='hostImg2 rounded-3 w-100' />
//      </Col>

//      <Col md={6} xs={11} className='d-flex flex-column align-items-center'>
//       <div>
//          <h1 className='text-center mt-5'>CARPOOLING, WHERE SAVING MEETS SOCIALIZING</h1>
//       </div>
//       <Row className='d-flex align-items-'>
//       <Col md={6} xs={11} className='d-flex flex-column align-items-center '>
//          <h2 className='mt-4'><VscWorkspaceTrusted/></h2>
//          <h5 className='text-center'>Join a trustworthy community</h5>
//          <h className='text-center'>We know each of our members: both drivers and passengers. We verify ratings, profiles and IDs, so you know exactly who you’re travelling with.</h>
//       </Col>
//       <Col md={6} xs={11} className='d-flex flex-column align-items-center'>
//          <h2 className='mt-4'><GiReceiveMoney/></h2>
//          <h5>Save on travel costs</h5>
//          <h className='text-center'>Share your ride with passengers on your way, and save every time you travel by car. Sign up as a driver to start saving on travel costs.</h>
//       </Col>
//       </Row>

//       <hr className='horizontal-line my-5'/>
     
//       <Col md={12} >
//        <h2 className='text-center'>Publish your ride in just minutes</h2>

//        <div className='d-flex '>
//        <h2 className='mt-4'><AiOutlineUserAdd/></h2>
//        <div className='mt-4 mx-3'>
//        <h5>Create a Coride account</h5>
//        <h>Add your profile picture, a few words about you and your phone number to increase trust between members.</h>
//        </div>
//        </div>
      
//        <div className='d-flex'>
//        <h2 className='mt-4'><AiOutlineCar/></h2>
//        <div className='mt-4 mx-2'>
//        <h5 >Publish your ride</h5>
//        <h>Indicate departure and arrival points, the date of the ride and check our recommended price to increase your chances of getting your first passengers and ratings.</h>
//        </div>
//        </div>

//        <div className='d-flex'>
//        <h2 className='mt-4'><TiTickOutline/></h2>
//        <div className='mt-4 mx-3'>
//        <h5 >Accept booking requests</h5>
//        <h>Review passenger profiles and accept their requests to ride with you. That’s how easy it is to start saving on travel costs!</h>
//        </div>
//        </div>

//       </Col>
//      </Col>
//      </Row>
//      </>
//    );
//  };

//  export default HostRide;


import {Col,Row} from 'react-bootstrap'
import '../stylings/hostRide.css'
import {MDBBtn} from 'mdb-react-ui-kit'
import Form from 'react-bootstrap/Form';
import React,{ useState,useEffect,useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axiosInstance from '../api/axios'
import MapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';





const HostRide = () => {

     const [selectedNumber, setSelectedNumber] = useState(null);
     const [fromSuggestions, setFromSuggestions] = useState([])
     const [toSuggestions, setToSuggestions] = useState([])
     const [from, setFrom] = useState('');
     const [to,setTo] = useState('');
     const [DATE,setDate] = useState('');
     const [vehicle,setVehicle] = useState('');
     const [amount,setAmount] = useState('');
     const [formSubmitted, setFormSubmitted] = useState(false);

     const handleNumberChange = (number) => {
      setSelectedNumber(number);
    };
    
  
     const Alert = React.forwardRef(function Alert(props, ref) {
     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
   });
  
    const inputRef = useRef(null);
  
    const USER = useSelector((state)=>state.userAuth);
   
  
    const handleSubmit = async (e) => {
     e.preventDefault();
    
     try {
       const dateValue = DATE.replace(/-/g, '/');
    

       const requestData = {
         from: from,
         to: to,
         date: dateValue,
         passengers: selectedNumber,
         vehicle: vehicle,
         amount: amount,
         hoster:USER.name,
         hosterID:USER.userID,
         status:"hosted"
       };
  
       if (from === '' || to === '' || dateValue === '' || selectedNumber === null || amount === '') {
         toast.error("Please fill in all details");
       } else {
         try {
           const response = await axiosInstance.post("/HostRide", requestData);
           if(response.status==201){
             setFrom('');
             setTo('')
             setAmount('')
             setVehicle('')
             setDate('')
             setFormSubmitted(true)
             setSelectedNumber(null)
           }
         } catch (error) {
           console.error(error.message);
         }
       }
     } catch (error) {
       console.error(error);
     }
   };
  
  
     mapboxgl.accessToken = 'pk.eyJ1Ijoieml5YWR1IiwiYSI6ImNsa2tyb3hycjBmMHQza28zY2JyeGE5bXEifQ.uK6EfNoLf37b1K6oFdjFJw'; 
     const geocodingClient = MapboxSdk({ accessToken: mapboxgl.accessToken });
  
     const handleFromInputChange = async (event) => {
       const query = event.target.value;
       setFrom(event.target.value);
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
       }
       };
  
  
     const handleToInputChange = async (event) => {
       const query = event.target.value;
       setTo(event.target.value);
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
         setFrom(suggestion.place_name);
         setFromSuggestions([]);
       };
         const handleToSuggestionClick = (suggestion) => {
         setTo(suggestion.place_name);
         setToSuggestions([]);
       };
  
       useEffect(() => {
       const handleClickOutside = (event) => {
         if (inputRef.current.from && !inputRef.current.from.contains(event.target)) {
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
          if (inputRef.current.to && !inputRef.current.to.contains(event.target)) {
             setToSuggestions([]);
           }
           };
          document.addEventListener('click', handleClickOutside);
         return () => {
            document.removeEventListener('click', handleClickOutside);
          };
          }, []);
        
  
  return (
    <>
    <ToastContainer/>
    <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={formSubmitted} autoHideDuration={6000} onClose={() => setFormSubmitted(false)}>
            <Alert onClose={() => setFormSubmitted(false)} severity="success" sx={{ width: '100%' }}>
              Ride hosted succesfully
            </Alert>
          </Snackbar>
        </Stack>

    <Row className='hostRide-banner-container d-flex align-items-center'>
    <Col md={6} xs={12} className='scam-image-container'>
        <img className='hostRide-banner-image' src="https:res.cloudinary.com/dzhfutnjh/image/upload/v1696930137/more_cars_c4sbac.png" alt="" />
      </Col>
      
      <Col className='hostRide-bannerText-container' md={6} xs={12}>
        <h3 style={{fontWeight:'600'}}>Share your ride with passengers on your way, and save every time you travel by car.
       Sign up as a driver to start saving on travel costs!!</h3>
      </Col>   
    </Row>

    <div className='host-heading'>
      <h1>HOST YOUR RIDE HERE</h1>
    </div>

    <Form ref={inputRef} onSubmit={handleSubmit}>
    <div className='host-input-box-container'>
     <Row className='d-flex'>
     <Col md={6} xs={12}>
     <Form.Control className='host-input-boxes'  autoComplete="off" type="text" value={from} name='from' onChange={handleFromInputChange} placeholder="from..." />
     {fromSuggestions.length > 0 && (
         <ul className='suggestions'>
         {fromSuggestions.map((suggestion) => (
             <li key={suggestion.id} onClick={() => handleFromSuggestionClick(suggestion)} >
                 {suggestion.place_name}
            </li>
        ))}
    </ul>
    )}
     </Col>
     <Col md={6} xs={12}>
     <Form.Control className='host-input-boxes' name='to' onChange={handleToInputChange} autoComplete="off" value={to} type="text" placeholder="to..." />
        {toSuggestions.length > 0 && (
         <ul className='suggestions'>
         {toSuggestions.map((suggestion) => (
             <li key={suggestion.id} onClick={() => handleToSuggestionClick(suggestion)} >
                 {suggestion.place_name}
             </li>
         ))}
     </ul>
     )}
     </Col>
     </Row>
      <Row className='d-flex'> 
        <Col md={4} xs={12}><Form.Control onChange={(e)=>setDate(e.target.value)} value={DATE} className='host-input-boxes' type="date" placeholder="date" /></Col>
        <Col md={4} xs={12}><Form.Control onChange={(e)=>setVehicle(e.target.value)} value={vehicle} className='host-input-boxes' type="text" placeholder="vehicle" /></Col>
        <Col md={4} xs={12}> <Form.Control onChange={(e)=>setAmount(e.target.value)} value={amount} className='host-input-boxes' type="number" placeholder="amount" /> </Col>
      </Row>

      <h2 className='seats-text'>AVAILABLE SEATS</h2>

      <div className="radio-button-group">
      <div className={`radio-button ${selectedNumber === '1' ? 'selected' : ''}`} 
       onClick={() => handleNumberChange('1')}>
        1 </div>
      <div
        className={`radio-button ${selectedNumber === '2' ? 'selected' : ''}`}
        onClick={() => handleNumberChange('2')} >
        2  </div>
      <div
        className={`radio-button ${selectedNumber === '3' ? 'selected' : ''}`}
        onClick={() => handleNumberChange('3')}>
        3 </div>
      <div
        className={`radio-button ${selectedNumber === '4' ? 'selected' : ''}`}
        onClick={() => handleNumberChange('4')}>
        4 </div>
    </div>

       <MDBBtn className='host-button'>HOST</MDBBtn>
     </div>
     </Form>
    </>
  )
}

export default HostRide