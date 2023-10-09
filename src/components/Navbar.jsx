// // import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// // import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import {useState} from 'react'
// import { BsSearch } from 'react-icons/bs';
// import { AiOutlinePlusCircle } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogout } from '../redux/userSlice';
// import './navbar.css'
// import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';







// function NavigationBar() {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//    const navigate = useNavigate();
//     const dispatch = useDispatch();

//       const USER = useSelector((state)=>state.userAuth)
//       const profile = USER.profile;



//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleProfileNavigate=()=>{
//     navigate('/Profile')
//     handleCloseUserMenu();
//   }
//   const handleInboxNavigate=()=>{
//     navigate('/Inbox')
//     handleCloseUserMenu();
//   }

//   const handleRidesNavigate=()=>{
//     navigate('/myRides')
//     handleCloseUserMenu();
//   }

//   const handleLogout=()=>{
//     dispatch(userLogout())
//     navigate('/');
//     handleCloseUserMenu();
//   }

//   return (

//     <AppBar position="static" className='navbarr'>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>

//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography variant="h6" noWrap component="a" href="/"
//             sx={{ mr: 2, display: { xs: 'none', md: 'flex' },  fontWeight: 700, letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none', }}>
//              CoRide </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
//               onClick={handleOpenNavMenu} color="inherit"> <MenuIcon />
//              </IconButton>
//             <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
//               open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }} >
//                 <MenuItem  onClick={handleCloseNavMenu}>
//                   <Typography onClick={()=>navigate('/joinRide')} textAlign="center"><BsSearch/> Searchride</Typography>
//                 </MenuItem>
//                 <MenuItem onClick={handleCloseNavMenu}>
//                   <Typography onClick={()=>navigate('/hostRide')} textAlign="center"><AiOutlinePlusCircle/> Hostride</Typography>
//                 </MenuItem>
//             </Menu>
//           </Box>

//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography variant="h5" noWrap component="a" href="/"
//             sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontWeight: 700, letterSpacing: '.1rem', color: 'inherit', textDecoration: 'none', }}>
//             CoRide
//           </Typography>
//           <Box className='' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//         <Button className='px-2'  onClick={()=>navigate('/joinRide')} sx={{ my: 2, color: 'white', display: 'block',fontSize: '16px', fontWeight: 'bold',}}>
//           <BsSearch fontSize="large" /> SearchRide 
//         </Button>
//         <Button className='px-3' onClick={()=>navigate('/hostRide')} sx={{ my: 2,color: 'white',display: 'block',fontSize: '16px',fontWeight: 'bold', }} >
//         <AiOutlinePlusCircle fontSize="large" /> Hostride 
//          </Button>
//         </Box>



      
//         <h4 onClick={()=>navigate('/notifications')}>
//         <MDBIcon fas icon='envelope' size='lg' color='light'/>
//         <MDBBadge color='danger' dot />
//         </h4>
       
//            <Box sx={{ flexGrow: 0 }}>  
//               <IconButton className='px-5' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src={profile?profile:''} />
//               </IconButton>
            
//             <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top', horizontal: 'right', }}
//               keepMounted transformOrigin={{vertical: 'top', horizontal: 'right', }}
//               open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >

//                 <MenuItem  onClick={handleProfileNavigate}>
//                   <Typography textAlign="center">Profile</Typography>
//                 </MenuItem>
//                 <MenuItem  onClick={handleInboxNavigate}>
//                   <Typography textAlign="center">Inbox</Typography>
//                 </MenuItem>
//                 <MenuItem  onClick={handleRidesNavigate}>
//                   <Typography textAlign="center">My Rides</Typography>
//                 </MenuItem>
//                 <MenuItem  onClick={handleLogout}>
//                   <Typography textAlign="center">Logout</Typography>
//                 </MenuItem>

//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default NavigationBar;



import {MDBContainer,MDBNavbar, MDBNavbarBrand,MDBDropdownToggle,MDBDropdown,MDBDropdownMenu,MDBDropdownItem} from 'mdb-react-ui-kit';
import {MdOutlineLegendToggle} from 'react-icons/md'
import {useNavigate,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { userLogout } from '../redux/userSlice';



export default function App() {


  const navigate = useNavigate();
  const location = useLocation()
  const dispatch = useDispatch();


  const handleProfileClick = () => {
    navigate('/profile');
  };
  const handleInboxNavigate=()=>{
        navigate('/Inbox')
   }
   const handleRidesNavigate=()=>{
         navigate('/myRides')
      }
      const handleLogout=()=>{
          dispatch(userLogout())
          toast.success('User logged out succesfully', {
            autoClose: 1000,
            onClose: () => {
                navigate('/');
            }, 
        });
        }


  return (
    <>
    <ToastContainer/>
      <MDBNavbar className="bg-body-tertiary p-0" bgColor ='transparent' fixed={location.pathname === '/' ? 'top' : false} style={{boxShadow:'none'}}>
        <MDBContainer fluid>
          <MDBNavbarBrand  style={{color:'grey', padding:'0px'}}>
            <img src='https://res.cloudinary.com/dzhfutnjh/image/upload/v1696741863/coride_logo_ci0gw0.png'
              height='60' alt='' loading='lazy'/>
            CoRide
          </MDBNavbarBrand>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                <MdOutlineLegendToggle style={{fontSize:'30px', color:'grey', marginRight:'10px'}}/>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link onClick={handleProfileClick}>Profile</MDBDropdownItem>
                  <MDBDropdownItem link onClick={handleInboxNavigate}>Inbox</MDBDropdownItem>
                  <MDBDropdownItem link onClick={handleRidesNavigate}>My Rides</MDBDropdownItem>
                  <MDBDropdownItem link className='text-center p-2' onClick={handleLogout}>LOGOUT</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}