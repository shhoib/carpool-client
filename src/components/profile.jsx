import { Container } from "react-bootstrap"
import './profile.css'
import {BiPlusCircle} from 'react-icons/bi'
import {AiFillEdit} from 'react-icons/ai'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {GiReceiveMoney} from 'react-icons/gi'


const Profile = () => {


  return (
    <>
    <Container className="d-flex flex-column align-items-center my-4">
      <h1>ABOUT YOU</h1>
      <hr className="horizontal-line mt-4"/>
    </Container>

    <Container className="d-flex mt- justify-content-around align-items-center">
        <h1 className="m-5">SHOIB</h1>
        <div className="user-profile-image" ></div>   
    </Container>

    <Container className="profile-and-rating d-flex flex-column my-3">

      <div className="add-profile-section p-1 d-flex justify-content-between">
       <div className="  d-flex align-items-center my-">
        <h2 className="mx-3"><BiPlusCircle/></h2>
        <h5>Add profile picture</h5>
       </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div className="add-profile-section  p-1 d-flex justify-content-between">
        <div className="d-flex align-items-center">
        <h2 className="mx-3"><AiFillEdit/></h2>
        <h5>Edit personal details</h5>
        </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div className="add-profile-section p-1 d-flex justify-content-between">
       <div className="  d-flex align-items-center my-">
        <h2 className="mx-3"><GiReceiveMoney/></h2>
        <h5>Payment and refund</h5>
       </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>
    </Container>

     <div className="d-flex justify-content-center">
       <hr className="line"/>
     </div>

    <Container className="profile-and-rating">
      <div className="rating-and-changePassword d-flex justify-content-between">
       <div>
        <h5>Ratings</h5>
       </div>
       <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div className="rating-and-changePassword d-flex justify-content-between">
        <div>
         <h5>Change Password</h5>
        </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>
    </Container>
    
    </>
  )
}

export default Profile