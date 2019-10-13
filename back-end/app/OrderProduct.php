<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    public $timestamps = false;
    protected $with = ['Order','Product'];
    protected $table ='order_products';
    protected $fillable=['order_id','product_id','price','quantity','commission','commission_percent'];

    public function Product(){
        return $this->belongsTo(Product::class);
    }
    public function Order(){
        return $this->belongsTo(Order::class);
    }
    public function ReturnApplication(){
        return $this->belongsTo(ReturnApplication::class, 'return_id');
    }

}
