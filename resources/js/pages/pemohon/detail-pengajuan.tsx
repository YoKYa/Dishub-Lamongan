import { Head, router, usePage } from '@inertiajs/react';
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Container,
    ListGroup,
    Nav,
    Row,
    Tab,
} from 'react-bootstrap';

import {
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationCircle,
    FaFilePdf,
    FaHistory,
    FaInfoCircle,
    FaTimesCircle,
} from 'react-icons/fa';

export default function DetailPengajuan() {
    const { props }: any = usePage();
    const detailData = props.pengajuan;

    if (!detailData) {
        return (
            <Container className="py-5">
                <Alert variant="danger">Data pengajuan tidak ditemukan.</Alert>
            </Container>
        );
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Disetujui':
                return 'success';
            case 'Ditolak':
                return 'danger';
            case 'Perlu Revisi':
                return 'warning';
            case 'Menunggu Verifikasi':
                return 'info';
            default:
                return 'secondary';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Disetujui':
                return <FaCheckCircle className="me-2" />;
            case 'Ditolak':
                return <FaTimesCircle className="me-2" />;
            case 'Perlu Revisi':
                return <FaExclamationCircle className="me-2" />;
            default:
                return <FaInfoCircle className="me-2" />;
        }
    };

    return (
        <Container className="py-5">
            <Head title={`Detail Pengajuan #${detailData.no_registrasi}`} />

            {/* HEADER */}
            <div className="d-flex align-items-center mb-4">
                <Button
                    variant="light"
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                    onClick={() => router.visit('/status-pengajuan')}
                    style={{ width: '40px', height: '40px' }}
                >
                    <FaArrowLeft />
                </Button>

                <div>
                    <h3 className="fw-bold mb-0">Detail Pengajuan</h3>
                    <span className="text-muted small">
                        No. Reg: {detailData.no_registrasi}
                    </span>
                </div>
            </div>

            <Row>
                {/* KOLOM KIRI */}
                <Col lg={4} className="mb-4">
                    <Card className="shadow-sm mb-4 border-0">
                        <Card.Body className="p-4 text-center">
                            <h6 className="text-muted mb-3">Status Saat Ini</h6>

                            <Badge
                                bg={getStatusVariant(detailData.status)}
                                className="px-4 py-2 rounded-pill fs-6 mb-3 d-inline-flex align-items-center"
                            >
                                {getStatusIcon(detailData.status)}
                                {detailData.status}
                            </Badge>

                            <p className="small text-muted">
                                Terakhir update:{' '}
                                {
                                    detailData.riwayat[
                                        detailData.riwayat.length - 1
                                    ].tanggal
                                }
                            </p>

                            {(detailData.status === 'Ditolak' ||
                                detailData.status === 'Perlu Revisi') && (
                                <Alert
                                    variant="warning"
                                    className="small mt-3 text-start"
                                >
                                    <strong>Catatan Admin:</strong> <br />
                                    {detailData.catatan_admin ||
                                        'Tidak ada catatan tambahan.'}
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>

                    {/* RIWAYAT */}
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-white fw-bold">
                            <FaHistory className="me-2 text-primary" /> Riwayat
                            Proses
                        </Card.Header>

                        <ListGroup variant="flush">
                            {detailData.riwayat.map((log: any, idx: number) => (
                                <ListGroup.Item key={idx} className="py-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <strong className="text-dark small">
                                            {log.status}
                                        </strong>
                                        <span
                                            className="text-muted"
                                            style={{ fontSize: '0.7rem' }}
                                        >
                                            {log.tanggal}
                                        </span>
                                    </div>
                                    <div className="small text-muted">
                                        {log.ket}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>

                {/* KOLOM KANAN */}
                <Col lg={8}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-0">
                            <Tab.Container defaultActiveKey="info">
                                {/* TAB HEADER */}
                                <Nav variant="tabs" className="px-3 pt-3">
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="info"
                                            className="fw-semibold"
                                        >
                                            Data Permohonan
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="dokumen"
                                            className="fw-semibold"
                                        >
                                            Dokumen ({detailData.dokumen.length}
                                            )
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                {/* TAB CONTENT */}
                                <Tab.Content className="p-4 bg-white rounded-bottom">
                                    {/* DATA PERMOHONAN */}
                                    <Tab.Pane eventKey="info">
                                        <h5 className="fw-bold text-primary mb-4">
                                            {detailData.jenis_izin}
                                        </h5>

                                        <h6 className="fw-bold border-bottom pb-2 mb-3">
                                            Data Permohonan
                                        </h6>

                                        {detailData.data_detail.map(
                                            (item: any, idx: number) => (
                                                <Row className="mb-2" key={idx}>
                                                    <Col
                                                        sm={4}
                                                        className="text-muted"
                                                    >
                                                        {item.field_name}
                                                    </Col>
                                                    <Col
                                                        sm={8}
                                                        className="fw-medium"
                                                    >
                                                        {item.field_value}
                                                    </Col>
                                                </Row>
                                            ),
                                        )}
                                    </Tab.Pane>

                                    {/* DOKUMEN */}
                                    <Tab.Pane eventKey="dokumen">
                                        <Alert
                                            variant="info"
                                            className="small mb-4"
                                        >
                                            Berikut adalah dokumen yang Anda
                                            unggah. Klik "Lihat" untuk membuka.
                                        </Alert>

                                        <ListGroup>
                                            {detailData.dokumen.map(
                                                (doc: any, idx: number) => (
                                                    <ListGroup.Item
                                                        key={idx}
                                                        className="d-flex justify-content-between align-items-center py-3"
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-danger bg-opacity-10 p-2 rounded me-3 text-danger">
                                                                <FaFilePdf
                                                                    size={24}
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className="fw-bold">
                                                                    {doc.nama}
                                                                </div>
                                                                <div className="small text-muted">
                                                                    {doc.file}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={() =>
                                                                window.open(
                                                                    `/storage/${doc.file}`,
                                                                    '_blank',
                                                                )
                                                            }
                                                        >
                                                            Lihat
                                                        </Button>
                                                    </ListGroup.Item>
                                                ),
                                            )}
                                        </ListGroup>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
