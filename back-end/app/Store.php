<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable=['name','name_en','address','email','phone','image','slug'];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function Products(){
        return $this->hasMany(Product::class);
    }
}
