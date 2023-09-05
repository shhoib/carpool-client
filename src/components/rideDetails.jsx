// import React from 'react'
import {Container} from 'react-bootstrap'
import './rideDetails.css'

const RideDetails = () => {
  return (
    <div className='d-flex'>
    <div>
        <h1>DD/MM/YYYY</h1>
    </div>
    <Container className='d-flex'>
        <div>
            <h6>06:00 PM</h6>
            <h6>06:00 PM</h6>
        </div>

        <Container>
            <div className='circleInRidDetails m-0'></div>
            <div className='verticleLine'></div>
            <div className='circleInRidDetails'></div>
        </Container>

        <Container>
            <div>taliparamba</div>
            <div>kannur</div>
        </Container>

    </Container>
    </div>
  )
}

export default RideDetails