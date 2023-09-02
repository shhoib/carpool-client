// import Home from "./components/Home"
// import NavigationBar from "./components/Navbar"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from "./components/footer";
// import { context } from "./store/context";
// import { Routes ,Route, useLocation} from "react-router-dom";
// import LoginPage from "./components/login";
// import Signup from "./components/signup";
// import HostRide from "./components/hostRide";
// import JoinRide from "./components/joinRide";
// import Profile from "./components/profile";

// function App() {

//   const location = useLocation()
//   const isLogin = location.pathname=='/login'||'/Signup';

//   return (
//     <>
//     <context.Provider>

//     <NavigationBar/>

//      <Routes>
//       <Route path="/" element={<Home/>}/>
//       <Route path="/login" element={<LoginPage/>}/>
//       <Route path="/signup" element={<Signup/>}/>
//       <Route path="/hostRide" element={<HostRide/>}/>
//       <Route path="/JoinRide" element={<JoinRide/>}/>
//       <Route path="/Profile" element={<Profile/>}/>
//      </Routes>

//      {!isLogin&&<Footer/>}


//      </context.Provider>
//     </>
//   )}

// export default App

// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import NavigationBar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/footer";
// import { context } from "./store/context";
import LoginPage from "./components/login";
import Signup from "./components/signup";
import HostRide from "./components/hostRide";
import JoinRide from "./components/joinRide";
import Profile from "./components/profile";
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
  
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hostRide" element={<HostRide />} />
          <Route path="/JoinRide" element={<JoinRide />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <Footer />
     
      </BrowserRouter>

  );
}

export default App;
