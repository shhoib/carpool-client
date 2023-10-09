// import React from 'react'
import { Container } from "react-bootstrap"
 import '../stylings/hosterDetails.css'
import {BsChatRightDots,BsCarFront} from 'react-icons/bs'
import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import axiosInstance from "../api/axios"

const HosterDetails = () => {

   const {id} = useParams();

   const [hoster, setHoster] = useState({})

   useEffect(()=>{
    const fetchHoster = async ()=>{
      try{
        const response = await axiosInstance.get(`/hosterDetails/${id}`)
        // console.log(response.data.hoster);
        setHoster(response.data.hoster)
      }catch(error){
        console.log(error);
      }
    }
     fetchHoster();
    },[])

  return (
    <>
    <Container className="hosterDetails d-flex justify-content-between align-items-center pt-5">
      <div>
        <h2>{hoster.name}</h2>
        <h6 className="preGivenDetails py-1">20y/o</h6>
       </div>
       <div className="hosterProfile"  style={{ backgroundImage:`url(${hoster.profileURL || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}}></div>
    </Container>

    <hr className="Line my-3"/>

    <Container className="hosterDetails">
      <h5 className="mobileNumber py-2">Confirmed Mobile Number</h5>
    </Container>

    <hr className="Line my-3"/>

    <Container className="hosterDetails">
        <h4>{`About ${hoster.name}`}</h4>
        <h6 className="preGivenDetails py-1 pt-3"><BsChatRightDots/>  I'm chatty when I feel comfortable</h6>
        <h6 className="preGivenDetails py-1"><BsCarFront/> 2 rides published</h6>
    </Container>

    <hr className="Line my-3"/>

    <Container className="hosterDetails">
    <h6 className="reportSection">Report this Member</h6>
    </Container>
    </>
  )
}

export default HosterDetails