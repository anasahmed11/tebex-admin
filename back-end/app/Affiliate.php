<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Affiliate extends Model
{
    protected $fillable=['level','method','account'];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function User(){
        return $this->belongsTo(User::class);
    }
}
