import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaEnvelope, FaLock, FaPhone, FaIdCard, FaMapMarkerAlt, FaFileUpload } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  
  // State untuk Tipe Akun
  const [accountType, setAccountType] = useState('perorangan');

  const handleRegister = (e) => {
    e.preventDefault();
    // Logika simpan ke backend nanti disini
    alert("Registrasi Berhasil! Silakan Login.");
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg rounded-4">
              <Card.Body className="p-5">
                
                <h3 className="text-center fw-bold mb-4">Akun Pemohon</h3>

                {/* PILIHAN TIPE AKUN */}
                <div className="d-flex justify-content-center gap-4 mb-4 p-3 bg-light rounded-pill border">
                    <Form.Check 
                        type="radio"
                        id="tipe-perorangan"
                        label="Perorangan"
                        name="accountType"
                        className="fw-bold"
                        checked={accountType === 'perorangan'}
                        onChange={() => setAccountType('perorangan')}
                    />
                    <Form.Check 
                        type="radio"
                        id="tipe-perusahaan"
                        label="Perusahaan"
                        name="accountType"
                        className="fw-bold"
                        checked={accountType === 'perusahaan'}
                        onChange={() => setAccountType('perusahaan')}
                    />
                </div>

                <Form onSubmit={handleRegister}>
                    
                    {/* NAMA LENGKAP / PERUSAHAAN */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold">
                            {accountType === 'perorangan' ? 'Nama Lengkap (Sesuai KTP)' : 'Nama Perusahaan'}
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-white text-muted">
                                {accountType === 'perorangan' ? <FaUser /> : <FaBuilding />}
                            </InputGroup.Text>
                            <Form.Control 
                                type="text" 
                                placeholder={accountType === 'perorangan' ? 'Masukkan nama lengkap' : 'Masukkan nama perusahaan'} 
                                required 
                            />
                        </InputGroup>
                    </Form.Group>

                    {/* NO TELEPON */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold">No. Telepon / WhatsApp</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-white text-muted"><FaPhone /></InputGroup.Text>
                            <Form.Control type="number" placeholder="08xxxxxxxxxx" required />
                        </InputGroup>
                    </Form.Group>

                    {/* IDENTITAS KHUSUS (DINAMIS) */}
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-muted fw-bold">
                                    {accountType === 'perorangan' ? 'No. KTP (NIK)' : 'Nomor NPWP Perusahaan'}
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-white text-muted"><FaIdCard /></InputGroup.Text>
                                    <Form.Control 
                                        type="number" 
                                        placeholder={accountType === 'perorangan' ? '16 digit NIK' : 'Nomor NPWP'} 
                                        required 
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* ALAMAT */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold">Alamat Lengkap</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-white text-muted"><FaMapMarkerAlt /></InputGroup.Text>
                            <Form.Control 
                                as="textarea" 
                                rows={2} 
                                placeholder={accountType === 'perorangan' ? 'Alamat domisili saat ini' : 'Alamat kantor perusahaan'}
                                required 
                            />
                        </InputGroup>
                    </Form.Group>

                    {/* EMAIL */}
                    <Form.Group className="mb-3">
                        <Form.Label className="small text-muted fw-bold">Email Aktif</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="bg-white text-muted"><FaEnvelope /></InputGroup.Text>
                            <Form.Control type="email" placeholder="name@example.com" required />
                        </InputGroup>
                    </Form.Group>

                    {/* PASSWORD */}
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-muted fw-bold">Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-white text-muted"><FaLock /></InputGroup.Text>
                                    <Form.Control type="password" placeholder="******" required />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-muted fw-bold">Konfirmasi Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-white text-muted"><FaLock /></InputGroup.Text>
                                    <Form.Control type="password" placeholder="******" required />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* UPLOAD DOKUMEN (DINAMIS SESUAI SRS F-01 & F-02) */}
                    <div className="p-3 bg-light rounded border mb-4">
                        <h6 className="fw-bold small text-primary mb-3">Upload Dokumen Persyaratan Akun</h6>
                        
                        {accountType === 'perorangan' ? (
                            // DOKUMEN PERORANGAN
                            <Form.Group controlId="formFileKTP" className="mb-0">
                                <Form.Label className="small fw-bold">Scan Foto KTP <span className="text-danger">*</span></Form.Label>
                                <InputGroup>
                                    <Form.Control type="file" size="sm" accept=".jpg,.jpeg,.png,.pdf" required />
                                    <InputGroup.Text><FaFileUpload /></InputGroup.Text>
                                </InputGroup>
                                <Form.Text className="text-muted small">Format: JPG/PDF (Maks. 2MB)</Form.Text>
                            </Form.Group>
                        ) : (
                            // DOKUMEN PERUSAHAAN
                            <>
                                <Form.Group controlId="formFileNPWP" className="mb-3">
                                    <Form.Label className="small fw-bold">Scan NPWP Perusahaan <span className="text-danger">*</span></Form.Label>
                                    <InputGroup>
                                        <Form.Control type="file" size="sm" accept=".jpg,.jpeg,.png,.pdf" required />
                                        <InputGroup.Text><FaFileUpload /></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formFileKuasa" className="mb-0">
                                    <Form.Label className="small fw-bold">Surat Kuasa Penanggung Jawab <span className="text-danger">*</span></Form.Label>
                                    <InputGroup>
                                        <Form.Control type="file" size="sm" accept=".pdf" required />
                                        <InputGroup.Text><FaFileUpload /></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </>
                        )}
                    </div>

                    {/* TOMBOL DAFTAR (HIJAU SESUAI MOCKUP) */}
                    <Button variant="success" size="lg" type="submit" className="w-100 fw-bold shadow-sm mb-3">
                        Daftar
                    </Button>

                    <div className="text-center text-muted">
                        Sudah punya akun? <Link to="/login" className="text-decoration-none fw-bold">Masuk disini</Link>
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

export default Register;