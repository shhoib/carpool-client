import { useState, useRef } from 'react';
import {Container} from 'react-bootstrap'
import axiosInstance from '../api/axios';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import './changePassword.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';




const ChangePassword = () => {

    const[oldPassword,setOldPassword] = useState('')
    const[newPassword,setNewPassword] = useState('')
    const[confirmedPassword,setConfirmedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [currentPasswordMismatch, setCurrentPasswordMismatch] = useState(false);


    const navigate = useNavigate();
    const inputRef = useRef(null);


    const USER = useSelector((state)=>state.userAuth);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // const handleDocumentClick = (e) => {
    //   const isInput = inputRef.current.CFpassword && inputRef.current.Npassword.contains(e.target);
    //   if (!isInput) {
    //     setPasswordMismatch(false);
    //     setCurrentPasswordMismatch(false);
    //   }
    // };
  
    // useEffect(() => {
    //   document.addEventListener('click', handleDocumentClick);
    //   return () => {
    //     document.removeEventListener('click', handleDocumentClick);
    //   };
    // }, []);

   const  handleChangePassword = async()=>{

    if(newPassword!==confirmedPassword){
      setPasswordMismatch(true);
    }else{   
      setPasswordMismatch(false);

      const editedPassword = {
            oldPassword:oldPassword,
            newPassword:newPassword,
            userID : USER.userID
        }
        try{
            const response = await axiosInstance.post('/editPassword',editedPassword);
            if(response.status==200){
              setCurrentPasswordMismatch(false)
              toast.success(response.data.message,{
                autoClose:1000,
                onClose:()=>{
                  navigate('/profile')
                }})
            }else{
              setCurrentPasswordMismatch(true)
            }
          }catch(error){
            console.log(error);
          }
        }}

  return (
    <>
     <ToastContainer/>
    <Container ref={inputRef} className='p-3 d-flex flex-column align-items-center'>

    <h2 className='p-3'>Change your Password here!!</h2>    

      <div className="password-input-container p-2">
      <input type={showPassword ? 'text' : 'password'} className={currentPasswordMismatch ? 'error-input' : 'password-input'}
       placeholder="Current password" onChange={(e) => setOldPassword(e.target.value)} name='Cpassword'/>
      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="password-icon p-2" onClick={togglePasswordVisibility}/>
     </div>
      {currentPasswordMismatch ? <span className='mismatcing'>*Not Your current password</span>:null}

      <div className="password-input-container p-2">
      <input type={showPassword ? 'text' : 'password'} className={passwordMismatch ? 'error-input' : 'password-input'}
       placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} name='Npassword'/>
      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="password-icon p-2" onClick={togglePasswordVisibility}/>
     </div>

      <div className="password-input-container p-2">
      <input type={showPassword ? 'text' : 'password'} className={passwordMismatch ? 'error-input' : 'password-input'}
       placeholder="Confirm password" onChange={(e) => setConfirmedPassword(e.target.value)} name='CFpassword'/>
      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="password-icon p-2" onClick={togglePasswordVisibility}/>
     </div>
     {passwordMismatch ? <span className='mismatcing'>*password are not matching</span>:null}

      <button onClick={()=>handleChangePassword()} className='updatePasswordButton py-2 px-3 m-3'>Save new password</button>
      
    </Container>
    </>
  )
}

export default ChangePassword