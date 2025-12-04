import React, { useState } from 'react';
import { Container, Card, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { router, Head } from '@inertiajs/react';
import { FaUserShield, FaKey } from 'react-icons/fa';

const LoginAdmin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // LOGIKA LOGIN KHUSUS ADMIN (Hardcoded untuk Demo)
    // Username: admin
    // Password: admin123
    if (form.username === 'admin' && form.password === 'admin123') {
        
        // Simpan sesi sebagai ADMIN (Simulasi Frontend)
        const adminData = {
            nama: "Administrator Dishub",
            role: "admin",
            token: "admin-secret-token"
        };
        localStorage.setItem("user", JSON.stringify(adminData));
        
        // Arahkan ke Dashboard Admin menggunakan Inertia
        router.visit('/dashboard-admin');
    } else {
        setError("Username atau Password salah!");
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Head title="Login Administrator" />

      <Container style={{ maxWidth: '450px' }}>
        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="bg-primary p-4 text-center text-white">
                <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex p-3 mb-3">
                    <FaUserShield size={40} />
                </div>
                <h4 className="fw-bold mb-0">Sistem Administrator</h4>
                <p className="small text-white-50 mb-0">Dishub Kabupaten Lamongan</p>
            </div>
            
            <Card.Body className="p-5">
                {error && <Alert variant="danger" className="small text-center py-2">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-muted">Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-light border-end-0 text-muted"><FaUserShield /></InputGroup.Text>
                            <Form.Control 
                                type="text" 
                                placeholder="Masukkan username" 
                                className="bg-light border-start-0"
                                value={form.username}
                                onChange={(e) => setForm({...form, username: e.target.value})}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-muted">Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-light border-end-0 text-muted"><FaKey /></InputGroup.Text>
                            <Form.Control 
                                type="password" 
                                placeholder="Masukkan password" 
                                className="bg-light border-start-0"
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button variant="primary" size="lg" type="submit" className="w-100 fw-bold shadow-sm">
                        Masuk ke Dashboard
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer className="bg-light text-center py-3 border-0">
                <small className="text-muted">
                    &copy; 2025 Tim Teknis Dishub Lamongan
                </small>
            </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default LoginAdmin;