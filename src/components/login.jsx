import './loginPage.css'

const Login = () => {


  return (
    <>
      <div className=" d-flex justify-content-center align-items-center pt-5 p-3" >
        <h2><b>HOW DO YOU WANT TO LOGIN?</b></h2>
      </div>
      <div  className="howToLogin d-flex flex-column justify-content-center align-items-center mt-3">
      <div className='loginWith'>
       <h4>login with email</h4>
       </div>
      <hr/>

       <div className='d-flex dontHaveAccount'>
       <h5 >Dont you have an account </h5>
       <h5 className='signIn mx-2'>Sign in</h5>
       </div>
      </div>
    </> 
  )
}

export default Login