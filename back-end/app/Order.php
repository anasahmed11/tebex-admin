<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $with = ['Address'];
    protected $fillable=[
        'status','shipping_fees','_token'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function Address(){
        return $this->belongsTo(Address::class);
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
}
