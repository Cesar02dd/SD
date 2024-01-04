import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Payment.css'

const Payment = () => {

const location = useLocation();
const navigate = useNavigate();

const [paymentData, setPaymentData] = useState({
    amount: 0,
    information: '',
    expirationDate: '',
})

const handleInputChange = (e) => {
    const  {name, value} = e.target;
    setPaymentData({
        ...paymentData,
        [name]: value
    });
}
const handlePayment = () => {

    console.log(JSON.stringify(paymentData));
    fetch('http://server:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    });

    navigate('/');
}
  return (
    <div className='container_register'>
      <Card className="text-center">
            <Card.Header className='title'>Please first pay your event</Card.Header>
                <Card.Body>
                    <Form onSubmit={handlePayment}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Amount</Form.Label>
                            <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="amount" type="number" value={paymentData.amount} onChange={handleInputChange}/></Col>
                            <Form.Label column sm="2">Information</Form.Label>
                            <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="info" type="text" value={paymentData.information} onChange={handleInputChange}/></Col>
                            <Form.Label column sm="2">Date</Form.Label>
                            <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="date" type="date" value={paymentData.expirationDate} onChange={handleInputChange}/></Col>
                        </Form.Group>
                        <Button type="submit" variant="primary" className='register_button'>
                            Confirm
                        </Button>
                    </Form>
                </Card.Body>
        </Card>
    </div>
  )
}

export default Payment