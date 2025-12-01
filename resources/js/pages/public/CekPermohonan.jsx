import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaClipboardList, FaUser, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const CekPermohonan = () => {
  const navigate = useNavigate();
  
  const [regNumber, setRegNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); 
  const [error, setError] = useState('');

  // DATA DUMMY
  const mockDatabase = [
    { 
      no_registrasi: "REG-2025-001", 
      pemohon: "Budi Santoso", 
      jenis: "Izin Trayek Angkutan Umum", 
      tanggal: "20 Oktober 2025", 
      status: "Menunggu Verifikasi",
      pesan: "Dokumen sedang diperiksa oleh petugas."
    },
    { 
      no_registrasi: "REG-2025-002", 
      pemohon: "CV. Parkir Aman", 
      jenis: "Izin Usaha Perparkiran", 
      tanggal: "18 Oktober 2025", 
      status: "Disetujui",
      pesan: "Surat Izin telah diterbitkan. Silakan unduh di dashboard."
    },
    { 
      no_registrasi: "REG-2025-003", 
      pemohon: "Siti Aminah", 
      jenis: "Pendaftaran Uji KIR", 
      tanggal: "21 Oktober 2025", 
      status: "Ditolak",
      pesan: "Foto STNK tidak terbaca/buram. Mohon ajukan ulang."
    }
  ];

  // Fungsi Cari Data
  const handleCekStatus = (e) => {
    e.preventDefault();
    
    // Reset state
    setResult(null);
    setError('');
    setLoading(true);

    if (!regNumber) {
        setError("Mohon masukkan nomor registrasi terlebih dahulu.");
        setLoading(false);
        return;
    }

    // Simulasi delay network 1.5 detik
    setTimeout(() => {
        // Cari data di array dummy (Case Insensitive)
        const foundData = mockDatabase.find(item => 
            item.no_registrasi.toLowerCase() === regNumber.toLowerCase()
        );

        if (foundData) {
            setResult(foundData);
        } else {
            setError("Data tidak ditemukan. Periksa kembali nomor registrasi Anda.");
        }
        setLoading(false);
    }, 1500);
  };

  // Helper Warna Status
  const getStatusColor = (status) => {
      if (status === 'Disetujui') return 'success';
      if (status === 'Ditolak') return 'danger';
      return 'warning';
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
        {/* Navbar Sederhana */}
        <div className="bg-white shadow-sm py-3 mb-5">
            <Container>
                <Button variant="outline-secondary" size="sm" onClick={() => navigate('/')}>
                    <FaArrowLeft className="me-2" /> Kembali ke Beranda
                </Button>
            </Container>
        </div>

        <Container className="d-flex justify-content-center flex-grow-1">
            <div style={{ width: '100%', maxWidth: '700px' }}>
                
                {/* CARD PENCARIAN */}
                <Card className="shadow border-0 rounded-4 mb-4">
                    <Card.Body className="p-5 text-center">
                        <h3 className="fw-bold mb-3 text-primary">Lacak Permohonan</h3>
                        <p className="text-muted mb-4">
                            Masukkan nomor registrasi yang Anda dapatkan saat pengajuan untuk melihat progres terkini.
                        </p>
                        
                        <Form onSubmit={handleCekStatus}>
                            <Form.Group className="mb-3">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Contoh: REG-2025-001" 
                                    className="form-control-lg text-center fw-bold letter-spacing-1"
                                    value={regNumber}
                                    onChange={(e) => setRegNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Button 
                                variant="primary" 
                                size="lg" 
                                type="submit" 
                                className="w-100 shadow-sm"
                                disabled={loading}
                            >
                                {loading ? <><Spinner size="sm" animation="border" /> Sedang Mencari...</> : <><FaSearch className="me-2"/> Cek Status</>}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                {/* ALERT ERROR */}
                {error && (
                    <Alert variant="danger" className="shadow-sm border-0 text-center">
                        <FaInfoCircle className="me-2" /> {error}
                    </Alert>
                )}

                {/* HASIL PENCARIAN */}
                {result && (
                    <Card className="shadow border-0 rounded-4 bg-white animate__animated animate__fadeInUp">
                        <Card.Header className={`bg-${getStatusColor(result.status)} text-white text-center py-3 rounded-top-4`}>
                            <h5 className="mb-0 fw-bold">Status: {result.status.toUpperCase()}</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Row className="gy-3">
                                <Col xs={12} className="text-center mb-3 border-bottom pb-3">
                                    <div className="text-muted small text-uppercase">Nomor Registrasi</div>
                                    <h3 className="fw-bold text-dark letter-spacing-1">{result.no_registrasi}</h3>
                                </Col>
                                
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-2 text-muted">
                                        <FaClipboardList className="me-2" /> Jenis Layanan
                                    </div>
                                    <div className="fw-semibold">{result.jenis}</div>
                                </Col>
                                
                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-2 text-muted">
                                        <FaUser className="me-2" /> Nama Pemohon
                                    </div>
                                    <div className="fw-semibold">{result.pemohon}</div>
                                </Col>

                                <Col md={6}>
                                    <div className="d-flex align-items-center mb-2 text-muted">
                                        <FaCalendarAlt className="me-2" /> Tanggal Pengajuan
                                    </div>
                                    <div className="fw-semibold">{result.tanggal}</div>
                                </Col>

                                <Col xs={12} className="mt-4">
                                    <Alert variant="light" className="border text-center mb-0">
                                        <strong className="d-block mb-1">Keterangan Sistem:</strong>
                                        {result.pesan}
                                    </Alert>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}

            </div>
        </Container>
    </div>
  );
};

export default CekPermohonan;