import { useNavigate, useSearchParams } from "react-router-dom"
import {FcApproval} from 'react-icons/fc'
import {MDBBtn} from 'mdb-react-ui-kit'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import axiosInstance from "../api/axios"

const PaymentVerification = () => {

  const searchQuery = useSearchParams()[0]

  const refNum = searchQuery.get('reference')
  const navigate = useNavigate()

  const USER = useSelector((state)=>state.userAuth);
 

  useEffect(()=>{
    const saveName = async()=>{
      const response = await axiosInstance.post('/saveReceiverName',{userID:USER.userID,payment_id:refNum})
      console.log(response.data);
    }

    saveName();
  },[USER.userID, refNum])


  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height:'90vh'}}>
    <h1 style={{fontWeight:'700'}}>Order Succesfull <FcApproval/></h1>
    <h6 style={{fontWeight:'',color:'black'}}>ref number : {refNum}</h6>
    <MDBBtn onClick={()=>navigate('/')} className="m-2" color='secondary'>Go Home</MDBBtn>
    </div>
  )
}

export default PaymentVerification