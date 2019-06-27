<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Address extends Model
{
    use SoftDeletes,Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $with=['Location'];
    protected $fillable = [
        'first_name','last_name', 'address','email','phone', 'landmark','notes','_token'
    ];
    protected $hidden = [
        'user_id','created_at','updated_at'
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */

    protected $casts = [
        'deleted_at'=>'datetime',
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
    ];
    public function Location(){
        return $this->morphTo('location');
    }
    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Orders(){
        return $this->hasMany(Order::class);
    }
}
