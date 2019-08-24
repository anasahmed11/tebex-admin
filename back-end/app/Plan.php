<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    protected $fillable = [
        'name','name_en','description','description_en','commission','price','rules'
    ];
    protected $casts = [
        'deleted_at'=>'datetime',
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
        'rules'=>'json'
    ];
    public function Users(){
        return $this->belongsTo(User::class,'level');
    }
}
