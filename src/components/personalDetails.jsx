import { Container } from "react-bootstrap"
import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Form from 'react-bootstrap/Form';
import './personalDetails.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import {Button} from 'react-bootstrap'
import axiosInstance from '../api/axios'



const EditPersonalDetails = () => {

  const userDetails = useSelector((state)=>state.userAuth);

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
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
       <Container className="personalDetails  justify-content-center">
        <Container className=" d-flex align-items-center justify-content-center p-4">
            <h2 style={{ textDecoration: 'underline' }}>Personal Details</h2>
        </Container>

        <Container className="d-flex flex-column align-items-center">
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
         <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
         <TextField onChange={(e)=>setName(e.target.value)} id="input-with-sx" label='username' defaultValue={userDetails.name} variant="standard" />
        </Box>
        </Box>

      <Box
        component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
        <TextField  onChange={(e)=>setEmail(e.target.value)} id="standard-basic" defaultValue={userDetails.email} label="Email" variant="standard" />
      </Box> 

      <Box
        component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
        <TextField  onChange={(e)=>setPhoneNumber(e.target.value)} id="standard-basic" defaultValue={userDetails.phoneNumber} label="Phone number" variant="standard" />
      </Box>

      <Box
        component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
        <TextField  onChange={(e)=>setDOB(e.target.value)} id="standard-basic" type='date' defaultValue={userDetails.DOB}  variant="standard" />
      </Box>

      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><h6> What would you like other members to know about you?</h6></Form.Label>
        <Form.Control onChange={(e)=>setAbout(e.target.value)} as="textarea" rows={3} />
      </Form.Group>
    </Form>
    <Button onClick={handleEditDetails}>Submit</Button>
     </Container>
     </Container>
    </>
  )
}

export default EditPersonalDetails