import { useNavigate } from 'react-router-dom';
import './loginPage.css'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth,provider} from '../api/firebase'
import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
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
import {Button} from 'react-bootstrap';
import axiosInstance from '../api/axios'
import {useDispatch} from 'react-redux';
import { userLogin } from '../redux/userSlice';




const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNavigate=()=>{
    navigate('/signup')
  }

  const handleLogin = async() => {
    try {
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const user = data.user;
      console.log(credential);
      // console.log(user);
      try{
        const response = await axiosInstance.post('/login/googleAuth',user);
        const token = response.data.token;
        // const profile = data.user.photoURL;

        if(response.status==201){
          dispatch(userLogin({email:user.email,username:user.displayName,token:token}))
           toast.success(response.data.message,{
          autoClose:1500,
          onClose:()=>{
            navigate('/')
          }})
        }else if(response.status==209){
          toast.error(response.data.message,{
            autoClose:1500,
            onClose:()=>{
              navigate('/signup')
            }})
        }
      }catch(error){
        // dispatch(userLogin({email:user.email,username:user.displayName,token:token}))
        // toast.warn("please signup first! redirecting to signup",{
        //   autoClose:2000,
        //   onClose:()=>{
        //     navigate("/signup")
        // }})
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleLoginWithEmail = async () => {
    try {
        const body = { email, password };
        const response = await axiosInstance.post('/login', body);
        const username = response.data.username;
        const token = response.data.token;
        if (response.status == 200) {
          dispatch(userLogin({email,username,token}))
          toast.success(response.data.message, {
                autoClose: 1500,
                onClose: () => {
                    navigate('/');
                }, 
            }); 
        } else if (response.status==209) {
            toast.warn(response.data.message, {
                autoClose: 2000,
            });
        } else if (response.status==204) {
            toast.error("please register first ,Redirecting to signup", {
                autoClose: 2000,
                onClose: () => {
                    navigate('/signup');
                }, 
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};


  return (
    <>
      <ToastContainer/>
      <div className="d-flex justify-content-center align-items-center pt-5 p-3" >
        <h1><b>HOW DO YOU WANT TO LOGIN?</b></h1>
      </div>

      <div className='d-flex flex-column align-items-center p-1'>
      <h3 className='p-2'>Login with email and password</h3>
      
      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' },
          }} noValidate autoComplete="off" >
      <TextField onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" label="email..." variant="outlined" />
     </Box>

     <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput onChange={(e)=>setPassword(e.target.value)}
            id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility"
                  onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password" />
        </FormControl>
            <h6 className='forgotText p-2'>forgot password?</h6>
            <Button className='submitButton' onClick={()=>handleLoginWithEmail()}>Submit</Button>
      </div>

      <div  className="howToLogin d-flex flex-column justify-content-center  mt-3">
      <div onClick={handleLogin} className='loginWith d-flex align-items-center justify-content-between rounded-4'>
      <h5 className='loginWith2'><FcGoogle/><span className='px-2'>Continue with Google</span></h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      <hr className='horizontal-line'/>

       <div onClick={()=>handleNavigate()} className='dontHaveAccount d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='dontHaveAccount2'>Dont you have an account <span className='signIn'>Signin</span></h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      </div>
    </> 
  )
}

export default Login