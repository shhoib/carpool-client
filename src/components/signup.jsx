import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import './loginPage.css'


const Signup = () => {

  const navigate = useNavigate()

  const handleNavigate=()=>{
    navigate('/Signup')
  }


  return (
    <>
    <div className=" d-flex justify-content-center align-items-center pt-5 p-3" >
        <h2><b>HOW DO YOU WANT TO SIGNUP ?</b></h2>
      </div>
      <div  className="howToLogin d-flex flex-column justify-content-center  mt-3">
      <div className='loginWith d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='loginWith2'>Signup with email</h5>
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