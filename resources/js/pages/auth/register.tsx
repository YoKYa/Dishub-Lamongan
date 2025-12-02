import { login } from '@/routes'; // Pastikan route ini ada atau sesuaikan
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
    Spinner,
} from 'react-bootstrap';
import {
    FaBuilding,
    FaEnvelope,
    FaFileUpload,
    FaIdCard,
    FaLock,
    FaMapMarkerAlt,
    FaPhone,
    FaUser,
} from 'react-icons/fa';

export default function Register() {
    // Menggunakan useForm dari Inertia untuk menangani state dan submit (Logic dari register2)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        // Field tambahan sesuai desain register.tsx
        role: 'perorangan', // Default role
        identity_number: '', // NIK atau NPWP
        address: '',
        file_identity: null as File | null, // KTP atau Scan NPWP
        skpj: null as File | null, // Surat Kuasa (untuk perusahaan)
    });

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        // Mengirim data ke route register (sesuai logic register2)
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
            forceFormData: true, // Penting agar upload file berfungsi
        });
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center py-5">
            <Head title="Daftar Akun" />

            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-lg rounded-4 border-0">
                            <Card.Body className="p-5">
                                <h3 className="fw-bold mb-4 text-center">
                                    Akun Pemohon
                                </h3>

                                {/* PILIHAN TIPE AKUN */}
                                <div className="d-flex justify-content-center gap-4 mb-4 p-3 bg-light rounded-pill border">
                                    <Form.Check
                                        type="radio"
                                        id="tipe-perorangan"
                                        label="Perorangan"
                                        name="role"
                                        className="fw-bold"
                                        checked={data.role === 'perorangan'}
                                        onChange={() => {
                                            setData('role', 'perorangan');
                                        }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="tipe-perusahaan"
                                        label="Perusahaan"
                                        name="role"
                                        className="fw-bold"
                                        checked={data.role === 'perusahaan'}
                                        onChange={() => {
                                            setData('role', 'perusahaan');
                                        }}
                                    />
                                </div>

                                <Form onSubmit={handleRegister}>
                                    {/* NAMA LENGKAP / PERUSAHAAN */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-muted fw-bold">
                                            {data.role === 'perorangan'
                                                ? 'Nama Lengkap (Sesuai KTP)'
                                                : 'Nama Perusahaan'}
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text className="bg-white text-muted">
                                                {data.role === 'perorangan' ? (
                                                    <FaUser />
                                                ) : (
                                                    <FaBuilding />
                                                )}
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder={
                                                    data.role === 'perorangan'
                                                        ? 'Masukkan nama lengkap'
                                                        : 'Masukkan nama perusahaan'
                                                }
                                                required
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    {/* NO TELEPON */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-muted fw-bold">
                                            No. Telepon / WhatsApp
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text className="bg-white text-muted">
                                                <FaPhone />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                placeholder="08xxxxxxxxxx"
                                                required
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        'phone',
                                                        e.target.value,
                                                    )
                                                }
                                                isInvalid={!!errors.phone}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    {/* IDENTITAS KHUSUS (DINAMIS) */}
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small text-muted fw-bold">
                                                    {data.role === 'perorangan'
                                                        ? 'No. KTP (NIK)'
                                                        : 'Nomor NPWP Perusahaan'}
                                                </Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text className="bg-white text-muted">
                                                        <FaIdCard />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder={
                                                            data.role ===
                                                            'perorangan'
                                                                ? '16 digit NIK'
                                                                : 'Nomor NPWP'
                                                        }
                                                        required
                                                        value={
                                                            data.identity_number
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'identity_number',
                                                                e.target.value,
                                                            )
                                                        }
                                                        isInvalid={
                                                            !!errors.identity_number
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.identity_number}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {/* ALAMAT */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-muted fw-bold">
                                            Alamat Lengkap
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text className="bg-white text-muted">
                                                <FaMapMarkerAlt />
                                            </InputGroup.Text>
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder={
                                                    data.role === 'perorangan'
                                                        ? 'Alamat domisili saat ini'
                                                        : 'Alamat kantor perusahaan'
                                                }
                                                required
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        'address',
                                                        e.target.value,
                                                    )
                                                }
                                                isInvalid={!!errors.address}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.address}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    {/* EMAIL */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small text-muted fw-bold">
                                            Email Aktif
                                        </Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text className="bg-white text-muted">
                                                <FaEnvelope />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                placeholder="name@example.com"
                                                required
                                                autoComplete="username"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    {/* PASSWORD */}
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small text-muted fw-bold">
                                                    Password
                                                </Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text className="bg-white text-muted">
                                                        <FaLock />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="******"
                                                        required
                                                        autoComplete="new-password"
                                                        value={data.password}
                                                        onChange={(e) =>
                                                            setData(
                                                                'password',
                                                                e.target.value,
                                                            )
                                                        }
                                                        isInvalid={
                                                            !!errors.password
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.password}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small text-muted fw-bold">
                                                    Konfirmasi Password
                                                </Form.Label>
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text className="bg-white text-muted">
                                                        <FaLock />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="******"
                                                        required
                                                        autoComplete="new-password"
                                                        value={
                                                            data.password_confirmation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'password_confirmation',
                                                                e.target.value,
                                                            )
                                                        }
                                                        isInvalid={
                                                            !!errors.password_confirmation
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {
                                                            errors.password_confirmation
                                                        }
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {/* UPLOAD DOKUMEN */}
                                    <div className="p-3 bg-light rounded mb-4 border">
                                        <h6 className="fw-bold small text-primary mb-3">
                                            Upload Dokumen Persyaratan Akun
                                        </h6>

                                        {data.role === 'perorangan' ? (
                                            // DOKUMEN PERORANGAN
                                            <Form.Group
                                                controlId="formFileKTP"
                                                className="mb-0"
                                            >
                                                <Form.Label className="small fw-bold">
                                                    Scan Foto KTP{' '}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </Form.Label>
                                                <InputGroup hasValidation>
                                                    <Form.Control
                                                        type="file"
                                                        size="sm"
                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                        required
                                                        onChange={(
                                                            e: React.ChangeEvent<HTMLInputElement>,
                                                        ) =>
                                                            setData(
                                                                'file_identity',
                                                                e.target.files
                                                                    ? e.target
                                                                          .files[0]
                                                                    : null,
                                                            )
                                                        }
                                                        isInvalid={
                                                            !!errors.file_identity
                                                        }
                                                    />
                                                    <InputGroup.Text>
                                                        <FaFileUpload />
                                                    </InputGroup.Text>
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.file_identity}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                                <Form.Text className="text-muted small">
                                                    Format: JPG/PDF (Maks. 2MB)
                                                </Form.Text>
                                            </Form.Group>
                                        ) : (
                                            // DOKUMEN PERUSAHAAN
                                            <>
                                                <Form.Group
                                                    controlId="formFileNPWP"
                                                    className="mb-3"
                                                >
                                                    <Form.Label className="small fw-bold">
                                                        Scan NPWP Perusahaan{' '}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </Form.Label>
                                                    <InputGroup hasValidation>
                                                        <Form.Control
                                                            type="file"
                                                            size="sm"
                                                            accept=".jpg,.jpeg,.png,.pdf"
                                                            required
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                setData(
                                                                    'file_identity',
                                                                    e.target
                                                                        .files
                                                                        ? e
                                                                              .target
                                                                              .files[0]
                                                                        : null,
                                                                )
                                                            }
                                                            isInvalid={
                                                                !!errors.file_identity
                                                            }
                                                        />
                                                        <InputGroup.Text>
                                                            <FaFileUpload />
                                                        </InputGroup.Text>
                                                        <Form.Control.Feedback type="invalid">
                                                            {
                                                                errors.file_identity
                                                            }
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group
                                                    controlId="formFileKuasa"
                                                    className="mb-0"
                                                >
                                                    <Form.Label className="small fw-bold">
                                                        Surat Kuasa Penanggung
                                                        Jawab{' '}
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </Form.Label>
                                                    <InputGroup hasValidation>
                                                        <Form.Control
                                                            type="file"
                                                            size="sm"
                                                            accept=".pdf"
                                                            required
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) =>
                                                                setData(
                                                                    'skpj',
                                                                    e.target
                                                                        .files
                                                                        ? e
                                                                              .target
                                                                              .files[0]
                                                                        : null,
                                                                )
                                                            }
                                                            isInvalid={
                                                                !!errors.file_identity
                                                            }
                                                        />
                                                        <InputGroup.Text>
                                                            <FaFileUpload />
                                                        </InputGroup.Text>
                                                        <Form.Control.Feedback type="invalid">
                                                            {
                                                                errors.file_identity
                                                            }
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </>
                                        )}
                                    </div>

                                    {/* TOMBOL DAFTAR */}
                                    <Button
                                        variant="success"
                                        size="lg"
                                        type="submit"
                                        className="w-100 fw-bold shadow-sm mb-3"
                                        disabled={processing} // Disable saat processing (Logic dari register2)
                                    >
                                        {processing ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Memproses...
                                            </>
                                        ) : (
                                            'Daftar'
                                        )}
                                    </Button>

                                    <div className="text-muted text-center">
                                        Sudah punya akun?{' '}
                                        <Link
                                            href={login()} // Menggunakan route helper jika tersedia, atau string '/login'
                                            className="text-decoration-none fw-bold"
                                        >
                                            Masuk disini
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
