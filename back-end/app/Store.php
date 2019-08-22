<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable=['name','name_en','address','email','phone','image','slug','type','method','account','url','balance'];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function Products(){
        return $this->hasMany(Product::class);
    }
    public function User(){
        return $this->belongsTo(User::class);
    }
    public function toArray()
    {
        $attr=$this->attributesToArray();
        unset($attr['balance']);
        return array_merge($attr, $this->relationsToArray());
    }

}
