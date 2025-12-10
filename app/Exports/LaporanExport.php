<?php

namespace App\Exports;

use App\Models\Request;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class LaporanExport implements FromView
{
    protected $req;
    public function __construct($req)
    {
        $this->req = $req;
    }

    public function view(): View
    {
        // Gunakan filter yang sama seperti di controller
        $query = Request::with(['user', 'typeRequest'])
            ->whereYear('updated_at', $this->req->tahun);

        if ($this->req->bulan !== 'Semua') {
            $query->whereMonth('updated_at', date('m', strtotime($this->req->bulan)));
        }

        if ($this->req->jenis !== 'Semua') {
            $query->whereHas('typeRequest', function ($q) {
                $q->where('nama_izin', 'LIKE', "%{$this->req->jenis}%");
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

        return view('exports.laporan-excel', [
            'bulan' => $this->req->bulan,
            'tahun' => $this->req->tahun,
            'jenis' => $this->req->jenis,
            'arsip' => $arsip,
        ]);
    }
}
