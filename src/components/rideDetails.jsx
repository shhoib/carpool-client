// import React from 'react'
import {Container} from 'react-bootstrap'
import './rideDetails.css'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {AiOutlineThunderbolt} from 'react-icons/ai'

const RideDetails = () => {
  return (
    <Container  className=' d-flex flex-column justify-content-center align-items-center'>
    <div className='p-4'>
        <h1>DD/MM/YYYY</h1>
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
            <h4 className='fromLocation'>taliparamba</h4>
            <h4 className='toLocation'>kannur</h4>
          </div>

    </div>
    </Container>

    <hr className='connectingLine m-3'/>

    <Container className='d-flex justify-content-around p-2'>
        <h5>Total price for 1 passenger</h5>
        <h4 className='price'>₹300.00</h4>
    </Container>

    <Container className='hosterSection d-flex justify-content-between p-4'>
     <div>
        <h3>NAME</h3>
        <h6>4.3 rating</h6>
     </div>
     <div className='d-flex align-items-center'>
        <div className='imageSection'></div>
        <h2 className=''><MdKeyboardArrowRight/></h2>
     </div>
    </Container>

    <Container className='chatWith d-flex justify-content-between p-3'>
        <h4>Chat with name</h4>
        <h2><MdKeyboardArrowRight/></h2>
    </Container>

    <Container className='carName p-3'>
        <h4>Car name</h4>
    </Container>

    <Container className='d-flex justify-content-center p-4'>
        <button className='bookButton d-flex align-items-center px-4 py-2'><AiOutlineThunderbolt/>
        <h6 className='px-1 pt-1'>Book</h6></button>
    </Container>
    </Container>
  )
}

export default RideDetails