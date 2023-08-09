import {Col,Row} from 'react-bootstrap'
import { Image, Form, Button } from 'react-bootstrap';
import './hostRide.css';
import { GiReceiveMoney } from 'react-icons/gi';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { TiTickOutline } from 'react-icons/ti';
import { AiOutlineUserAdd,AiOutlineCar } from 'react-icons/ai';


const HostRide = () => {


  return (
    <>
    <Row className='d-flex justify-content-center align-items-start w-100'>
    <Col md={5} xs={10} className='hostImg d-flex justify-content-center align-items-center m-3 position-relative'>
      <Form className='overlay-form'>
        <Form.Label>From</Form.Label>
        <Form.Control className='inputBox' type='text' />
        <Form.Label>To</Form.Label>
        <Form.Control className='inputBox' type='text' />
        <Form.Label>Date</Form.Label>
        <Form.Control className='inputBox' type='date' />
        <Form.Label>Passengers</Form.Label>
        <Form.Control className='inputBox' type='number' />
        <Button className='mt-2' type='submit'>Submit</Button>
      </Form>
      <Image src='https://res.cloudinary.com/dzhfutnjh/image/upload/v1691386474/pexels-photo-876228_rfvfyy.jpg' className='hostImg2 rounded-3 w-100' />
    </Col>

    <Col md={6} xs={11} className='d-flex flex-column align-items-center'>
     <div>
        <h1 className='text-center mt-5'>CARPOOLING, WHERE SAVING MEETS SOCIALIZING</h1>
     </div>
     <Row className='d-flex align-items-'>
     <Col md={6} xs={11} className='d-flex flex-column align-items-center '>
        <h2 className='mt-4'><VscWorkspaceTrusted/></h2>
        <h5 className='text-center'>Join a trustworthy community</h5>
        <h className='text-center'>We know each of our members: both drivers and passengers. We verify ratings, profiles and IDs, so you know exactly who you’re travelling with.</h>
     </Col>
     <Col md={6} xs={11} className='d-flex flex-column align-items-center'>
        <h2 className='mt-4'><GiReceiveMoney/></h2>
        <h5>Save on travel costs</h5>
        <h className='text-center'>Share your ride with passengers on your way, and save every time you travel by car. Sign up as a driver to start saving on travel costs.</h>
     </Col>
     </Row>

     <hr className='horizontal-line my-5'/>
     
     <Col md={12} >
      <h2 className='text-center'>Publish your ride in just minutes</h2>

      <div className='d-flex '>
      <h2 className='mt-4'><AiOutlineUserAdd/></h2>
      <div className='mt-4 mx-3'>
      <h5>Create a Coride account</h5>
      <h>Add your profile picture, a few words about you and your phone number to increase trust between members.</h>
      </div>
      </div>
      
      <div className='d-flex'>
      <h2 className='mt-4'><AiOutlineCar/></h2>
      <div className='mt-4 mx-2'>
      <h5 >Publish your ride</h5>
      <h>Indicate departure and arrival points, the date of the ride and check our recommended price to increase your chances of getting your first passengers and ratings.</h>
      </div>
      </div>

      <div className='d-flex'>
      <h2 className='mt-4'><TiTickOutline/></h2>
      <div className='mt-4 mx-3'>
      <h5 >Accept booking requests</h5>
      <h>Review passenger profiles and accept their requests to ride with you. That’s how easy it is to start saving on travel costs!</h>
      </div>
      </div>

     </Col>
    </Col>
    </Row>
    </>
  );
};

export default HostRide;
