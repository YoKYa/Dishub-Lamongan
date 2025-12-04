import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Table, Badge } from 'react-bootstrap';
import { router, Head } from '@inertiajs/react';
import { FaArrowLeft, FaFileExcel, FaFilePdf, FaFilter, FaChartBar, FaCalendarAlt } from 'react-icons/fa';

const LaporanArsip = () => {
  // State Filter
  const [filter, setFilter] = useState({
    bulan: 'Oktober',
    tahun: '2025',
    jenis: 'Semua'
  });

  // Data Dummy 
  const arsipData = [
    { id: 1, reg: "REG-2025-002", pemohon: "CV. Parkir Aman", jenis: "Izin Usaha Perparkiran", tgl: "18 Okt 2025", status: "Disetujui", petugas: "Admin 1" },
    { id: 2, reg: "REG-2025-003", pemohon: "Siti Aminah", jenis: "Pendaftaran Uji KIR", tgl: "15 Okt 2025", status: "Ditolak", petugas: "Admin 2" },
    { id: 3, reg: "REG-2025-004", pemohon: "PO. Restu Ibu", jenis: "Izin Trayek", tgl: "10 Okt 2025", status: "Disetujui", petugas: "Admin 1" },
    { id: 4, reg: "REG-2025-009", pemohon: "Budi Santoso", jenis: "Izin Barang", tgl: "05 Okt 2025", status: "Disetujui", petugas: "Admin 3" },
  ];

  // Fungsi Ekspor
  const handleExport = (type) => {
    alert(`Sedang mengekspor laporan periode ${filter.bulan} ${filter.tahun} ke format ${type}...`);
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Head title="Laporan & Arsip" />

      <Container>
        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
                <Button 
                    variant="light" 
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
                    onClick={() => router.visit('/dashboard-admin')}
                    style={{ width: '40px', height: '40px' }} 
                >
                <FaArrowLeft />
                </Button>
                <div>
                    <h3 className="fw-bold mb-0">Laporan & Arsip</h3>
                    <p className="text-muted mb-0 small">Rekapitulasi data perizinan dan statistik bulanan.</p>
                </div>
            </div>
            <div className="d-flex gap-2">
                <Button variant="success" onClick={() => handleExport('Excel')}>
                    <FaFileExcel className="me-2" /> Excel
                </Button>
                <Button variant="danger" onClick={() => handleExport('PDF')}>
                    <FaFilePdf className="me-2" /> PDF
                </Button>
            </div>
        </div>

        <Row>
            {/* KOLOM KIRI: FILTER & STATISTIK */}
            <Col lg={4} className="mb-4">
                {/* Card Filter */}
                <Card className="shadow-sm border-0 rounded-4 mb-4">
                    <Card.Header className="bg-white py-3 fw-bold"><FaFilter className="me-2 text-primary"/> Filter Laporan</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Bulan</Form.Label>
                                <Form.Select value={filter.bulan} onChange={(e) => setFilter({...filter, bulan: e.target.value})}>
                                    <option>Januari</option><option>Februari</option><option>Maret</option>
                                    <option>September</option><option>Oktober</option><option>November</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Tahun</Form.Label>
                                <Form.Select value={filter.tahun} onChange={(e) => setFilter({...filter, tahun: e.target.value})}>
                                    <option>2024</option><option>2025</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Jenis Layanan</Form.Label>
                                <Form.Select value={filter.jenis} onChange={(e) => setFilter({...filter, jenis: e.target.value})}>
                                    <option>Semua</option>
                                    <option>Izin Trayek</option>
                                    <option>Uji KIR</option>
                                    <option>Izin Usaha</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" className="w-100">Terapkan Filter</Button>
                        </Form>
                    </Card.Body>
                </Card>

                {/* Card Statistik Sederhana (Sesuai SDD Hal 43) */}
                <Card className="shadow-sm border-0 rounded-4 text-white bg-primary bg-gradient">
                    <Card.Body className="p-4 text-center">
                        <h6 className="text-uppercase text-white-50 mb-1">Total Proses Bulan Ini</h6>
                        <h1 className="display-4 fw-bold mb-0">45</h1>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <span className="badge bg-success bg-opacity-25 border border-success text-white">30 Disetujui</span>
                            <span className="badge bg-danger bg-opacity-25 border border-danger text-white">15 Ditolak</span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {/* KOLOM KANAN: GRAFIK & TABEL ARSIP */}
            <Col lg={8}>
                
                {/* GRAFIK VISUALISASI (Simulasi CSS) */}
                <Card className="shadow-sm border-0 rounded-4 mb-4">
                    <Card.Header className="bg-white py-3 fw-bold d-flex justify-content-between">
                        <span><FaChartBar className="me-2 text-primary"/> Statistik Pengajuan {filter.bulan} {filter.tahun}</span>
                    </Card.Header>
                    <Card.Body className="p-4">
                        {/* Bar Chart Sederhana dengan CSS Flexbox */}
                        <div className="d-flex justify-content-around align-items-end" style={{height: '200px'}}>
                            {/* Batang 1 */}
                            <div className="text-center w-100 mx-1">
                                <div className="bg-primary rounded-top" style={{height: '80%', transition: '0.5s'}}></div>
                                <small className="d-block mt-2 text-muted" style={{fontSize: '0.7rem'}}>Minggu 1</small>
                            </div>
                            {/* Batang 2 */}
                            <div className="text-center w-100 mx-1">
                                <div className="bg-info rounded-top" style={{height: '60%', transition: '0.5s'}}></div>
                                <small className="d-block mt-2 text-muted" style={{fontSize: '0.7rem'}}>Minggu 2</small>
                            </div>
                            {/* Batang 3 */}
                            <div className="text-center w-100 mx-1">
                                <div className="bg-warning rounded-top" style={{height: '90%', transition: '0.5s'}}></div>
                                <small className="d-block mt-2 text-muted" style={{fontSize: '0.7rem'}}>Minggu 3</small>
                            </div>
                            {/* Batang 4 */}
                            <div className="text-center w-100 mx-1">
                                <div className="bg-success rounded-top" style={{height: '40%', transition: '0.5s'}}></div>
                                <small className="d-block mt-2 text-muted" style={{fontSize: '0.7rem'}}>Minggu 4</small>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* TABEL ARSIP */}
                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Header className="bg-white py-3 fw-bold">
                        <FaCalendarAlt className="me-2 text-primary"/> Riwayat Arsip Data
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table hover responsive className="align-middle mb-0">
                            <thead className="bg-light text-secondary small">
                                <tr>
                                    <th className="ps-4 py-3">No. Reg</th>
                                    <th>Pemohon / Badan Usaha</th>
                                    <th>Jenis Layanan</th>
                                    <th>Tgl Selesai</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arsipData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="ps-4 fw-bold text-primary small">{item.reg}</td>
                                        <td className="small fw-bold">{item.pemohon}</td>
                                        <td className="small">{item.jenis}</td>
                                        <td className="small text-muted">{item.tgl}</td>
                                        <td>
                                            <Badge bg={item.status === 'Disetujui' ? 'success' : 'danger'} className="rounded-pill">
                                                {item.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LaporanArsip;