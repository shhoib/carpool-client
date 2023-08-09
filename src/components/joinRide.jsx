import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './joinRide.css'
import { Button } from 'react-bootstrap';

const JoinRide = () => {
  
  return (
    <>
    <div>
    <InputGroup className="mb-3 custom-input-group">
      <Form.Control aria-label="From" placeholder="From"  className="custom-form-control"/>
      <Form.Control aria-label="From" placeholder="To"  className="custom-form-control"/>
      <Form.Control  aria-label="To" type="date" className="custom-form-control"/>
      <Form.Control aria-label="Passengers" type="number" className="custom-form-control" placeholder="Passengers"/>
      <Button>search</Button>
    </InputGroup>
    </div>
    </>
  )
}

export default JoinRide