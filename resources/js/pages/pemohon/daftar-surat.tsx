import { Head, router, usePage } from '@inertiajs/react';
import { Badge, Button, Card, Container, Table } from 'react-bootstrap';
import { FaArrowLeft, FaEye } from 'react-icons/fa';

export default function DaftarSurat() {
    const { props }: any = usePage();
    const listSurat = props.surats || [];

    return (
        <Container className="py-5">
            <Head title="Arsip Surat Izin" />

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
                    <h3 className="fw-bold mb-0">Arsip Surat Izin Digital</h3>
                    <p className="text-muted mb-0 small">
                        Daftar dokumen perizinan yang telah diterbitkan dan sah.
                    </p>
                </div>
            </div>

            <Card className="shadow-sm rounded-4 border-0">
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0 align-middle">
                        <thead className="bg-light text-secondary small text-uppercase">
                            <tr>
                                <th className="py-3 px-4 border-0">No</th>
                                <th className="py-3 border-0">
                                    Jenis Izin / Nomor SK
                                </th>
                                <th className="py-3 border-0">
                                    Tanggal Terbit
                                </th>
                                <th className="py-3 border-0">Status</th>
                                <th className="py-3 px-4 border-0 text-end">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSurat.length > 0 ? (
                                listSurat.map((item: any, index: number) => (
                                    <tr key={item.id}>
                                        <td className="px-4 fw-bold text-muted">
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="fw-bold text-primary">
                                                {item.jenis}
                                            </div>
                                            <div className="small text-muted">
                                                {item.nomor}
                                            </div>
                                        </td>
                                        <td>{item.tanggal}</td>
                                        <td>
                                            <Badge
                                                bg="success"
                                                className="rounded-pill fw-normal px-3"
                                            >
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 text-end">
                                            <a
                                                href={`/storage/${item.file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-sm d-inline-flex align-items-center gap-2"
                                            >
                                                <FaEye /> Lihat Surat
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-4 text-muted text-center"
                                    >
                                        Belum ada surat izin yang diterbitkan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}
