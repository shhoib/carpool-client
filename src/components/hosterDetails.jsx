// import React from 'react'
import { Container } from "react-bootstrap"
import './hosterDetails.css' 
import {BsChatRightDots,BsCarFront} from 'react-icons/bs'

const HosterDetails = () => {
  return (
    <>
    <Container className="hosterDetails d-flex justify-content-between align-items-center pt-5">
      <div>
        <h2>NAME</h2>
        <h6>20y/o</h6>
       </div>
       <div className="hosterProfile"></div>
    </Container>

    <hr className="horizontal-line my-5"/>

    <Container>
        <h4>About NAME</h4>
        <h6><BsChatRightDots/>  I'm chatty when I feel comfortable</h6>
        <h6><BsCarFront/> 2 rides published</h6>
    </Container>

    <hr className="horizontal-line my-5"/>

    <Container>
    <h5>Report this Member</h5>
    </Container>
    </>
  )
}

export default HosterDetails