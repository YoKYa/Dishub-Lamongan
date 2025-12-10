<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document;
use Illuminate\Http\Request;
use App\Models\DetailRequest;
use App\Models\Request as ModelsRequest;
use Illuminate\Support\Facades\Storage;

class RequestController extends Controller
{
    /**
     * SIMPAN PENGAJUAN / SIMPAN DRAFT / UPDATE DRAFT
     */
    public function store(Request $request, $id = null)
    {
        // ============================================================
        // Jika $id ada → UPDATE DRAFT
        // Jika $id null → BUAT BARU
        // ============================================================

        if ($id) {
            // ----------------------------
            // UPDATE DRAFT
            // ----------------------------
            $permohonan = ModelsRequest::where('id', $id)
                ->where('status', 'draft')
                ->firstOrFail();

            $permohonan->type_request_id = $request->type_request_id;
            $permohonan->status = $request->status;  // draft / Menunggu Verifikasi
            $permohonan->save();

        } else {

            // ----------------------------
            // BUAT PERMOHONAN BARU
            // ----------------------------
            $registerNumber = 'REG-' . date('Y') . '-' . str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT);

            $permohonan = ModelsRequest::create([
                'user_id' => auth()->id(),
                'register_number' => $registerNumber,
                'type_request_id' => $request->type_request_id,
                'status' => $request->status,
            ]);
        }

        // ============================================================
        // HAPUS DETAIL LAMA JIKA UPDATE DRAFT
        // ============================================================
        DetailRequest::where('request_id', $permohonan->id)->delete();

        // ============================================================
        // SIMPAN DETAIL REQUEST BARU
        // ============================================================
        if ($request->detail_requests != null) {
            foreach ($request->detail_requests as $row) {
                DetailRequest::create([
                    'request_id' => $permohonan->id,
                    'field_name' => $row['field_name'],
                    'field_value' => $row['field_value'],
                ]);
            }
        } else {
            return back()->with('error', 'Detail permohonan tidak boleh kosong');
        }

        // ============================================================
        // SIMPAN DOKUMEN DINAMIS
        // ============================================================
        if ($request->documents) {

            if ($id) {
                // ====================================================
                // HAPUS DOKUMEN LAMA HANYA JIKA ADA FILE BARU DIUPLOAD
                // ====================================================
                $oldDocs = Document::where('request_id', $permohonan->id)->get();

                foreach ($oldDocs as $doc) {

                    // Jika user upload file baru dengan label yang sama → replace dokumen
                    if ($request->hasFile("documents." . $doc->nama_dokumen)) {

                        // hapus file di storage
                        if (Storage::disk('public')->exists($doc->path_dokumen)) {
                            Storage::disk('public')->delete($doc->path_dokumen);
                        }

                        $doc->delete(); // hapus record
                    }
                }
            }

            // Upload dokumen baru
            foreach ($request->documents as $label => $file) {

                // Jika user tidak upload ulang (string path lama), jangan simpan ulang
                if (is_string($file)) continue;

                $path = $file->store("documents/request/{$permohonan->id}", 'public');

                Document::create([
                    'request_id' => $permohonan->id,
                    'nama_dokumen' => $label,
                    'path_dokumen' => $path,
                ]);
            }
        }

        // RESPONSE
        // return back()->with('success', 'Berhasil disimpan');
    }

    /**
     * LOAD DRAFT UNTUK DIEDIT
     */
    public function editDraft($draft)
    {
        $draft = ModelsRequest::with('detailRequests', 'documents', 'typeRequest')
            ->where('id', $draft)
            ->firstOrFail();

        return Inertia::render('pemohon/ajukan-permohonan', [
            'draft' => $draft
        ]);
    }
    public function detail($id)
    {
        $req = ModelsRequest::with([
            'typeRequest',
            'detailRequests',
            'documents',
        ])
        ->where('user_id', auth()->id())
        ->findOrFail($id);

        // Format dokumen
        $docs = $req->documents->map(function($d){
            return [
                'nama' => $d->nama_dokumen,
                'file' => $d->path_dokumen,
            ];
        });

        // Format detail fields
        $fields = $req->detailRequests->map(function($f){
            return [
                'field_name' => $f->field_name,
                'field_value' => $f->field_value,
            ];
        });

        // Riwayat (opsional, bisa diambil dari log table jika ada)
        $logs = [
            [
                'tanggal' => $req->created_at->format('d M Y H:i'),
                'status' => 'Pengajuan Dibuat',
                'ket' => 'Permohonan berhasil disimpan.',
            ],
            [
                'tanggal' => $req->created_at->format('d M Y H:i'),
                'status' => $req->status,
                'ket' => 'Status saat ini.',
            ],
        ];

        return Inertia::render('pemohon/detail-pengajuan', [
            'pengajuan' => [
                'id' => $req->id,
                'no_registrasi' => $req->register_number,
                'jenis_izin' => $req->typeRequest->nama,
                'tanggal_pengajuan' => $req->created_at->format('d F Y'),
                'status' => $req->status,
                'catatan_admin' => $req->catatan_admin ?? '',
                'data_detail' => $fields,
                'dokumen' => $docs,
                'riwayat' => $logs,
            ],
        ]);
    }
    public function cekPermohonan($reg)
    {
        $data = \App\Models\Request::with(['user', 'typeRequest'])
            ->where('register_number', $reg)
            ->first();

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'result' => [
                'no_registrasi' => $data->register_number,
                'pemohon'       => $data->user->name,
                'jenis'         => $data->typeRequest->nama_izin,
                'tanggal'       => $data->created_at->format('d M Y'),
                'status'        => $data->status,
                'pesan'         => $data->catatan ?? '-'
            ]
        ]);
    }

}
