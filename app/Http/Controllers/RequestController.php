<?php

namespace App\Http\Controllers;

use App\Models\DetailRequest;
use App\Models\Document;
use App\Models\Request as ModelsRequest;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function store(Request $request)
{
     $registerNumber = 'REG-' .date('Y').'-'. str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT);
    $permohonan = ModelsRequest::create([
        'user_id' => auth()->id(),
        'register_number' => $registerNumber,
        'type_request_id' => $request->type_request_id,
        'status' => $request->status,
    ]);
    foreach ($request->detail_permohonan as $row) {
        DetailRequest::create([
            'request_id' => $permohonan->id,
            'field_name' => $row['field_name'],
            'field_value' => $row['field_value'],
        ]);
    }

    // 🔥 simpan dokumen
    if ($request->dokumen) {
        foreach ($request->dokumen as $key => $file) {
            $path = $file->store("documents/request/{$permohonan->id}", 'public');

            Document::create([
                'request_id' => $permohonan->id,
                'nama_dokumen' => $key,
                'path_dokumen' => $path,
            ]);
        }
    }

    return back()->with('success', 'Berhasil dikirim');
}

}
