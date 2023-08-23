import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth,provider} from '../api/firebase'
// import axiosInstance from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {

  const navigate = useNavigate()

  const handleNavigate=()=>{
    navigate('/login')
  }

  
  const handleSignupWithGoogle = async () => {
    try {                                                                             
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const user = data.user;
        
      try {
        const response = await axios.post("http://localhost:3000/signup",user)
        if(response.status==201){
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose:500,
            onClose: () => {
              navigate('/');
            }
          })}else{
           toast.warn('user already registered!  logging in', {
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
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, email, credential, errorMessage);
    }
  };
  
  


  return (
    <>
    <div className=" d-flex justify-content-center align-items-center pt-5 p-3" >
      <ToastContainer />
        <h2><b>HOW DO YOU WANT TO SIGNUP ?</b></h2>
      </div>
      
      <div  className="howToLogin d-flex flex-column justify-content-center  mt-3">
      <div onClick={handleSignupWithGoogle} className='loginWith d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='loginWith2'>Signup with Google</h5>
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