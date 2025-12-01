import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    const userData = {
      nama: "Raditya Fajar", 
      email: email || "user@example.com",
      role: "pemohon"
    };
    localStorage.setItem("user", JSON.stringify(userData));
    navigate('/dashboard-pemohon'); 
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="border-0 shadow-lg rounded-4">
              <Card.Body className="p-5">
                
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-dark">Selamat Datang</h3>
                    <p className="text-muted small">Silakan masuk untuk mengakses layanan perizinan</p>
                </div>

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold">Email</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-white text-muted border-end-0">
                                <FaEnvelope />
                            </InputGroup.Text>
                            <Form.Control 
                                type="email" 
                                placeholder="name@example.com" 
                                className="border-start-0"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold">Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-white text-muted border-end-0">
                                <FaLock />
                            </InputGroup.Text>
                            <Form.Control 
                                type="password" 
                                placeholder="Masukkan password" 
                                className="border-start-0"
                                required 
                            />
                        </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check 
                            type="checkbox" 
                            label="Ingat Saya" 
                            id="ingat-saya"
                            className="small text-muted"
                        />
                        <Link to="/lupa-password" class="text-decoration-none small fw-bold text-primary">
                            Lupa Password?
                        </Link>
                    </div>

                    <Button variant="success" size="lg" type="submit" className="w-100 fw-bold shadow-sm mb-4">
                        Masuk
                    </Button>

                    <div className="text-center text-muted">
                        Belum punya akun? <Link to="/register" className="text-decoration-none fw-bold">Daftar disini</Link>
                    </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;