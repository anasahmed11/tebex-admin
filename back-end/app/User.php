<?php

namespace App;

use App\Notifications\VerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kalnoy\Nestedset\NodeTrait;

/**
 * @property  active_points
 * @property  inactive_points
 * @property  suspended_points
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable, SoftDeletes, NodeTrait;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    //protected $with =['Addresses','Points'];
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'phone', 'gender', 'birth_date', 'level', 'image', 'store_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    protected $hidden = [
        'password', 'remember_token', 'email_verified_at', 'deleted_at', 'updated_at', '_lft', '_rgt'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'birth_date' => 'date',
        'deleted_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function Addresses()
    {
        return $this->hasMany(Address::class);
    }
    public function Points()
    {
        return $this->hasMany(Point::class);
    }
    public function Cart()
    {
        return $this->belongsToMany(Product::class, 'carts')->with('Store')->as('cart')->withPivot('quantity');

        // return $this->hasOne(Cart::class);
        /*return $this->hasMany(Cart::class)
            ->leftJoin("products","products.id","=","carts.product_id")
            ->leftJoin("stores","stores.id","=","products.store_id")
            ->select(['stores.*','products.*','carts.quantity as cart_quantity']);*/
    }
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }
    public function Store()
    {
        return $this->hasMany(Store::class);
    }
    public function Affiliate()
    {
        return $this->hasMany(Affiliate::class);
    }
    public function Orders()
    {
        return $this->hasManyThrough(Order::class, Address::class);
    }
}
