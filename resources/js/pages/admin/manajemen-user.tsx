import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    Card,
    Container,
    Form,
    InputGroup,
    Modal,
    Table,
} from 'react-bootstrap';
import {
    FaArrowLeft,
    FaCheckCircle,
    FaEdit,
    FaEnvelope,
    FaKey,
    FaTrash,
    FaUserPlus,
    FaUserShield,
} from 'react-icons/fa';

export default function ManajemenUser() {
    // 🔥 Ambil user dari backend (props)
    const { props }: any = usePage();
    const usersFromServer = props.users || [];

    const [users, setUsers] = useState(usersFromServer);

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState({
        id: null,
        nama: '',
        email: '',
        role: 'admin',
        password: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    // ======================================
    // TAMBAH
    // ======================================
    const handleAdd = () => {
        setModalMode('add');
        setFormData({
            id: null,
            nama: '',
            email: '',
            role: 'admin',
            password: '',
        });
        setShowModal(true);
    };

    // ======================================
    // EDIT
    // ======================================
    const handleEdit = (user: any) => {
        setModalMode('edit');
        setFormData({
            id: user.id,
            nama: user.name,
            email: user.email,
            role: user.role,
            password: '',
        });
        setShowModal(true);
    };

    // ======================================
    // HAPUS
    // ======================================
    const handleDelete = (id: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;

        router.delete(`/admin/users/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setUsers(users.filter((u) => u.id !== id));
            },
        });
    };

    // ======================================
    // SIMPAN (ADD / EDIT)
    // ======================================
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const payload = {
            name: formData.nama,
            email: formData.email,
            role: formData.role,
            password: formData.password,
        };

        if (modalMode === 'add') {
            router.post('/admin/users', payload, {
                onSuccess: () => {
                    setShowModal(false);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                },
            });
        } else {
            router.put(`/admin/users/${formData.id}`, payload, {
                onSuccess: () => {
                    setShowModal(false);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 3000);
                },
            });
        }
    };

    return (
        <div className="bg-light min-vh-100 py-4">
            <Head title="Manajemen User" />

            <Container>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <Button
                            variant="light"
                            className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                            onClick={() => router.visit('/admin')}
                            style={{ width: '40px', height: '40px' }}
                        >
                            <FaArrowLeft />
                        </Button>
                        <div>
                            <h3 className="fw-bold mb-0">Manajemen User</h3>
                            <p className="text-muted mb-0 small">
                                Kelola akun administrator sistem.
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        className="shadow-sm fw-bold"
                        onClick={handleAdd}
                    >
                        <FaUserPlus className="me-2" /> Tambah User Baru
                    </Button>
                </div>

                {/* NOTIFIKASI SUKSES */}
                {showSuccess && (
                    <Alert
                        variant="success"
                        className="d-flex align-items-center shadow-sm border-0"
                    >
                        <FaCheckCircle className="me-2" /> Data pengguna
                        berhasil disimpan!
                    </Alert>
                )}

                {/* TABEL USER */}
                <Card className="shadow-sm rounded-4 border-0">
                    <Card.Body className="p-0">
                        <Table hover responsive className="mb-0 align-middle">
                            <thead className="bg-light text-secondary small text-uppercase">
                                <tr>
                                    <th className="ps-4 py-3">Nama Lengkap</th>
                                    <th className="py-3">Email</th>
                                    <th className="py-3 text-center">Role</th>
                                    <th className="py-3 pe-4 text-end">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user: any) => (
                                    <tr key={user.id}>
                                        <td className="ps-4 fw-bold text-dark">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="bg-secondary bg-opacity-10 p-2 rounded-circle text-secondary">
                                                    <FaUserShield />
                                                </div>
                                                {user.name}
                                            </div>
                                        </td>

                                        <td className="text-muted small">
                                            {user.email}
                                        </td>

                                        <td className="text-center">
                                            <Badge
                                                bg={
                                                    user.role === 'Super Admin'
                                                        ? 'primary'
                                                        : 'info'
                                                }
                                                text="white"
                                                className="fw-normal px-3"
                                            >
                                                {user.role}
                                            </Badge>
                                        </td>

                                        <td className="pe-4 text-end">
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="me-2 text-primary"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                className="text-danger"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>

            {/* ============================ */}
            {/* MODAL FORM USER */}
            {/* ============================ */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">
                        {modalMode === 'add'
                            ? 'Tambah User Baru'
                            : 'Edit Data User'}
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body className="p-4">
                        {/* NAMA */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">
                                Nama Lengkap
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaUserShield />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={formData.nama}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            nama: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* EMAIL */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">
                                Email Dinas
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaEnvelope />
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* ROLE */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">
                                Role Akses
                            </Form.Label>
                            <Form.Select
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        role: e.target.value,
                                    })
                                }
                            >
                                <option value="admin">Admin</option>
                                <option value="perorangan">Perorangan</option>
                                <option value="perusahaan">Perusahaan</option>
                            </Form.Select>
                        </Form.Group>

                        {/* PASSWORD */}
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold">
                                Password{' '}
                                {modalMode === 'edit' &&
                                    '(Kosongkan jika tidak diubah)'}
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaKey />
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    required={modalMode === 'add'}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="light"
                            onClick={() => setShowModal(false)}
                        >
                            Batal
                        </Button>
                        <Button variant="primary" type="submit">
                            Simpan Data
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
