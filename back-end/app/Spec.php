<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Spec extends Model
{
    protected $fillable=[
      "name","name_en","type","vales"
    ];
    protected $hidden=[
        "created_at","updated_at"
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
        'values'=>'json'
    ];
}
