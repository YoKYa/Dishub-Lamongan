import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    Nav,
    Navbar,
    Row,
    Table,
} from 'react-bootstrap';
import {
    FaArrowRight,
    FaBars,
    FaChartLine,
    FaCheckCircle,
    FaClipboardCheck,
    FaClock,
    FaEye,
    FaFileAlt,
    FaHome,
    FaSignOutAlt,
    FaTimesCircle,
    FaUsers,
} from 'react-icons/fa';

export default function DashboardAdmin() {
    // Perbaikan: tidak langsung akses window
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            const mobile = window.innerWidth < 992;
            setIsMobile(mobile);
            if (mobile) setShowSidebar(false);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    const handleLogout = () => {
        router.post(
            '/admin/logout',
            {},
            {
                onFinish: () => {
                    localStorage.removeItem('user');
                    router.visit('/login');
                },
            },
        );
    };

    const { props } = usePage();
    const recentVerifications = props.recentVerifications ?? [];
    const stats = props.stats ?? {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    };

    return (
        <div className="d-flex vh-100 bg-light overflow-hidden">
            <Head title="Dashboard Admin" />

            {/* SIDEBAR */}
            <div
                className="bg-dark text-white shadow-lg d-flex flex-column flex-shrink-0"
                style={{
                    width: showSidebar ? '280px' : '0px',
                    transition: 'width 0.3s ease-in-out',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    height: '100vh',
                    zIndex: 1050,
                    position: isMobile ? 'absolute' : 'relative',
                }}
            >
                <div
                    style={{ width: '280px' }}
                    className="d-flex flex-column h-100"
                >
                    <div className="d-flex align-items-center gap-2 mb-4 px-4 pt-4">
                        <div
                            className="bg-primary rounded-circle d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                            style={{ width: 40, height: 40 }}
                        >
                            D
                        </div>
                        <div>
                            <div
                                className="fw-bold"
                                style={{ lineHeight: '1.2' }}
                            >
                                DISHUB
                            </div>
                            <div
                                className="small text-white-50"
                                style={{ fontSize: '0.75rem' }}
                            >
                                Admin Panel
                            </div>
                        </div>
                    </div>
                    <hr className="border-secondary my-2 mx-3" />

                    <Nav className="flex-column gap-2 px-3 flex-grow-1">
                        <Nav.Link className="text-white bg-primary rounded shadow-sm mb-1 d-flex align-items-center gap-3 px-3 py-2">
                            <FaHome /> Dashboard
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => router.visit('/admin/verifikasi')}
                            className="text-white-50 hover-text-white d-flex align-items-center gap-3 px-3 py-2"
                            style={{ cursor: 'pointer' }}
                        >
                            <FaClipboardCheck /> Verifikasi Permohonan
                            <span className="badge bg-danger rounded-pill small ms-auto">
                                {stats.pending}
                            </span>
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => router.visit('/admin/laporan')}
                            className="text-white-50 hover-text-white d-flex align-items-center gap-3 px-3 py-2"
                            style={{ cursor: 'pointer' }}
                        >
                            <FaFileAlt /> Laporan & Arsip
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => router.visit('/admin/users')}
                            className="text-white-50 hover-text-white d-flex align-items-center gap-3 px-3 py-2"
                            style={{ cursor: 'pointer' }}
                        >
                            <FaUsers /> Manajemen User
                        </Nav.Link>
                    </Nav>

                    <div className="px-3 pb-3 mt-auto">
                        <hr className="border-secondary" />
                        <Button
                            variant="outline-danger"
                            className="w-100 d-flex align-items-center justify-content-center gap-2"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt /> Keluar
                        </Button>
                    </div>
                </div>
            </div>

            {/* OVERLAY HP */}
            {isMobile && showSidebar && (
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={() => setShowSidebar(false)}
                ></div>
            )}

            {/* MAIN CONTENT */}
            <div
                className="d-flex flex-column h-100 flex-grow-1"
                style={{ overflowY: 'auto', overflowX: 'hidden', minWidth: 0 }}
            >
                <Navbar
                    bg="white"
                    className="shadow-sm px-4 py-3 sticky-top d-flex justify-content-between"
                >
                    <div className="d-flex align-items-center gap-3">
                        <Button
                            variant="light"
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center border-0"
                            style={{ width: '40px', height: '40px' }}
                        >
                            <FaBars size={20} />
                        </Button>
                        <h5 className="mb-0 fw-bold text-dark d-none d-md-block">
                            Dashboard Overview
                        </h5>
                    </div>

                    <div
                        className="d-flex align-items-center gap-3"
                        style={{ cursor: 'default' }}
                    >
                        <div className="d-none d-sm-block text-end">
                            <div className="fw-bold text-dark small">
                                Administrator
                            </div>
                            <div
                                className="text-muted"
                                style={{ fontSize: '0.7rem' }}
                            >
                                Super Admin
                            </div>
                        </div>
                        <div
                            className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white"
                            style={{ width: 40, height: 40 }}
                        >
                            <span className="fw-bold small">A</span>
                        </div>
                    </div>
                </Navbar>

                <Container fluid className="p-4">
                    {/* Kartu Statistik */}
                    <Row className="g-4 mb-4">
                        <Col xs={12} sm={6} xl={3}>
                            <Card className="shadow-sm border-start border-primary h-100 border-0 border-4">
                                <Card.Body>
                                    <div className="text-muted small text-uppercase fw-bold mb-1">
                                        Total Pengajuan
                                    </div>
                                    <h2 className="fw-bold text-primary mb-0">
                                        {stats.total}
                                    </h2>
                                    <small className="text-success">
                                        <FaChartLine /> Total Pengajuan
                                    </small>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} xl={3}>
                            <Card className="shadow-sm border-start border-warning h-100 border-0 border-4">
                                <Card.Body>
                                    <div className="text-muted small text-uppercase fw-bold mb-1">
                                        Menunggu Verifikasi
                                    </div>
                                    <h2 className="fw-bold text-warning mb-0">
                                        {stats.pending}
                                    </h2>
                                    <small className="text-muted">
                                        <FaClock /> Butuh tindakan segera
                                    </small>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} xl={3}>
                            <Card className="shadow-sm border-start border-success h-100 border-0 border-4">
                                <Card.Body>
                                    <div className="text-muted small text-uppercase fw-bold mb-1">
                                        Disetujui
                                    </div>
                                    <h2 className="fw-bold text-success mb-0">
                                        {stats.approved}
                                    </h2>
                                    <small className="text-muted">
                                        <FaCheckCircle /> Izin diterbitkan
                                    </small>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={6} xl={3}>
                            <Card className="shadow-sm border-start border-danger h-100 border-0 border-4">
                                <Card.Body>
                                    <div className="text-muted small text-uppercase fw-bold mb-1">
                                        Ditolak
                                    </div>
                                    <h2 className="fw-bold text-danger mb-0">
                                        {stats.rejected}
                                    </h2>
                                    <small className="text-muted">
                                        <FaTimesCircle /> Dokumen tidak valid
                                    </small>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Tabel Pengajuan Terbaru */}
                    <Card className="shadow-sm rounded-4 border-0">
                        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center gap-2 flex-wrap">
                            <h6 className="fw-bold m-0 text-dark">
                                Pengajuan Terbaru Perlu Verifikasi
                            </h6>
                            <Button
                                variant="link"
                                size="sm"
                                className="text-decoration-none fw-bold p-0"
                                onClick={() =>
                                    router.visit('/admin/verifikasi')
                                }
                            >
                                Lihat Semua <FaArrowRight className="ms-1" />
                            </Button>
                        </Card.Header>

                        <Card.Body className="p-0">
                            <div className="table-responsive">
                                <Table
                                    hover
                                    className="mb-0 align-middle"
                                    style={{ minWidth: '600px' }}
                                >
                                    <thead className="bg-light text-secondary small text-uppercase">
                                        <tr>
                                            <th className="ps-4 py-3">
                                                No. Registrasi
                                            </th>
                                            <th className="py-3">Pemohon</th>
                                            <th className="py-3">Layanan</th>
                                            <th className="py-3 text-center">
                                                Tanggal
                                            </th>
                                            <th className="py-3 pe-4 text-end">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentVerifications.map((item) => (
                                            <tr key={item.id}>
                                                <td className="ps-4 fw-bold text-primary">
                                                    {item.reg}
                                                </td>
                                                <td className="fw-semibold">
                                                    {item.pemohon}
                                                </td>
                                                <td>
                                                    <Badge
                                                        bg="light"
                                                        text="dark"
                                                        className="border"
                                                    >
                                                        {item.jenis}
                                                    </Badge>
                                                </td>
                                                <td className="text-muted small text-center">
                                                    {item.tgl}
                                                </td>
                                                <td className="pe-4 text-end">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        className="rounded-pill px-3"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/admin/verifikasi/${item.id}`,
                                                            )
                                                        }
                                                    >
                                                        <FaEye className="me-1" />{' '}
                                                        Cek
                                                    </Button>
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
}
