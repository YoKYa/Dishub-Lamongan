import React from 'react';
import { Container, Card, Row, Col, Badge, Button, ListGroup, Alert, Tab, Nav } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaFilePdf, FaHistory, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const DetailPengajuan = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  // DATA DUMMY
  const detailData = {
    id: id,
    no_registrasi: "REG-2025-001",
    jenis_izin: "Izin Trayek Angkutan Umum",
    tanggal_pengajuan: "20 Oktober 2025",
    status: "Menunggu Verifikasi", //bisa diganti Ditolak atau Disetujui
    catatan_admin: "", 
    data_pemohon: {
      nama: "Budi Santoso",
      nik: "3524xxxxxxxx0001",
      alamat: "Jl. Merdeka No. 45, Lamongan",
      telepon: "081234567890"
    },
    data_kendaraan: {
      no_polisi: "S 1234 UJ",
      merk: "Mitsubishi Colt Diesel",
      tahun: "2020",
      rute: "Pasar Lamongan - Terminal"
    },
    dokumen: [
      { nama: "KTP Pemohon", file: "ktp_budi.pdf", status: "Valid" },
      { nama: "STNK Kendaraan", file: "stnk_s1234uj.pdf", status: "Valid" },
      { nama: "Bukti Uji KIR", file: "kir_2025.pdf", status: "Menunggu Cek" }
    ],
    riwayat: [
      { tanggal: "20 Okt 2025 08:00", status: "Pengajuan Dikirim", ket: "Permohonan masuk ke sistem" },
      { tanggal: "20 Okt 2025 08:05", status: "Menunggu Verifikasi", ket: "Sedang diperiksa oleh Admin" }
    ]
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Disetujui': return 'success';
      case 'Ditolak': return 'danger';
      case 'Perlu Revisi': return 'warning';
      default: return 'info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Disetujui': return <FaCheckCircle className="me-2" />;
      case 'Ditolak': return <FaTimesCircle className="me-2" />;
      case 'Perlu Revisi': return <FaExclamationCircle className="me-2" />;
      default: return <FaInfoCircle className="me-2" />;
    }
  };

  return (
    <Container className="py-5">
      {/* Header Navigasi */}
      <div className="d-flex align-items-center mb-4">
        <Button 
            variant="light" 
            className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
            onClick={() => navigate('/status-pengajuan')}
            style={{ width: '40px', height: '40px' }}
        >
        <FaArrowLeft />
        </Button>
        <div>
            <h3 className="fw-bold mb-0">Detail Pengajuan</h3>
            <span className="text-muted small">No. Reg: {detailData.no_registrasi}</span>
        </div>
      </div>

      <Row>
        {/* KOLOM KIRI: STATUS & INFO UTAMA */}
        <Col lg={4} className="mb-4">
            {/* Card Status */}
            <Card className="shadow-sm border-0 mb-4">
                <Card.Body className="text-center p-4">
                    <h6 className="text-muted mb-3">Status Saat Ini</h6>
                    <Badge bg={getStatusVariant(detailData.status)} className="px-4 py-2 rounded-pill fs-6 mb-3 d-inline-flex align-items-center">
                        {getStatusIcon(detailData.status)} {detailData.status}
                    </Badge>
                    <p className="small text-muted">Terakhir update: {detailData.riwayat[detailData.riwayat.length - 1].tanggal}</p>
                    
                    {/* Jika ada catatan revisi/penolakan (Sesuai SRS F-08) */}
                    {['Ditolak', 'Perlu Revisi'].includes(detailData.status) && (
                        <Alert variant="warning" className="text-start small mt-3">
                            <strong>Catatan Admin:</strong> <br/>
                            {detailData.catatan_admin || "Mohon lengkapi dokumen KTP yang lebih jelas."}
                        </Alert>
                    )}
                </Card.Body>
            </Card>

            {/* Card Riwayat (Timeline Sederhana) */}
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white fw-bold"><FaHistory className="me-2 text-primary"/> Riwayat Proses</Card.Header>
                <ListGroup variant="flush">
                    {detailData.riwayat.map((log, idx) => (
                        <ListGroup.Item key={idx} className="py-3">
                            <div className="d-flex justify-content-between mb-1">
                                <strong className="text-dark small">{log.status}</strong>
                                <span className="text-muted" style={{fontSize: '0.7rem'}}>{log.tanggal}</span>
                            </div>
                            <div className="small text-muted">{log.ket}</div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </Col>

        {/* KOLOM KANAN: DATA DETAIL & DOKUMEN */}
        <Col lg={8}>
            <Card className="shadow-sm border-0">
                <Card.Body className="p-0">
                    <Tab.Container defaultActiveKey="info">
                        <Nav variant="tabs" className="px-3 pt-3 border-bottom-0">
                            <Nav.Item>
                                <Nav.Link eventKey="info" className="fw-semibold">Data Permohonan</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="dokumen" className="fw-semibold">Dokumen ({detailData.dokumen.length})</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        
                        <Tab.Content className="p-4 bg-white rounded-bottom">
                            {/* TAB 1: DATA PERMOHONAN */}
                            <Tab.Pane eventKey="info">
                                <h5 className="fw-bold text-primary mb-4">{detailData.jenis_izin}</h5>
                                
                                <h6 className="fw-bold border-bottom pb-2 mb-3">Data Pemohon</h6>
                                <Row className="mb-2">
                                    <Col sm={4} className="text-muted">Nama Lengkap</Col>
                                    <Col sm={8} className="fw-medium">{detailData.data_pemohon.nama}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4} className="text-muted">NIK</Col>
                                    <Col sm={8} className="fw-medium">{detailData.data_pemohon.nik}</Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col sm={4} className="text-muted">Alamat</Col>
                                    <Col sm={8} className="fw-medium">{detailData.data_pemohon.alamat}</Col>
                                </Row>

                                <h6 className="fw-bold border-bottom pb-2 mb-3">Data Kendaraan / Usaha</h6>
                                <Row className="mb-2">
                                    <Col sm={4} className="text-muted">No. Polisi</Col>
                                    <Col sm={8} className="fw-medium">{detailData.data_kendaraan.no_polisi}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4} className="text-muted">Merk/Tipe</Col>
                                    <Col sm={8} className="fw-medium">{detailData.data_kendaraan.merk}</Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col sm={4} className="text-muted">Rute Trayek</Col>
                                    <Col sm={8} className="fw-medium">{detailData.data_kendaraan.rute}</Col>
                                </Row>
                            </Tab.Pane>

                            {/* TAB 2: DOKUMEN */}
                            <Tab.Pane eventKey="dokumen">
                                <Alert variant="info" className="small mb-4">
                                    Berikut adalah dokumen yang telah Anda unggah. Klik tombol "Lihat" untuk pratinjau.
                                </Alert>
                                <ListGroup>
                                    {detailData.dokumen.map((doc, idx) => (
                                        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-danger bg-opacity-10 p-2 rounded me-3 text-danger">
                                                    <FaFilePdf size={24} />
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{doc.nama}</div>
                                                    <div className="small text-muted">{doc.file}</div>
                                                </div>
                                            </div>
                                            <Button variant="outline-primary" size="sm">Lihat</Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailPengajuan;