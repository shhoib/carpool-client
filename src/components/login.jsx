import { useNavigate } from 'react-router-dom';
import './loginPage.css'
import { MdKeyboardArrowRight } from 'react-icons/md';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth,provider} from '../api/firebase'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';



const Login = () => {

  const navigate = useNavigate();

  const handleNavigate=()=>{
    navigate('/signup')
  }

  const handleLogin = async() => {
    try {
      const data = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(data);
      const user = data.user;
      // console.log(credential);
      try{
        const response = await axios.post('http://localhost:3000/login',user)
        if(response.status==200){
         return  toast.success(response.data.message,{
          autoClose:1500,
          onclose:()=>{
            navigate('/')
          }
         })}
        // }else{
        //   toast.warn(response.message,{
        //     autoClose:2000,
        //     onClose:navigate('/signup')
        //     })
        // }
      }catch(error){
        toast.warn("please signup first! redirecting to signup",{
          autoClose:2000,
          onClose:()=>{
            navigate("/signup")
        }})
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message);
    }
  }


  return (
    <>
      <div className=" d-flex justify-content-center align-items-center pt-5 p-3" >
      <ToastContainer/>
        <h2><b>HOW DO YOU WANT TO LOGIN?</b></h2>
      </div>
      <div  className="howToLogin d-flex flex-column justify-content-center  mt-3">
      <div onClick={handleLogin} className='loginWith d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='loginWith2'>login with email</h5>
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