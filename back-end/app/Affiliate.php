<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Affiliate extends Model
{
    protected $fillable=['level','method','account','active_balance','inactive_balance','suspended_balance'];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Plan(){
        return $this->belongsTo(Plan::class);
    }
}
