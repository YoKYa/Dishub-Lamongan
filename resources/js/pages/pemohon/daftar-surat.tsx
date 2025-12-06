import React from 'react';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';
import { router, Head } from '@inertiajs/react';
import { FaArrowLeft, FaEye } from 'react-icons/fa';

export default function DaftarSurat() {
  // Data Dummy
  const listSurat = [
    { 
      id: 1, 
      jenis: "Izin Trayek Angkutan Umum", 
      nomor: "551.2/001/Dishub/2025", 
      tanggal: "22 Oktober 2025",
      status: "Aktif"
    },
    { 
      id: 2, 
      jenis: "Izin Usaha Perparkiran", 
      nomor: "550/045/Dishub-Parkir/2025", 
      tanggal: "15 September 2025",
      status: "Aktif"
    }
  ];

  return (
    <Container className="py-5">
      <Head title="Arsip Surat Izin" />

      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="light" 
          className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
          onClick={() => router.visit('/dashboard-pemohon')}
          style={{ width: '40px', height: '40px' }}
        >
        <FaArrowLeft />
        </Button>
        <div>
            <h3 className="fw-bold mb-0">Arsip Surat Izin Digital</h3>
            <p className="text-muted mb-0 small">Daftar dokumen perizinan yang telah diterbitkan dan sah.</p>
        </div>
      </div>

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="bg-light text-secondary small text-uppercase">
              <tr>
                <th className="py-3 px-4 border-0">No</th>
                <th className="py-3 border-0">Jenis Izin / Nomor SK</th>
                <th className="py-3 border-0">Tanggal Terbit</th>
                <th className="py-3 border-0">Status</th>
                <th className="py-3 border-0 text-end px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listSurat.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 fw-bold text-muted">{index + 1}</td>
                  <td>
                    <div className="fw-bold text-primary">{item.jenis}</div>
                    <div className="small text-muted">{item.nomor}</div>
                  </td>
                  <td>{item.tanggal}</td>
                  <td>
                    <Badge bg="success" className="rounded-pill fw-normal px-3">
                        {item.status}
                    </Badge>
                  </td>
                  <td className="text-end px-4">
                    <Button 
                        variant="primary" 
                        size="sm" 
                        className="d-inline-flex align-items-center gap-2"
                        onClick={() => router.visit(`/surat-izin/${item.id}`)} // Pindah ke detail berdasarkan ID
                    >
                        <FaEye /> Lihat Surat
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {listSurat.length === 0 && (
             <div className="text-center py-5 text-muted">Belum ada surat izin yang diterbitkan.</div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
