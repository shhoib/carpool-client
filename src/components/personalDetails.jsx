// import React from 'react'
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



const PersonalDetails = () => {
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
         <TextField id="input-with-sx" label="Name" variant="standard" />
        </Box>
        </Box>

      <Box
        component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
        <TextField id="standard-basic" defaultValue='hii' label="Date of birth" variant="standard" />
      </Box>

      <Box
        component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
        <TextField id="standard-basic" defaultValue='hii' label="Email" variant="standard" />
      </Box> 

      <Box
        component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off" >
        <TextField id="standard-basic" defaultValue='hii' label="Phone number" variant="standard" />
      </Box>

      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label><h6> What would you like other members to know about you?</h6></Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
     </Container>
     </Container>
    </>
  )
}

export default PersonalDetails