<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Point extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'point','status',
    ];
    protected $hidden = [
        'deleted_at','source_type','source_id','user_id'
    ];
    protected $casts = [
        'deleted_at'=>'datetime',
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function Source(){
        return $this->morphTo('source');
    }
    public function User(){
        return $this->belongsTo(User::class);
    }
}
