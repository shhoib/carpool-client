import { Container } from "react-bootstrap"
import '../stylings/profile.css'
import {BiPlusCircle} from 'react-icons/bi'
import {AiFillEdit} from 'react-icons/ai'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {GiReceiveMoney} from 'react-icons/gi'
import {FcOk} from 'react-icons/fc'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import { updateProfile,updateMobileNumber } from '../redux/userSlice';
import { MDBBtn,MDBModal,MDBModalDialog, MDBModalContent, MDBModalHeader,
   MDBModalTitle, MDBModalBody, MDBModalFooter,MDBInput} from 'mdb-react-ui-kit';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from '../api/firebase'
import axiosInstance from "../api/axios"
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Profile = () => {

  const userDetails = useSelector((state)=>state.userAuth)
  // console.log(userDetails);
  const userID = userDetails.userID;

  const dispatch = useDispatch();


  const [profileImage, setProfileImage] = useState(null);
  const [centredModal, setCentredModal] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [number, setNumber] = useState('');
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = React.useState(false);


  const toggleShow = () => setBasicModal(!basicModal);
  const showModal = () => setCentredModal(!centredModal);

  const Navigate = useNavigate();

  const handlePersonalDetailsNavigate=()=>{
    Navigate(`/EditPersonalDetails`)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleChangeProfile = (e)=>{
    setProfileImage(e.target.files[0])
  }

  const handleUploadImage = async()=>{
    const data = {
     file:profileImage
    }
    const formDataToSend = new FormData();

    for (const key in data){
      if(key === 'file'){
        formDataToSend.append('profilePic',data.file)
      }
    }

    try {
      const response = await axios.post(`http://localhost:3000/uploadImage?id=${userID}`,formDataToSend,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      console.log(userDetails);
      dispatch(updateProfile({ profile: response.data }));
      toggleShow();
    } catch (error) {
      console.log(error);
    }
  }

  const getotp = async()=>{
    setError('')
     if(number === '' || number === undefined) return setError('Please enter a valid number')
     try{
        let recaptchaVerifier =  new RecaptchaVerifier(auth,'recaptcha', {} );
        recaptchaVerifier.render()
        let confirmation = await signInWithPhoneNumber(auth,number,recaptchaVerifier)
        setUser(confirmation) 
        setFlag(true)     
    }catch(error){
      console.log(error);
    }
  }

  const verifyOtp = async()=>{
    if(otp === null || otp === undefined ) {
      return setError('please enter a valid otp')
    }
    try {
     await user.confirm(otp)
     try{
      const response = await axiosInstance.get(`/updateNumber?id=${userID}`)
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
    dispatch(updateMobileNumber({phoneNumberVerified:true}))
    showModal()
      //  <Alert variant='success' >Mobile number updated successfully</Alert> 
    } catch (error) {
      console.log(error);
    }
  }
  console.log(error);



  return (
    <>
    <Container className="d-flex flex-column align-items-center my-4">
      <h1 className="about-you">ABOUT YOU</h1>
      <hr className="hr hr-blurry w-100 mt-3" />
    </Container>

    <Container className="d-flex mt- justify-content-around align-items-center">
        <h1 className="nameIN-profile m-5">{userDetails.name}</h1>
        <div className="user-profile-image" style={{ backgroundImage:`url(${userDetails.profile || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'})`,backgroundSize: 'cover'}}></div>
    </Container>

    <Container className="profile-and-rating d-flex flex-column my-3">

      <div onClick={toggleShow} className="add-profile-section p-1 d-flex justify-content-between">
       <div className="  d-flex align-items-center my-">
        <h2 className="mx-3"><BiPlusCircle/></h2>
        <h5 >Add profile picture</h5>
       </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div onClick={handlePersonalDetailsNavigate} className="add-profile-section  p-1 d-flex justify-content-between">
        <div  className="d-flex align-items-center">
        <h2 className="mx-3"><AiFillEdit/></h2>
        <h5>Edit personal details</h5>
        </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div onClick={()=>Navigate('/PaymentReceived')} className="add-profile-section p-1 d-flex justify-content-between">
       <div className="  d-flex align-items-center my-">
        <h2 className="mx-3"><GiReceiveMoney/></h2>
        <h5>Payments</h5>
       </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>
    </Container>

     <div className="d-flex justify-content-center">
       <hr className="line"/>
     </div>

    <Container className="profile-and-rating">
      <div onClick={()=>Navigate('/ratings')} className="rating-and-changePassword d-flex justify-content-between">
       <div>
        <h5>Ratings</h5>
       </div>
       <h4><MdKeyboardArrowRight/></h4>
      </div>

        {userDetails.phoneNumberVerified ?
      <div onClick={handleClick} className="rating-and-changePassword d-flex justify-content-between">
       <div>
        <h5><FcOk/> Mobile Number verified </h5>
       </div>
       <h4><MdKeyboardArrowRight/></h4>
      </div>
      :
      <div onClick={showModal} className="rating-and-changePassword d-flex justify-content-between">
       <div>
        <h5>Validate mobile number </h5>
       </div>
       <h4><MdKeyboardArrowRight/></h4>
      </div>
        }

      <div className="rating-and-changePassword d-flex justify-content-between">
       <div>
        <h5>Verify your email</h5>
       </div>
       <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div onClick={()=>Navigate('/ChangePassword')} className="rating-and-changePassword d-flex justify-content-between">
        <div>
         <h5>Change Password</h5>
        </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="header">
              <MDBModalTitle > </MDBModalTitle>
              <MDBBtn className='btn-close' color='white' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
            <h5>choose a file to upload</h5>
          <input type="file" onChange={(e)=>handleChangeProfile(e)} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>CLOSE</MDBBtn>
              <MDBBtn onClick={handleUploadImage}>UPLOAD</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader style={{backgroundColor:'white'}}>          
            </MDBModalHeader>

            <MDBModalBody>
            <div >
            {error && <Alert variant='danger'>{error}</Alert>}
            <PhoneInput
           placeholder="Enter phone number" defaultCountry="IN" value={number} onChange={setNumber}/>
           <MDBBtn className="m-2" onClick={getotp}>Send OTP</MDBBtn>
           </div>

            <div id="recaptcha"></div>

            {flag &&
            <div >
           <MDBInput className="m-2" label='Enter OTP' id='form1' type='number' value={otp} onChange={(e)=>setOtp(e.target.value)}/>
           <MDBBtn onClick={verifyOtp}>verify OTP</MDBBtn>
           </div>
            }
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={showModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {open ? 
        <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          number already verified
        </Alert>
      </Snackbar>
      
       </Stack>
        : null
        }
    </Container>
    
    </>  
  )
}

export default Profile