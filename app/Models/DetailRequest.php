<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailRequest extends Model
{
    protected $fillable = [
        'request_id',
        'field_name',
        'field_value',
    ];
    public function request()
    {
        return $this->belongsTo(Request::class, 'request_id');
    }
}
