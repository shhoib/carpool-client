import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth,provider} from '../api/firebase'
import axiosInstance from '../api/axios';
import axios from 'axios';

const Signup = () => {

  const navigate = useNavigate()

  const handleNavigate=()=>{
    navigate('/login')
  }

  // const auth = getAuth();

  const handleSignupWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const user = data.user;
      console.log(user.email);
  
      try {
        const response = await axios.post('http://users/signup', user);
        console.log(response.data);
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
        <h2><b>HOW DO YOU WANT TO SIGNUP ?</b></h2>
      </div>
      <div  className="howToLogin d-flex flex-column justify-content-center  mt-3">
      <div className='loginWith d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='loginWith2' onClick={handleSignupWithGoogle}>Signup with Google</h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      <hr className='horizontal-line'/>

       <div className='dontHaveAccount d-flex align-items-center justify-content-between rounded-4'>
       <h5 onClick={()=>handleNavigate()} className='dontHaveAccount2'>Already a member <span  className='signIn'>Login</span></h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      </div>
       <p className='mt-1'>By signing up, you accept our T&Cs and Privacy Policy.</p>
    </>
  )
}

export default Signup