import { Head, router, usePage } from '@inertiajs/react';
import { Badge, Button, Card, Container, Table } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

export default function StatusPengajuan() {
    const { props }: any = usePage();
    const pengajuanList = props.pengajuanList || [];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Disetujui':
                return 'success';
            case 'Ditolak':
                return 'danger';
            case 'Perlu Revisi':
                return 'warning';
            case 'Menunggu Verifikasi':
                return 'secondary';
            default:
                return 'dark';
        }
    };

    return (
        <Container className="py-5">
            <Head title="Status Pengajuan Saya" />

            {/* Header */}
            <div className="d-flex align-items-center mb-4">
                <Button
                    variant="light"
                    className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                    onClick={() => router.visit('/dashboard')}
                    style={{ width: '40px', height: '40px' }}
                >
                    <FaArrowLeft />
                </Button>
                <h3 className="fw-bold mb-0">Status Pengajuan Saya</h3>
            </div>

            {/* Tabel */}
            <Card className="shadow-sm rounded-4 border-0">
                <Card.Body className="p-4">
                    <Table responsive hover className="align-middle">
                        <thead className="bg-light text-secondary">
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Jenis Pengajuan</th>
                                <th>Status</th>
                                <th className="text-end">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pengajuanList.length > 0 ? (
                                pengajuanList.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="fw-bold">{index + 1}</td>
                                        <td>{item.tanggal}</td>
                                        <td className="fw-semibold text-primary">
                                            {item.jenis}
                                        </td>
                                        <td>
                                            <Badge
                                                bg={getStatusBadge(item.status)}
                                                className="px-3 py-2 rounded-pill"
                                            >
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="text-end">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() =>
                                                    router.visit(
                                                        `/detail-pengajuan/${item.id}`,
                                                    )
                                                }
                                            >
                                                Detail
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-4 text-muted text-center"
                                    >
                                        Belum ada pengajuan.
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
