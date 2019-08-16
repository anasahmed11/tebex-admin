<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    protected $table='shipping';
    protected $fillable=[
        'min_days','max_days','fees'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];
    public function Shipper(){
        $this->hasOne(Shipper::class);
    }
    public function Location(){
        return $this->morphTo('location');
    }
    public function City(){
        return  $this->belongsTo(City::class, 'location_id')
            ->where('location_type','=',City::class);
    }
    public function Area(){
        return  $this->belongsTo(Area::class, 'location_id')
            ->where('location_type','=',Area::class);
    }




}
