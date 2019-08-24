<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shipper extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name', 'description',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];
    public function Orders()
    {
        $this->belongsToMany(Order::class);
    }
    public function Fees()
    {
        $this->hasMany(Shipping::class);
    }
}
