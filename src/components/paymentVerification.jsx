import { useNavigate, useSearchParams } from "react-router-dom"
import {FcApproval} from 'react-icons/fc'
import {MDBBtn} from 'mdb-react-ui-kit'
import { useEffect } from "react"

const PaymentVerification = () => {

  const searchQuery = useSearchParams()[0]

  const refNum = searchQuery.get('reference')
  const navigate = useNavigate()

  useEffect(()=>{
    
  })


  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center" style={{height:'90vh'}}>
    <h1 style={{fontWeight:'700'}}>Order Succesfull <FcApproval/></h1>
    <h6 style={{fontWeight:'',color:'black'}}>ref number : {refNum}</h6>
    <MDBBtn onClick={()=>navigate('/')} className="m-2" color='secondary'>Go Home</MDBBtn>
    </div>
  )
}

export default PaymentVerification