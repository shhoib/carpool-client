import { useEffect } from "react";
import { useSelector } from "react-redux"
import axiosInstance from "../api/axios";
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const MyRides = () => {

    const USER = useSelector((state)=>state.userAuth);
      const [value, setValue] = useState(2);


    const [myRides,setMyRides] = useState([])

    useEffect(() => {
    const rides = async () => {
      try {
        const response = await axiosInstance.get(`/myRides/${USER.userID}`); 
        if(response.status==200) {
           return setMyRides(response.data.myrides)
        }
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    rides();
  }, []); //TODO: is there a use of this [USER.userID]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <h1>hii</h1>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="2">Item Oe</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="1">Item Three</TabPanel>
      </TabContext>
    </Box>
    </>
  )
}

export default MyRides