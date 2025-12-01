import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, ListGroup, Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const AlurPerizinan = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [showModal, setShowModal] = useState(false);
  const [selectedIzin, setSelectedIzin] = useState(null);
  
  // State untuk mendeteksi apakah user datang dari Landing Page
  const [isDirectAccess, setIsDirectAccess] = useState(false);

  const daftarIzin = [
    { 
      id: 1, 
      nama: "Izin Trayek Angkutan Umum",
      syarat: ["KTP Pemohon", "STNK Kendaraan", "Bukti Lulus Uji KIR", "Data Kendaraan Lengkap"],
      alur: ["Login Pemohon", "Isi Formulir", "Unggah Dokumen", "Verifikasi Admin", "Terbit Izin"]
    },
    { 
      id: 2, 
      nama: "Izin Pemanfaatan Lahan Terminal",
      syarat: ["Surat Permohonan", "Denah Lokasi", "KTP Pemohon", "NPWP", "Surat Kuasa", "Rekomendasi Dishub"],
      alur: ["Login", "Pilih Menu", "Isi Form & Upload", "Verifikasi Data", "Cek Status", "Terbit Izin", "Unduh"]
    },
    { 
      id: 3, 
      nama: "Pendaftaran Uji KIR",
      syarat: ["Dokumen Digital STNK", "Bukti Pembayaran Retribusi"],
      alur: ["Login", "Isi Data Kendaraan", "Unggah Syarat", "Simpan", "Verifikasi & Jadwal", "Uji Fisik", "Terbit Kartu"]
    },
    { 
      id: 4, 
      nama: "Izin Operasional Angkutan Barang",
      syarat: ["KTP/Akta Usaha", "STNK Kendaraan", "Bukti Lulus Uji KIR"],
      alur: ["Login", "Isi Data", "Unggah Dokumen", "Ajukan", "Verifikasi Admin", "Terbit Izin"]
    },
    { 
      id: 5, 
      nama: "Izin Angkutan Pariwisata",
      syarat: ["Akta Usaha", "NPWP", "STNK Kendaraan", "Bukti Uji KIR", "Foto Kendaraan"],
      alur: ["Login", "Isi Form", "Unggah Syarat", "Kirim", "Validasi", "Verifikasi", "Terbit Izin"]
    },
    { 
      id: 6, 
      nama: "Izin Penggunaan Terminal",
      syarat: ["Surat Permohonan", "Identitas Pemohon", "Bukti Retribusi"],
      alur: ["Login", "Isi Data", "Unggah Dokumen", "Ajukan", "Verifikasi", "Terbit Izin"]
    },
    { 
      id: 7, 
      nama: "Izin Usaha Perparkiran",
      syarat: ["Proposal Lokasi", "Denah Parkir", "NPWP", "Surat Rekomendasi Dishub"],
      alur: ["Login", "Isi Form", "Unggah Dokumen", "Ajukan", "Simpan", "Verifikasi", "Terbit Izin"]
    },
  ];

  // EFEK: Cek asal pengunjung saat halaman dimuat
  useEffect(() => {
    if (location.state && location.state.selectedId) {
      const izinTarget = daftarIzin.find(item => item.id === location.state.selectedId);
      if (izinTarget) {
        setSelectedIzin(izinTarget);
        setShowModal(true);
        setIsDirectAccess(true); // akses langsung dari landing page
      }
    }
  }, [location]);

  // FUNGSI BUKA MANUAL
  const handleShow = (izin) => {
    setSelectedIzin(izin);
    setShowModal(true);
    setIsDirectAccess(false); // akses manual dari dalam halaman
  };

  const handleClose = () => {
    setShowModal(false);
    if (isDirectAccess) {
        navigate('/');
    }
  };

  return (
    <div className="bg-light min-vh-100">
        {/* Header */}
        <div className="bg-white shadow-sm py-3 mb-4">
            <Container className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold text-primary">Daftar Perizinan & Syarat</h5>
                <Button variant="outline-secondary" size="sm" onClick={() => navigate('/')}>Kembali</Button>
            </Container>
        </div>

        <Container className="py-4">
            <h2 className="text-center mb-5">Pilih Layanan untuk Melihat Detail</h2>
            <Row className="g-3 justify-content-center">
                {daftarIzin.map((izin) => (
                    <Col md={8} key={izin.id}>
                        <div className="d-grid">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="text-start p-3 shadow-sm fw-bold"
                                onClick={() => handleShow(izin)}
                            >
                                {izin.nama}
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>

        {/* Modal Detail */}
        <Modal show={showModal} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{selectedIzin?.nama}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="syarat" id="detail-izin-tabs" className="mb-3">
                    <Tab eventKey="syarat" title="Persyaratan">
                        <ListGroup variant="flush">
                            {selectedIzin?.syarat.map((item, idx) => (
                                <ListGroup.Item key={idx}>- {item}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="alur" title="Alur Pengajuan">
                         <ListGroup variant="flush" as="ol" numbered>
                            {selectedIzin?.alur.map((item, idx) => (
                                <ListGroup.Item as="li" key={idx}>{item}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <p className="text-muted small me-auto">Login untuk mengajukan izin ini.</p>
                
                {/* Tombol Tutup */}
                <Button variant="secondary" onClick={handleClose}>Tutup</Button>
                
                <Button variant="success" onClick={() => navigate('/login')}>Ajukan Permohonan</Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default AlurPerizinan;