<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentAccount extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'method', 'account', '_token'
    ];
    protected $hidden = [
        'deleted_at','created_at','updated_at'
    ];
    protected $casts = [
        'deleted_at'=>'datetime',
        'created_at'=>'datetime',
        'updated_at'=>'datetime',

    ];
    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Withdraws(){
        return $this->hasMany(Withdraw::class);
    }
}
