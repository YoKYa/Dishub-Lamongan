import { home, login, register, logout } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react'; // Import Inertia V2
import {
    Button,
    Card,
    Col,
    Container,
    Nav,
    Navbar,
    Row,
} from 'react-bootstrap';
import {
    FaBus,
    FaClipboardCheck,
    FaEnvelope,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaPhoneAlt,
    FaTruck,
    FaWarehouse,
} from 'react-icons/fa';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    // ID jenis izin
    const layananList = [
        { id: 1, name: 'Izin Trayek Angkutan Umum', icon: <FaBus /> },
        { id: 2, name: 'Izin Pemanfaatan Terminal', icon: <FaWarehouse /> },
        { id: 3, name: 'Pendaftaran Uji KIR', icon: <FaClipboardCheck /> },
        { id: 4, name: 'Izin Operasional Barang', icon: <FaTruck /> },
        { id: 5, name: 'Izin Angkutan Pariwisata', icon: <FaMapMarkedAlt /> },
        { id: 7, name: 'Izin Usaha Perparkiran', icon: <FaParking /> },
    ];

    // Fungsi Navigasi Inertia
    const handleLayananClick = (id: number) => {
        // Menggunakan router.get (Inertia V2)
        // Data dikirim sebagai Query Params: /alur-perizinan?selectedId=1
        router.get('alur-perizinan', { selectedId: id });
    };

    return (
        <>
            <Head title="Beranda" />

            {/* 1. NAVBAR */}
            <Navbar
                bg="white"
                expand="lg"
                fixed="top"
                className="shadow-sm py-3"
            >
                <Container>
                    {/* Ganti Navbar.Brand dengan Link Inertia untuk SPA feeling */}
                    <Link
                        href={home()}
                        className="d-flex align-items-center gap-3 navbar-brand"
                    >
                        <img
                            src="/assets/images/Dishub_Lamongan.png"
                            alt="Logo Dishub Lamongan"
                            style={{
                                height: '70px',
                                width: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                        <div className="d-flex flex-column justify-content-center">
                            <h4
                                className="m-0 fw-bold text-primary"
                                style={{
                                    lineHeight: '1',
                                    fontSize: '1.5rem',
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                DISHUB
                            </h4>
                            <span
                                className="text-secondary"
                                style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '400',
                                }}
                            >
                                Kabupaten Lamongan
                            </span>
                        </div>
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="fw-semibold mx-auto">
                            {/* Gunakan as={Link} pada Nav.Link agar tidak full reload */}
                            <Nav.Link
                                as={Link}
                                href="/alur-perizinan"
                                className="mx-2 text-dark"
                            >
                                Alur Perizinan
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                href="/cek-permohonan"
                                className="mx-2 text-dark"
                            >
                                Cek Permohonan
                            </Nav.Link>
                        </Nav>
                        {auth.user ? (
                            <div className="d-flex gap-2 mt-3 mt-lg-0">
                                <Button
                                    variant="outline-primary"
                                    className="px-4 fw-bold"
                                    onClick={() => router.get('/dashboard')}
                                >
                                    Dashboard
                                </Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2 mt-3 mt-lg-0">
                                <Button
                                    variant="primary"
                                    className="px-4 fw-bold"
                                    onClick={() => router.get(login())}
                                >
                                    Masuk
                                </Button>
                                <Button
                                    variant="outline-primary"
                                    className="px-4 fw-bold"
                                    onClick={() => router.get(register())}
                                >
                                    Daftar
                                </Button>
                            </div>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{ marginTop: '90px' }}></div>

            {/* 2. HERO SECTION */}
            <section className="bg-light py-5">
                <Container>
                    <Row className="align-items-center min-vh-75">
                        <Col md={6} className="py-5">
                            <small className="text-uppercase text-primary fw-bold ls-2 mb-2 d-block">
                                Selamat Datang
                            </small>
                            <h1 className="display-4 fw-bold mb-4 text-dark">
                                Layanan Perizinan{' '}
                                <span className="text-primary">
                                    Transportasi Terpadu
                                </span>
                            </h1>
                            <p
                                className="lead text-muted mb-5"
                                style={{ maxWidth: '90%' }}
                            >
                                Solusi digital resmi dari Dinas Perhubungan
                                Kabupaten Lamongan untuk pengajuan izin
                                transportasi yang cepat, transparan, dan mudah
                                diakses di mana saja.
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                className="px-5 py-3 rounded-pill shadow-sm fw-bold"
                                onClick={() => router.get('/login')}
                            >
                                Ajukan Permohonan
                            </Button>
                        </Col>
                        <Col md={6} className="d-none d-md-block text-center">
                            <div
                                className="bg-white p-3 rounded-4 shadow-lg rotate-card"
                                style={{ transform: 'rotate(-2deg)' }}
                            >
                                <div
                                    className="bg-primary bg-opacity-10 rounded-3 p-5"
                                    style={{
                                        height: '350px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <FaBus
                                        size={120}
                                        className="text-primary opacity-50"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 3. JENIS LAYANAN */}
            <section className="py-5 bg-white">
                <Container>
                    <div className="mb-5 text-center">
                        <h3 className="fw-bold display-6">
                            Jenis Layanan Perizinan
                        </h3>
                        <p className="text-muted">
                            Pilih layanan untuk melihat syarat dan alur
                            pengajuan
                        </p>
                    </div>

                    <Row className="g-4">
                        {layananList.map((item, index) => (
                            <Col md={4} key={index}>
                                <Card
                                    className="h-100 shadow-sm hover-card p-4 border-0 text-center"
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                    }}
                                    onClick={() => handleLayananClick(item.id)}
                                >
                                    <Card.Body>
                                        <div
                                            className="mb-4 text-primary bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '2.5rem',
                                                    lineHeight: 0,
                                                }}
                                            >
                                                {item.icon}
                                            </div>
                                        </div>
                                        <Card.Title className="fw-bold mb-3 h5">
                                            {item.name}
                                        </Card.Title>
                                        <span className="text-primary text-decoration-none small fw-bold">
                                            Lihat Detail &rarr;
                                        </span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* 4. TENTANG KAMI */}
            <section className="py-5" style={{ backgroundColor: '#eef7fc' }}>
                <Container className="py-4">
                    <Row className="align-items-center g-5">
                        <Col md={6}>
                            <h3 className="fw-bold mb-4 display-6 text-dark">
                                Tentang Kami
                            </h3>
                            <p
                                className="text-muted"
                                style={{
                                    fontSize: '1.1rem',
                                    lineHeight: '1.8',
                                }}
                            >
                                Dinas Perhubungan Kabupaten Lamongan berkomitmen
                                untuk meningkatkan pelayanan publik melalui
                                inovasi digital.
                                <br />
                                <br />
                                Sistem ini dikembangkan untuk mendukung
                                efisiensi, transparansi, dan kemudahan akses
                                perizinan transportasi.
                            </p>
                        </Col>
                        <Col md={6}>
                            <div className="position-relative">
                                {/* Update path gambar */}
                                <img
                                    src="/assets/images/Dishub.jpg"
                                    alt="Tim Dishub Lamongan"
                                    className="img-fluid rounded-4 shadow-lg border-white border border-4"
                                    style={{
                                        width: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 5. FOOTER */}
            <footer
                className="text-white py-5"
                style={{ backgroundColor: '#1a3c5e' }}
            >
                <Container>
                    <Row className="g-4 align-items-center">
                        <Col md={7}>
                            <h4 className="fw-bold mb-3">
                                Dinas Perhubungan Kabupaten Lamongan
                            </h4>

                            <div className="d-flex align-items-start gap-3 mb-3 text-white-50 small">
                                <FaMapMarkerAlt className="mt-1 fs-5 text-warning" />
                                <span
                                    style={{
                                        lineHeight: '1.6',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    Jl. Jaksa Agung Suprapto No.39,
                                    Tumenggungan, Kec. Lamongan, <br />
                                    Kabupaten Lamongan, Jawa Timur 62214
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-3 mb-2 text-white-50 small">
                                <FaEnvelope className="fs-5 text-warning" />
                                <span style={{ fontSize: '0.95rem' }}>
                                    dishublamongan@gmail.com
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-3 text-white-50 small">
                                <FaPhoneAlt className="fs-5 text-warning" />
                                <span style={{ fontSize: '0.95rem' }}>
                                    (0322) 321987
                                </span>
                            </div>
                        </Col>

                        <Col
                            md={5}
                            className="text-md-end d-flex justify-content-md-end justify-content-center mt-4 mt-md-0"
                        >
                            {/* Update path gambar logo footer */}
                            <img
                                src="/assets/images/Dishub_Lamongan.png"
                                alt="Logo Dishub Footer"
                                style={{
                                    height: '250px',
                                    width: 'auto',
                                    filter: 'brightness(0) invert(1)',
                                    opacity: '0.9',
                                }}
                            />
                        </Col>
                    </Row>

                    <div className="text-white-50 small mt-5 pt-4 border-top border-secondary text-center">
                        &copy; 2025 Dinas Perhubungan Kabupaten Lamongan. All
                        rights reserved.
                    </div>
                </Container>
            </footer>
        </>
    );
}
