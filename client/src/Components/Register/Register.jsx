import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import './Register.css'

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const eventId = location.state ? location.state.event : null;

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const [registerData, setRegisterData] = useState({
        email: '',
        event_id: 0,
        username: '',
        password: '',
    })

    const [paymentData, setPaymentData] = useState({
      amount: 0,
      information: '',
      expirationDate: '',
    })

    const handleInputChangePayment = (e) => {
      const  {name, value} = e.target;
      setPaymentData({
          ...paymentData,
          [name]: value
      });
    }

    const handlePayment = () => {
      console.log(JSON.stringify(paymentData));
      fetch('http://server:8000/api/payment', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
      })
      .then(response => {
        if (response.ok) {
          handleCloseModal();
          navigate('/'); 
        } else {
          console.error('Error in payment:', response.status);
        }
      })
      .catch(error => {
        console.error('Error in payment:', error);
      });
    };

    const handleInputChange = (e) => {
        const  {name, value} = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    }
    const handleRegister = () => {
  
        registerData.event_id = eventId;
        console.log(JSON.stringify(registerData));

        fetch('http://server:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });
        setShowModal(true); 
    }
    const handlePaymentModal = (shouldClose) => {
      if (shouldClose) {
        setShowModal(false);
      } else {
        navigate('/serviciodepagamento');
      }
    };

    const handleFormSubmit = (e) => {
      e.preventDefault(); 
      handleRegister();
    };

  return (
    <div className='container_register'>
      <Card className="text-center">
            <Card.Header className='title_register'>Register in {eventId}</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="forEventLocation">
                      <Form.Label column sm="2">Email</Form.Label>
                      <Col sm="10"><Form.Control name="email" type="email" placeholder="email@gmail.com" value={registerData.email} onChange={handleInputChange}/></Col>
                    </Form.Group>
                      <Button type="submit" variant="primary" className='register_button'>
                          Register
                      </Button>
                  </Form>
                </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => handlePaymentModal(true)}>
          <Modal.Header closeButton>
            <Modal.Title className='title_register'>Please first pay your event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => { e.preventDefault(); handlePaymentModal(false); handlePayment()}}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Amount</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="amount" type="number" value={paymentData.amount} onChange={handleInputChange}/></Col>
                <Form.Label column sm="2">Information</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="info" type="text" value={paymentData.information} onChange={handleInputChange}/></Col>
                <Form.Label column sm="2">Date</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="date" type="date" value={paymentData.expirationDate} onChange={handleInputChange}/></Col>
              </Form.Group>
              <Button type="submit" variant="primary" className='modal_button' onClick={handlePaymentModal}>Payment</Button>
            </Form>
          </Modal.Body>
        </Modal>

    </div>
  )
}

export default Register