<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $table = 'requests';

    protected $fillable = [
        'user_id',
        'type_request_id',
        'status',
        'catatan',
    ];

    public function detailRequests()
    {
        return $this->hasMany(detailRequest::class, 'request_id');
    }
    public function documents()
    {
        return $this->hasMany(Document::class, 'request_id');
    }
    public function typeRequest()
    {
        return $this->belongsTo(typeRequest::class, 'type_request_id');
    }
}
