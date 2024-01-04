import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Register.css'

const Register = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const event = location.state ? location.state.event : null;

    const [registerData, setRegisterData] = useState({
        email: '',
        event_id: 0,
    })

    const [login] = useState({
      username: 'grupo2',
      password: 'grupo2sd2023',
    })

    const currentDate = new Date();

    // Format the date as "YYYY-MM-DD"
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;


    const [payment, setPayment] = useState({
      amount: event.Price * 100,
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
    const handleRegister = () => {
        registerData.event_id = event.Id;
        console.log(JSON.stringify(registerData));

        fetch('/payment/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(login),
        });

        const responsePayment = fetch('/payment/api/payments', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });
        console.log(responsePayment.json());

        fetch('/register/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        navigate('/');
    }

  return (
    <div className='container_register'>
      <Card className="text-center">
            <Card.Header className='title_register'>Register in {event.Name}</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleRegister}>
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
    </div>
  )
}

export default Register