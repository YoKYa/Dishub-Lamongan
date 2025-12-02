import { dashboard } from '@/routes';
import { type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import {
    Badge,
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
    FaBuilding,
    FaCamera,
    FaCheckCircle,
    FaFilePdf,
    FaSave,
    FaTimes,
    FaUser,
    FaUserEdit,
} from 'react-icons/fa';

export default function Profile() {
    // --- STATE & HOOKS ---
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // Loading state saat simpan

    const { auth, file } = usePage<SharedData>().props;
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Define type for dokumen
    type DokumenType = {
        file_identity: string;
        skpj: string;
        [key: string]: unknown;
    };

    // State Data Pengguna
    const [userData, setUserData] = useState<{
        nama: string;
        email: string;
        phone: unknown;
        address: unknown;
        role: unknown;
        identity_number: string;
        photo_profile: unknown;
        dokumen: DokumenType;
    }>({
        nama: auth.user.name,
        email: auth.user.email,
        phone: auth.user.phone,
        address: auth.user.address || '',
        role: auth.user.role,
        identity_number: String(auth.user.identity_number),
        photo_profile: auth.user.photo_profile || null,
        dokumen: file as DokumenType,
    });

    // State untuk preview visual foto & file asli
    const [photoPreview, setPhotoPreview] = useState(userData.photo_profile || null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    // --- HANDLERS ---

    // Handle pilih file foto
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPhotoFile(file); // Simpan file asli untuk upload
            const imageUrl = URL.createObjectURL(file);
            setPhotoPreview(imageUrl); // Preview visual
        }
    };

    // Handle input text change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Handle Simpan ke Server
    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);

        router.post(
            'profile/update', // Pastikan route ini ada di web.php
            {
                _method: 'POST',
                nama: userData.nama,
                phone: String(userData.phone),
                address: String(userData.address),
                photo_profile: photoFile, // Kirim file foto jika ada
            },
            {
                forceFormData: true, // Wajib untuk upload file
                preserveScroll: true,
                onSuccess: () => {
                    setIsEditing(false);
                    setIsSaving(false);
                    setShowSuccessModal(true);
                    setPhotoFile(null);
                },
                onError: (errors) => {
                    setIsSaving(false);
                    console.error('Error update:', errors);
                    alert('Gagal menyimpan perubahan. Periksa input Anda.');
                },
            },
        );
    };

    return (
        <Container className="py-5">
            <Head title="Profil Saya" />

            {/* Header Navigasi */}
            <div className="d-flex align-items-center mb-4">
                <Button
                    variant="light"
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                    onClick={() => router.visit(dashboard())}
                    style={{ width: '40px', height: '40px' }}
                >
                    <FaArrowLeft />
                </Button>
                <h3 className="fw-bold mb-0">Profil Saya</h3>
            </div>

            <Row>
                {/* KOLOM KIRI: Foto & Badge */}
                <Col md={4} className="mb-4">
                    <Card className="shadow-sm p-4 h-100 border-0 text-center">
                        <div className="mb-3 position-relative d-inline-block mx-auto">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center border-light shadow-sm mx-auto overflow-hidden border border-3"
                                style={{
                                    width: 130,
                                    height: 130,
                                    backgroundColor: '#f8f9fa',
                                }}
                            >
                                {photoPreview ? (
                                    <img
                                        src={
                                            typeof photoPreview === 'string'
                                                ? photoPreview.startsWith(
                                                      'blob:',
                                                  )
                                                    ? photoPreview
                                                    : `/storage/${photoPreview}`
                                                : ''
                                        }
                                        alt="Profil"
                                        className="w-100 h-100 object-fit-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                'none';
                                        }}
                                    />
                                ) : userData.role === 'perusahaan' ? (
                                    <FaBuilding
                                        size={50}
                                        className="text-secondary opacity-50"
                                    />
                                ) : (
                                    <FaUser
                                        size={50}
                                        className="text-secondary opacity-50"
                                    />
                                )}
                            </div>

                            {isEditing && (
                                <>
                                    <div
                                        className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 shadow-sm border-white border border-2"
                                        style={{
                                            cursor: 'pointer',
                                            width: 35,
                                            height: 35,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        title="Ubah Foto"
                                    >
                                        <FaCamera size={14} />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    />
                                </>
                            )}
                        </div>

                        <h5 className="fw-bold mt-2">{userData.nama}</h5>
                        <p className="text-muted small mb-2">
                            {userData.email}
                        </p>
                        <div>
                            <Badge
                                bg={
                                    userData.role === 'Perusahaan'
                                        ? 'warning'
                                        : 'success'
                                }
                                text="dark"
                                className="px-3 py-2 rounded-pill"
                            >
                                Akun {String(userData.role)}
                            </Badge>
                        </div>
                    </Card>
                </Col>

                {/* KOLOM KANAN: FORMULIR DETAIL */}
                <Col md={8}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
                            <h6 className="fw-bold mb-0 text-primary">
                                Informasi Akun & Kontak
                            </h6>
                            {!isEditing && (
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <FaUserEdit className="me-2" /> Edit Profil
                                </Button>
                            )}
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSave}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small text-muted">
                                                Nama Lengkap
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nama"
                                                value={userData.nama}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="fw-bold"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small text-muted">
                                                NIK / NPWP
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={String(
                                                    userData.identity_number,
                                                )}
                                                disabled
                                                className="bg-light"
                                            />
                                            <Form.Text
                                                className="text-muted"
                                                style={{ fontSize: '0.7rem' }}
                                            >
                                                *NIK tidak dapat diubah. Hubungi
                                                Admin jika ada kesalahan.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small text-muted">
                                                Nomor Telepon/WA
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={String(userData.phone)}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small text-muted">
                                                Email
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={userData.email}
                                                disabled
                                                className="bg-light"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label className="small text-muted">
                                        Alamat Lengkap
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address" // Diubah dari "alamat" agar sesuai key state
                                        value={String(userData.address) || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Form.Group>

                                {/* --- BAGIAN DOKUMEN (DIKEMBALIKAN SESUAI PERMINTAAN) --- */}
                                <h6 className="fw-bold text-primary mb-3 pt-3 border-top">
                                    Dokumen Legalitas
                                </h6>

                                <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2 border">
                                    <div className="d-flex align-items-center">
                                        <FaFilePdf
                                            className="text-danger me-3"
                                            size={24}
                                        />
                                        <div>
                                            <div className="fw-bold small">
                                                {userData.dokumen.skpj === null
                                                    ? 'File KTP'
                                                    : 'File NPWP'}
                                            </div>
                                            <div
                                                className="text-muted"
                                                style={{
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {userData.dokumen.file_identity}
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        rel="noopener noreferrer"
                                        href={userData.dokumen.file_identity}
                                        target="_blank"
                                        className="text-decoration-none"
                                    >
                                        Lihat
                                    </a>
                                </div>
                                {auth.user.role === 'perusahaan' ? (
                                    <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2 border">
                                        <div className="d-flex align-items-center">
                                            <FaFilePdf
                                                className="text-danger me-3"
                                                size={24}
                                            />
                                            <div>
                                                <div className="fw-bold small">
                                                    File SKPJ
                                                </div>
                                                <div
                                                    className="text-muted"
                                                    style={{
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {userData.dokumen.skpj}
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            rel="noopener noreferrer"
                                            href={userData.dokumen.skpj}
                                            target="_blank"
                                            className="text-decoration-none"
                                        >
                                            Lihat
                                        </a>
                                    </div>
                                ) : null}
                                {/* --- END BAGIAN DOKUMEN --- */}

                                {isEditing && (
                                    <div className="d-flex gap-2 justify-content-end mt-4 pt-3 border-top">
                                        <Button
                                            variant="light"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setPhotoPreview(
                                                    String(userData.photo_profile),
                                                ); // Reset preview
                                                setPhotoFile(null);
                                            }}
                                            disabled={isSaving}
                                        >
                                            <FaTimes className="me-1" /> Batal
                                        </Button>
                                        <Button
                                            variant="success"
                                            type="submit"
                                            disabled={isSaving}
                                        >
                                            <FaSave className="me-1" />
                                            {isSaving
                                                ? 'Menyimpan...'
                                                : 'Simpan Perubahan'}
                                        </Button>
                                    </div>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* MODAL POPUP SUKSES */}
            <Modal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                centered
            >
                <Modal.Body className="p-5 text-center">
                    <div className="mb-3 text-success">
                        <FaCheckCircle size={60} />
                    </div>
                    <h4 className="fw-bold mb-3">Berhasil Disimpan!</h4>
                    <p className="text-muted mb-4">
                        Data profil dan foto Anda telah berhasil diperbarui.
                    </p>
                    <Button
                        variant="success"
                        className="px-4 rounded-pill fw-bold"
                        onClick={() => setShowSuccessModal(false)}
                    >
                        Oke, Mengerti
                    </Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
