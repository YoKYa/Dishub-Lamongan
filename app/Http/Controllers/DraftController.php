<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;
use App\Models\Request as ModelsRequest;

class DraftController extends Controller
{
    public function index()
    {
        $drafts = ModelsRequest::where('user_id', auth()->id())
            ->where('status', 'draft')
            ->with('typeRequest')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id'     => $item->id,
                    'tanggal'=> $item->created_at->format('d-m-Y'),
                    'jenis'  => $item->typeRequest->nama_izin ?? '-',
                    'kode'   => $item->type_request_id,
                ];
            });

        return Inertia::render('pemohon/draft', [
            'drafts' => $drafts
        ]);
    }
    public function destroy($id)
    {
        ModelsRequest::where('user_id', Auth::id())
            ->where('id', $id)
            ->delete();

        return back()->with('success', 'Draft berhasil dihapus.');
    }
}
