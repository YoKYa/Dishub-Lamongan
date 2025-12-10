<?php

namespace App\Http\Controllers;


use Carbon\Carbon;
use App\Models\SuratIzin;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Request as RequestModel;
use Illuminate\Support\Facades\Storage;

class VerifikasiController extends Controller
{
    public function index()
    {
        $antrian = RequestModel::where('status', 'Menunggu Verifikasi')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($item){
                return [
                    'id' => $item->id,
                    'no_registrasi' => $item->register_number,
                    'pemohon' => $item->user->name,
                    'jenis_izin' => $item->typeRequest->nama_izin,
                    'tanggal_masuk' => $item->created_at->format('d M Y'),
                ];
            });

        return inertia('admin/verifikasi-list', [
            'antrian' => $antrian
        ]);
    }

     public function show($id)
    {
        // Ambil request/pengajuan + relasi user + relasi detail + dokumen
        $req = RequestModel::with([
            'user',
            'detailRequests',
            'documents',
            'typeRequest'
        ])->findOrFail($id);

        // MAPPING DATA KE FRONTEND
        $data = [
            'id'      => $req->id,
            'reg'     => $req->register_number,
            'jenis'   => $req->typeRequest->nama_izin,

            // DATA PEMOHON
            'pemohon' => [
                'nama'   => $req->user->name,
                'nik'    => $req->user->identity_number,
                'alamat' => $req->user->address,
                'telp'   => $req->user->phone,
            ],

            // DETAIL REQUEST → array isi field_name & field_value
            'detail_requests' => $req->detailRequests->map(function ($d) {
                return [
                    'field_name'  => $d->field_name,
                    'field_value' => $d->field_value,
                ];
            }),

            // DOKUMEN → file persyaratan
            'dokumen' => $req->documents->map(function ($d) {
                return [
                    'nama_dokumen' => $d->nama_dokumen,
                    'path_dokumen' => $d->path_dokumen,
                ];
            }),
        ];

        // KIRIM KE FRONTEND
        return inertia('admin/verifikasi-detail', [
            'data' => $data
        ]);
    }
    public function reject(Request $request, $id)
    {
        $req = RequestModel::with('detailRequests', 'documents')->findOrFail($id);

        // VALIDASI
        $request->validate([
            'alasan' => 'required|string|max:500',
        ]);

        // UPDATE STATUS & CATATAN
        $req->update([
            'status'  => 'Ditolak',
            'catatan' => $request->alasan,
        ]);

        // SIMPAN RIWAYAT (opsional, jika ada tabel riwayat)
        if (method_exists($req, 'riwayat')) {
            $req->riwayat()->create([
                'status'  => 'Ditolak',
                'ket'     => $request->alasan,
                'tanggal' => now()->format('d M Y'),
            ]);
        }

        // OUTPUT NOTIFIKASI
        return redirect()
            ->back()
            ->with('success', 'Pengajuan berhasil ditolak dan pemohon telah diberi catatan.');
    }

    public function approve($id)
    {
        $req = RequestModel::with(['user', 'typeRequest', 'detailRequests'])
            ->findOrFail($id);

        // Nomor Surat
        $nomorSurat = "551.2/" . rand(100,999) . "/DISHUB/" . date('Y');

        // Ambil semua detail field_name & field_value
        $detailList = $req->detailRequests->map(function ($d) {
            return [
                'name' => $d->field_name,
                'value' => $d->field_value,
            ];
        });

        // Ambil field pertama untuk objek (default)
        $firstField = $detailList->first();

        // Data PDF
        $dataSurat = [
            'nomor'  => $nomorSurat,
            'judul'  => "SURAT IZIN " . strtoupper($req->typeRequest->nama_izin),

            'nama'   => $req->user->name,
            'usaha'  => $req->user->role === 'perusahaan'
                ? $req->user->name
                : '-',

            // === Objek Utama — pakai field pertama ===
            'objek' => [
                'label' => $firstField['name'] ?? 'Keterangan',
                'value' => $firstField['value'] ?? '-',
            ],

            // === Detail lengkap — semua field_name + field_value ===
            'detail' => $detailList->toArray(),


            'tanggal' => now()->format('d F Y'),
        ];

        // Generate PDF
        $pdf = Pdf::loadView('pdf.surat-izin', ['surat' => $dataSurat]);

        // Simpan PDF
        $fileName = 'surat_izin_' . Str::random(10) . '.pdf';
        $pdfPath = 'surat_izin/' . $fileName;
        Storage::disk('public')->put($pdfPath, $pdf->output());

        // Simpan Surat
        SuratIzin::create([
            'request_id' => $req->id,
            'user_id'    => $req->user_id,
            'nomor_surat' => $nomorSurat,
            'judul' => $dataSurat['judul'],
            'tanggal_terbit' => now(),
            'tanggal_kadaluwarsa' => now()->addYears(5),
            'lokasi_file' => $pdfPath,
        ]);

        // Update pengajuan
        $req->update([
            'status' => 'Disetujui',
            'catatan' => 'Surat Izin telah diterbitkan'
        ]);

        return redirect()
            ->route('verifikasi.list')
            ->with('success', 'Surat izin berhasil diterbitkan!');
    }


}
