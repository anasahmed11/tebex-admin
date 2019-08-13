<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductSpec extends Model
{
    public $primaryKey=null;
    public $incrementing=false;
    public $timestamps=false;
    protected $table ='product_specs';
    protected $fillable=["value","product_id","spec_id"];

    protected $casts = [
        'value' => 'json',

    ];
    public function Spec(){
        return $this->belongsTo(Spec::class);
    }
}
