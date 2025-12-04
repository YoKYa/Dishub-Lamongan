<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndividualApplicant extends Model
{
    protected $fillable = [
        'file_ktp',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
