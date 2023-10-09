import { Container } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import '../stylings/personalDetails.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import {Button} from 'react-bootstrap'
import axiosInstance from '../api/axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';




const EditPersonalDetails = () => {

  const userDetails = useSelector((state)=>state.userAuth);

  const navigate = useNavigate();

  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[phoneNumber,setPhoneNumber] = useState('')
  const[DOB,setDOB] = useState('')
  const[about,setAbout] = useState('')
 
  const handleEditDetails= async()=>{

    const updatedData = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      DOB: DOB,
      about: about,
      userID:userDetails.userID
    }
    try{
      const response = await axiosInstance.post('/EditPersonalDetails',updatedData)
      toast.success(response.data.message,{
                autoClose:1000,
                onClose:()=>{
                  navigate('/profile')
                }})
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer/>
       <Container className="personalDetails  justify-content-center">
        <Container className=" d-flex align-items-center justify-content-center p-4">
            <h2 style={{ textDecoration: 'underline' }}>Personal Details</h2>
        </Container>

        <Container className="d-flex flex-column align-items-center">

        <div className="userDetails-input-container p-2">
         <h6>username</h6>
         <input label='username' placeholder="username.." className="userDetails-input"
           onChange={(e)=>setName(e.target.value)} />
       </div>

        <div className="userDetails-input-container p-2">
        <h6>email</h6>
         <input label='email' placeholder="email..." className="userDetails-input"
           type="email" onChange={(e)=>setEmail(e.target.value)} />
       </div>

        <div className="userDetails-input-container p-2">
        <h6>phone number</h6>
         <input label='phoneNumber' placeholder="phone number" className="userDetails-input"
           type="number"  onChange={(e)=>setPhoneNumber(e.target.value)} />
       </div>

        <div className="userDetails-input-container p-2">
        <h6>date of birth</h6>
         <input label='username' className="userDetails-input"
           type='date' onChange={(e)=>setDOB(e.target.value)} />
       </div>

      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><h6> What would you like other members to know about you?</h6></Form.Label>
        <Form.Control onChange={(e)=>setAbout(e.target.value)} as="textarea" placeholder="try to write briefly" rows={3} />
      </Form.Group>
    </Form>
    <Button onClick={handleEditDetails}>Submit</Button>
     </Container>
     </Container>
    </>
  )
}

export default EditPersonalDetails