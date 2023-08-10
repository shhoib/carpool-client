import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiSolidUser } from 'react-icons/bi';
import './navbar.css'

function NavigationBar() {
  return (
    <Navbar className="nav" >
      <Container>
        <Navbar.Brand className='coRide-text'>CoRide</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <NavDropdown className='text-white ' title={<BiSolidUser size={29} />} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1"><h6 className='h-six-tags'> Profile</h6></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2"><h6 className='h-six-tags'>Inbox</h6></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3"><h6 className='h-six-tags'>My Rides</h6></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3"><h6 className='h-six-tags'>Payment and refunds</h6></NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

