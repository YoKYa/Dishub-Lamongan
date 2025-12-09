<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Http\Request;

class DashboardAdminController extends Controller
{
    public function index()
    {
        // =============================
        // 1) DATA VERIFIKASI TERBARU
        // =============================
        $recent = RequestModel::where('status', 'Menunggu Verifikasi')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id'      => $item->id,
                    'reg'     => $item->register_number,
                    'pemohon' => $item->user->name,
                    'jenis'   => $item->typeRequest->nama_izin,
                    'tgl'     => $item->created_at->format('d M'),
                ];
            });

        // =============================
        // 2) STATISTIK UNTUK KARTU DASHBOARD
        // =============================
        $stats = [
            'total'    => RequestModel::count(),
            'pending'  => RequestModel::where('status', 'Menunggu Verifikasi')->count(),
            'approved' => RequestModel::where('status', 'Disetujui')->count(),
            'rejected' => RequestModel::where('status', 'Ditolak')->count(),
        ];

        // =============================
        // 3) RETURN KE FILE TSX /admin/dashboard-admin.tsx
        // =============================
        return inertia('admin/dashboard-admin', [
            'recentVerifications' => $recent,
            'stats'               => $stats,
        ]);
    }
}
