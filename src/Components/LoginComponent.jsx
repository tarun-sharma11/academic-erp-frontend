import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import OrganisationService from '../Services/OrganisationService';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async () => {
    // You can implement your authentication logic here
    // For simplicity, let's assume credentials are hardcoded
    const data = {
        email:email,
        password:password
    }
    try {
        const response = await OrganisationService.loginEmployee(data);
        if(response.data.employee_id>=1){
            navigate('/organisation');
        }
    } catch (error) {
        
        setShowPopup(true);
    }
    
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>

      {/* Popup for invalid credentials */}
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your email or password is incorrect. Please try again.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
