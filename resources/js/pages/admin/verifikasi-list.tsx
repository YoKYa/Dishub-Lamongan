import { Head, router, usePage } from '@inertiajs/react';
import {
    Badge,
    Button,
    Card,
    Container,
    Form,
    InputGroup,
    Table,
} from 'react-bootstrap';
import { FaArrowLeft, FaEye, FaFilter, FaSearch } from 'react-icons/fa';

export default function VerifikasiList() {
    // 🔥 DATA DIAMBIL DARI BACKEND
    const { props }: any = usePage();
    const antrian = props.antrian || [];
    // dari controller: return inertia('admin/verifikasi-list', ['antrian' => $data]);

    return (
        <div className="bg-light min-vh-100 py-4">
            <Head title="Verifikasi Permohonan" />

            <Container>
                <div className="d-flex align-items-center mb-4">
                    <Button
                        variant="light"
                        className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                        onClick={() => router.visit('/admin')}
                        style={{ width: '40px', height: '40px' }}
                    >
                        <FaArrowLeft />
                    </Button>
                    <div>
                        <h3 className="fw-bold mb-0">Verifikasi Permohonan</h3>
                        <p className="text-muted mb-0 small">
                            Daftar pengajuan yang menunggu tindakan Anda.
                        </p>
                    </div>
                </div>

                <Card className="shadow-sm rounded-4 border-0">
                    <Card.Header className="bg-white py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold m-0 text-primary">
                                Antrian Masuk ({antrian.length})
                            </h6>
                            <div className="d-flex gap-2">
                                <InputGroup
                                    size="sm"
                                    style={{ width: '250px' }}
                                >
                                    <InputGroup.Text className="bg-light border-end-0">
                                        <FaSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Cari No. Reg / Pemohon..."
                                        className="bg-light border-start-0"
                                    />
                                </InputGroup>
                                <Button variant="outline-secondary" size="sm">
                                    <FaFilter /> Filter
                                </Button>
                            </div>
                        </div>
                    </Card.Header>

                    <Card.Body className="p-0">
                        <Table hover responsive className="mb-0 align-middle">
                            <thead className="bg-light text-secondary small text-uppercase">
                                <tr>
                                    <th className="px-4 py-3">
                                        No. Registrasi
                                    </th>
                                    <th className="py-3">Pemohon</th>
                                    <th className="py-3">Jenis Layanan</th>
                                    <th className="py-3">Tanggal Masuk</th>
                                    <th className="py-3 text-center">Status</th>
                                    <th className="py-3 px-4 text-end">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {antrian.length > 0 ? (
                                    antrian.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="px-4 fw-bold">
                                                {item.no_registrasi}
                                            </td>
                                            <td>{item.pemohon}</td>
                                            <td>
                                                <Badge
                                                    bg="info"
                                                    text="dark"
                                                    className="fw-normal"
                                                >
                                                    {item.jenis_izin}
                                                </Badge>
                                            </td>
                                            <td>{item.tanggal_masuk}</td>
                                            <td className="text-center">
                                                <Badge
                                                    bg="warning"
                                                    text="dark"
                                                    className="rounded-pill"
                                                >
                                                    Menunggu
                                                </Badge>
                                            </td>
                                            <td className="px-4 text-end">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="fw-bold shadow-sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/admin/verifikasi/${item.id}`,
                                                        )
                                                    }
                                                >
                                                    <FaEye className="me-1" />{' '}
                                                    Periksa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="py-4 text-muted text-center"
                                        >
                                            Tidak ada permohonan menunggu
                                            verifikasi.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
