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
import '../stylings/myrides.css'
import { Container } from "react-bootstrap";
import {MdLocationPin} from 'react-icons/md'
import {BsPlusCircle} from 'react-icons/bs'
import {SiRazorpay} from 'react-icons/si'
import {BsFillCarFrontFill} from 'react-icons/bs'
import {FcApproval} from 'react-icons/fc'
import  {FcConferenceCall,FcPlanner,FcAdvance,FcMoneyTransfer } from 'react-icons/fc'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { MDBSwitch,MDBTextArea,MDBBtn, MDBCard, MDBCardBody,MDBCardText,MDBModal,MDBModalDialog,MDBModalHeader,
  MDBModalTitle,MDBModalContent,MDBModalBody,MDBModalFooter,} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from "./sideBar";




const MyRides = () => {

    const USER = useSelector((state)=>state.userAuth);
    const userID = USER.userID

      const [value, setValue] = useState(1);
      const [myRides,setMyRides] = useState([])
      const [joinedRides,setJoinedRides] = useState([])
      const [toggleState, setToggleState] = useState(false);
      const [selectedRating, setSelectedRating] = useState(4);
      const [aboutRide, setAboutRide] = useState('');
      const [centredModal, setCentredModal] = useState(false);
      const [selectedRide, setSelectedRide] = useState(null);



      const toggleShow = (rideData) => {
        setCentredModal(!centredModal);
        setSelectedRide(rideData)
      }
      console.log(selectedRide)

      const changeToggle=()=> setToggleState(!toggleState)

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
    }, [userID]);

    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

        const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
          color: theme.palette.action.disabled,
        },
      }));

      const customIcons = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon color="error" />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon color="error" />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentSatisfiedIcon color="warning" />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon color="success" />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon color="success" />,
          label: 'Very Satisfied',
        },
      };
      
      const handleRatingChange = (event, newRating) => {
        setSelectedRating(newRating);
      };
      function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
      }

      IconContainer.propTypes = {
        value: PropTypes.number.isRequired,
      };

      const handleRating= async(hostedRides)=>{
        console.log(hostedRides);
        const reviewDetails = {
          toUserID:hostedRides.hosterID,
          ratedByID:userID,
          ratedImogi:selectedRating,
          aboutRide:aboutRide,
          rideID:hostedRides._id
        }

        try {
          const response = await axiosInstance.post('/review',reviewDetails)
          toast.success(response.data.message,{
                autoClose:1000,
                onClose:()=>{
                  
                }})
          } catch (error) {
          console.log(error);
        }
      }


      const handlePayment = async(hostedRides)=>{
        console.log(hostedRides);
        try {
          const keyResponse = await axiosInstance.get('/getKey')

          const response = await axiosInstance.post('/orders',{amount:hostedRides?.amount})

        const options = {
          key: keyResponse.data.key, 
          amount: response.data.amount, 
          currency: "INR",
          name: "coRide",
          description: "Test Transaction",
          image: "https://res.cloudinary.com/dzhfutnjh/image/upload/v1696741863/coride_logo_ci0gw0.png",
          order_id: response.data.id, 
          callback_url: `http://localhost:3000/paymentVerification?USERID=${hostedRides.hosterID}&payed_by=${hostedRides.joinerID}&rideID=${hostedRides._id}`,
          prefill: {
              "name": USER.name,
              "email": USER.email,
              "contact": USER.phoneNumber
          },
          notes: {
              "address": "Razorpay Corporate Office"
          },
          theme: {
              "color": "#3399cc"
          }
      };
      var razor = new window.Razorpay(options);
          razor.open();

        } catch (error) {
          console.log(error);
        }
      }

      // const handleMyRideNavigate = (hostedRides)=>{
      //   navigate(`/HostedRideDetails/${hostedRides._id}`)
      // }
      console.log(selectedRide)

  return (
    <div className="d-flex">
      <div className="sidebar" style={{width:'17%'}}>
    <Sidebar/>
    </div>
    <div className="container-div" >
    <ToastContainer/>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box className="tablist-container d-flex align-items-center justify-content-center" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList className='tablist' onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Hosted Rides" value="1" />
            <Tab  label="active Rides" value="2" />
            <Tab label="Joined Rides" value="3" />
          </TabList>
        </Box>


      {/* ////////1st tab///////// */}
      <TabPanel value="1">
        {myRides.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center">
            {myRides.map((hostedRides, index) => (
              <div key={index} className="m-2">

                <MDBCard className="shadow" alignment='center' style={{ width: '22rem',height:'16rem' }}>
                  <MDBCardBody>                    
                    <MDBCardText className="m-0">
                     <h5 className="p-2"><FcPlanner className="mx-2"/>date: {hostedRides.date}</h5>
                    <h5 className="p-2" style={{ color: "#16C79A"}}><FcAdvance className="mx-2"/> from: {hostedRides.from.split(', ').slice(0, 2).join(', ')}</h5>
                    <h5 className="p-2" style={{ color: "#EB455F"}}><MdLocationPin className="mx-2" style={{color:"grey"}}/> to: {hostedRides.to.split(', ').slice(0, 2).join(', ')}</h5>
                    </MDBCardText>
                    <MDBBtn onClick={()=>toggleShow(hostedRides)} className="position-absolute bottom-0 start-50 translate-middle-x m-2">details</MDBBtn>
                </MDBCardBody>
                </MDBCard>
              </div>
            ))}
          </div>
        ) : (
          <Container className="d-flex flex-column align-items-center">
            <h2 className="no-rides">You havent hosted any rides</h2>
            <h5>Click here to host your first ride...</h5>
            <h1 onClick={() => navigate('/hostRide')}>
              <BsPlusCircle />
            </h1>
          </Container>
        )}
      </TabPanel>



      {/* ////////// 2nd tab//////////// */}
        <TabPanel value="2">
        {(myRides.length>0 ||joinedRides.length>0) ?(
          <>
          {  myRides.map((hostedRides,index)=>(
          hostedRides.status == 'started' ? 
          <Container key={index} className="hosted-rides">
          <div className=" d-flex justify-content-center align-items-center" >
          <h2 style={{color:'skyblue'}}>You hosted this ride</h2>
          <div className="d-flex flex-column align-items-center">
           <div className="d-flex">
            <div className="p-3">
            <h5 className="p-2" style={{ color: "rgb(255, 68, 0)"}}><FcAdvance className="mx-2"/> from: {hostedRides.from}</h5>
            <h5 className="p-2" style={{ color: "rgb(255, 68, 0)"}}><MdLocationPin className="mx-2"/> to: {hostedRides.to}</h5>
            <h5 className="p-2"><FcPlanner className="mx-2"/>date: {hostedRides.date}</h5>
            </div>

            <div className="p-3">
            <h5 className="p-2"><FcConferenceCall className="mx-2"/>passengers: {hostedRides.passengers}</h5>
            <h5 className="p-2"><BsFillCarFrontFill className="mx-2"/>vehicle: {hostedRides.vehicle}</h5>
            <h5 className="p-2"><FcMoneyTransfer className="mx-2"/>amount: ₹ {hostedRides.amount}</h5>
            </div>
            </div>

            <h5><MDBSwitch onChange={changeToggle}  id='flexSwitchCheckDefault' label="I've completed my ride" /></h5>          

            </div>
          </div>
          <div>
          {toggleState && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div>
                 <hr className="hr hr-blurry"/>
                      <h4 className="experience">How was your ride experience !!</h4>                      
                    </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <MDBTextArea onChange={(e)=>setAboutRide(e.target.value)} label='about your co-rider...' id='textAreaExample' rows={4} />
                      <div>
                   <StyledRating className="mx-3" name="highlight-selected-only"defaultValue={4} IconContainerComponent={IconContainer}
                      getLabelText={(value) => customIcons[value].label} highlightSelectedOnly onChange={handleRatingChange}/>
                   <MDBBtn className="m-2"  color='success' onClick={()=>handleRating(hostedRides)}>Rate Your co-Rider</MDBBtn>  
                       </div>                              
                     </div>
                  </div>
                )}
          </div>
            <hr className="line"/>
          </Container>
            :null
        ))}
        {  joinedRides.map((hostedRides,index)=>(
          hostedRides.status == 'started' ? 
          <Container key={index} className="hosted-rides">
          <div className=" d-flex justify-content-center align-items-center" >
          <h2 style={{color:'skyblue'}}>You Joined this ride</h2>
          <div className="d-flex flex-column align-items-center">
           <div className="d-flex">
            <div className="p-3">
            <h5 className="p-2" style={{ color: "rgb(255, 68, 0)"}}><FcAdvance className="mx-2"/> from: {hostedRides.from}</h5>
            <h5 className="p-2" style={{ color: "rgb(255, 68, 0)"}}><MdLocationPin className="mx-2"/> to: {hostedRides.to}</h5>
            <h5 className="p-2"><FcPlanner className="mx-2"/>date: {hostedRides.date}</h5>
            </div>

            <div className="p-3">
            <h5 className="p-2"><FcConferenceCall className="mx-2"/>passengers: {hostedRides.passengers}</h5>
            <h5 className="p-2"><BsFillCarFrontFill className="mx-2"/>vehicle: {hostedRides.vehicle}</h5>
            <h5 className="p-2"><FcMoneyTransfer className="mx-2"/>amount: ₹ {hostedRides.amount}</h5>
            </div>
            </div>

            <h5><MDBSwitch onChange={changeToggle}  id='flexSwitchCheckDefault' label="I've completed my ride" /></h5>          

            </div>
          </div>
          <div>
          {toggleState && (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                 <hr className="hr hr-blurry"/>
                 <div>

                 </div>
                 {hostedRides.isPaymentCompleted? 
                 <h3 style={{fontWeight:'600'}}>payment completed <FcApproval/></h3>:
                  <MDBBtn onClick={()=>handlePayment(hostedRides)} className="m-2" color='secondary'><SiRazorpay/> pay with Razorpay</MDBBtn>
                 }
                      <h4 className="experience">How was your ride experience !!</h4>                      
                    </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <MDBTextArea onChange={(e)=>setAboutRide(e.target.value)} label='about your co-rider...' id='textAreaExample' rows={4} />
                      <div>
                   <StyledRating className="mx-3" name="highlight-selected-only"defaultValue={4} IconContainerComponent={IconContainer}
                      getLabelText={(value) => customIcons[value].label} highlightSelectedOnly onChange={handleRatingChange}/>
                   <MDBBtn className="m-2"  color='success' onClick={()=>handleRating(hostedRides)}>Rate Your co-Rider</MDBBtn>  
                       </div>                              
                     </div>
                  </div>
                )}
          </div>
            <hr className="line"/>
          </Container>
            :null
        ))}
        </>
        )
       :
        <Container className="d-flex flex-column align-items-center">
          <h2 className="no-rides">No active rides available.</h2>
        </Container>
        }
      </TabPanel>


      {/* ////////// 3rd tab//////////// */}
        <TabPanel value="3">
        {joinedRides.length>0?
          joinedRides.map((rides,index)=>(
            <div key={index} className="m-2">
            <MDBCard className="shadow" alignment='center' style={{ width: '22rem',height:'16rem' }}>
              <MDBCardBody>
                
                <MDBCardText className="m-0">
                 <h5 className="p-2"><FcPlanner className="mx-2"/>date: {rides?.date}</h5>
                <h5 className="p-2" style={{ color: "#16C79A"}}><FcAdvance className="mx-2"/> from: {rides?.from?.split(', ')?.slice(0, 2)?.join(', ')}</h5>
                <h5 className="p-2" style={{ color: "#EB455F"}}><MdLocationPin className="mx-2" style={{color:"grey"}}/> to: {rides?.to?.split(', ')?.slice(0, 2)?.join(', ')}</h5>
                </MDBCardText>
                <MDBBtn onClick={()=>toggleShow(rides)}  className="position-absolute bottom-0 start-50 translate-middle-x m-2">details</MDBBtn>
            </MDBCardBody>
            </MDBCard>
          </div>
        )):
        <Container className="d-flex flex-column align-items-center">
          <h2 className="no-rides">You havent joined any rides</h2>
          <h5>Click here to join your first ride...</h5>
          <h1 onClick={()=>navigate('/joinRide')}><BsPlusCircle/></h1>
        </Container>
        }
        </TabPanel>
      </TabContext>
    </Box>

    <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
          <MDBModalHeader className="modal_header d-flex justify-content-center">
              <MDBModalTitle >Ride Details</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody className="d-flex align-items-center justify-content-around" >
              <div className="d-flex flex-column justify-content-center align-items-center" style={{color:'#002f4b'}}>
              <h5> {selectedRide?.date}</h5>
              <h5> {selectedRide?.hoster?.charAt(0).toUpperCase() + selectedRide?.hoster?.slice(1)}</h5>
              <h5> {selectedRide?.from?.split(', ')?.slice(0, 2)?.join(', ').charAt(0).toUpperCase() + selectedRide?.from?.slice(1)}</h5>
              <h5> {selectedRide?.to?.split(', ')?.slice(0, 2)?.join(', ').charAt(0).toUpperCase() + selectedRide?.to.slice(1)}</h5>
              <h5> {selectedRide?.vehicle.charAt(0).toUpperCase() + selectedRide?.vehicle.slice(1)}</h5>
              <h5> ₹ {selectedRide?.amount}</h5>
              <h5> {selectedRide?.status.charAt(0).toUpperCase() + selectedRide?.status.slice(1)}</h5>
              {/* {selectedRide.joinerID? <h5>{selectedRide.joinerID.name}</h5>:null} */}
              </div>
              {selectedRide?.joinerID ? (
              <div>
              <h5>companion : {selectedRide?.joinerID?.name.charAt(0).toUpperCase() + selectedRide.joinerID?.name?.slice(1)}</h5>
              </div>
              )
               : (null)}
            </MDBModalBody>
            <MDBModalFooter className="d-flex justify-content-center">
              <MDBBtn color='secondary'  onClick={toggleShow}> Close </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </div>


    </div>
  )
  }

export default MyRides