import React, { useState, useRef } from 'react';
import { Container, Card, Form, Button, Row, Col, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserEdit, FaSave, FaTimes, FaFilePdf, FaBuilding, FaUser, FaCheckCircle, FaCamera } from 'react-icons/fa';

const ProfilSaya = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Ref untuk input file 
  const fileInputRef = useRef(null);

  // State Data Pengguna
  const [userData, setUserData] = useState({
    nama: "Raditya Fajar Ramadhani",
    email: "raditya.23417@mhs.unesa.ac.id",
    telepon: "081234567890",
    alamat: "Jl. Ketintang No. 12, Surabaya",
    role: "Perorangan",
    nik: "3578123456780001",
    dokumen: [
      { nama: "KTP", file: "ktp_raditya.pdf" }
    ]
  });

  // State khusus untuk Preview Foto Profil
  const [photoPreview, setPhotoPreview] = useState(null);

  // Handle Ganti Foto (Frontend Preview Only)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Membuat URL sementara agar gambar bisa tampil tanpa upload server
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setShowSuccessModal(true);
  };

  return (
    <Container className="py-5">
      {/* Header Navigasi */}
      <div className="d-flex align-items-center mb-4">
        <Button 
            variant="light" 
            className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
            onClick={() => navigate('/dashboard-pemohon')}
            style={{ width: '40px', height: '40px' }}
        >
        <FaArrowLeft />
        </Button>
        <h3 className="fw-bold mb-0">Profil Saya</h3>
      </div>

      <Row>
        {/* KOLOM KIRI */}
        <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm text-center p-4 h-100">
                
                {/* BAGIAN FOTO PROFIL */}
                <div className="mx-auto mb-3 position-relative d-inline-block">
                    <div 
                        className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center mx-auto border border-3 border-light shadow-sm" 
                        style={{width: 130, height: 130, backgroundColor: '#f8f9fa'}}
                    >
                        {photoPreview ? (
                            // Jika sudah ada foto yang dipilih/diupload
                            <img src={photoPreview} alt="Profil" className="w-100 h-100 object-fit-cover" />
                        ) : (
                            // Jika belum ada foto 
                            userData.role === 'Perusahaan' ? 
                                <FaBuilding size={50} className="text-secondary opacity-50"/> : 
                                <FaUser size={50} className="text-secondary opacity-50"/>
                        )}
                    </div>

                    {/* Tombol Edit Foto (Hanya Muncul saat Mode Edit) */}
                    {isEditing && (
                        <>
                            <div 
                                className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 shadow-sm border border-2 border-white"
                                style={{cursor: 'pointer', width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                onClick={() => fileInputRef.current.click()}
                                title="Ubah Foto"
                            >
                                <FaCamera size={14} />
                            </div>
                            {/* Input File Tersembunyi */}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                style={{display: 'none'}} 
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </>
                    )}
                </div>

                <h5 className="fw-bold mt-2">{userData.nama}</h5>
                <p className="text-muted small mb-2">{userData.email}</p>
                <div>
                    <Badge bg={userData.role === 'Perusahaan' ? 'warning' : 'success'} text="dark" className="px-3 py-2 rounded-pill">
                        Akun {userData.role}
                    </Badge>
                </div>
            </Card>
        </Col>

        {/* KOLOM KANAN: FORMULIR DETAIL */}
        <Col md={8}>
            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
                    <h6 className="fw-bold mb-0 text-primary">Informasi Akun & Kontak</h6>
                    {!isEditing && (
                        <Button variant="outline-primary" size="sm" onClick={() => setIsEditing(true)}>
                            <FaUserEdit className="me-2"/> Edit Profil
                        </Button>
                    )}
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSave}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small text-muted">Nama Lengkap</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="nama"
                                        value={userData.nama} 
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="fw-bold"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small text-muted">NIK / NPWP</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={userData.nik} 
                                        disabled 
                                        className="bg-light"
                                    />
                                    <Form.Text className="text-muted" style={{fontSize: '0.7rem'}}>
                                        *NIK tidak dapat diubah. Hubungi Admin jika ada kesalahan.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small text-muted">Nomor Telepon/WA</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="telepon"
                                        value={userData.telepon} 
                                        onChange={handleChange}
                                        disabled={!isEditing} 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small text-muted">Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        value={userData.email} 
                                        disabled 
                                        className="bg-light"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4">
                            <Form.Label className="small text-muted">Alamat Lengkap</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                name="alamat"
                                value={userData.alamat} 
                                onChange={handleChange}
                                disabled={!isEditing} 
                            />
                        </Form.Group>

                        <h6 className="fw-bold text-primary mb-3 pt-3 border-top">Dokumen Legalitas</h6>
                        {userData.dokumen.map((doc, idx) => (
                            <div key={idx} className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2 border">
                                <div className="d-flex align-items-center">
                                    <FaFilePdf className="text-danger me-3" size={24} />
                                    <div>
                                        <div className="fw-bold small">{doc.nama}</div>
                                        <div className="text-muted" style={{fontSize: '0.75rem'}}>{doc.file}</div>
                                    </div>
                                </div>
                                <Button variant="link" size="sm" className="text-decoration-none">Lihat</Button>
                            </div>
                        ))}

                        {isEditing && (
                            <div className="d-flex gap-2 justify-content-end mt-4 pt-3 border-top">
                                <Button variant="light" onClick={() => setIsEditing(false)}>
                                    <FaTimes className="me-1"/> Batal
                                </Button>
                                <Button variant="success" type="submit">
                                    <FaSave className="me-1"/> Simpan Perubahan
                                </Button>
                            </div>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Col>
      </Row>

      {/* MODAL POPUP SUKSES */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Body className="text-center p-5">
            <div className="mb-3 text-success">
                <FaCheckCircle size={60} />
            </div>
            <h4 className="fw-bold mb-3">Berhasil Disimpan!</h4>
            <p className="text-muted mb-4">Data profil dan foto Anda telah berhasil diperbarui.</p>
            <Button variant="success" className="px-4 rounded-pill fw-bold" onClick={() => setShowSuccessModal(false)}>
                Oke, Mengerti
            </Button>
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default ProfilSaya;