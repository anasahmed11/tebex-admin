<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Jobs\OrderJob;
use App\User;

//Route::get('/', function () {
//    $order=\App\Order::find(26);
//    OrderJob::dispatch($order);
//
//});
Route::get('/test',function (){
    $order=\App\Order::find(26);
    try {
        foreach ($order->Products()->get() as $product) {
            $pp=$product->Product()->first()->Store()->first();
            $pp->balance += ($product->price - $product->commission) * $product->quantity -10;
            $pp->save();
            $ppp = User::find(1)->Store()->first();
            $ppp->balance += ($product->price * (2.5/ 100))+10;
            $ppp->save();
        }
        return "done";
    }catch (Exception $exception){
        return $exception->getMessage();
    }
});
Route::get('/verify/email/{id}',function(){
    return view('welcome');
})->name('verification.verify');
Route::get('/reset/password/{token}',function (){
    return view('welcome');
})->name('password.reset');
Route::get('/{route?}',function(){
    //return view('welcome');
});