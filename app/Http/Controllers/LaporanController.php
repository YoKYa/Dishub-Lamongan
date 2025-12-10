<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Request as ModelsRequest;

class LaporanController extends Controller
{
    public function index(Request $r)
{
    // Ambil filter
    $bulan = $r->bulan ?? 'Semua';
    $tahun = $r->tahun ?? date('Y');
    $jenis = $r->jenis ?? 'Semua';

    // Base query
    $query = \App\Models\Request::with(['user','typeRequest'])
        ->whereYear('updated_at', $tahun);

    // Filter bulan
    if ($bulan !== 'Semua') {
        $query->whereMonth('updated_at', date('m', strtotime($bulan)));
    }

    // Filter jenis layanan
    if ($jenis !== 'Semua') {
        $query->whereHas('typeRequest', function ($q) use ($jenis) {
            $q->where('nama_izin', 'LIKE', "%$jenis%");
        });
    }

    // ============================
    //  DATA TABEL ARSIP
    // ============================
    $arsip = $query->whereIn('status', ['Disetujui','Ditolak'])
        ->orderBy('updated_at', 'desc')
        ->get()
        ->map(function($row){
            return [
                'id'      => $row->id,
                'reg'     => $row->register_number,
                'pemohon' => $row->user->name,
                'jenis'   => $row->typeRequest->nama_izin,
                'tgl'     => $row->updated_at->format('d M Y'),
                'status'  => $row->status,
                'petugas' => $row->petugas ?? '-',
            ];
        });

    // ============================
    //  STATISTIK
    // ============================
    $totalProses = $arsip->count();
    $totalDisetujui = $arsip->where('status', 'Disetujui')->count();
    $totalDitolak = $arsip->where('status', 'Ditolak')->count();

    // ============================
    //  GRAFIK MINGGUAN
    // ============================
    $grafikMingguan = [
        'minggu1' => $arsip->filter(fn($d) => intval(substr($d['tgl'], 0, 2)) <= 7)->count(),
        'minggu2' => $arsip->filter(fn($d) => intval(substr($d['tgl'], 0, 2)) >= 8 && intval(substr($d['tgl'], 0, 2)) <= 14)->count(),
        'minggu3' => $arsip->filter(fn($d) => intval(substr($d['tgl'], 0, 2)) >= 15 && intval(substr($d['tgl'], 0, 2)) <= 21)->count(),
        'minggu4' => $arsip->filter(fn($d) => intval(substr($d['tgl'], 0, 2)) >= 22)->count(),
    ];

    // SEND KE INERTIA
    return inertia('admin/laporan-admin', [
        'arsip' => $arsip,
        'filter' => [
            'bulan' => $bulan,
            'tahun' => $tahun,
            'jenis' => $jenis,
        ],
        'statistik' => [
            'total' => $totalProses,
            'disetujui' => $totalDisetujui,
            'ditolak' => $totalDitolak,
        ],
        'grafik' => $grafikMingguan,
    ]);
}


    // ============================================================
    // EXPORT PDF / EXCEL
    // ============================================================
public function export($format, Request $r)
{
    // Query yang sama dengan halaman index
    $query = ModelsRequest::with(['user','typeRequest'])
        ->whereYear('updated_at', $r->tahun);

    if ($r->bulan !== 'Semua') {
        $query->whereMonth('updated_at', date('m', strtotime($r->bulan)));
    }

    if ($r->jenis !== 'Semua') {
        $query->whereHas('typeRequest', function ($q) use ($r) {
            $q->where('nama_izin', 'LIKE', "%{$r->jenis}%");
        });
    }

    $arsip = $query->whereIn('status', ['Disetujui','Ditolak'])
        ->orderBy('updated_at', 'desc')
        ->get()
        ->map(function($row){
            return [
                'reg'     => $row->register_number,
                'pemohon' => $row->user->name,
                'jenis'   => $row->typeRequest->nama_izin,
                'tgl'     => $row->updated_at->format('d M Y'),
                'status'  => $row->status,
            ];
        });

    if ($format == 'PDF') {
        $pdf = Pdf::loadView('exports.laporan', [
            'bulan' => $r->bulan,
            'tahun' => $r->tahun,
            'arsip' => $arsip,   // 🔥 FIX: KIRIM DATA ARSIP
        ]);

        return $pdf->download("Laporan-{$r->bulan}-{$r->tahun}.pdf");
    }

    if ($format == 'Excel') {
        return Excel::download(new \App\Exports\LaporanExport($r), "Laporan-{$r->bulan}-{$r->tahun}.xlsx");
    }

    return back();
}

}
