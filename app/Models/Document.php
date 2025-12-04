<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'request_id',
        'nama_dokumen',
        'path_dokumen',
    ];
    public function applicant()
    {
        return $this->belongsTo(Request::class, 'request_id');
    }
}
