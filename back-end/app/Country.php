<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'iso_code','country_name', 'country_name_en', 'country_code','currency_code',
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    // public function cities(){
    //     return $this->hasMany(City::class);
    // }
    public function governorates(){
        return $this->hasMany(City::class);
    }
}
