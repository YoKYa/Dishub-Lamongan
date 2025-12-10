import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { router, Head, usePage } from '@inertiajs/react';
import { FaArrowLeft, FaPrint, FaQrcode } from 'react-icons/fa';

export default function SuratIzin() {
    const { props }: any = usePage();
    const surat = props.surat;

    if (!surat) {
        return (
            <Container className="text-center py-5">
                <p className="text-muted">Surat tidak ditemukan.</p>
            </Container>
        );
    }

    const handlePrint = () => window.print();

    return (
        <div className="bg-light min-vh-100 py-5">
            <Head title={`Surat Izin - ${surat.nomor}`} />

            <Container>
                {/* NAVIGASI */}
                <div className="d-flex align-items-center justify-content-between mb-4 d-print-none">
                    <div className="d-flex align-items-center">
                        <Button
                            variant="light"
                            className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                            onClick={() => router.visit('/daftar-surat')}
                            style={{ width: '40px', height: '40px' }}
                        >
                            <FaArrowLeft />
                        </Button>

                        <div>
                            <h3 className="fw-bold mb-0">Preview Dokumen</h3>
                            <span className="text-muted small">
                                Nomor: {surat.nomor}
                            </span>
                        </div>
                    </div>

                    <Button variant="primary" onClick={handlePrint}>
                        <FaPrint className="me-2" /> Cetak / Simpan PDF
                    </Button>
                </div>

                {/* AREA SURAT */}
                <Card
                    className="shadow-lg border-0 mx-auto"
                    style={{
                        maxWidth: '210mm',
                        minHeight: '297mm',
                        padding: '15mm 20mm',
                        background: 'white'
                    }}
                >
                    <Card.Body className="p-0 text-black" style={{ fontSize: '1rem' }}>

                        {/* KOP */}
                        <div className="text-center mb-4">
                            <h5 className="fw-bold text-uppercase mb-1">Pemerintah Kabupaten Lamongan</h5>
                            <h4 className="fw-bold text-uppercase">Dinas Perhubungan</h4>

                            <div style={{
                                borderBottom: '4px double black',
                                width: '100%',
                                marginTop: '10px'
                            }} />
                        </div>

                        {/* JUDUL */}
                        <div className="text-center mb-5">
                            <h5 className="fw-bold text-uppercase text-decoration-underline mb-1">
                                {surat.judul}
                            </h5>
                            <p className="fw-bold">Nomor: {surat.nomor}</p>
                        </div>

                        {/* ISI */}
                        <div style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                            <p>
                                Kepala Dinas Perhubungan Kabupaten Lamongan dengan ini memberikan izin kepada:
                            </p>

                            <div className="ps-3 mb-4">
                                <Row><Col xs={4}>Nama</Col><Col xs={1}>:</Col><Col xs={7}>{surat.nama}</Col></Row>
                                <Row><Col xs={4}>Perusahaan</Col><Col xs={1}>:</Col><Col xs={7}>{surat.usaha || '-'}</Col></Row>
                                <Row><Col xs={4}>{surat.objek?.label || 'Objek'}</Col><Col xs={1}>:</Col><Col xs={7}>{surat.objek?.value || '-'}</Col></Row>
                            </div>

                            <p className="fw-bold mb-2">Keterangan Teknis:</p>
                            <div className="ps-3 mb-4 p-2 bg-light border rounded">
                                {surat.detail}
                            </div>

                            <p>
                                Izin ini berlaku selama <strong>5 (lima) tahun</strong> sejak tanggal diterbitkan.
                            </p>
                        </div>

                        {/* TTD */}
                        <Row className="mt-5 pt-4">
                            <Col xs={6} className="text-center">
                                <FaQrcode size={90} />
                                <p className="small text-muted mt-2">
                                    Ditandatangani secara elektronik
                                </p>
                            </Col>

                            <Col xs={6} className="text-center">
                                <p>Ditetapkan di Lamongan</p>
                                <p>Pada tanggal: {surat.tanggal}</p>

                                <p className="fw-bold mt-5">KEPALA DINAS PERHUBUNGAN</p>

                                <p className="fw-bold text-decoration-underline mt-5">
                                    Drs. HERU WIDODO, M.M.
                                </p>

                                <p>NIP. 19700101 199003 1 001</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* PRINT CSS */}
                <style>
                    {`
                    @media print {
                        body * {
                            visibility: hidden !important;
                        }
                        .card, .card * {
                            visibility: visible !important;
                        }
                        .card {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100% !important;
                            box-shadow: none !important;
                        }
                        .d-print-none {
                            display: none !important;
                        }
                    }
                `}
                </style>
            </Container>
        </div>
    );
}
