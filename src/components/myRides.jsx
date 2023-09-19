import { useEffect } from "react";
import { useSelector } from "react-redux"
import axiosInstance from "../api/axios";
import { useState } from "react";
// import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './myRides.css'
import { Container } from "react-bootstrap";


const MyRides = () => {

    const USER = useSelector((state)=>state.userAuth);
    const userID = USER.userID
      const [value, setValue] = useState(1);
      const [myRides,setMyRides] = useState([])

      useEffect(() => {
      setValue("1");
      }, []);


    useEffect(() => {
    const rides = async () => {
      try {
        const response = await axiosInstance.get(`/myRides/${userID}`); 
        if(response.status==200) {
            setMyRides(response.data.myrides)
            // console.log(response.data.myrides);
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

  console.log(myRides);

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
          <Container className="hosted-rides" key={index}>
            <div>
            <h6>from: ${hostedRides.from}</h6>
            </div>
          </Container>
        )):null
        }
        </TabPanel>

        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item three</TabPanel>
      </TabContext>
    </Box>
    </>
  )
}

export default MyRides