import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    ListGroup,
    Modal,
    Row,
} from 'react-bootstrap';

import {
    FaArrowLeft,
    FaCar,
    FaCheckCircle,
    FaFilePdf,
    FaHistory,
    FaTimesCircle,
    FaUser,
} from 'react-icons/fa';

export default function VerifikasiDetail() {
    const { props }: any = usePage();
    const data = props.data;

    // Jika data tidak ada
    if (!data) {
        return (
            <Container className="py-5">
                <Alert variant="danger">Data pengajuan tidak ditemukan.</Alert>
            </Container>
        );
    }

    // SAFE GET DETAIL (tidak error)
    const getDetail = (fieldName: string) => {
        const list = Array.isArray(data.detail_requests)
            ? data.detail_requests
            : [];
        const found = list.find((item: any) => item.field_name === fieldName);
        return found ? found.field_value : '-';
    };

    // STATE MODAL
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [alasanTolak, setAlasanTolak] = useState('');

    // APPROVE
    const handleApprove = () => {
        router.post(
            `/admin/verifikasi/${data.id}/approve`,
            {},
            {
                onSuccess: () => router.visit('/admin/verifikasi'),
            },
        );
    };

    // REJECT
    const handleReject = () => {
        if (!alasanTolak.trim()) {
            alert('Alasan penolakan wajib diisi.');
            return;
        }

        router.post(
            `/admin/verifikasi/${data.id}/reject`,
            { alasan: alasanTolak },
            {
                onSuccess: () => router.visit('/admin/verifikasi'),
            },
        );
    };

    return (
        <div className="bg-light min-vh-100 py-4">
            <Head title={`Verifikasi - ${data.reg}`} />

            <Container>
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <Button
                            variant="light"
                            className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                            onClick={() => router.visit('/admin/verifikasi')}
                            style={{ width: '40px', height: '40px' }}
                        >
                            <FaArrowLeft />
                        </Button>

                        <div>
                            <h4 className="fw-bold mb-0">Verifikasi Dokumen</h4>
                            <span className="text-muted small">
                                Nomor Registrasi: {data.reg}
                            </span>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-2">
                        <Button
                            variant="danger"
                            onClick={() => setShowRejectModal(true)}
                        >
                            <FaTimesCircle className="me-2" /> Tolak / Revisi
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => setShowApproveModal(true)}
                        >
                            <FaCheckCircle className="me-2" /> Setujui &
                            Terbitkan
                        </Button>
                    </div>
                </div>

                <Row>
                    {/* ====================== KOLOM KIRI ======================= */}
                    <Col md={5}>
                        {/* DATA PEMOHON */}
                        <Card className="shadow-sm mb-4 border-0">
                            <Card.Header className="bg-white fw-bold text-primary">
                                <FaUser className="me-2" /> Data Pemohon
                            </Card.Header>

                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <small className="text-muted">
                                        Nama Pemohon :
                                    </small>
                                    <div className="fw-bold">
                                        {data.pemohon.nama}
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <small className="text-muted">NIK : </small>
                                    <div className="fw-bold">
                                        {data.pemohon.nik}
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <small className="text-muted">Alamat</small>
                                    <div className="fw-bold">
                                        {' '}
                                        {data.pemohon.alamat}
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <small className="text-muted">
                                        Telepon
                                    </small>
                                    <div className="fw-bold">
                                        {' '}
                                        {data.pemohon.telp}
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>

                        {/* DATA KENDARAAN / USAHA */}
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-white fw-bold text-primary">
                                <FaCar className="me-2" /> Data Kendaraan /
                                Usaha
                            </Card.Header>

                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <small className="text-muted">
                                        Jenis Izin
                                    </small>
                                    <div className="fw-bold text-dark">
                                        {data.jenis}
                                    </div>
                                </ListGroup.Item>

                                {/* Tampilkan semua detail lain otomatis */}
                                {data.detail_requests.map(
                                    (item: any, idx: number) => {
                                        // Sembunyikan field yang sudah ditampilkan
                                        if (
                                            item.field_name ===
                                                'Nomor Kendaraan (Nopol)' ||
                                            item.field_name ===
                                                'Rute Trayek yang Dimohon'
                                        )
                                            return null;

                                        return (
                                            <ListGroup.Item key={idx}>
                                                <small className="text-muted">
                                                    {item.field_name}
                                                </small>
                                                <div>
                                                    {item.field_value || '-'}
                                                </div>
                                            </ListGroup.Item>
                                        );
                                    },
                                )}
                            </ListGroup>
                        </Card>
                    </Col>

                    {/* ====================== KOLOM KANAN ======================= */}
                    <Col md={7}>
                        <Card className="shadow-sm border-0">
                            <Card.Header className="bg-white fw-bold text-primary">
                                <FaFilePdf className="me-2" /> Pemeriksaan
                                Dokumen
                            </Card.Header>

                            <Card.Body className="bg-light">
                                <Alert variant="info" className="small mb-3">
                                    <FaHistory className="me-2" /> Klik "Lihat"
                                    untuk membuka dokumen.
                                </Alert>

                                <div className="d-grid gap-3">
                                    {data.dokumen.length > 0 ? (
                                        data.dokumen.map(
                                            (doc: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white p-3 rounded d-flex justify-content-between align-items-center border"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-danger bg-opacity-10 p-2 rounded text-danger me-3">
                                                            <FaFilePdf />
                                                        </div>

                                                        <div>
                                                            <div className="fw-bold small">
                                                                {
                                                                    doc.nama_dokumen
                                                                }
                                                            </div>
                                                            <div className="text-muted small">
                                                                {
                                                                    doc.path_dokumen
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() =>
                                                            window.open(
                                                                `/storage/${doc.path_dokumen}`,
                                                                '_blank',
                                                            )
                                                        }
                                                    >
                                                        Lihat File
                                                    </Button>
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <Alert
                                            variant="light"
                                            className="small mb-0 text-center"
                                        >
                                            Tidak ada dokumen diunggah.
                                        </Alert>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* ================= MODAL APPROVE ================= */}
            <Modal
                show={showApproveModal}
                onHide={() => setShowApproveModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-success">
                        Konfirmasi Persetujuan
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Apakah semua data sudah <strong>lengkap</strong> dan{' '}
                        <strong>valid</strong>?
                    </p>
                    <p className="small text-muted">
                        Surat Izin Digital akan diterbitkan otomatis setelah
                        disetujui.
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={() => setShowApproveModal(false)}
                    >
                        Batal
                    </Button>
                    <Button variant="success" onClick={handleApprove}>
                        Ya, Setujui
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ================= MODAL REJECT ================= */}
            <Modal
                show={showRejectModal}
                onHide={() => setShowRejectModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-danger">
                        Tolak Pengajuan
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label className="fw-bold">
                            Alasan Penolakan
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Contoh: Dokumen STNK buram, mohon upload ulang..."
                            value={alasanTolak}
                            onChange={(e) => setAlasanTolak(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={() => setShowRejectModal(false)}
                    >
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleReject}>
                        Kirim Penolakan
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
