<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuratIzin extends Model
{
    protected $table = 'surat_izins';

    protected $fillable = [
        'request_id',
        'nomor_surat',
        'lokasi_file',
        'tanggal_terbit',
        'tanggal_kadaluwarsa',
    ];

    public function request()
    {
        return $this->belongsTo(Request::class, 'request_id');
    }
}
