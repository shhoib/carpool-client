import { Container } from "react-bootstrap"
import './profile.css'
import {BiPlusCircle} from 'react-icons/bi'
import {AiFillEdit} from 'react-icons/ai'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {GiReceiveMoney} from 'react-icons/gi'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import { updateProfile } from '../redux/userSlice';
import { MDBBtn,MDBModal,MDBModalDialog, MDBModalContent, MDBModalHeader,
   MDBModalTitle, MDBModalBody, MDBModalFooter,} from 'mdb-react-ui-kit';
// import { AxiosInstance } from "axios"


const Profile = () => {

  const userDetails = useSelector((state)=>state.userAuth)
  // console.log(userDetails);
  const userID = userDetails.userID;
  // console.log(userDetails.profile);

  const dispatch = useDispatch();


  const [profileImage, setProfileImage] = useState(null);

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const Navigate = useNavigate();

  const handlePersonalDetailsNavigate=()=>{
    Navigate(`/EditPersonalDetails`)
  }

  const handleChangeProfile = (e)=>{
    setProfileImage(e.target.files[0])
  }

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
      const response = await axios.post(`http://localhost:3000/uploadImage?id=${userID}`,formDataToSend,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      console.log(userDetails);
      dispatch(updateProfile({ profile: response.data }));
      toggleShow();
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
        <div className="user-profile-image" style={{backgroundImage: `url(${userDetails.profile})`}}></div>
    </Container>

    <Container className="profile-and-rating d-flex flex-column my-3">

      <div onClick={toggleShow} className="add-profile-section p-1 d-flex justify-content-between">
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

      {/* <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton> </Modal.Header>
      <Modal.Body>
     
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}> CLOSE </Button>
        <Button variant="primary" onClick={handleUploadImage}>UPLOAD</Button>
      </Modal.Footer>

      </Modal> */}


      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader className="header">
              <MDBModalTitle > </MDBModalTitle>
              <MDBBtn className='btn-close' color='white' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
            <h5>choose a file to upload</h5>
          <input type="file" onChange={(e)=>handleChangeProfile(e)} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>CLOSE</MDBBtn>
              <MDBBtn onClick={handleUploadImage}>UPLOAD</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </Container>
    
    </>
  )
}

export default Profile