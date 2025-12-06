import { useState } from 'react';
import { Container, Card, Table, Button, Alert, Modal } from 'react-bootstrap';
import { router, Head, usePage } from '@inertiajs/react';
import { FaArrowLeft, FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';


export default function Draft() {

  // 🔥 Ambil data dari backend, tanpa mengubah tampilan
  const { props }: any = usePage();
  const drafts = props.drafts || [];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<number | null>(null);

  const initiateDelete = (id: number) => {
    setDraftToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!draftToDelete) return;

    router.delete(`/draft/${draftToDelete}`, {
      preserveScroll: true,
      onFinish: () => {
        setShowDeleteModal(false);
        setDraftToDelete(null);
      }
    });
  };

  const handleLanjutIsi = (draft: any) => {
    router.visit(`/ajukan-permohonan/${draft.id}`);
  };

  return (
    <Container className="py-5">
      <Head title="Draft Pengajuan" />

      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="light" 
          className="me-3 shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center" 
          onClick={() => router.visit('/dashboard')}
          style={{ width: '40px', height: '40px' }}
        >
          <FaArrowLeft />
        </Button>
        <h3 className="fw-bold mb-0">Draft Pengajuan</h3>
      </div>

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-0">
          {drafts.length > 0 ? (
            <Table responsive hover className="align-middle mb-0">
              <thead className="bg-light text-secondary">
                <tr>
                  <th className="py-3 px-4 border-0">No</th>
                  <th className="py-3 border-0">Tanggal</th>
                  <th className="py-3 border-0">Jenis Pengajuan</th>
                  <th className="py-3 border-0 text-end px-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {drafts.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td className="fw-bold px-4">{index + 1}</td>
                    <td>{item.tanggal}</td>
                    <td className="fw-semibold text-primary">{item.jenis}</td>

                    <td className="text-end px-4" style={{ minWidth: '140px' }}>
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleLanjutIsi(item)}
                      >
                        <FaEdit />
                      </Button>

                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => initiateDelete(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="light" className="text-center py-5 text-muted border-0 m-3">
              <p className="mb-0">Tidak ada draft pengajuan yang tersimpan.</p>
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body className="text-center p-5">
          <div className="mb-3 text-danger">
            <FaExclamationTriangle size={50} />
          </div>
          <h4 className="fw-bold mb-3">Hapus Draft?</h4>
          <p className="text-muted mb-4">
            Apakah Anda yakin ingin menghapus draft ini?<br/>
            <strong>Data yang dihapus tidak dapat dikembalikan.</strong>
          </p>

          <div className="d-flex justify-content-center gap-2">
            <Button variant="light" className="px-4" onClick={() => setShowDeleteModal(false)}>
              Batal
            </Button>
            <Button variant="danger" className="px-4" onClick={confirmDelete}>
              Ya, Hapus
            </Button>
          </div>
        </Modal.Body>
      </Modal>

    </Container>
  );
}
