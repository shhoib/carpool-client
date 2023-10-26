import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";



const HostedRideDetails = () => {

    const { id } = useParams();
    const [hostedRide,setHostedRide] = useState({});
    useEffect(()=>{
        const fetchRideDetails = async()=>{
            const response = await axiosInstance.get(`hostedRideDetails?id=${id}`)
            setHostedRide(response.data)
            // console.log(response.data);
        }
        fetchRideDetails()
    },[])
    console.log(hostedRide);

  return (
    <div>HostedRideDetails</div>
  )
}

export default HostedRideDetails