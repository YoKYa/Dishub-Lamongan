<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SuratIzin;
use Illuminate\Http\Request;

class SuratIzinController extends Controller
{
    public function index()
    {
        $surat = SuratIzin::with('request.typeRequest')
            ->whereHas('request', function ($q) {
                $q->where('user_id', auth()->id());
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($s){
                return [
                    'id'     => $s->id,
                    'nomor'  => $s->nomor_surat,
                    'tanggal'=> $s->tanggal_terbit,
                    'status' => $s->request->status,
                    'jenis'  => $s->request->typeRequest->nama_izin,
                    'file'      => $s->lokasi_file,
                ];
            });

        return inertia('pemohon/daftar-surat', [
            'surats' => $surat
        ]);
    }


    public function show($id)
    {
        $surat = SuratIzin::findOrFail($id);

        return inertia('SuratIzin', [
            'surat' => [
                'nomor'  => $surat->nomor,
                'judul'  => $surat->judul,
                'nama'   => $surat->nama,
                'usaha'  => $surat->usaha,
                'objek' => [
                    'label' => $surat->objek_label,
                    'value' => $surat->objek_value,
                ],
                'detail' => $surat->detail,
                'tanggal'=> date('d M Y', strtotime($surat->tanggal))
            ]
        ]);
    }

}
