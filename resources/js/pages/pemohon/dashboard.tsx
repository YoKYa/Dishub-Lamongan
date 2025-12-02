import { dashboard, logout, profile } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    Modal,
    Navbar,
    Row,
} from 'react-bootstrap';
import {
    FaClipboardList,
    FaFileAlt,
    FaFileSignature,
    FaPrint,
    FaQuestionCircle,
    FaSignOutAlt,
    FaUser,
    FaUserEdit,
} from 'react-icons/fa';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleLogout = () => {
        router.flushAll();
        router.visit(logout());
    };

    const menus = [
        {
            title: 'Profil Saya',
            icon: <FaUser size={40} />,
            link: '/profile',
            color: 'primary',
            desc: 'Kelola data diri dan akun',
        },
        {
            title: 'Ajukan Permohonan',
            icon: <FaFileAlt size={40} />,
            link: '/ajukan-permohonan',
            color: 'success',
            desc: 'Buat izin baru',
        },
        {
            title: 'Status Pengajuan',
            icon: <FaClipboardList size={40} />,
            link: '/status-pengajuan',
            color: 'info',
            desc: 'Cek progres verifikasi',
        },
        {
            title: 'Draf Pengajuan',
            icon: <FaFileSignature size={40} />,
            link: '/draft',
            color: 'warning',
            desc: 'Lanjutkan pengisian',
        },
        {
            title: 'Surat Izin Digital',
            icon: <FaPrint size={40} />,
            link: '/daftar-surat',
            color: 'secondary',
            desc: 'Unduh SK yang terbit',
        },
        {
            title: 'Bantuan Panduan',
            icon: <FaQuestionCircle size={40} />,
            link: '/bantuan',
            color: 'danger',
            desc: 'Hubungi Dishub',
        },
    ];

    const handleLogoutClick = () => setShowLogoutModal(true);

    return (
        <div className="min-vh-100 bg-light d-flex flex-column">
            <Head title="Dashboard Pemohon" />

            {/* NAVBAR ATAS */}
            <Navbar bg="white" className="shadow-sm px-4 py-3 sticky-top">
                <Container>
                    <Link
                        href={dashboard()}
                        className="navbar-brand d-flex align-items-center gap-3"
                    >
                        <img
                            src="/assets/images/Dishub_Lamongan.png"
                            alt="Logo Dishub"
                            style={{ height: '70px', width: 'auto' }}
                        />
                        <div>
                            <div
                                className="fw-bold text-primary"
                                style={{
                                    lineHeight: '1',
                                    fontSize: '1.2rem',
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                DISHUB
                            </div>
                            <div
                                className="small text-muted"
                                style={{ fontSize: '0.75rem' }}
                            >
                                Layanan Mandiri
                            </div>
                        </div>
                    </Link>

                    {/* MENU PROFIL KANAN */}
                    <Dropdown align="end">
                        <Dropdown.Toggle
                            variant="transparent"
                            id="dropdown-profile"
                            className="d-flex align-items-center gap-3 p-0 border-0 shadow-none"
                        >
                            <div className="d-none d-md-block text-dark text-end">
                                <div className="fw-bold small">
                                    {auth.user.name}
                                </div>
                                <div
                                    className="text-muted"
                                    style={{ fontSize: '0.7rem' }}
                                >
                                    Pemohon Umum
                                </div>
                            </div>
                            {/* Avatar Profil */}
                            <div
                                className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: 40, height: 40 }}
                            >
                                {auth.user.photo_profile ? (
                                    <img
                                        className="rounded-circle"
                                        src={String(auth.user.photo_profile)} width={40} height={40}/>
                                    ) : (
                                        <FaUser />
                                    )}
                                
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            className="shadow mt-2 rounded-3 p-2 border-0"
                            style={{ minWidth: '200px' }}
                        >
                            <Dropdown.Item
                                onClick={() => router.visit(profile())}
                                className="d-flex align-items-center gap-2 rounded py-2"
                            >
                                <FaUserEdit className="text-muted" /> Lihat
                                Profil
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => router.visit('/bantuan')}
                                className="d-flex align-items-center gap-2 rounded py-2"
                            >
                                <FaQuestionCircle className="text-muted" />{' '}
                                Bantuan
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                                onClick={handleLogoutClick}
                                className="d-flex align-items-center gap-2 rounded py-2 text-danger fw-semibold"
                            >
                                <FaSignOutAlt /> Keluar
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>

            {/* KONTEN UTAMA */}
            <Container className="py-5 flex-grow-1">
                {/* Banner Selamat Datang */}
                <div className="bg-primary bg-gradient text-white rounded-4 p-5 mb-5 shadow-sm position-relative overflow-hidden">
                    <Row
                        className="align-items-center position-relative"
                        style={{ zIndex: 1 }}
                    >
                        <Col md={8}>
                            <h2 className="fw-bold display-6">
                                Selamat Datang, {auth.user.name}!
                            </h2>
                            <p className="lead mb-0 opacity-90">
                                Apa yang ingin Anda lakukan hari ini?
                            </p>
                        </Col>
                        <Col md={4} className="d-none d-md-block text-end">
                            <Button
                                variant="light"
                                size="lg"
                                className="text-primary fw-bold shadow-sm px-4 rounded-pill"
                                onClick={() =>
                                    router.visit('/ajukan-permohonan')
                                }
                            >
                                <FaFileAlt className="me-2" /> Buat Pengajuan
                            </Button>
                        </Col>
                    </Row>
                    <div
                        className="position-absolute top-0 end-0 opacity-25"
                        style={{ transform: 'translate(10%, -10%)' }}
                    >
                        <FaFileAlt size={250} />
                    </div>
                </div>

                <h5 className="fw-bold mb-4 text-secondary ps-2 border-start border-primary border-4">
                    Menu Layanan
                </h5>

                {/* Grid Menu */}
                <Row className="g-4">
                    {menus.map((menu, index) => (
                        <Col md={4} key={index}>
                            <Card
                                className="h-100 shadow-sm py-4 hover-card border-0 text-center"
                                style={{
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                }}
                                onClick={() => router.visit(menu.link)}
                            >
                                <Card.Body>
                                    <div
                                        className={`mb-3 text-${menu.color} bg-${menu.color} bg-opacity-10 d-inline-flex p-4 rounded-circle mb-4`}
                                    >
                                        {menu.icon}
                                    </div>
                                    <Card.Title className="fw-bold fs-5 mb-2">
                                        {menu.title}
                                    </Card.Title>
                                    <Card.Text className="text-muted small px-3">
                                        {menu.desc}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <footer className="text-muted py-4 bg-white border-top small mt-auto text-center">
                &copy; 2025 Dinas Perhubungan Kabupaten Lamongan
            </footer>

            {/* Modal Logout */}
            <Modal
                show={showLogoutModal}
                onHide={() => setShowLogoutModal(false)}
                centered
            >
                <Modal.Body className="p-5 text-center">
                    <div className="mb-3 text-danger">
                        <FaSignOutAlt size={50} />
                    </div>
                    <h4 className="fw-bold mb-3">Konfirmasi Keluar</h4>
                    <p className="text-muted mb-4">
                        Apakah Anda yakin ingin keluar dari aplikasi?
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                        <Button
                            variant="light"
                            className="px-4"
                            onClick={() => setShowLogoutModal(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="danger"
                            className="px-4"
                            onClick={handleLogout}
                        >
                            Ya, Keluar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
