<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyApplicant extends Model
{
    protected $fillable = [
        'file_npwp',
        'file_surat_kuasa',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
