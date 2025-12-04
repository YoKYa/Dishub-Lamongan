<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeRequest extends Model
{
    protected $fillable = [
        'nama_izin',
        'deskripsi',
        'syarat_dokumen',
    ];
    public function applicants()
    {
        return $this->hasMany(Request::class, 'request_id');
    }
}
