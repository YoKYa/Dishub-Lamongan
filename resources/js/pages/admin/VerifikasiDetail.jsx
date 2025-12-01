import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaCar, FaFilePdf, FaCheckCircle, FaTimesCircle, FaHistory } from 'react-icons/fa';

const VerifikasiDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State untuk Modal
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");

  // Data Dummy 
  const data = {
    reg: "REG-2025-001",
    jenis: "Izin Trayek Angkutan Umum",
    pemohon: { nama: "Budi Santoso", nik: "3524xxxxxxxx0001", alamat: "Jl. Merdeka No. 45", telp: "08123456789" },
    kendaraan: { nopol: "S 1234 UJ", merk: "Mitsubishi Colt", tahun: "2020", rute: "Pasar - Terminal" },
    dokumen: [
      { label: "KTP Pemohon", file: "ktp.pdf" },
      { label: "STNK Kendaraan", file: "stnk.pdf" },
      { label: "Bukti Uji KIR", file: "kir.pdf" }
    ]
  };

  // LOGIKA APPROVE 
  const handleApprove = () => {
    // Simulasi API call approve
    setShowApproveModal(false);
    alert("Pengajuan DISETUJUI! Surat Izin Digital telah diterbitkan.");
    navigate('/dashboard-admin');
  };

  // LOGIKA TOLAK 
  const handleReject = () => {
    if(!alasanTolak) return alert("Mohon isi alasan penolakan!");
    // Simulasi API call reject
    setShowRejectModal(false);
    alert("Pengajuan DITOLAK. Notifikasi dikirim ke pemohon.");
    navigate('/dashboard-admin');
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
                <Button 
                    variant="light" 
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
                    onClick={() => navigate('/admin/verifikasi')}
                    style={{ width: '40px', height: '40px' }} 
                >
                <FaArrowLeft />
                </Button>
                <div>
                    <h4 className="fw-bold mb-0">Verifikasi Dokumen</h4>
                    <span className="text-muted small">No. Reg: {data.reg}</span>
                </div>
            </div>
            <div className="d-flex gap-2">
                <Button variant="danger" onClick={() => setShowRejectModal(true)}>
                    <FaTimesCircle className="me-2"/> Tolak / Revisi
                </Button>
                <Button variant="success" onClick={() => setShowApproveModal(true)}>
                    <FaCheckCircle className="me-2"/> Setujui & Terbitkan Izin
                </Button>
            </div>
        </div>

        <Row>
            {/* KOLOM KIRI: DATA TEXT */}
            <Col md={5}>
                <Card className="shadow-sm border-0 mb-4">
                    <Card.Header className="bg-white fw-bold text-primary"><FaUser className="me-2"/> Data Pemohon</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <small className="text-muted d-block">Nama Lengkap</small>
                            <strong>{data.pemohon.nama}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small className="text-muted d-block">NIK</small>
                            {data.pemohon.nik}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small className="text-muted d-block">Alamat</small>
                            {data.pemohon.alamat}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className="shadow-sm border-0">
                    <Card.Header className="bg-white fw-bold text-primary"><FaCar className="me-2"/> Data Kendaraan/Usaha</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <small className="text-muted d-block">Jenis Izin</small>
                            <strong>{data.jenis}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small className="text-muted d-block">No. Polisi</small>
                            {data.kendaraan.nopol}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small className="text-muted d-block">Trayek</small>
                            {data.kendaraan.rute}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

            {/* KOLOM KANAN: PREVIEW DOKUMEN (Sesuai SDD Hal 40) */}
            <Col md={7}>
                <Card className="shadow-sm border-0 h-100">
                    <Card.Header className="bg-white fw-bold text-primary"><FaFilePdf className="me-2"/> Pemeriksaan Dokumen</Card.Header>
                    <Card.Body className="bg-light">
                        <Alert variant="info" className="small mb-3">
                            <FaHistory className="me-2"/> Silakan klik tombol "Lihat" untuk memeriksa keaslian dokumen.
                        </Alert>
                        <div className="d-grid gap-3">
                            {data.dokumen.map((doc, idx) => (
                                <div key={idx} className="bg-white p-3 rounded border d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-danger bg-opacity-10 p-2 rounded text-danger me-3"><FaFilePdf/></div>
                                        <div>
                                            <div className="fw-bold small">{doc.label}</div>
                                            <div className="text-muted small">{doc.file}</div>
                                        </div>
                                    </div>
                                    <Button variant="outline-primary" size="sm">Lihat File</Button>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>

      {/* MODAL APPROVE (Sesuai SDD Hal 40 - Approve) */}
      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
        <Modal.Header closeButton>
            <Modal.Title className="fw-bold text-success">Konfirmasi Persetujuan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Apakah Anda yakin data ini sudah <strong>LENGKAP</strong> dan <strong>VALID</strong>?</p>
            <p className="small text-muted">Tindakan ini akan otomatis menerbitkan Surat Izin Digital untuk pemohon.</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={() => setShowApproveModal(false)}>Batal</Button>
            <Button variant="success" onClick={handleApprove}>Ya, Terbitkan Izin</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL REJECT (Sesuai SDD Hal 41 - Permohonan Ditolak) */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
        <Modal.Header closeButton>
            <Modal.Title className="fw-bold text-danger">Tolak / Revisi Pengajuan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group>
                <Form.Label className="fw-bold">Masukkan Alasan Penolakan / Catatan Revisi:</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={4} 
                    placeholder="Contoh: Foto KTP buram, mohon upload ulang..." 
                    value={alasanTolak}
                    onChange={(e) => setAlasanTolak(e.target.value)}
                />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={() => setShowRejectModal(false)}>Batal</Button>
            <Button variant="danger" onClick={handleReject}>Kirim Penolakan</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default VerifikasiDetail;