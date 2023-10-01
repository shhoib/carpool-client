import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth,provider} from '../api/firebase'
import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Button} from 'react-bootstrap'
import axiosInstance from '../api/axios'
import {useDispatch} from 'react-redux';
import { userLogin } from '../redux/userSlice';
import { updateProfile } from '../redux/userSlice';
import {useFormik} from 'formik'
import { basicSchema } from '../validation/signupValidation';


const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async()=>{
    try {
      const signupDetails = { email:values.email,password:values.password,username:values.username,phoneNumber:values.mobileNumber}
      const response = await axiosInstance.post("/signup",signupDetails)
      const token = response.data.token;
      const userID = response.data.userID;
      const profileURL = response?.data?.existingUser?.profileURL;

      if(response.status==201){

         dispatch(userLogin({email:values.email,username:values.username,token,userID,phoneNumber:values.mobileNumber,
          emailVerified:false,phoneNumberVerified:false}))

          dispatch(updateProfile({profile:profileURL}))
          
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:500,
          onClose: () => {
            navigate('/');
          }
        })}else{
          dispatch(userLogin({email:values.email,username:values.username,token,userID,emailVerified:false,phoneNumberVerified:false,
            phoneNumber:values.mobileNumber}))
            dispatch(updateProfile({profile:profileURL}))
         toast.warn('user already registered!  logging in', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          onClose: () => {
            navigate('/');
          }
        });
      }
    } catch (error) {
      console.log("Error sending POST request:", error); 
    }
  }

  const navigate = useNavigate()
  const {values,errors,handleChange,handleBlur,handleSubmit,touched} = useFormik({
    initialValues:{
      email:"", 
      username:'',
      mobileNumber:'',
      password:'',
      confirmPassword:'',
    },
    validationSchema : basicSchema,
    onSubmit,
  });

 
  
  const handleNavigate=()=>{
    navigate('/login')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleSignupWithGoogle = async () => {
    try {                                                                             
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const user = data.user;
      console.log(credential);
      
      try {
        const response = await axiosInstance.post("/signup/googleAuth",user)
        const token = response.data.token
        const userID = response.data.userID
        const profile = user.photoURL;
        if(response.status==201){
          dispatch(userLogin({email:user.email,username:user.displayName,
            token:token,profile:profile,emailVerified:true,phoneNumberVerified:false,userID:userID}))

          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:500,
            onClose: () => {
              navigate('/');
            }
          })}else{
            dispatch(userLogin({email:user.email,username:user.displayName,token:token,profile:profile,
              userID:userID,emailVerified:true,phoneNumberVerified:false}))
           toast.warn(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            onClose: () => {
              navigate('/');
            }});
        }
      } catch (error) {
        console.log("Error sending POST request:", error); 
      }
    } catch (error) {   
      console.log(error);
    }
  };
  
 
  
  return (
    <>
      <ToastContainer />
     
      <div className=" d-flex justify-content-center align-items-center pt-5 p-3" >
        <h1><b>HOW DO YOU WANT TO SIGNUP ?</b></h1>
      </div>

      <div className='d-flex flex-column align-items-center p-1'>
      <h3 className='p-2'>SignUp with email and password</h3>
      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' },
          }} noValidate autoComplete="off" >
      <TextField  value={values.username} onChange={handleChange} onBlur={handleBlur}
       name='username' id="outlined-basic" label="username..." variant="outlined" />
     </Box>

      <Box  component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' },
          }} noValidate autoComplete="off" >
      <TextField className={errors.email && touched.email? 'input-error' : ''}
       value={values.email} onChange={handleChange} onBlur={handleBlur}
      name='email' label="email..." variant="outlined" />
      {errors.email && touched.email && <p className='error'>*{errors.email}</p>}
     </Box>


      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' },
          }} noValidate autoComplete="off" >
      <TextField value={values.mobileNumber} onChange={handleChange} onBlur={handleBlur}
       name='mobileNumber'  label="Mobile number" variant="outlined" />
          {errors.mobileNumber && touched.mobileNumber && <p className='error'>*{errors.mobileNumber}</p>}
     </Box>
    
     <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} 
            id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility"
                  onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password" />
       {errors.password && touched.password && <p className='error'>*{errors.password}</p>}
       </FormControl>

     <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">confirm Password</InputLabel>
          <OutlinedInput name='confirmPassword' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} 
            id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility"
                  onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password" />
       {errors.confirmPassword && touched.confirmPassword && <p className='error'>*{errors.confirmPassword}</p>}
       </FormControl>


            <Button className='submitButton' onClick={handleSubmit}>Submit</Button>
      </div>

      <div  className="howToLogin d-flex flex-column justify-content-center  mt-3">
      <div onClick={handleSignupWithGoogle} className='loginWith d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='loginWith2'><FcGoogle/><span className='px-2'>Continue with Google</span></h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      <hr className='horizontal-line'/>
       <div onClick={()=>handleNavigate()} className='dontHaveAccount d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='dontHaveAccount2'>Already a member <span className='signIn'>Login</span></h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      </div>
       <p className='mt-1'>By signing up, you accept our T&Cs and Privacy Policy.</p>
    </>
  )
}

export default Signup