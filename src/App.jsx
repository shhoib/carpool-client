import Home from "./components/Home"
import NavigationBar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer";
import { context } from "./store/context";
import { Routes ,Route, useLocation} from "react-router-dom";
import Join from "./components/join";
import LoginPage from "./components/login";

function App() {

  const location = useLocation()
  const isLogin = location.pathname==='/login'||'/register';

  return (
    <>
    <context.Provider>

     {!isLogin&&<NavigationBar/>}

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/login" element={<LoginPage/>}/>
     </Routes>

     {!isLogin&&<Footer/>}


     </context.Provider>
    </>
  )}

export default App
