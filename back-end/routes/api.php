<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('test', 'TestController@test');

Route::prefix('auth')->group(function () {
    Route::post('login', 'API\Auth\AuthController@login');
    Route::post('register', 'API\Auth\AuthController@register');
    Route::post('forgot/password', 'API\Auth\PasswordController@sendResetLinkEmail');
    Route::post('reset/password/{token}', 'API\Auth\PasswordController@reset')->name('password.reset');
    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('verify/email/{id}', 'API\Auth\VerificationController@verify')->name('verification.verify');
        Route::post('verify/resend/email', 'API\Auth\VerificationController@resend');
        Route::get('logout', 'API\Auth\AuthController@logout');
        Route::get('details', 'API\Auth\AuthController@details');
    });
});



Route::get('honored', 'API\HonorController@index');
Route::prefix('category')->group(function () {
    Route::get('/', 'API\Category\CategoryController@index');
});


Route::prefix('address')->group(function () {
    Route::get('/', 'API\Address\AddressController@show');
    Route::post('create', 'API\Address\AddressController@create');
    Route::get('{address}/delete','API\Address\AddressController@delete');
    Route::get('{address}/shipping','API\Address\AddressController@shipping');
    Route::get('{city}/shipping/city','API\Address\AddressController@city_shipping');

    Route::get('countries', 'API\Address\AddressController@countries');
    Route::get('cities/{country}', 'API\Address\AddressController@cities');
    Route::get('areas/{city}', 'API\Address\AddressController@areas');
});

Route::prefix('product')->group(function () {
    Route::get('/', 'API\Product\ProductController@index');
    Route::get('{product}', 'API\Product\ProductController@product');
    Route::get('{product}/specs', 'API\Product\ProductController@specs');
    Route::get('{product}/{sku}/sku', 'API\Product\ProductController@sku');
});
Route::prefix('cart')->middleware('auth:api')->group(function () {
    Route::get('/','API\Cart\CartController@show');
    Route::post('/add','API\Cart\CartController@add');
    Route::post('/remove','API\Cart\CartController@remove');
});
Route::prefix('orders')->group(function () {
    Route::get('/','API\Order\OrderController@index');
    Route::get('/{id}/{token}','API\Order\OrderController@show')->name('order.mail');

});
Route::prefix('store')->group(function () {
    Route::get('/','API\Store\StoreController@show');
});
Route::prefix('checkout')->group(function () {
    Route::post('/','API\Checkout\CheckOutController@index');

});
