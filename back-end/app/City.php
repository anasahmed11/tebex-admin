<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'iso_code','city_name', 'city_name_en',
    ];
    protected $hidden = [
        'country_id','created_at','updated_at'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function areas(){
        return $this->hasMany(Area::class);
    }
    public function country(){
        return $this->belongsTo(Country::class);
    }
}
