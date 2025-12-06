import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
} from 'react-bootstrap';

import {
    FaArrowLeft,
    FaBus,
    FaCheckCircle,
    FaClipboardCheck,
    FaFileContract,
    FaMapMarkedAlt,
    FaParking,
    FaSave,
    FaTruck,
    FaWarehouse,
} from 'react-icons/fa';

export default function AjukanPermohonan() {
    const { props }: any = usePage();
    const draft = props.draft;
    const isEditingDraft = draft ? true : false;

    const [selectedIzin, setSelectedIzin] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [isDraft, setIsDraft] = useState(false);

    const [requestData, setRequestData] = useState({
        permohonan: {
            typeRequest: 0,
            status: 'proses',
        },
        detailPermohonan: [],
        documents: {},
    });

    // ============================================
    // LOAD DRAFT
    // ============================================
    useEffect(() => {
        if (!draft) return;

        const izin = izinConfig.find((i) => i.id === draft.type_request_id);
        setSelectedIzin(izin);

        const mappedFields = izin.fields.map((f) => {
            const ditemukan = draft.detail_requests.find(
                (x) => x.field_name === f.label,
            );
            return {
                field_name: f.label,
                field_value: ditemukan ? ditemukan.field_value : '',
            };
        });

        const mappedDocs = {};
        draft.documents.forEach((d) => {
            mappedDocs[d.nama] = d.file_path;
        });

        setRequestData({
            permohonan: {
                typeRequest: draft.type_request_id,
                status: draft.status,
            },
            detailPermohonan: mappedFields,
            documents: mappedDocs,
        });
    }, [draft]);

    // ============================================
    // HANDLE FIELD
    // ============================================
    const handleFieldChange = (index, label, value) => {
        const updated = [...requestData.detailPermohonan];
        updated[index] = {
            field_name: label,
            field_value: value,
        };
        setRequestData({
            ...requestData,
            detailPermohonan: updated,
        });
    };

    // ============================================
    // HANDLE DOCUMENT UPLOAD
    // ============================================
    const handleDocChange = (label, file) => {
        const updated = { ...requestData.documents };
        updated[label] = file;
        setRequestData({
            ...requestData,
            documents: updated,
        });
    };

    // ============================================
    // SUBMIT PENGAJUAN (KIRIM)
    // ============================================
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        const formData = new FormData();

        formData.append('type_request_id', requestData.permohonan.typeRequest);
        formData.append('status', 'Menunggu Verifikasi');

        requestData.detailPermohonan.forEach((item, index) => {
            formData.append(
                `detail_requests[${index}][field_name]`,
                item.field_name,
            );
            formData.append(
                `detail_requests[${index}][field_value]`,
                item.field_value,
            );
        });

        Object.keys(requestData.documents).forEach((key) => {
            formData.append(`documents[${key}]`, requestData.documents[key]);
        });

        if (isEditingDraft) {
            formData.append('_method', 'POST');
            router.post(`/submit-draft/${draft.id}`, formData, {
                forceFormData: true,
            });
        } else {
            router.post('/submit-request', formData, {
                forceFormData: true,
            });
        }

        setTimeout(() => {
            router.visit('/dashboard');
        }, 2000);
    };

    // ============================================
    // SAVE DRAFT
    // ============================================
    const handleSubmitDraft = () => {
        const formData = new FormData();

        formData.append('type_request_id', requestData.permohonan.typeRequest);
        formData.append('status', 'draft');

        requestData.detailPermohonan.forEach((item, index) => {
            formData.append(
                `detail_requests[${index}][field_name]`,
                item.field_name,
            );
            formData.append(
                `detail_requests[${index}][field_value]`,
                item.field_value,
            );
        });

        Object.keys(requestData.documents).forEach((key) => {
            formData.append(`documents[${key}]`, requestData.documents[key]);
        });

        if (isEditingDraft) {
            formData.append('_method', 'PUT');
            router.post(`/submit-request/${draft.id}`, formData, {
                forceFormData: true,
                onSuccess: () => setShowDraftModal(true),
            });
        } else {
            router.post('/submit-request', formData, {
                forceFormData: true,
                onSuccess: () => setShowDraftModal(true),
            });
        }
    };

    // ===============================================================
    //  FULL IZIN CONFIG — 7 TIPE PERMOHONAN (TANPA ADA YANG DIUBAH)
    // ===============================================================

    const izinConfig = [
        {
            id: 1,
            nama: 'Izin Trayek Angkutan Umum',
            icon: <FaBus size={30} />,
            deskripsi:
                'Izin untuk operasional trayek angkutan umum dalam kota/kabupaten.',
            fields: [
                {
                    label: 'Nama Pemohon / Perusahaan',
                    type: 'text',
                    placeholder: 'Masukkan nama lengkap',
                },
                {
                    label: 'Nomor Kendaraan (Nopol)',
                    type: 'text',
                    placeholder: 'Contoh: S 1234 XXX',
                },
                {
                    label: 'Rute Trayek yang Dimohon',
                    type: 'text',
                    placeholder: 'Contoh: Pasar Lamongan - Terminal',
                },
            ],
            docs: [
                { label: 'KTP Pemohon', accept: '.pdf,.jpg' },
                { label: 'STNK Kendaraan', accept: '.pdf,.jpg' },
                { label: 'Bukti Lulus Uji KIR', accept: '.pdf,.jpg' },
            ],
        },
        {
            id: 2,
            nama: 'Izin Pemanfaatan Lahan Terminal',
            icon: <FaWarehouse size={30} />,
            deskripsi:
                'Izin penggunaan lahan di area terminal untuk usaha atau kegiatan.',
            fields: [
                {
                    label: 'Nama Pemohon',
                    type: 'text',
                    placeholder: 'Nama Lengkap',
                },
                {
                    label: 'Nama Terminal',
                    type: 'text',
                    placeholder: 'Terminal yang dituju',
                },
                {
                    label: 'Jenis Usaha',
                    type: 'text',
                    placeholder: 'Contoh: Kios Makanan / Loket',
                },
            ],
            docs: [
                { label: 'Surat Permohonan Pemanfaatan', accept: '.pdf' },
                { label: 'Denah Lokasi', accept: '.pdf,.jpg' },
                { label: 'Fotokopi KTP Pemohon', accept: '.pdf,.jpg' },
                { label: 'NPWP Perusahaan', accept: '.pdf,.jpg' },
                { label: 'Surat Kuasa (Jika diwakilkan)', accept: '.pdf' },
                {
                    label: 'Surat Rekomendasi Dishub (Jika ada)',
                    accept: '.pdf',
                },
            ],
        },
        {
            id: 3,
            nama: 'Pendaftaran Uji KIR',
            icon: <FaClipboardCheck size={30} />,
            deskripsi: 'Pendaftaran pengujian kendaraan bermotor berkala.',
            fields: [
                {
                    label: 'Nama Pemilik (Sesuai STNK)',
                    type: 'text',
                    placeholder: 'Nama Lengkap',
                },
                {
                    label: 'Nomor Kendaraan',
                    type: 'text',
                    placeholder: 'S 1234 XXX',
                },
                {
                    label: 'Jenis Kendaraan',
                    type: 'text',
                    placeholder: 'Truck / Pick Up / Bus',
                },
            ],
            docs: [
                { label: 'Dokumen Digital STNK', accept: '.pdf,.jpg' },
                { label: 'Bukti Pembayaran Retribusi', accept: '.pdf,.jpg' },
            ],
        },
        {
            id: 4,
            nama: 'Izin Operasional Angkutan Barang',
            icon: <FaTruck size={30} />,
            deskripsi:
                'Izin operasional untuk kendaraan pengangkut barang logistik/material.',
            fields: [
                {
                    label: 'Nama Perusahaan / Usaha',
                    type: 'text',
                    placeholder: 'Nama Usaha',
                },
                {
                    label: 'Nomor Kendaraan',
                    type: 'text',
                    placeholder: 'S 1234 XXX',
                },
                {
                    label: 'Jenis Muatan',
                    type: 'text',
                    placeholder: 'Contoh: Sembako / Material',
                },
            ],
            docs: [
                { label: 'KTP atau Akta Pendirian Usaha', accept: '.pdf' },
                { label: 'STNK Kendaraan', accept: '.pdf,.jpg' },
                { label: 'Bukti Lulus Uji KIR', accept: '.pdf,.jpg' },
            ],
        },
        {
            id: 5,
            nama: 'Izin Angkutan Pariwisata',
            icon: <FaMapMarkedAlt size={30} />,
            deskripsi:
                'Izin operasional untuk armada bus atau kendaraan wisata.',
            fields: [
                {
                    label: 'Nama PO / Perusahaan',
                    type: 'text',
                    placeholder: 'Nama Perusahaan Otobus',
                },
                {
                    label: 'Jumlah Armada',
                    type: 'number',
                    placeholder: 'Jumlah unit',
                },
                {
                    label: 'Alamat Garasi',
                    type: 'text',
                    placeholder: 'Alamat lengkap garasi',
                },
            ],
            docs: [
                { label: 'Akta Pendirian Usaha', accept: '.pdf' },
                { label: 'NPWP Perusahaan', accept: '.pdf,.jpg' },
                { label: 'STNK Kendaraan', accept: '.pdf,.jpg' },
                { label: 'Bukti Lulus Uji KIR', accept: '.pdf,.jpg' },
                {
                    label: 'Foto Kendaraan (Depan/Samping/Belakang)',
                    accept: '.pdf,.jpg',
                },
            ],
        },
        {
            id: 6,
            nama: 'Izin Penggunaan Terminal',
            icon: <FaFileContract size={30} />,
            deskripsi:
                'Izin penggunaan fasilitas terminal untuk event atau kegiatan insidentil.',
            fields: [
                {
                    label: 'Nama Penanggung Jawab',
                    type: 'text',
                    placeholder: 'Nama Lengkap',
                },
                {
                    label: 'Tujuan Penggunaan',
                    type: 'text',
                    placeholder: 'Contoh: Pameran / Bazar',
                },
                { label: 'Tanggal Pelaksanaan', type: 'date', placeholder: '' },
            ],
            docs: [
                { label: 'Surat Permohonan', accept: '.pdf' },
                {
                    label: 'Identitas Penanggung Jawab (KTP)',
                    accept: '.pdf,.jpg',
                },
                { label: 'Bukti Pembayaran Retribusi', accept: '.pdf,.jpg' },
            ],
        },
        {
            id: 7,
            nama: 'Izin Usaha Perparkiran',
            icon: <FaParking size={30} />,
            deskripsi:
                'Izin pengelolaan lahan parkir di area pengawasan Dishub.',
            fields: [
                {
                    label: 'Nama Pengelola / Badan Usaha',
                    type: 'text',
                    placeholder: 'Nama Pengelola',
                },
                {
                    label: 'Lokasi Lahan Parkir',
                    type: 'text',
                    placeholder: 'Alamat Lokasi',
                },
                {
                    label: 'Estimasi Kapasitas (Unit)',
                    type: 'number',
                    placeholder: 'Jumlah kendaraan',
                },
            ],
            docs: [
                { label: 'Proposal Lokasi', accept: '.pdf' },
                { label: 'Denah Lahan Parkir', accept: '.pdf,.jpg' },
                { label: 'NPWP', accept: '.pdf,.jpg' },
                { label: 'Surat Rekomendasi Dishub', accept: '.pdf' },
            ],
        },
    ];
    // ============================================================
    // TAMPILAN HALAMAN 1: PILIH JENIS IZIN (TIDAK DIUBAH)
    // ============================================================

    if (!selectedIzin) {
        return (
            <Container className="py-5">
                <Head title="Ajukan Permohonan" />

                <div className="d-flex align-items-center mb-4">
                    <Button
                        variant="light"
                        className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                        onClick={() => router.visit('/dashboard')}
                        style={{ width: '40px', height: '40px' }}
                    >
                        <FaArrowLeft />
                    </Button>

                    <div>
                        <h2 className="fw-bold mb-0">Buat Permohonan Baru</h2>
                        <p className="text-muted mb-0">
                            Silakan pilih jenis layanan perizinan yang Anda
                            butuhkan.
                        </p>
                    </div>
                </div>

                <Row className="g-4">
                    {izinConfig.map((izin) => (
                        <Col md={6} lg={4} key={izin.id}>
                            <Card
                                className="h-100 shadow-sm hover-card border-0"
                                style={{
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                }}
                                onClick={() => {
                                    setSelectedIzin(izin);
                                    setRequestData((prev) => ({
                                        ...prev,
                                        permohonan: {
                                            ...prev.permohonan,
                                            typeRequest: izin.id,
                                        },
                                    }));
                                }}
                            >
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary me-3">
                                            {izin.icon}
                                        </div>
                                        <h5
                                            className="fw-bold text-dark mb-0"
                                            style={{ fontSize: '1rem' }}
                                        >
                                            {izin.nama}
                                        </h5>
                                    </div>
                                    <p className="text-muted small mb-0">
                                        {izin.deskripsi}
                                    </p>
                                    <div className="mt-3 text-end">
                                        <span className="text-primary small fw-bold text-decoration-none">
                                            Pilih Layanan →
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }

    // ============================================================
    // TAMPILAN HALAMAN 2: FORMULIR PERMOHONAN (TIDAK DIUBAH)
    // ============================================================

    return (
        <Container className="py-5">
            <Head title={`Formulir ${selectedIzin.nama}`} />

            <div className="d-flex align-items-center mb-4 border-bottom pb-3">
                <Button
                    variant="light"
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0"
                    onClick={() => setSelectedIzin(null)}
                    style={{ width: '40px', height: '40px' }}
                >
                    <FaArrowLeft />
                </Button>

                <div>
                    <span className="text-muted small text-uppercase fw-bold">
                        Formulir Pengajuan
                    </span>
                    <h3 className="fw-bold mb-0 text-primary">
                        {selectedIzin.nama}
                    </h3>
                </div>
            </div>

            {/* Notifikasi sukses */}
            {submitted ? (
                <Alert
                    variant="success"
                    className="p-5 shadow-sm border-0 text-center"
                >
                    <div className="mb-3 text-success">
                        <FaCheckCircle size={60} />
                    </div>
                    <h4 className="fw-bold">Pengajuan Berhasil Dikirim!</h4>
                    <p className="mb-4">
                        Data Anda telah masuk ke sistem dan sedang menunggu
                        verifikasi Admin.
                    </p>
                    <p className="small text-muted">
                        Anda akan dialihkan ke Dashboard dalam 2 detik...
                    </p>
                    <Button
                        variant="outline-success"
                        onClick={() => router.visit('/dashboard')}
                    >
                        Kembali ke Dashboard
                    </Button>
                </Alert>
            ) : (
                <Row>
                    <Col md={10} lg={8} className="mx-auto">
                        <Card className="shadow rounded-4 border-0">
                            <Card.Body className="p-5">
                                <Form>
                                    {/* ==============================
                                        BAGIAN 1: FIELD DINAMIS
                                    =============================== */}
                                    <div className="mb-5">
                                        <h5 className="fw-bold mb-4 text-dark d-flex align-items-center">
                                            <span
                                                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2"
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                }}
                                            >
                                                1
                                            </span>
                                            Data Permohonan
                                        </h5>

                                        <div className="bg-light p-4 rounded-3">
                                            {selectedIzin.fields.map(
                                                (field, idx) => (
                                                    <Form.Group
                                                        className="mb-3"
                                                        key={idx}
                                                    >
                                                        <Form.Label className="fw-semibold small text-secondary">
                                                            {field.label}{' '}
                                                            <span className="text-danger">
                                                                *
                                                            </span>
                                                        </Form.Label>

                                                        <Form.Control
                                                            required={!isDraft}
                                                            type={field.type}
                                                            placeholder={
                                                                field.placeholder
                                                            }
                                                            value={
                                                                requestData
                                                                    .detailPermohonan[
                                                                    idx
                                                                ]
                                                                    ?.field_value ||
                                                                ''
                                                            }
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    idx,
                                                                    field.label,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="py-2"
                                                        />
                                                    </Form.Group>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {/* ==============================
                                        BAGIAN 2: DOKUMEN
                                    =============================== */}
                                    <div className="mb-5">
                                        <h5 className="fw-bold mb-3 text-dark d-flex align-items-center">
                                            <span
                                                className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2"
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                }}
                                            >
                                                2
                                            </span>
                                            Dokumen Persyaratan
                                        </h5>

                                        <Alert
                                            variant="info"
                                            className="d-flex align-items-center small bg-info bg-opacity-10 text-info-emphasis border-0"
                                        >
                                            <FaClipboardCheck
                                                className="me-2"
                                                size={20}
                                            />
                                            <div>
                                                Pastikan dokumen yang diunggah
                                                terlihat jelas.
                                            </div>
                                        </Alert>

                                        <div className="vstack gap-3">
                                            {selectedIzin.docs.map(
                                                (doc, idx) => (
                                                    <Card
                                                        key={idx}
                                                        className="border shadow-none"
                                                    >
                                                        <Card.Body className="d-flex align-items-center justify-content-between p-3">
                                                            <div>
                                                                <Form.Label className="fw-bold mb-1 small">
                                                                    {doc.label}{' '}
                                                                    <span className="text-danger">
                                                                        *
                                                                    </span>
                                                                </Form.Label>
                                                                <div
                                                                    className="text-muted"
                                                                    style={{
                                                                        fontSize:
                                                                            '0.75rem',
                                                                    }}
                                                                >
                                                                    Format:{' '}
                                                                    {doc.accept}
                                                                </div>
                                                            </div>

                                                            <div
                                                                style={{
                                                                    width: '200px',
                                                                }}
                                                            >
                                                                <Form.Control
                                                                    required={
                                                                        !isDraft
                                                                    }
                                                                    type="file"
                                                                    size="sm"
                                                                    accept={
                                                                        doc.accept
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleDocChange(
                                                                            doc.label,
                                                                            e
                                                                                .target
                                                                                .files[0],
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {/* ==============================
                                        BUTTON AKSI
                                    =============================== */}
                                    <div className="d-grid gap-2 pt-3">
                                        <Row>
                                            <Col md={6}>
                                                <Button
                                                    variant="outline-warning"
                                                    size="lg"
                                                    className="w-100 fw-bold py-3 shadow-sm"
                                                    type="button"
                                                    onClick={() => {
                                                        setIsDraft(true);
                                                        setRequestData(
                                                            (prev) => ({
                                                                ...prev,
                                                                permohonan: {
                                                                    ...prev.permohonan,
                                                                    status: 'draft',
                                                                },
                                                            }),
                                                        );
                                                        handleSubmitDraft();
                                                    }}
                                                >
                                                    <FaSave /> Simpan Sebagai
                                                    Draft
                                                </Button>
                                            </Col>

                                            <Col md={6}>
                                                <Button
                                                    type="button"
                                                    variant="primary"
                                                    size="lg"
                                                    className="w-100 fw-bold py-3 shadow-sm"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // 🔥 STOP auto submit FORM
                                                        setIsDraft(false);
                                                        setRequestData(
                                                            (prev) => ({
                                                                ...prev,
                                                                permohonan: {
                                                                    ...prev.permohonan,
                                                                    status: 'Menunggu Verifikasi',
                                                                },
                                                            }),
                                                        );
                                                        handleSubmit(e); // 🔥 panggil manual
                                                    }}
                                                >
                                                    Kirim Pengajuan Izin
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Button
                                            type="button"
                                            variant="link"
                                            className="text-decoration-none text-muted mt-2"
                                            onClick={() =>
                                                setSelectedIzin(null)
                                            }
                                        >
                                            Batalkan
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* ==============================
                MODAL DRAFT
            =============================== */}
            <Modal
                show={showDraftModal}
                onHide={() => setShowDraftModal(false)}
                centered
            >
                <Modal.Body className="p-5 text-center">
                    <div className="mb-3 text-warning">
                        <FaSave size={50} />
                    </div>
                    <h4 className="fw-bold mb-3">Berhasil Disimpan!</h4>
                    <Button
                        variant="warning"
                        className="px-4 text-white fw-bold"
                        onClick={() => router.visit('/draft')}
                    >
                        Lihat Daftar Draft
                    </Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
