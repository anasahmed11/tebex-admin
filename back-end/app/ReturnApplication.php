<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReturnApplication extends Model
{
    protected $fillable = [
        'reason',
        'note',
        'status',
        'status_message',
    ];



    public function OrderProduct()
    {
        return $this->hasOne(OrderProduct::class, 'return_id');
    }
}
