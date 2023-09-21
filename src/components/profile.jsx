import { Container,Button } from "react-bootstrap"
import './profile.css'
import {BiPlusCircle} from 'react-icons/bi'
import {AiFillEdit} from 'react-icons/ai'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {GiReceiveMoney} from 'react-icons/gi'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'


const Profile = () => {

  const userDetails = useSelector((state)=>state.userAuth)

  const [show, setShow] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [responseImageURL, setResponseImageURL] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Navigate = useNavigate();

  const handlePersonalDetailsNavigate=()=>{
    Navigate(`/EditPersonalDetails`)
  }

  const handleChangeProfile = (e)=>{
    setProfileImage(e.target.files[0])
  }
  // console.log(profilePic);

  const handleUploadImage = async()=>{
    const data = {
     file:profileImage
    }
    const formDataToSend = new FormData();

    for (const key in data){
      if(key === 'file'){
        formDataToSend.append('profilePic',data.file)
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/uploadImage',formDataToSend,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      setResponseImageURL(response.data)
      console.log(response);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Container className="d-flex flex-column align-items-center my-4">
      <h1>ABOUT YOU</h1>
      <hr className="horizontal-line mt-4"/>
    </Container>

    <Container className="d-flex mt- justify-content-around align-items-center">
        <h1 className="m-5">{userDetails.name}</h1>
        <div className="user-profile-image" style={{backgroundImage: `url(${responseImageURL})`}}></div>
    </Container>

    <Container className="profile-and-rating d-flex flex-column my-3">

      <div onClick={handleShow} className="add-profile-section p-1 d-flex justify-content-between">
       <div className="  d-flex align-items-center my-">
        <h2 className="mx-3"><BiPlusCircle/></h2>
        <h5>Add profile picture</h5>
       </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div onClick={handlePersonalDetailsNavigate} className="add-profile-section  p-1 d-flex justify-content-between">
        <div  className="d-flex align-items-center">
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
        <h5>Verify your email</h5>
       </div>
       <h4><MdKeyboardArrowRight/></h4>
      </div>

      <div onClick={()=>Navigate('/ChangePassword')} className="rating-and-changePassword d-flex justify-content-between">
        <div>
         <h5>Change Password</h5>
        </div>
        <h4><MdKeyboardArrowRight/></h4>
      </div>

      <Modal show={show} onHide={handleClose}>

      <Modal.Header closeButton> </Modal.Header>

      <Modal.Body>
      <h6>choose a file to upload</h6>
      <input type="file" onChange={(e)=>handleChangeProfile(e)} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}> CLOSE </Button>
        <Button variant="primary" onClick={handleUploadImage}>UPLOAD</Button>
      </Modal.Footer>

      </Modal>
    </Container>
    
    </>
  )
}

export default Profile