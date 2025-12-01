import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Button, Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardCheck, FaFileAlt, FaUsers, FaSignOutAlt, FaChartLine, FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaArrowRight, FaBars } from 'react-icons/fa';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  
  // Sidebar Default TERTUTUP
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 992;
        setIsMobile(mobile);
        if (mobile) setShowSidebar(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/admin-login');
  };

  const recentVerifications = [
    { id: 1, reg: "REG-2025-001", pemohon: "Budi Santoso", jenis: "Izin Trayek", tgl: "20 Okt" },
    { id: 2, reg: "REG-2025-005", pemohon: "PT. Trans Jaya", jenis: "Izin Pariwisata", tgl: "21 Okt" },
    { id: 3, reg: "REG-2025-008", pemohon: "Siti Aminah", jenis: "Uji KIR", tgl: "22 Okt" },
    { id: 4, reg: "REG-2025-012", pemohon: "CV. Maju Mapan", jenis: "Izin Barang", tgl: "23 Okt" },
    { id: 5, reg: "REG-2025-015", pemohon: "Ahmad Dhani", jenis: "Izin Parkir", tgl: "23 Okt" },
  ];

  return (
    <div className="d-flex vh-100 bg-light overflow-hidden">
        
        {/* 1. SIDEBAR WRAPPER */}
        <div 
            className="bg-dark text-white shadow-lg d-flex flex-column flex-shrink-0" 
            style={{ 
                width: showSidebar ? '280px' : '0px', // Kunci animasi lebar
                transition: 'width 0.3s ease-in-out',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                height: '100vh',
                zIndex: 1050,
                // Di HP: Sidebar melayang absolute. Di PC: Relative (mendorong konten)
                position: isMobile ? 'absolute' : 'relative', 
            }}
        >
            {/* ISI SIDEBAR */}
            <div style={{ width: '280px' }} className="d-flex flex-column h-100">
                <div className="d-flex align-items-center gap-2 mb-4 px-4 pt-4">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0" style={{width: 40, height: 40}}>D</div>
                    <div>
                        <div className="fw-bold" style={{lineHeight: '1.2'}}>DISHUB</div>
                        <div className="small text-white-50" style={{fontSize: '0.75rem'}}>Admin Panel</div>
                    </div>
                </div>
                <hr className="border-secondary my-2 mx-3" />
                <Nav className="flex-column gap-2 flex-grow-1 px-3">
                    <Nav.Link className="text-white bg-primary rounded shadow-sm mb-1 d-flex align-items-center gap-3 px-3 py-2"><FaHome /> Dashboard</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/verifikasi')} className="text-white-50 hover-text-white d-flex align-items-center gap-3 px-3 py-2" style={{cursor: 'pointer'}}><FaClipboardCheck /> Verifikasi Permohonan <span className="badge bg-danger rounded-pill ms-auto small">5</span></Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/laporan')} className="text-white-50 hover-text-white d-flex align-items-center gap-3 px-3 py-2" style={{cursor: 'pointer'}}><FaFileAlt /> Laporan & Arsip</Nav.Link>
                    <Nav.Link onClick={() => navigate('/admin/users')} className="text-white-50 hover-text-white d-flex align-items-center gap-3 px-3 py-2" style={{cursor: 'pointer'}}><FaUsers /> Manajemen User</Nav.Link>
                </Nav>
                <div className="mt-auto px-3 pb-3">
                    <hr className="border-secondary" />
                    <Button variant="outline-danger" className="w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}><FaSignOutAlt /> Keluar</Button>
                </div>
            </div>
        </div>

        {/* 2. OVERLAY GELAP (KHUSUS HP) */}
        {isMobile && showSidebar && (
            <div 
                className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" 
                style={{zIndex: 1040}}
                onClick={() => setShowSidebar(false)}
            ></div>
        )}

        {/* 3. KONTEN UTAMA */}
        <div className="d-flex flex-column flex-grow-1 h-100" style={{ overflowY: 'auto', overflowX: 'hidden', minWidth: 0 }}>
            <Navbar bg="white" className="shadow-sm px-4 py-3 sticky-top d-flex justify-content-between flex-shrink-0">
                <div className="d-flex align-items-center gap-3">
                    <Button variant="light" onClick={() => setShowSidebar(!showSidebar)} className="border-0 shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                        <FaBars size={20} />
                    </Button>
                    <h5 className="mb-0 fw-bold text-dark d-none d-md-block">Dashboard Overview</h5>
                </div>
                <div className="d-flex align-items-center gap-3" style={{cursor: 'default'}}>
                    <div className="text-end d-none d-sm-block">
                        <div className="fw-bold text-dark small">Administrator</div>
                        <div className="text-muted" style={{fontSize: '0.7rem'}}>Super Admin</div>
                    </div>
                    <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white" style={{width: 40, height: 40}}>
                        <span className="fw-bold small">A</span>
                    </div>
                </div>
            </Navbar>

            <Container fluid className="p-4">
                <Row className="g-4 mb-4">
                    <Col xs={12} sm={6} xl={3}><Card className="border-0 shadow-sm border-start border-primary border-4 h-100"><Card.Body><div className="text-muted small text-uppercase fw-bold mb-1">Total Pengajuan</div><h2 className="fw-bold text-primary mb-0">124</h2><small className="text-success"><FaChartLine /> +12% bulan ini</small></Card.Body></Card></Col>
                    <Col xs={12} sm={6} xl={3}><Card className="border-0 shadow-sm border-start border-warning border-4 h-100"><Card.Body><div className="text-muted small text-uppercase fw-bold mb-1">Menunggu Verifikasi</div><h2 className="fw-bold text-warning mb-0">15</h2><small className="text-muted"><FaClock /> Butuh tindakan segera</small></Card.Body></Card></Col>
                    <Col xs={12} sm={6} xl={3}><Card className="border-0 shadow-sm border-start border-success border-4 h-100"><Card.Body><div className="text-muted small text-uppercase fw-bold mb-1">Disetujui</div><h2 className="fw-bold text-success mb-0">89</h2><small className="text-muted"><FaCheckCircle /> Izin diterbitkan</small></Card.Body></Card></Col>
                    <Col xs={12} sm={6} xl={3}><Card className="border-0 shadow-sm border-start border-danger border-4 h-100"><Card.Body><div className="text-muted small text-uppercase fw-bold mb-1">Ditolak</div><h2 className="fw-bold text-danger mb-0">20</h2><small className="text-muted"><FaTimesCircle /> Dokumen tidak valid</small></Card.Body></Card></Col>
                </Row>

                <Card className="border-0 shadow-sm rounded-4">
                    <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <h6 className="fw-bold m-0 text-dark">Pengajuan Terbaru Perlu Verifikasi</h6>
                        <Button variant="link" size="sm" className="text-decoration-none fw-bold p-0" onClick={() => navigate('/admin/verifikasi')}>Lihat Semua <FaArrowRight className="ms-1" /></Button>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0 align-middle" style={{minWidth: '600px'}}>
                                <thead className="bg-light text-secondary small text-uppercase">
                                    <tr>
                                        <th className="ps-4 py-3">No. Registrasi</th>
                                        <th className="py-3">Pemohon</th>
                                        <th className="py-3">Layanan</th>
                                        <th className="py-3 text-center">Tanggal</th>
                                        <th className="py-3 text-end pe-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentVerifications.map((item) => (
                                        <tr key={item.id}>
                                            <td className="ps-4 fw-bold text-primary">{item.reg}</td>
                                            <td className="fw-semibold">{item.pemohon}</td>
                                            <td><Badge bg="light" text="dark" className="border">{item.jenis}</Badge></td>
                                            <td className="text-center text-muted small">{item.tgl}</td>
                                            <td className="text-end pe-4">
                                                <Button variant="outline-primary" size="sm" className="rounded-pill px-3" onClick={() => navigate(`/admin/verifikasi/${item.id}`)}><FaEye className="me-1" /> Cek</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    </div>
  );
};

export default DashboardAdmin;