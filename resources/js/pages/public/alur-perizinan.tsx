import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    Button,
    Col,
    Container,
    ListGroup,
    Modal,
    Row,
    Tab,
    Tabs,
} from 'react-bootstrap';

// Data moved outside component to ensure stability and avoid dependency issues
const daftarIzin = [
    {
        id: 1,
        nama: 'Izin Trayek Angkutan Umum',
        syarat: [
            'KTP Pemohon',
            'STNK Kendaraan',
            'Bukti Lulus Uji KIR',
            'Data Kendaraan Lengkap',
        ],
        alur: [
            'Login Pemohon',
            'Isi Formulir',
            'Unggah Dokumen',
            'Verifikasi Admin',
            'Terbit Izin',
        ],
    },
    {
        id: 2,
        nama: 'Izin Pemanfaatan Lahan Terminal',
        syarat: [
            'Surat Permohonan',
            'Denah Lokasi',
            'KTP Pemohon',
            'NPWP',
            'Surat Kuasa',
            'Rekomendasi Dishub',
        ],
        alur: [
            'Login',
            'Pilih Menu',
            'Isi Form & Upload',
            'Verifikasi Data',
            'Cek Status',
            'Terbit Izin',
            'Unduh',
        ],
    },
    {
        id: 3,
        nama: 'Pendaftaran Uji KIR',
        syarat: ['Dokumen Digital STNK', 'Bukti Pembayaran Retribusi'],
        alur: [
            'Login',
            'Isi Data Kendaraan',
            'Unggah Syarat',
            'Simpan',
            'Verifikasi & Jadwal',
            'Uji Fisik',
            'Terbit Kartu',
        ],
    },
    {
        id: 4,
        nama: 'Izin Operasional Angkutan Barang',
        syarat: ['KTP/Akta Usaha', 'STNK Kendaraan', 'Bukti Lulus Uji KIR'],
        alur: [
            'Login',
            'Isi Data',
            'Unggah Dokumen',
            'Ajukan',
            'Verifikasi Admin',
            'Terbit Izin',
        ],
    },
    {
        id: 5,
        nama: 'Izin Angkutan Pariwisata',
        syarat: [
            'Akta Usaha',
            'NPWP',
            'STNK Kendaraan',
            'Bukti Uji KIR',
            'Foto Kendaraan',
        ],
        alur: [
            'Login',
            'Isi Form',
            'Unggah Syarat',
            'Kirim',
            'Validasi',
            'Verifikasi',
            'Terbit Izin',
        ],
    },
    {
        id: 6,
        nama: 'Izin Penggunaan Terminal',
        syarat: ['Surat Permohonan', 'Identitas Pemohon', 'Bukti Retribusi'],
        alur: [
            'Login',
            'Isi Data',
            'Unggah Dokumen',
            'Ajukan',
            'Verifikasi',
            'Terbit Izin',
        ],
    },
    {
        id: 7,
        nama: 'Izin Usaha Perparkiran',
        syarat: [
            'Proposal Lokasi',
            'Denah Parkir',
            'NPWP',
            'Surat Rekomendasi Dishub',
        ],
        alur: [
            'Login',
            'Isi Form',
            'Unggah Dokumen',
            'Ajukan',
            'Simpan',
            'Verifikasi',
            'Terbit Izin',
        ],
    },
];

export default function AlurPerizinan() {
    // --- LOGIC INISIALISASI STATE (Pengganti useEffect) ---
    const getInitialState = () => {
        // Cek apakah kode berjalan di browser (Client Side)
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);
            const idParam = queryParams.get('selectedId');

            if (idParam) {
                const found = daftarIzin.find(
                    (item) => item.id === parseInt(idParam),
                );
                if (found) {
                    return { izin: found, open: true };
                }
            }
        }
        return { izin: null, open: false };
    };

    const initialState = getInitialState();

    // State Modal & Data (Diisi langsung dengan initialState)
    const [selectedIzin, setSelectedIzin] = useState(initialState.izin);
    const [showModal, setShowModal] = useState(initialState.open);

    // State untuk mendeteksi apakah user datang dari Landing Page (via URL param)
    const [isDirectAccess, setIsDirectAccess] = useState(initialState.open);

    // ------------------------------------------------------

    // FUNGSI BUKA MANUAL (Klik tombol di halaman ini)
    const handleShow = (
        izin: React.SetStateAction<{
            id: number;
            nama: string;
            syarat: string[];
            alur: string[];
        } | null>,
    ) => {
        setSelectedIzin(izin);
        setShowModal(true);
        setIsDirectAccess(false); // Akses manual, tutup modal tidak redirect
    };

    const handleClose = () => {
        setShowModal(false);

        // Jika modal dibuka otomatis dari Landing Page (via URL), kembalikan ke Home saat ditutup
        if (isDirectAccess) {
            router.visit('/');
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <Head title="Alur Perizinan" />

            {/* Header */}
            <div className="bg-white shadow-sm py-3 mb-4">
                <Container className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-primary">
                        Daftar Perizinan & Syarat
                    </h5>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => router.visit('/')}
                    >
                        Kembali
                    </Button>
                </Container>
            </div>

            <Container className="py-4">
                <h2 className="mb-5 text-center">
                    Pilih Layanan untuk Melihat Detail
                </h2>
                <Row className="g-3 justify-content-center">
                    {daftarIzin.map((izin) => (
                        <Col md={8} key={izin.id}>
                            <div className="d-grid">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="p-3 shadow-sm fw-bold text-start"
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
                    <Tabs
                        defaultActiveKey="syarat"
                        id="detail-izin-tabs"
                        className="mb-3"
                    >
                        <Tab eventKey="syarat" title="Persyaratan">
                            <ListGroup variant="flush">
                                {selectedIzin?.syarat?.map((item, idx) => (
                                    <ListGroup.Item key={idx}>
                                        - {item}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="alur" title="Alur Pengajuan">
                            <ListGroup variant="flush" as="ol" numbered>
                                {selectedIzin?.alur?.map((item, idx) => (
                                    <ListGroup.Item as="li" key={idx}>
                                        {item}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <p className="text-muted small me-auto">
                        Login untuk mengajukan izin ini.
                    </p>

                    {/* Tombol Tutup */}
                    <Button variant="secondary" onClick={handleClose}>
                        Tutup
                    </Button>

                    <Button
                        variant="success"
                        onClick={() => router.visit('/login')}
                    >
                        Ajukan Permohonan
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
