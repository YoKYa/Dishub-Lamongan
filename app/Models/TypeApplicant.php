<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeApplicant extends Model
{
    protected $fillable = [
        'nama_izin',
        'deskripsi',
        'syarat_dokumen',
    ];
    public function applicants()
    {
        return $this->hasMany(Applicant::class, 'applicant_id');
    }
}
