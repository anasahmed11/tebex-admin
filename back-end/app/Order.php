<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    protected $with = ['Address','Referral'];
    protected $fillable=[
        'status','shipping_fees','_token','commission','returnable'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
        'returnable'=>'boolean'
    ];
    public function Address(){
        return $this->belongsTo(Address::class,'address_id');
    }
    public function Shipper(){
       return  $this->belongsTo(Shipper::class);
    }
    public function Referral(){
        return $this->belongsTo(User::class,'referral_id');
    }
    public function Products(){
        return $this->hasMany(OrderProduct::class);
    }
    public function User(){
        return $this->hasOneThrough(User::class, Address::class);
    }

}
