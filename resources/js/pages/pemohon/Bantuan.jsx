import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Bantuan = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <Button 
            variant="light" 
            className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
            onClick={() => navigate('/dashboard-pemohon')}
            style={{ width: '40px', height: '40px' }}
        >
        <FaArrowLeft />
        </Button>
        <h3 className="fw-bold mb-0">Pusat Bantuan & Kontak</h3>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
            <Card className="shadow-sm border-0 rounded-4 text-center p-5">
                <div className="mb-4">
                    {/* Ilustrasi Icon */}
                    <div className="bg-primary bg-opacity-10 p-4 rounded-circle d-inline-block text-primary">
                        <FaPhoneAlt size={50} />
                    </div>
                </div>
                
                <h4 className="fw-bold mb-3">Butuh Bantuan? Hubungi Kami</h4>
                <p className="text-muted mb-5">
                    Tim Dinas Perhubungan Kabupaten Lamongan siap membantu Anda pada jam kerja (Senin - Jumat, 08.00 - 16.00 WIB).
                </p>

                <div className="d-grid gap-3 text-start">
                    
                    {/* Alamat */}
                    <div className="d-flex align-items-center p-3 border rounded hover-shadow bg-white">
                        <FaMapMarkerAlt className="text-danger me-3" size={24} />
                        <div>
                            <div className="fw-bold small text-uppercase text-muted">Alamat Kantor</div>
                            <div className="fw-medium">Jl. Jaksa Agung Suprapto No. XX, Tumenggungan, Kec. Lamongan</div>
                        </div>
                    </div>

                    {/* Telepon */}
                    <div className="d-flex align-items-center p-3 border rounded hover-shadow bg-white">
                        <FaPhoneAlt className="text-primary me-3" size={24} />
                        <div>
                            <div className="fw-bold small text-uppercase text-muted">Telepon Kantor</div>
                            <div className="fw-medium">(0322) 321987</div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="d-flex align-items-center p-3 border rounded hover-shadow bg-white">
                        <FaEnvelope className="text-warning me-3" size={24} />
                        <div>
                            <div className="fw-bold small text-uppercase text-muted">Email Resmi</div>
                            <div className="fw-medium">dishublamongan@gmail.com</div>
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="d-flex align-items-center p-3 border rounded hover-shadow bg-success bg-opacity-10 border-success">
                        <FaWhatsapp className="text-success me-3" size={28} />
                        <div className="flex-grow-1">
                            <div className="fw-bold small text-uppercase text-success">WhatsApp Center</div>
                            <div className="fw-medium text-success">0812-3456-7890 (Chat Only)</div>
                        </div>
                        <Button variant="success" size="sm" href="https://wa.me/6281234567890" target="_blank">Chat</Button>
                    </div>

                </div>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Bantuan;