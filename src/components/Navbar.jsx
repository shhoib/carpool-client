import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiSolidUserCircle } from 'react-icons/bi';
import { AiOutlineMessage,AiOutlineUser } from 'react-icons/ai';
import { BsFillCarFrontFill } from 'react-icons/bs';
import './navbar.css'


function NavigationBar() {

  return (
    <Navbar className="nav" >
      <Container>
        <Navbar.Brand className='coRide-text'>CoRide</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <NavDropdown className='text-white ' title={<BiSolidUserCircle size={29} />} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1"><h5 className='h-six-tags'><AiOutlineUser/> Profile</h5></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2"><h5 className='h-six-tags'><AiOutlineMessage/> Inbox</h5></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3"><h5 className='h-six-tags'><BsFillCarFrontFill/> My Rides</h5></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4"><h5>Logout</h5> </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

