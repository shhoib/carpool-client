import { Button,Container,Image } from 'react-bootstrap';
import './joinRide.css'
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Row,Col} from 'react-bootstrap'
import {AiOutlineUser,AiOutlineUnorderedList} from 'react-icons/ai'
import {MdOutlineFlashOn} from 'react-icons/md'
import { useState } from 'react';
import axios from 'axios';

const JoinRide = () => {

 const [fromValue, setFromValue] = useState('');
 const [toValue, setToValue] = useState('');
 const [dateValue, setDateValue] = useState('');
 const [rides, setRides] = useState([]);



  const handleSubmit = async () =>{
    try{
      const response = await axios.post('http://localhost:3000/joinRide', {
      from: fromValue,
      to: toValue,
      date: dateValue.$d
    });
      setRides(response.data.rides);
    }catch(error){
      console.log(error);
    }
  } 
  
  return (
    <> 
    <Row className='d-flex align-items-center justify-content-center w-100'>

     <Col lg={4} className="d-flex justify-content-center">
      <Image className='bgIMG' src='https://images.template.net/83682/free-simple-car-illustration-3v7wz.jpg'/>
    </Col>

    <Col lg={8} className='inputBoxWithImage'>
      <h1 className='mainTXT text-center'>PICK YOUR RIDE AT LOW PRICE!!</h1> 

      <div  className='wholeInputBoxes d-flex justify-content-center'>
        <TextField onChange={(e)=>setFromValue(e.target.value)} className='inputBoxes bg-white rounded m-2' name="from" id="-basic" label="from..." variant="outlined" />
        <TextField onChange={(e)=>setToValue(e.target.value)} className='bg-white rounded m-2' id="-basic" name="to" label="to..." variant="outlined" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      className='bg-white rounded mb-2' label="date" value={dateValue}
      onChange={(newValue) => setDateValue(newValue)}/>
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
    
    {rides.map((ride,index)=>(
    <Container key={index} className='rideList mt-3'>
     <Container className='d-flex justify-content-between mt-2 px-3'>
      <h5>{ride.from.split(', ').slice(0, 2).join(', ')}</h5>
      <h5>{ride.to.split(', ').slice(0, 2).join(', ')}</h5>
     </Container>

     <Container className='d-flex justify-content-center'>
      <div className='circle mt-1'></div>
      <hr  className='connectingLine'/>
      <div className='circle mt-1'></div>
     </Container>

     <Container className='hosterDetails d-flex justify-content-between mb-2'>
      <div><AiOutlineUser/>shoib</div>
      <h6>Date & time negotiable</h6>
      <h6>₹600</h6>
     </Container>
    </Container>
    ))}
    </>
  )
}

export default JoinRide

{/* <LocalizationProvider  className='' dateAdapter={AdapterDayjs}>
        <DemoContainer  components={['DatePicker']}><DatePicker className='bg-white rounded mb-2' label="date" /></DemoContainer>
        </LocalizationProvider> */}