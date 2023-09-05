// import React from 'react'
import {Container} from 'react-bootstrap'
import './rideDetails.css'

const RideDetails = () => {
  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>
    <div>
        <h1>DD/MM/YYYY</h1>
    </div>
    <div className='d-flex align-items-center justify-content-center'>
        <div className=''>
            <h6 className=''>FROM</h6>
            <h6 className=''>TO</h6>
        </div>

        <div className='m-0 p-0 d-flex'>
          <div>
            <div className='circleInRidDetails m-0'></div>
            <div className='verticleLine'></div>
            <div className='circleInRidDetails'></div>
          </div>
          
          <div className='d-flex flex-column justify-content-between'>
            <h4>taliparamba</h4>
            <h4>kannur</h4>
          </div>
        </div>

    </div>
    </Container>
  )
}

export default RideDetails