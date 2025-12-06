<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use Inertia\Inertia;

class StatusPengajuanController extends Controller
{
    public function index()
    {
        $requests = ModelsRequest::with('typeRequest')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($req) {
                return [
                    'id' => $req->id,
                    'tanggal' => $req->created_at->format('d-m-Y'),
                    'jenis' => $req->typeRequest->nama_izin ?? '-',
                    'status' => $req->status,
                ];
            });

        return Inertia::render('pemohon/status-pengajuan', [
            'pengajuanList' => $requests
        ]);
    }
}
