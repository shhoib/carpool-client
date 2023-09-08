import { useState } from 'react';
import {Container,Button} from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axiosInstance from '../api/axios';
import { useSelector } from 'react-redux';



const ChangePassword = () => {

    const[oldPassword,setOldPassword] = useState('')
    const[newPassword,setNewPassword] = useState('')
    const[confirmedPassword,setConfirmedPassword] = useState('');

    const USER = useSelector((state)=>state.userAuth);

   const  handleChangePassword = async()=>{

        const editedPassword = {
            oldPassword:oldPassword,
            newPassword:newPassword,
            userID : USER.userID
        }
        try{
            const response = await axiosInstance.post('/editPassword',editedPassword);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }

  return (
    <>
    <Container className='p-3 d-flex flex-column align-items-center' style={{}}>

    <h2 className='p-3' style={{ textDecoration: 'underline' }}>Change your Password</h2>

    <FloatingLabel
        controlId="floatingTextarea"
        label="Current Password"
        className="mb-3">
        <Form.Control onChange={(e)=>setOldPassword(e.target.value)} as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>

    <FloatingLabel
        controlId="floatingTextarea"
        label="New Password"
        className="mb-3">
        <Form.Control onChange={(e)=>setNewPassword(e.target.value)} as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>

    <FloatingLabel
        controlId="floatingTextarea"
        label="Confirm Password"
        className="mb-3">
        <Form.Control onChange={(e)=>setConfirmedPassword(e.target.value)} as="textarea" placeholder="Leave a comment hee" />
      </FloatingLabel>

      <Button onClick={()=>handleChangePassword()}>Save</Button>
      
    </Container>
    </>
  )
}

export default ChangePassword

