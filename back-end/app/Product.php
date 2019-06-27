<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{   use softDeletes;
    protected $with=['Store'];
    protected $fillable = [
        'name','name_en', 'slug', 'sku','images','description','description_en','price','sale_price','quantity'
    ];
    protected $hidden = [
        'created_at','updated_at'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
        'images'=>'json'
    ];
    public function Specs(){
        return $this->hasMany(ProductSpec::class)
            ->join("specs","specs.id","=","product_specs.spec_id")
            ->select("name","name_en","value");
    }
    public function Store(){
        return $this->belongsTo(Store::class);
    }

}
