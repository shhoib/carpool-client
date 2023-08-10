import { Button,Image } from 'react-bootstrap';
import './joinRide.css'
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Row,Col} from 'react-bootstrap'

const JoinRide = () => {
  
  return (
    <> 
    <Row className='d-flex align-items-center justify-content-center w-100'>

     <Col lg={4} className="d-flex justify-content-center">
      <Image className='bgIMG' src='https://images.template.net/83682/free-simple-car-illustration-3v7wz.jpg'/>
    </Col>

    <Col lg={8} className='inputBoxWithImage d-flex flex-column justify-content-center align-items-center'>
      <h1 className='mainTXT'>PICK YOUR RIDE AT LOW PRICE</h1>   
      <div className='wholeInputBoxes d-flex'>
      <TextField className='inputBoxes bg-white rounded' id="-basic" label="from..." variant="outlined" />
      <TextField className='bg-white rounded' id="-basic" label="to..." variant="outlined" />
      <LocalizationProvider className='' dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DatePicker']}><DatePicker className='bg-white rounded mb-2' label="date" /></DemoContainer>
    </LocalizationProvider>
    <Button className='my-2'>Submit</Button>
    </div>    
    </Col>

    </Row>
    </>
  )
}

export default JoinRide