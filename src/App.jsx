import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import NavigationBar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import Footer from "./components/footer";
// import { context } from "./store/context";
import LoginPage from "./components/login";
import Signup from "./components/signup";
import HostRide from "./components/hostRide";
import JoinRide from "./components/joinRide";
import Profile from "./components/profile";
import RideDetails from './components/rideDetails';
import HosterDetails from './components/hosterDetails';
import EditPersonalDetails from './components/personalDetails';
import ChangePassword from './components/changePassword';
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';


function App() {

  const userAuth = Boolean(useSelector((state)=>state.userAuth.token))


  return (
  

      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hostRide" element={<HostRide />} />
          <Route path="/JoinRide" element={<JoinRide />} />
          <Route path="/Profile" element={ userAuth ? <Profile />: <Navigate to='/login'/> } />
          <Route path="/RideDetails/:id" element={ userAuth ? <RideDetails />: <Navigate to='/login'/> } />
          <Route path="/HosterDetails/:id" element={ userAuth ? <HosterDetails />: <Navigate to='/login'/> } />
          <Route path="/EditPersonalDetails" element={ userAuth ? <EditPersonalDetails />: <Navigate to='/login'/> } />
          <Route path="/ChangePassword" element={ userAuth ? <ChangePassword />: <Navigate to='/login'/> } />
        </Routes>
        {/* <Footer /> */}
     
      </BrowserRouter>

  );
}

export default App;
