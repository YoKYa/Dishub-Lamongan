import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { router, Head } from '@inertiajs/react';
import { FaArrowLeft, FaUpload, FaCheckCircle, FaBus, FaWarehouse, FaTruck, FaMapMarkedAlt, FaParking, FaClipboardCheck, FaFileContract, FaSave } from 'react-icons/fa';

export default function AjukanPermohonan() {
  // State Management
  const [selectedIzin, setSelectedIzin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const izinConfig = [
    {
      id: 1,
      nama: 'Izin Trayek Angkutan Umum',
      icon: <FaBus size={30} />,
      deskripsi: 'Izin untuk operasional trayek angkutan umum dalam kota/kabupaten.',
      fields: [
        { label: 'Nama Pemohon / Perusahaan', type: 'text', placeholder: 'Masukkan nama lengkap' },
        { label: 'Nomor Kendaraan (Nopol)', type: 'text', placeholder: 'Contoh: S 1234 XXX' },
        { label: 'Rute Trayek yang Dimohon', type: 'text', placeholder: 'Contoh: Pasar Lamongan - Terminal' }
      ],
      docs: [
        { label: 'KTP Pemohon', accept: '.pdf,.jpg' },
        { label: 'STNK Kendaraan', accept: '.pdf,.jpg' },
        { label: 'Bukti Lulus Uji KIR', accept: '.pdf,.jpg' }
      ]
    },
    {
      id: 2,
      nama: 'Izin Pemanfaatan Lahan Terminal',
      icon: <FaWarehouse size={30} />,
      deskripsi: 'Izin penggunaan lahan di area terminal untuk usaha atau kegiatan.',
      fields: [
        { label: 'Nama Pemohon', type: 'text', placeholder: 'Nama Lengkap' },
        { label: 'Nama Terminal', type: 'text', placeholder: 'Terminal yang dituju' },
        { label: 'Jenis Usaha', type: 'text', placeholder: 'Contoh: Kios Makanan / Loket' }
      ],
      docs: [
        { label: 'Surat Permohonan Pemanfaatan', accept: '.pdf' },
        { label: 'Denah Lokasi', accept: '.pdf,.jpg' },
        { label: 'Fotokopi KTP Pemohon', accept: '.pdf,.jpg' },
        { label: 'NPWP Perusahaan', accept: '.pdf,.jpg' },
        { label: 'Surat Kuasa (Jika diwakilkan)', accept: '.pdf' },
        { label: 'Surat Rekomendasi Dishub (Jika ada)', accept: '.pdf' }
      ]
    },
    {
      id: 3,
      nama: 'Pendaftaran Uji KIR',
      icon: <FaClipboardCheck size={30} />,
      deskripsi: 'Pendaftaran pengujian kendaraan bermotor berkala.',
      fields: [
        { label: 'Nama Pemilik (Sesuai STNK)', type: 'text', placeholder: 'Nama Lengkap' },
        { label: 'Nomor Kendaraan', type: 'text', placeholder: 'S 1234 XXX' },
        { label: 'Jenis Kendaraan', type: 'text', placeholder: 'Truck / Pick Up / Bus' }
      ],
      docs: [
        { label: 'Dokumen Digital STNK', accept: '.pdf,.jpg' },
        { label: 'Bukti Pembayaran Retribusi', accept: '.pdf,.jpg' }
      ]
    },
    {
      id: 4,
      nama: 'Izin Operasional Angkutan Barang',
      icon: <FaTruck size={30} />,
      deskripsi: 'Izin operasional untuk kendaraan pengangkut barang logistik/material.',
      fields: [
        { label: 'Nama Perusahaan / Usaha', type: 'text', placeholder: 'Nama Usaha' },
        { label: 'Nomor Kendaraan', type: 'text', placeholder: 'S 1234 XXX' },
        { label: 'Jenis Muatan', type: 'text', placeholder: 'Contoh: Sembako / Material' }
      ],
      docs: [
        { label: 'KTP atau Akta Pendirian Usaha', accept: '.pdf' },
        { label: 'STNK Kendaraan', accept: '.pdf,.jpg' },
        { label: 'Bukti Lulus Uji KIR', accept: '.pdf,.jpg' }
      ]
    },
    {
      id: 5,
      nama: 'Izin Angkutan Pariwisata',
      icon: <FaMapMarkedAlt size={30} />,
      deskripsi: 'Izin operasional untuk armada bus atau kendaraan wisata.',
      fields: [
        { label: 'Nama PO / Perusahaan', type: 'text', placeholder: 'Nama Perusahaan Otobus' },
        { label: 'Jumlah Armada', type: 'number', placeholder: 'Jumlah unit' },
        { label: 'Alamat Garasi', type: 'text', placeholder: 'Alamat lengkap garasi' }
      ],
      docs: [
        { label: 'Akta Pendirian Usaha', accept: '.pdf' },
        { label: 'NPWP Perusahaan', accept: '.pdf,.jpg' },
        { label: 'STNK Kendaraan', accept: '.pdf,.jpg' },
        { label: 'Bukti Lulus Uji KIR', accept: '.pdf,.jpg' },
        { label: 'Foto Kendaraan (Depan/Samping/Belakang)', accept: '.pdf,.jpg' }
      ]
    },
    {
      id: 6,
      nama: 'Izin Penggunaan Terminal',
      icon: <FaFileContract size={30} />,
      deskripsi: 'Izin penggunaan fasilitas terminal untuk event atau kegiatan insidentil.',
      fields: [
        { label: 'Nama Penanggung Jawab', type: 'text', placeholder: 'Nama Lengkap' },
        { label: 'Tujuan Penggunaan', type: 'text', placeholder: 'Contoh: Pameran / Bazar' },
        { label: 'Tanggal Pelaksanaan', type: 'date', placeholder: '' }
      ],
      docs: [
        { label: 'Surat Permohonan', accept: '.pdf' },
        { label: 'Identitas Penanggung Jawab (KTP)', accept: '.pdf,.jpg' },
        { label: 'Bukti Pembayaran Retribusi', accept: '.pdf,.jpg' }
      ]
    },
    {
      id: 7,
      nama: 'Izin Usaha Perparkiran',
      icon: <FaParking size={30} />,
      deskripsi: 'Izin pengelolaan lahan parkir di area pengawasan Dishub.',
      fields: [
        { label: 'Nama Pengelola / Badan Usaha', type: 'text', placeholder: 'Nama Pengelola' },
        { label: 'Lokasi Lahan Parkir', type: 'text', placeholder: 'Alamat Lokasi' },
        { label: 'Estimasi Kapasitas (Unit)', type: 'number', placeholder: 'Jumlah kendaraan' }
      ],
      docs: [
        { label: 'Proposal Lokasi', accept: '.pdf' },
        { label: 'Denah Lahan Parkir', accept: '.pdf,.jpg' },
        { label: 'NPWP', accept: '.pdf,.jpg' },
        { label: 'Surat Rekomendasi Dishub', accept: '.pdf' }
      ]
    }
  ];


  // Fungsi Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulasi pengiriman data ke backend
    setTimeout(() => {
      router.visit('/dashboard');
    }, 3000);
  };

  // Fungsi Simpan Draft
  const handleSaveDraft = () => {
    // Logika simpan ke LocalStorage/API bisa diletakkan di sini
    setShowDraftModal(true);
  };

  // Fungsi Tutup Modal Draft
  const handleCloseDraftModal = () => {
    setShowDraftModal(false);
    router.visit('/draft'); 
  };

  // TAMPILAN 1: MENU PILIHAN JENIS IZIN
  if (!selectedIzin) {
    return (
      <Container className="py-5">
        <Head title="Ajukan Permohonan" />
        
        <div className="d-flex align-items-center mb-4">
            <Button 
              variant="light" 
              className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
              onClick={() => router.visit('/dashboard')}
              style={{ width: '40px', height: '40px' }} 
            >
            <FaArrowLeft />
            </Button>
            <div>
                <h2 className="fw-bold mb-0">Buat Permohonan Baru</h2>
                <p className="text-muted mb-0">Silakan pilih jenis layanan perizinan yang Anda butuhkan.</p>
            </div>
        </div>
        
        <Row className="g-4">
            {izinConfig.map((izin) => (
                <Col md={6} lg={4} key={izin.id}>
                    <Card 
                        className="h-100 shadow-sm border-0 hover-card" 
                        style={{cursor: 'pointer', transition: '0.3s'}}
                        onClick={() => setSelectedIzin(izin)}
                    >
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center mb-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                                    {izin.icon}
                                </div>
                                <h5 className="fw-bold text-dark mb-0" style={{fontSize: '1rem'}}>{izin.nama}</h5>
                            </div>
                            <p className="text-muted small mb-0">{izin.deskripsi}</p>
                            <div className="mt-3 text-end">
                                <span className="text-primary small fw-bold text-decoration-none">Pilih Layanan &rarr;</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
      </Container>
    );
  }

  // TAMPILAN 2: FORMULIR PENGISIAN DATA (DINAMIS)
  return (
    <Container className="py-5">
        <Head title={`Formulir ${selectedIzin.nama}`} />

        {/* Header Form */}
        <div className="d-flex align-items-center mb-4 border-bottom pb-3">
            <Button 
              variant="light" 
              className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0" 
              onClick={() => setSelectedIzin(null)}
              style={{ width: '40px', height: '40px' }}
            >
            <FaArrowLeft />
            </Button>
            <div>
                <span className="text-muted small text-uppercase fw-bold">Formulir Pengajuan</span>
                <h3 className="fw-bold mb-0 text-primary">{selectedIzin.nama}</h3>
            </div>
        </div>

        {/* Notifikasi Sukses */}
        {submitted ? (
            <Alert variant="success" className="text-center p-5 shadow-sm border-0">
                <div className="mb-3 text-success">
                    <FaCheckCircle size={60} />
                </div>
                <h4 className="fw-bold">Pengajuan Berhasil Dikirim!</h4>
                <p className="mb-4">Data Anda telah masuk ke sistem dan sedang menunggu verifikasi Admin.</p>
                <p className="small text-muted">Anda akan dialihkan ke Dashboard dalam 3 detik...</p>
                <Button variant="outline-success" onClick={() => router.visit('/dashboard-pemohon')}>Kembali ke Dashboard</Button>
            </Alert>
        ) : (
            <Row>
                <Col md={10} lg={8} className="mx-auto">
                    <Card className="shadow border-0 rounded-4">
                        <Card.Body className="p-5">
                            <Form onSubmit={handleSubmit}>
                                {/* Bagian 1: Data Permohonan */}
                                <div className="mb-5">
                                    <h5 className="fw-bold mb-4 text-dark d-flex align-items-center">
                                        <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{width: 30, height: 30, fontSize: 14}}>1</span>
                                        Data Permohonan
                                    </h5>
                                    <div className="bg-light p-4 rounded-3">
                                        {selectedIzin.fields.map((field, idx) => (
                                            <Form.Group className="mb-3" key={idx}>
                                                <Form.Label className="fw-semibold small text-secondary">{field.label} <span className="text-danger">*</span></Form.Label>
                                                <Form.Control 
                                                    type={field.type} 
                                                    placeholder={field.placeholder} 
                                                    required 
                                                    className="py-2"
                                                />
                                            </Form.Group>
                                        ))}
                                    </div>
                                </div>

                                {/* Bagian 2: Upload Dokumen */}
                                <div className="mb-5">
                                    <h5 className="fw-bold mb-3 text-dark d-flex align-items-center">
                                        <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{width: 30, height: 30, fontSize: 14}}>2</span>
                                        Dokumen Persyaratan
                                    </h5>
                                    <Alert variant="info" className="d-flex align-items-center small border-0 bg-info bg-opacity-10 text-info-emphasis">
                                        <FaClipboardCheck className="me-2" size={20} />
                                        <div>Pastikan dokumen yang diunggah terlihat jelas, tidak buram, dan sesuai format (PDF/JPG).</div>
                                    </Alert>
                                    
                                    <div className="vstack gap-3">
                                        {selectedIzin.docs.map((doc, idx) => (
                                            <Card key={idx} className="border shadow-none">
                                                <Card.Body className="d-flex align-items-center justify-content-between p-3">
                                                    <div>
                                                        <Form.Label className="fw-bold mb-1 small">{doc.label} <span className="text-danger">*</span></Form.Label>
                                                        <div className="text-muted" style={{fontSize: '0.75rem'}}>Format: {doc.accept}</div>
                                                    </div>
                                                    <div style={{width: '200px'}}>
                                                        <Form.Control type="file" size="sm" accept={doc.accept} required />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="d-grid gap-2 pt-3">
                                    <Row>
                                        <Col md={6}>
                                            <Button 
                                                variant="outline-warning" 
                                                size="lg" 
                                                className="w-100 fw-bold py-3 shadow-sm mb-2 mb-md-0 d-flex align-items-center justify-content-center gap-2" 
                                                onClick={handleSaveDraft}
                                                type="button"
                                            >
                                                <FaSave /> Simpan Sebagai Draft
                                            </Button>
                                        </Col>
                                        <Col md={6}>
                                            <Button variant="primary" size="lg" type="submit" className="w-100 fw-bold py-3 shadow-sm">
                                                Kirim Pengajuan Izin
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Button variant="link" className="text-decoration-none text-muted mt-2" onClick={() => setSelectedIzin(null)}>
                                        Batalkan
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )}

        {/* MODAL POPUP: SUKSES SIMPAN DRAFT */}
        <Modal show={showDraftModal} onHide={handleCloseDraftModal} centered>
            <Modal.Body className="text-center p-5">
                <div className="mb-3 text-warning">
                    <FaSave size={50} />
                </div>
                <h4 className="fw-bold mb-3">Berhasil Disimpan!</h4>
                <p className="text-muted mb-4">
                    Data Anda telah disimpan sebagai <strong>Draft</strong>. <br/>
                    Anda dapat melanjutkannya nanti melalui menu "Draft Pengajuan".
                </p>
                <Button variant="warning" className="px-4 text-white fw-bold" onClick={handleCloseDraftModal}>
                    Lihat Daftar Draft
                </Button>
            </Modal.Body>
        </Modal>

    </Container>
  );
};