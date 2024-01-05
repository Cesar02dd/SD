import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

import "./Navbar.css";

const SiteNavbar = () => {
  return (
    <>
    <Navbar expand="lg" className="user" data-bs-theme="dark">
        <Navbar.Brand href=""> 
          <img
            src="/public/home.png"
            width="30"
            height="30"
            className="d-inline-block align-top home-logo"
            alt="Home button"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav">
              <Nav.Link className='nav-link' href="/">Home</Nav.Link>
              <Nav.Link className='nav-link' href="/searchevents">My events</Nav.Link>
              {/* <Nav.Link className='nav-link' href="/allevents">All events</Nav.Link> */}
          </Nav>
          <Nav className='login-button'>
              <Button className='custom-button' href="#">Login</Button>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default SiteNavbar;
