import '../stylings/sidebar.css'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineForwardToInbox} from 'react-icons/md'
import {AiOutlineCar} from 'react-icons/ai'
import {BiHomeSmile} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'


const Sidebar = () => {

  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate('/profile');
  };
  const handleInboxNavigate=()=>{
        navigate('/Inbox')
   }
   const handleRidesNavigate=()=>{
         navigate('/myRides')
      }
   const handleHomeNavigate=()=>{
         navigate('/')
    }

  return (
    <div className="whole_container">
      <ul className='ul_contailner'>
        {/* <li className='py-3'><h6><CgProfile/> Profile</h6></li> */}
        <li className='py-3' onClick={handleProfileClick}><CgProfile className='icon' />  <span>Profile</span></li>
        <li className='py-3' onClick={handleInboxNavigate}><MdOutlineForwardToInbox className='icon' />  <span>Inbox</span></li>
        <li className='py-3' onClick={handleRidesNavigate}><AiOutlineCar className='icon' />  <span>My Rides</span></li>
        <li className='py-3' onClick={handleHomeNavigate}><BiHomeSmile className='icon' />  <span>Home</span></li>

      </ul>
    </div>
  )
}

export default Sidebar