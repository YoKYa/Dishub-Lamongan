import React from 'react';
import { Container, Card, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaEye, FaArrowLeft } from 'react-icons/fa';

const VerifikasiList = () => {
  const navigate = useNavigate();

  // Data Dummy Antrian
  const antrian = [
    { id: 1, reg: "REG-2025-001", pemohon: "Budi Santoso", jenis: "Izin Trayek Angkutan Umum", tgl: "20 Okt 2025" },
    { id: 2, reg: "REG-2025-005", pemohon: "PT. Trans Jaya", jenis: "Izin Angkutan Pariwisata", tgl: "21 Okt 2025" },
    { id: 3, reg: "REG-2025-008", pemohon: "Siti Aminah", jenis: "Pendaftaran Uji KIR", tgl: "22 Okt 2025" },
  ];

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        <div className="d-flex align-items-center mb-4">
            <Button 
                variant="light" 
                className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
                onClick={() => navigate('/dashboard-admin')}
                style={{ width: '40px', height: '40px' }} 
            >
            <FaArrowLeft />
            </Button>
            <div>
                <h3 className="fw-bold mb-0">Verifikasi Permohonan</h3>
                <p className="text-muted mb-0 small">Daftar pengajuan yang menunggu tindakan Anda.</p>
            </div>
        </div>

        <Card className="shadow-sm border-0 rounded-4">
            <Card.Header className="bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold m-0 text-primary">Antrian Masuk ({antrian.length})</h6>
                    <div className="d-flex gap-2">
                        <InputGroup size="sm" style={{width: '250px'}}>
                            <InputGroup.Text className="bg-light border-end-0"><FaSearch /></InputGroup.Text>
                            <Form.Control placeholder="Cari No. Reg / Pemohon..." className="bg-light border-start-0" />
                        </InputGroup>
                        <Button variant="outline-secondary" size="sm"><FaFilter /> Filter</Button>
                    </div>
                </div>
            </Card.Header>
            <Card.Body className="p-0">
                <Table hover responsive className="align-middle mb-0">
                    <thead className="bg-light text-secondary small text-uppercase">
                        <tr>
                            <th className="px-4 py-3">No. Registrasi</th>
                            <th className="py-3">Pemohon</th>
                            <th className="py-3">Jenis Layanan</th>
                            <th className="py-3">Tanggal Masuk</th>
                            <th className="py-3 text-center">Status</th>
                            <th className="py-3 text-end px-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {antrian.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 fw-bold">{item.reg}</td>
                                <td>{item.pemohon}</td>
                                <td><Badge bg="info" text="dark" className="fw-normal">{item.jenis}</Badge></td>
                                <td>{item.tgl}</td>
                                <td className="text-center">
                                    <Badge bg="warning" text="dark" className="rounded-pill">Menunggu</Badge>
                                </td>
                                <td className="text-end px-4">
                                    <Button 
                                        variant="primary" 
                                        size="sm" 
                                        className="fw-bold shadow-sm"
                                        onClick={() => navigate(`/admin/verifikasi/${item.id}`)}
                                    >
                                        <FaEye className="me-1"/> Periksa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default VerifikasiList;