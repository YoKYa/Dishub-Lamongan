import React from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import { router, Head } from '@inertiajs/react';
import { FaArrowLeft } from 'react-icons/fa';

const StatusPengajuan = () => {
  // Data Dummy (Nanti bisa diganti dengan props dari backend)
  const pengajuanList = [
    { id: 1, tanggal: "20-10-2025", jenis: "Izin Trayek Angkutan Umum", status: "Menunggu Verifikasi" },
    { id: 2, tanggal: "15-10-2025", jenis: "Pendaftaran Uji KIR", status: "Disetujui" },
    { id: 3, tanggal: "10-10-2025", jenis: "Izin Usaha Perparkiran", status: "Ditolak" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disetujui': return 'success';
      case 'Ditolak': return 'danger';
      case 'Perlu Revisi': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <Container className="py-5">
      <Head title="Status Pengajuan Saya" />

      {/* Header Halaman */}
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="light" 
          className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
          onClick={() => router.visit('/dashboard-pemohon')}
          style={{ width: '40px', height: '40px' }}
        >
        <FaArrowLeft />
        </Button>
        <h3 className="fw-bold mb-0">Status Pengajuan Saya</h3>
      </div>

      {/* Tabel Status Sesuai SDD Hal 39 */}
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <Table responsive hover className="align-middle">
            <thead className="bg-light text-secondary">
              <tr>
                <th className="py-3 border-0">No</th>
                <th className="py-3 border-0">Tanggal</th>
                <th className="py-3 border-0">Jenis Pengajuan</th>
                <th className="py-3 border-0">Status</th>
                <th className="py-3 border-0 text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pengajuanList.map((item, index) => (
                <tr key={item.id}>
                  <td className="fw-bold">{index + 1}</td>
                  <td>{item.tanggal}</td>
                  <td className="fw-semibold text-primary">{item.jenis}</td>
                  <td>
                    <Badge bg={getStatusBadge(item.status)} className="px-3 py-2 rounded-pill">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => router.visit(`/detail-pengajuan/${item.id}`)} // Navigasi ke detail
                    >
                    Detail
                    </Button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pesan jika data kosong */}
          {pengajuanList.length === 0 && (
            <div className="text-center py-5 text-muted">
              <p>Belum ada pengajuan yang dibuat.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StatusPengajuan;