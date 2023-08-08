import Home from "./components/Home"
import NavigationBar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer";
import { context } from "./store/context";
import { Routes ,Route, useLocation} from "react-router-dom";
import Join from "./components/join";
import LoginPage from "./components/login";
import Signup from "./components/signup";
import HostRide from "./components/hostRide";
import JoinRide from "./components/joinRide";

function App() {

  const location = useLocation()
  const isLogin = location.pathname==='/login'||'/Signup';

  return (
    <>
    <context.Provider>

    <NavigationBar/>

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/hostRide" element={<HostRide/>}/>
      <Route path="/JoinRide" element={<JoinRide/>}/>
     </Routes>

     {!isLogin&&<Footer/>}


     </context.Provider>
    </>
  )}

export default App
