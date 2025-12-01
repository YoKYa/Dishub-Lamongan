import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaPrint, FaDownload, FaQrcode, FaFileSignature } from 'react-icons/fa';

const SuratIzin = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Tangkap ID dari URL (misal: 1 atau 2)
  const [dataSurat, setDataSurat] = useState(null);

  // Simulasi Ambil Data Berbeda berdasarkan ID
  useEffect(() => {
    // Ini ceritanya database backend
    const databaseSurat = {
      "1": {
        judul: "SURAT IZIN TRAYEK ANGKUTAN UMUM",
        nomor: "551.2/001/Dishub/2025",
        nama: "Budi Santoso",
        usaha: "PO. MAJU JAYA ABADI",
        objek: { label: "Kendaraan", value: "Mitsubishi Colt (S 1234 UJ)" },
        detail: "Trayek: Pasar Lamongan - Terminal - Mantup PP"
      },
      "2": {
        judul: "IZIN PENGELOLAAN PERPARKIRAN",
        nomor: "550/045/Dishub-Parkir/2025",
        nama: "CV. PARKIR AMAN JAYA",
        usaha: "CV. PARKIR AMAN JAYA",
        objek: { label: "Lokasi", value: "Jl. Basuki Rahmat (Depan Pasar)" },
        detail: "Kapasitas: 50 Motor, 10 Mobil. Luas: 200m2"
      }
    };

    setDataSurat(databaseSurat[id]);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!dataSurat) return <Container className="text-center py-5"><Spinner animation="border" /></Container>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* Header Navigasi (Tidak dicetak) */}
        <div className="d-flex align-items-center justify-content-between mb-4 d-print-none">
            <div className="d-flex align-items-center">
                <Button 
                    variant="light" 
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
                    onClick={() => navigate('/daftar-surat')}
                    style={{ width: '40px', height: '40px' }}
                >
                <FaArrowLeft />
                </Button>
                <div>
                    <h3 className="fw-bold mb-0">Preview Dokumen</h3>
                    <span className="text-muted small">ID Surat: {id}</span>
                </div>
            </div>
            <div className="d-flex gap-2">
                <Button variant="primary" onClick={handlePrint} className="shadow-sm">
                    <FaPrint className="me-2" /> Cetak / Simpan PDF
                </Button>
            </div>
        </div>

        {/* KERTAS SURAT A4 */}
        <Card className="shadow-lg border-0 mx-auto" style={{ maxWidth: '210mm', minHeight: '297mm', padding: '15mm 20mm' }}>
            <Card.Body className="p-0 text-black">
                
                {/* KOP SURAT */}
                <div className="border-bottom border-dark border-3 pb-3 mb-4" style={{ borderBottomWidth: '3px !important' }}>
                    <div className="d-flex align-items-center gap-3 text-center justify-content-center">
                        <div style={{width: 70, height: 80, background: '#0d6efd', borderRadius: '50% 50% 5px 5px', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold'}}>LOGO</div>
                        <div className="flex-grow-1 text-uppercase text-center">
                            <h5 className="mb-0 fw-bold" style={{fontSize: '1.2rem'}}>Pemerintah Kabupaten Lamongan</h5>
                            <h4 className="mb-0 fw-bold display-6" style={{fontWeight: '800', letterSpacing: '1px'}}>Dinas Perhubungan</h4>
                            <small className="d-block mt-1">Jl. Jaksa Agung Suprapto No. XX, Tumenggungan, Kec. Lamongan</small>
                        </div>
                    </div>
                </div>

                {/* ISI SURAT DINAMIS */}
                <div className="text-center mb-5 mt-4">
                    <h5 className="fw-bold text-uppercase text-decoration-underline mb-1">{dataSurat.judul}</h5>
                    <p className="mb-0 fw-bold">Nomor: {dataSurat.nomor}</p>
                </div>

                <div className="mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                    <p className="text-justify mb-4">Kepala Dinas Perhubungan Kabupaten Lamongan memberikan izin kepada:</p>
                    <div className="ps-4 mb-4">
                        <Row className="mb-1"><Col xs={4}>Nama Perusahaan</Col><Col xs={1}>:</Col><Col xs={7} className="fw-bold">{dataSurat.usaha}</Col></Row>
                        <Row className="mb-1"><Col xs={4}>Penanggung Jawab</Col><Col xs={1}>:</Col><Col xs={7} className="fw-bold">{dataSurat.nama}</Col></Row>
                        <Row className="mb-1"><Col xs={4}>{dataSurat.objek.label}</Col><Col xs={1}>:</Col><Col xs={7}>{dataSurat.objek.value}</Col></Row>
                    </div>

                    <p className="mb-3">Keterangan Teknis:</p>
                    <div className="ps-4 mb-4 p-3 bg-light border border-secondary rounded-3" style={{ background: '#f8f9fa' }}>
                        <p className="mb-0 fw-bold text-uppercase">{dataSurat.detail}</p>
                    </div>

                    <p className="text-justify">
                        Izin ini berlaku selama 5 (lima) tahun sejak tanggal diterbitkan, dengan kewajiban melakukan daftar ulang setiap tahun.
                    </p>
                </div>

                {/* TANDA TANGAN */}
                <Row className="mt-5 pt-4">
                    <Col xs={6} className="text-center d-flex flex-column justify-content-end align-items-center">
                        <div className="border p-2 mb-2"><FaQrcode size={90} /></div>
                        <p className="small text-muted fst-italic">Dokumen ini sah dan ditandatangani secara elektronik.</p>
                    </Col>
                    <Col xs={6} className="text-center">
                        <p className="mb-1">Ditetapkan di: <strong>Lamongan</strong></p>
                        <p className="mb-4">Pada Tanggal: 22 Oktober 2025</p>
                        <p className="fw-bold mb-5">KEPALA DINAS PERHUBUNGAN<br/>KABUPATEN LAMONGAN</p>
                        <p className="fw-bold text-decoration-underline mt-4 mb-0">Drs. HERU WIDODO, M.M.</p>
                        <p className="mb-0">NIP. 19700101 199003 1 001</p>
                    </Col>
                </Row>

            </Card.Body>
        </Card>

        {/* CSS CETAK */}
        <style>{`@media print { body * { visibility: hidden; } .card, .card * { visibility: visible; } .card { position: absolute; left: 0; top: 0; width: 100%; margin: 0 !important; box-shadow: none !important; border: none !important; } .d-print-none { display: none !important; } }`}</style>
      </Container>
    </div>
  );
};

export default SuratIzin;