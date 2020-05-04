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
//products
Route::get('/products-admin','AdminController@index');
Route::get('/products-admin/{status}','AdminController@status_type');
Route::Put('/products-admin/{id}', 'AdminController@update_status');
//orders
Route::get('/orders-admin','AdminController@index_orders');
Route::get('/orders-admin/{status}','AdminController@order_status_type');
Route::get('/address-details/{id}','AdminController@address_details');
Route::get('/referral-details/{id}','AdminController@referral_details');
Route::get('/order-details/{id}','AdminController@order_details');
Route::get('/order-total/{id}','AdminController@order_total');
//affiliates
Route::get('/affiliates-admin','AdminController@index_affiliates');
Route::get('/affiliates-admin/{status}','AdminController@affiliate_status_type');
Route::Put('/affiliates-admin/{id}', 'AdminController@update_aff_status');
Route::Put('/affiliates-plan-admin/{id}', 'AdminController@update_aff_plan');
Route::get('/plan-details/{id}','AdminController@plan_details');
Route::get('/team/{user}','AdminController@team');
//withdraws
Route::get('/withdraws-admin','AdminController@index_withdraws');
Route::get('/withdraws-admin/{status}','AdminController@withdraw_status_type');
Route::Put('/withdraws-admin/{id}', 'AdminController@update_wit_status');
Route::get('/payment-details/{id}','AdminController@payment_details');
Route::resource('admin','AdminController');
//sellers
Route::get('/sellers-admin','AdminController@index_sellers');
Route::get('/sellers-admin/{status}','AdminController@seller_status_type');
Route::Put('/sellers-admin/{id}', 'AdminController@update_sel_status');
Route::get('/products-details/{id}','AdminController@sel_products_details');
Route::get('/total_sel_orders/{id}','AdminController@total_sel_orders');
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

