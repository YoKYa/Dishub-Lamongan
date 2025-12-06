<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuratIzin extends Model
{
    protected $table = 'surat_izins';

    protected $fillable = [
        'request_id',
        'user_id',
        'jenis_izin',
        'nomor_surat',
        'tanggal_terbit',
        'nama_pemohon',
        'nama_usaha',
        'objek_label',
        'objek_value',
        'keterangan',
        'file_pdf',
        'qr_code',
        'status',
    ];

    public function request()
    {
        return $this->belongsTo(Request::class);
    }
}