<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $fillable = [
        'area_name','area_name_en',
    ];
    protected $hidden = [
        'city_id','created_at','updated_at'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function city(){
        return $this->belongsTo(City::class);
    }
}
