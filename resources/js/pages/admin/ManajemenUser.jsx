import React, { useState } from 'react';
import { Container, Card, Table, Button, Badge, Modal, Form, InputGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserPlus, FaEdit, FaTrash, FaUserShield, FaEnvelope, FaKey, FaCheckCircle } from 'react-icons/fa';

const ManajemenUser = () => {
  const navigate = useNavigate();

  // Data Dummy 
  const [users, setUsers] = useState([
    { id: 1, nama: "Administrator Utama", email: "admin@dishub.lamongan.go.id", role: "Super Admin" },
    { id: 2, nama: "Budi Santoso", email: "budi.admin@dishub.lm.id", role: "Admin" },
    { id: 3, nama: "Siti Aminah", email: "siti.admin@dishub.lm.id", role: "Admin" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, nama: '', email: '', role: 'Admin', password: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdd = () => {
    setModalMode('add');
    setFormData({ id: null, nama: '', email: '', role: 'Admin', password: '' });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalMode('edit');
    setFormData({ ...user, password: '' });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(u => u.id === formData.id ? { ...formData } : u));
    }

    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
                <Button 
                    variant="light" 
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
                    onClick={() => navigate('/dashboard-admin')}
                    style={{ width: '40px', height: '40px' }} 
                >
                <FaArrowLeft />
                </Button>
                <div>
                    <h3 className="fw-bold mb-0">Manajemen User</h3>
                    <p className="text-muted mb-0 small">Kelola akun administrator sistem.</p>
                </div>
            </div>
            <Button variant="primary" className="shadow-sm fw-bold" onClick={handleAdd}>
                <FaUserPlus className="me-2" /> Tambah User Baru
            </Button>
        </div>

        {showSuccess && (
            <Alert variant="success" className="d-flex align-items-center shadow-sm border-0">
                <FaCheckCircle className="me-2" /> Data pengguna berhasil disimpan!
            </Alert>
        )}

        <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-0">
                <Table hover responsive className="align-middle mb-0">
                    <thead className="bg-light text-secondary small text-uppercase">
                        <tr>
                            <th className="ps-4 py-3">Nama Lengkap</th>
                            <th className="py-3">Email</th>
                            <th className="py-3 text-center">Role</th>
                            <th className="py-3 text-end pe-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="ps-4 fw-bold text-dark">
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="bg-secondary bg-opacity-10 p-2 rounded-circle text-secondary"><FaUserShield /></div>
                                        {user.nama}
                                    </div>
                                </td>
                                <td className="text-muted small">{user.email}</td>
                                <td className="text-center">
                                    <Badge bg={user.role === 'Super Admin' ? 'primary' : 'info'} text="white" className="fw-normal px-3">
                                        {user.role}
                                    </Badge>
                                </td>
                                <td className="text-end pe-4">
                                    <Button variant="light" size="sm" className="me-2 text-primary" onClick={() => handleEdit(user)}>
                                        <FaEdit />
                                    </Button>
                                    <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(user.id)}>
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

      {/* MODAL FORM */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
                {modalMode === 'add' ? 'Tambah User Baru' : 'Edit Data User'}
            </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body className="p-4">
                <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Nama Lengkap</Form.Label>
                    <InputGroup>
                        <InputGroup.Text><FaUserShield/></InputGroup.Text>
                        <Form.Control 
                            type="text" 
                            placeholder="Nama Petugas" 
                            value={formData.nama}
                            onChange={(e) => setFormData({...formData, nama: e.target.value})}
                            required 
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Email Dinas</Form.Label>
                    <InputGroup>
                        <InputGroup.Text><FaEnvelope/></InputGroup.Text>
                        <Form.Control 
                            type="email" 
                            placeholder="email@dishub..." 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required 
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Role / Hak Akses</Form.Label>
                    <Form.Select 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                        <option value="Admin">Admin (Verifikator & Laporan)</option>
                        <option value="Super Admin">Super Admin (Full Akses)</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Password {modalMode === 'edit' && '(Kosongkan jika tidak ingin mengubah)'}</Form.Label>
                    <InputGroup>
                        <InputGroup.Text><FaKey/></InputGroup.Text>
                        <Form.Control 
                            type="password" 
                            placeholder="******" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required={modalMode === 'add'} 
                        />
                    </InputGroup>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={() => setShowModal(false)}>Batal</Button>
                <Button variant="primary" type="submit">Simpan Data</Button>
            </Modal.Footer>
        </Form>
      </Modal>

    </div>
  );
};

export default ManajemenUser;