<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    protected $table = 'applicant';

    protected $fillable = [
        'user_id',
        'type_applicant_id',
        'status',
        'catatan',
    ];

    public function detailApplicants()
    {
        return $this->hasMany(DetailApplicant::class, 'applicant_id');
    }
    public function documents()
    {
        return $this->hasMany(Document::class, 'applicant_id');
    }
    public function typeApplicant()
    {
        return $this->belongsTo(TypeApplicant::class, 'type_applicant_id');
    }
}
