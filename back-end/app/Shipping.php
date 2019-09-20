<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $table = 'shipping';
    protected $fillable = [
        'min_days', 'max_days', 'fees', 'shipper_id', 'city_id'
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    // protected $hidden = [
    //     'created_at','updated_at'
    // ];
    public $timestamps = false;

    public function Shipper()
    {
        return $this->belongsTo(Shipper::class);
    }
    public function Location()
    {
        return $this->morphTo('location');
    }
    public function Governorate()
    {
        return  $this->belongsTo(Governorate::class);
    }
}
