import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiSolidUserCircle } from 'react-icons/bi';
import { AiOutlineMessage,AiOutlineUser } from 'react-icons/ai';
import { BsFillCarFrontFill,BsSearch } from 'react-icons/bs';
import './navbar.css'
import { useNavigate } from 'react-router-dom';


function NavigationBar() {

  const navigate = useNavigate();

  return (
    <Navbar className="nav" >
      <Container>
        <Navbar.Brand ><h4 className='coRide-text'>CoRide</h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
         <h4  className='px-4'><BsSearch onClick={navigate('/JoinRide')}/></h4>
          <NavDropdown className='' title= {<h><BiSolidUserCircle size={33}/></h>}>
            <NavDropdown.Item href="#action/3.1"><h5 onClick={navigate('/Profile')} className='h-six-tags'><AiOutlineUser/> Profile</h5></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2"><h5 className='h-six-tags'><AiOutlineMessage/> Inbox</h5></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3"><h5 className='h-six-tags'><BsFillCarFrontFill/> My Rides</h5></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4"><h5>Logout</h5> </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

