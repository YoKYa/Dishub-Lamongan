import { Head, Link } from '@inertiajs/react';
// Import logika routing dari login2
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
// Import Form helper dari Inertia
import { Form } from '@inertiajs/react';

import {
    Button,
    Card,
    Col,
    Container,
    Form as BootstrapForm, // Alias untuk menghindari bentrok nama dengan Form Inertia
    InputGroup,
    Row,
    Spinner, // Tambahan untuk loading state
} from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <div className="bg-light min-vh-100 d-flex align-items-center py-5">
            <Head title="Login Pengguna" />

            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-lg rounded-4 border-0">
                            <Card.Body className="p-5">
                                <div className="mb-4 text-center">
                                    <h3 className="fw-bold text-dark">
                                        Selamat Datang
                                    </h3>
                                    <p className="text-muted small">
                                        Silakan masuk untuk mengakses layanan
                                        perizinan
                                    </p>
                                </div>

                                {/* Menggunakan Form Wrapper dari Inertia/Login2 */}
                                <Form
                                    {...store.form()}
                                    resetOnSuccess={['password']}
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <BootstrapForm.Group className="mb-3">
                                                <BootstrapForm.Label className="small text-muted fw-bold">
                                                    Email
                                                </BootstrapForm.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="bg-white text-muted border-end-0">
                                                        <FaEnvelope />
                                                    </InputGroup.Text>
                                                    <BootstrapForm.Control
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="name@example.com"
                                                        className={`border-start-0 ${errors.email ? 'is-invalid' : ''}`}
                                                        required
                                                        autoFocus
                                                        autoComplete="email"
                                                    />
                                                </InputGroup>
                                                {/* Tampilkan Error Email */}
                                                {errors.email && (
                                                    <div className="text-danger small mt-1">
                                                        {errors.email}
                                                    </div>
                                                )}
                                            </BootstrapForm.Group>

                                            <BootstrapForm.Group className="mb-3">
                                                <BootstrapForm.Label className="small text-muted fw-bold">
                                                    Password
                                                </BootstrapForm.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="bg-white text-muted border-end-0">
                                                        <FaLock />
                                                    </InputGroup.Text>
                                                    <BootstrapForm.Control
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Masukkan password"
                                                        className={`border-start-0 ${errors.password ? 'is-invalid' : ''}`}
                                                        required
                                                        autoComplete="current-password"
                                                    />
                                                </InputGroup>
                                                {/* Tampilkan Error Password */}
                                                {errors.password && (
                                                    <div className="text-danger small mt-1">
                                                        {errors.password}
                                                    </div>
                                                )}
                                            </BootstrapForm.Group>

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <BootstrapForm.Check
                                                    type="checkbox"
                                                    label="Ingat Saya"
                                                    id="remember"
                                                    name="remember"
                                                    className="small text-muted"
                                                />
                                                {canResetPassword && (
                                                    <Link
                                                        href={request()}
                                                        className="text-decoration-none small fw-bold text-primary"
                                                    >
                                                        Lupa Password?
                                                    </Link>
                                                )}
                                            </div>

                                            <Button
                                                variant="success"
                                                size="lg"
                                                type="submit"
                                                className="w-100 fw-bold shadow-sm mb-4"
                                                disabled={processing}
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
                                                    'Masuk'
                                                )}
                                            </Button>

                                            {canRegister && (
                                                <div className="text-muted text-center">
                                                    Belum punya akun?{' '}
                                                    <Link
                                                        href={register()}
                                                        className="text-decoration-none fw-bold"
                                                    >
                                                        Daftar disini
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Form>
                                
                                {/* Status Message jika ada flash message */}
                                {status && (
                                    <div className="mt-3 text-center text-sm font-medium text-success">
                                        {status}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}