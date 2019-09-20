<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Withdraw extends Model
{

    use SoftDeletes;

    protected $with = ['Payments'];
    protected $fillable = [
        'payment_account_id', 'cash'
    ];
    protected $hidden = [
        'deleted_at','updated_at'
    ];
    protected $casts = [
        'deleted_at'=>'datetime',
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];

    public function Payments(){
        return $this->belongsTo(PaymentAccount::class, 'payment_account_id');
    }


}
