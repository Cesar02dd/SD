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
    const event = location.state ? location.state.event : null;

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const [registerData, setRegisterData] = useState({
        email: '',
        event_id: 0,
    })

    /*const [paymentData, setPaymentData] = useState({
      amount: 0,
      information: '',
      expirationDate: '',
    })*/


    /*const handleInputChangePayment = (e) => {
      const  {name, value} = e.target;
      setPaymentData({
          ...paymentData,
          [name]: value
      });
    }*/

    /*const handlePayment = () => {
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
    };*/

    const [login] = useState({
      username: 'grupo2',
      password: 'grupo2sd2023',
    })

    const currentDate = new Date();

    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;


    const [payment, setPayment] = useState({
      amount: parseFloat(event.Price) * 100,
      information: '',
      expirationDate: formattedDate,
    });

    console.log(payment);


    const handleInputChange = (e) => {
        const  {name, value} = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
        setPayment((prevPayment) => ({
          ...prevPayment,
          information: 'Payment of ' + event.Name + ' from ' + value,
        }));
    }

    const handleRegister = async () => {
        registerData.event_id = event.Id;

        fetch('/payment/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(login),
        });

        const responsePayment = await fetch('/payment/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });
      
        if (responsePayment.ok) {
          const paymentResponseJson = await responsePayment.json();
          console.log(paymentResponseJson);

          fetch('/register/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...registerData,
              payment_id: paymentResponseJson.referenceDetails.id,
            }),
          });

          console.log(paymentResponseJson.referenceDetails.id);
        } else {
          console.error('Error in the payment request:', responsePayment.status);
        }

        console.log(JSON.stringify(registerData));
        navigate('/');
    }

    const handlePaymentModal = (show) => {
      setShowModal(show);
    };

    /*const handleFormSubmit = (e) => {
      e.preventDefault(); 
      handleRegister();
    };*/

  return (
    <div className='container_register'>
      <Card className="text-center">
            <Card.Header className='title_register'>Register in {event.Name}</Card.Header>
                <Card.Body>
                  <Form onSubmit={(e) => { e.preventDefault(); handlePaymentModal(true)}}>
                    <Form.Group as={Row} className="mb-3" controlId="forEventLocation">
                      <Form.Label column sm="2">Email</Form.Label>
                      <Col sm="10"><Form.Control name="email" type="email" placeholder="email@gmail.com" value={registerData.email} onChange={handleInputChange} required/></Col>
                    </Form.Group>
                      <Button type="submit" variant="primary" className='register_button'>
                          Register
                      </Button>
                  </Form>
                </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => handlePaymentModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className='title_register'>Please first pay your event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => { e.preventDefault(); handlePaymentModal(false); handleRegister()}}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Amount</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="amount" type="number" value={event.Price} /></Col>
                <Form.Label column sm="2">Information</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="info" type="text" value={payment.information} /></Col>
                <Form.Label column sm="2">Date</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly className="inputs" name="date" type="date" value={payment.expirationDate} /></Col>
              </Form.Group>
              <Button type="submit" variant="primary" className='modal_button' /*onClick={handlePaymentModal}*/>Payment</Button>
            </Form>
          </Modal.Body>
        </Modal>

    </div>
  )
}

export default Register