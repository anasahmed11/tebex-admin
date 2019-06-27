<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shipper extends Model
{
    protected $fillable=[
        'name','description',
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    protected $hidden=[
        'created_at','updated_at'
    ];
    public function Orders(){
        $this->belongsToMany(Order::class);
    }
    public function Fees(){
        $this->hasMany(Shipping::class);
    }
}
