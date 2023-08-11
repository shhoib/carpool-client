import { Button,Container,Image } from 'react-bootstrap';
import './joinRide.css'
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Row,Col} from 'react-bootstrap'
import {AiOutlineUser,AiOutlineUnorderedList} from 'react-icons/ai'
import {MdOutlineFlashOn} from 'react-icons/md'

const JoinRide = () => {
  
  return (
    <> 
    <Row className='d-flex align-items-center justify-content-center w-100'>

     <Col lg={4} className="d-flex justify-content-center">
      <Image className='bgIMG' src='https://images.template.net/83682/free-simple-car-illustration-3v7wz.jpg'/>
    </Col>

    <Col lg={8} className='inputBoxWithImage'>
      <h1 className='mainTXT text-center'>PICK YOUR RIDE AT LOW PRICE!!</h1> 

      <div className='wholeInputBoxes d-flex justify-content-center'>
        <TextField className='inputBoxes bg-white rounded m-2' id="-basic" label="from..." variant="outlined" />
        <TextField className='bg-white rounded m-2' id="-basic" label="to..." variant="outlined" />
        <LocalizationProvider className='' dateAdapter={AdapterDayjs}>
        <DemoContainer  components={['DatePicker']}><DatePicker className='bg-white rounded mb-2' label="date" /></DemoContainer>
        </LocalizationProvider>
        <Button className='m-2'>Submit</Button>
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
    
    <Container className='rideList mt-3'>
     <Container className='d-flex justify-content-between mt-2 px-3'>
      <h5>Kannur</h5>
      <h5>Bangalore</h5>
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
    <Container className='rideList mt-3'>
     <Container className='d-flex justify-content-between mt-2 px-3'>
      <h5>Kannur</h5>
      <h5>Bangalore</h5>
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

    </>
  )
}

export default JoinRide