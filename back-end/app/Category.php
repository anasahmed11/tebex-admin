<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model
{
    use NodeTrait;
    protected $fillable=[
        'name','name_en','slug'
    ];
    protected $hidden=[
        'created_at','updated_at'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function Specs(){
        return $this->belongsToMany(Spec::class,'category_specs');
    }
    public function Product(){
        return $this->belongsToMany(Product::class,'category_products');
    }

}
