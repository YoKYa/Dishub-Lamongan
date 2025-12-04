<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailApplicant extends Model
{
    protected $fillable = [
        'applicant_id',
        'field_name',
        'field_value',
    ];
    public function applicant()
    {
        return $this->belongsTo(Applicant::class, 'applicant_id');
    }
}
