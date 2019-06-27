<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductSpec extends Model
{
    protected $table ='product_specs';
    protected $fillable=["value"];
    protected $hidden=[
        "created_at",
        "updated_at"
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];

}
