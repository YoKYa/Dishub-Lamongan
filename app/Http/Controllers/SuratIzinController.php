<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SuratIzin;
use Illuminate\Http\Request;

class SuratIzinController extends Controller
{
    public function index()
    {
        $surat = SuratIzin::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($s) {
                return [
                    'id'      => $s->id,
                    'jenis'   => $s->jenis_izin,
                    'nomor'   => $s->nomor_surat,
                    'tanggal' => $s->tanggal_terbit->format('d F Y'),
                    'status'  => $s->status,
                ];
            });

        return Inertia::render('pemohon/daftar-surat', [
            'listSurat' => $surat
        ]);
    }

    public function show($id)
    {
        $surat = SuratIzin::with('request')->findOrFail($id);

        return Inertia::render('pemohon/surat-izin', [
            'surat' => [
                'id'      => $surat->id,
                'judul'   => strtoupper($surat->jenis_izin),
                'nomor'   => $surat->nomor_surat,
                'nama'    => $surat->request->nama_pemohon,
                'usaha'   => $surat->request->nama_usaha ?? '-',
                'objek'   => [
                    'label' => $surat->objek_label,
                    'value' => $surat->objek_value,
                ],
                'detail'  => $surat->keterangan,
                'tanggal' => $surat->tanggal_terbit->format('d F Y'),
                'qr'      => $surat->qr_code ?? null,
            ]
        ]);
    }
    public function approve($id)
{
    $req = Request::findOrFail($id);
    $req->status = 'Disetujui';
    $req->save();

    SuratIzin::create([
        'request_id'   => $req->id,
        'user_id'      => $req->user_id,
        'jenis_izin'   => $req->type->nama,
        'nomor_surat'  => $this->generateNomorSurat(),
        'tanggal_terbit' => now(),

        'nama_pemohon' => $req->pemohon_nama,
        'nama_usaha'   => $req->pemohon_usaha ?? null,

        'objek_label'  => 'Kendaraan',
        'objek_value'  => $req->kendaraan_nopol,

        'keterangan'   => 'Trayek: ' . $req->rute,

        'status' => 'Aktif',
    ]);

    return back()->with('success', 'Permohonan disetujui & surat izin dibuat!');
}
    private function generateNomorSurat()
    {
        $lastSurat = SuratIzin::orderBy('created_at', 'desc')->first();
        $lastNumber = $lastSurat ? (int)substr($lastSurat->nomor_surat, 0, 4) : 0;
        $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        $datePart = date('m/Y');
        return "{$newNumber}/SI/{$datePart}";
    }
}
