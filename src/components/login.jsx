import './loginPage.css'
import { MdKeyboardArrowRight } from 'react-icons/md';


const Login = () => {


  return (
    <>
      <div className=" d-flex justify-content-center align-items-center pt-5 p-3" >
        <h2><b>HOW DO YOU WANT TO LOGIN?</b></h2>
      </div>
      <div  className="howToLogin d-flex flex-column justify-content-center  mt-3">
      <div className='loginWith d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='loginWith2'>login with email</h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      <hr className='horizontal-line'/>

       <div className='dontHaveAccount d-flex align-items-center justify-content-between rounded-4'>
       <h5 className='dontHaveAccount2'>Dont you have an account <span className='signIn'>Signin</span></h5>
       <p className='arrow'><MdKeyboardArrowRight/></p>
       </div>
      </div>
    </> 
  )
}

export default Login