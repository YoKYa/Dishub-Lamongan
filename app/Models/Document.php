<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'applicant_id',
        'nama_dokumen',
        'path_dokumen',
    ];
    public function applicant()
    {
        return $this->belongsTo(Applicant::class, 'applicant_id');
    }
}
