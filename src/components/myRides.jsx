import { useEffect } from "react";
import { useSelector } from "react-redux"
import axiosInstance from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
// import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './myRides.css'
import { Container } from "react-bootstrap";
import {MdLocationPin} from 'react-icons/md'
import {BsPlusCircle} from 'react-icons/bs'
import {BsFillCarFrontFill} from 'react-icons/bs'
import  {FcConferenceCall,FcPlanner,FcAdvance,FcMoneyTransfer } from 'react-icons/fc'


const MyRides = () => {

    const USER = useSelector((state)=>state.userAuth);
    const userID = USER.userID
      const [value, setValue] = useState(1);
      const [myRides,setMyRides] = useState([])
      const [joinedRides,setJoinedRides] = useState([])

      useEffect(() => {
      setValue("1");
      }, []);

      const navigate = useNavigate();

    useEffect(() => {
    const rides = async () => {
      try {
        const response = await axiosInstance.get(`/myRides/${userID}`); 
        if(response.status==200) {
            setMyRides(response.data.allRides.myrides)
            setJoinedRides(response.data.allRides.joinedRides)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    rides();
  }, []); //TODO: is there a use of this [USER.userID]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(joinedRides);

  return (
    <>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box className="tablist-container d-flex align-items-center justify-content-center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList className='tablist' onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Hosted Rides" value="1" />
            <Tab  label="current Rides" value="2" />
            <Tab label="Joined Rides" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
        {myRides.length>0?
          myRides.map((hostedRides,index)=>(
          <Container key={index}>
          <div className="hosted-rides d-flex justify-content-center" >
            <div className="p-3">
            <h5 className="p-2"><FcAdvance className="mx-2"/> from: {hostedRides.from}</h5>
            <h5 className="p-2"><MdLocationPin className="mx-2"/> to: {hostedRides.to}</h5>
            <h5 className="p-2"><FcPlanner className="mx-2"/>date: {hostedRides.date}</h5>
            </div>

            <div className="p-3">
            <h5 className="p-2"><FcConferenceCall className="mx-2"/>passengers: {hostedRides.passengers}</h5>
            <h5 className="p-2"><BsFillCarFrontFill className="mx-2"/>vehicle: {hostedRides.vehicle}</h5>
            <h5 className="p-2"><FcMoneyTransfer className="mx-2"/>amount: ₹ {hostedRides.amount}</h5>
            </div>
            </div>
            <hr className="line"/>
          </Container>
        )):
        <Container className="d-flex flex-column align-items-center">
          <h2 className="no-rides">You havent hosted any rides</h2>
          <h5>Click here to host your first ride...</h5>
          <h1 onClick={()=>navigate('/hostRide')}><BsPlusCircle/></h1>
        </Container>
        }
        </TabPanel>

        <TabPanel value="2">
        {myRides.length>0?
          myRides.map((hostedRides,index)=>(
          !hostedRides.isCompleted ? 
          <Container key={index}>
          <div className="hosted-rides d-flex justify-content-center" >
            <div className="p-3">
            <h5 className="p-2"><FcAdvance className="mx-2"/> from: {hostedRides.from}</h5>
            <h5 className="p-2"><MdLocationPin className="mx-2"/> to: {hostedRides.to}</h5>
            <h5 className="p-2"><FcPlanner className="mx-2"/>date: {hostedRides.date}</h5>
            </div>

            <div className="p-3">
            <h5 className="p-2"><FcConferenceCall className="mx-2"/>passengers: {hostedRides.passengers}</h5>
            <h5 className="p-2"><BsFillCarFrontFill className="mx-2"/>vehicle: {hostedRides.vehicle}</h5>
            <h5 className="p-2"><FcMoneyTransfer className="mx-2"/>amount: ₹ {hostedRides.amount}</h5>
            </div>
            </div>
            <hr className="line"/>
          </Container>
            :null
        )):null
        }
        </TabPanel>

        <TabPanel value="3">
        {joinedRides.length>0?
          joinedRides.map((rides,index)=>(
          <Container key={index}>
          <div className="hosted-rides d-flex justify-content-center" >
            <div className="p-3">
            <h5 className="p-2"><FcAdvance className="mx-2"/> from: {rides.from}</h5>
            <h5 className="p-2"><MdLocationPin className="mx-2"/> to: {rides.to}</h5>
            <h5 className="p-2"><FcPlanner className="mx-2"/>date: {rides.date}</h5>
            </div>

            <div className="p-3">
            <h5 className="p-2"><FcConferenceCall className="mx-2"/>passengers: {rides.passengers}</h5>
            <h5 className="p-2"><BsFillCarFrontFill className="mx-2"/>vehicle: {rides.vehicle}</h5>
            <h5 className="p-2"><FcMoneyTransfer className="mx-2"/>amount: ₹ {rides.amount}</h5>
            </div>
            </div>
            <hr className="line"/>
          </Container>
        )):null
        }
        </TabPanel>
      </TabContext>
    </Box>
    </>
  )
}

export default MyRides