import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Login.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value
        });
      };
      const handleSearch = () => {
        fetch('http://server:8000/api/events', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error('Error:', error));
      };

  return (
    <div className='container_form'>
        <Card className="text-center">
            <Card.Header className='title_search'>Sign in</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="loginEmail">
                      <Form.Label column sm="2">Email</Form.Label>
                      <Col sm="10"><Form.Control type="email" placeholder="name@example.com" value={loginData.email} onChange={handleInputChange}/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="loginPassword">
                      <Form.Label column sm="2">Password</Form.Label>
                      <Col sm="10"><Form.Control type="password" placeholder="*********" value={loginData.password} onChange={handleInputChange}/></Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-1" controlId="forCreateAcount">
                        <Link to="/home">
                            <Form.Label column sm="12">Don't have a acount? Click here and create one</Form.Label>
                        </Link>
                    </Form.Group>

                  </Form>
                  <Link to="/home">
                    <Button variant="primary"className='search_button'>Login</Button>
                  </Link>
                    
                </Card.Body>
        </Card>
    </div>
  )
}

export default Login