    import { useEffect,useState } from "react"
    import { Container } from "react-bootstrap"
    import { useSelector } from "react-redux"
    import axiosInstance from "../api/axios";
    import '../stylings/paymentsReceived.css'


    const PaymentReceived = () => {

        const USER = useSelector((state)=>state.userAuth);
        const userID = USER.userID;
        const [payments, setPayments] = useState({ payment_details: [] })

        useEffect(()=>{
            const fetchpayments = async()=>{
                const response = await axiosInstance.get(`/fetchPayments?userID=${userID}`)
                setPayments(response.data.payments);
                console.log(response.data);
            }

            // console.log(payments.payments.payment_details.length);
            fetchpayments();
        },[userID])
    console.log(payments.payment_details);

     const totalAmount = payments.payment_details.reduce((acc, payment) => {
        return acc + payment.amount;
        }, 0);

        console.log(totalAmount);
                
    return (
     <Container>
        <Container className="total_balance text-center p-3">
            <h4>Total earned</h4>
            <h1 style={{color:'rgb(44, 44, 44',fontWeight:'600'}}>₹ {totalAmount}</h1>
        </Container>

        <Container > 
         {payments.payment_details.length > 0 ? (
            payments.payment_details.map((pay, index) => (
            <div key={index} className="payment-container d-flex align-items-center justify-content-around py-3">
            <div className="" >
                <h4 style={{fontWeight:'600',color:'#66a7ee'}}>payed by : <span style={{color:'rgb(44, 44, 44)'}}>{pay.payed_by}</span></h4>
                <h6>{pay.payed_at}</h6>
            </div>
            <div>
                <h3 style={{color:'rgb(70, 70, 241)',fontWeight:'600'}}>₹{pay.amount}</h3>
            </div>
            </div>
            ))
        ) : (
            <h1>no payments available</h1>
        )}
        </Container>

      </Container>
    )
    }

    export default PaymentReceived