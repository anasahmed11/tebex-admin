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
    Route::post('reset/password/{token}', 'API\Auth\PasswordController@reset')->name('password.reset.api');
    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('verify/email/{id}', 'API\Auth\VerificationController@verify')->name('verification.verify.api');;
        Route::get('verify/resend/email', 'API\Auth\VerificationController@resend');
        Route::get('logout', 'API\Auth\AuthController@logout');
        Route::get('details', 'API\Auth\AuthController@details');
    });
});



Route::get('honored', 'API\HonorController@index');

Route::prefix('category')->group(function () {
    Route::get('/', 'API\Category\CategoryController@index');
    Route::match(['get', 'post'], '/{category}/products', 'API\Category\CategoryController@products');
    Route::get('/{category}/products/count', 'API\Category\CategoryController@productsCount');
    Route::get('/{category}/specs', 'API\Category\CategoryController@specs');
    Route::get('/{category}/specs/count', 'API\Category\CategoryController@specsCount');
    Route::get('/{category}/products/filters', 'API\Category\CategoryController@filter');
});

Route::prefix('user')->group(function () {
    Route::get('/', 'API\User\UserController@user');
    Route::post('/settings/main', 'API\User\UserController@editUserMainSettings');
    Route::post('/affiliate/click', 'API\User\UserController@saveAffiliateClick');
    Route::get('/affiliate/click', 'API\User\UserController@getAffiliateClick');

    Route::get('/team', 'API\User\UserController@team');

    Route::post('/program/seller', 'API\User\ProgramController@Stores');
    Route::post('/program/affiliate', 'API\User\ProgramController@Affiliates');
});
Route::prefix('address')->group(function () {
    Route::get('/', 'API\Address\AddressController@show');
    Route::post('/', 'API\Address\AddressController@create');
    Route::post('/{address}', 'API\Address\AddressController@edit');
    Route::delete('{address}', 'API\Address\AddressController@delete');

    Route::get('{address}/shipping', 'API\Address\AddressController@shipping');
    // Route::get('{city}/shipping/city', 'API\Address\AddressController@city_shipping');

    // Route::get('countries', 'API\Address\AddressController@countries');
    // Route::get('cities/{country}', 'API\Address\AddressController@cities');
    // Route::get('areas/{city}', 'API\Address\AddressController@areas');


});

Route::prefix('governorate')->group(function () {
    Route::get('/', 'API\Governorate\GovernorateController@getGovernorates');
    Route::get('/{governorate}/shipping', 'API\Governorate\GovernorateController@getGovernorateShippingPrice');

});

Route::prefix('product')->group(function () {
    Route::get('/', 'API\Product\ProductController@show');
    Route::get('{product}', 'API\Product\ProductController@product');
    Route::post('', 'API\Product\ProductController@add');
    Route::post('update/{pid}', 'API\Product\ProductController@update');

    // Route::post('{sku}/match', 'API\Product\ProductController@skuSpecs');

    Route::post('/search', 'API\Product\ProductController@search');
    Route::get('{product}/specs', 'API\Product\ProductController@specs');
    Route::get('{product}/{sku}/sku', 'API\Product\ProductController@sku');

    Route::post('/seller/active-toggle/{product}', 'API\Seller\SellerController@toggle');
    Route::get('/seller/{product}', 'API\Seller\SellerController@getProduct');
});
Route::prefix('cart')->middleware('auth:api')->group(function () {
    Route::get('/', 'API\Cart\CartController@show');
    Route::post('/add', 'API\Cart\CartController@add');
    Route::post('/remove', 'API\Cart\CartController@remove');
});


Route::prefix('specs')->middleware('auth:api')->group(function () {
    Route::post('/{spec}', 'API\Spec\SpecController@addSpec');
});

Route::prefix('orders')->group(function () {
    Route::get('/', 'API\Order\OrderController@index');
    Route::get('/affiliate', 'API\Order\OrderController@numAffiliateOrders');
    Route::get('/{id}/{token}', 'API\Order\OrderController@show')->name('order.mail');

    Route::get('/seller-pending', 'API\Seller\SellerController@pendingOrders');
    Route::post('/seller-pending', 'API\Seller\SellerController@pendingProductAction');
    Route::get('/seller-processing', 'API\Seller\SellerController@processingOrders');
    Route::get('/seller-completed', 'API\Seller\SellerController@completedOrders');
});


Route::prefix('admin')->group(function () {
    Route::get('/seller/applications', 'API\Admin\AdminController@getSellersApplications');
    Route::post('/seller/applications/{id}', 'API\Admin\AdminController@setSellersStatus');

    Route::get('/affiliate/applications', 'API\Admin\AdminController@getAffiliatesApplications');
    Route::post('/affiliate/applications/{id}', 'API\Admin\AdminController@setAffiliatesStatus');

    Route::get('/orders', 'API\Admin\AdminController@getOrders');
    Route::post('/orders/{id}', 'API\Admin\AdminController@setOrdersStatus');

    Route::get('/products', 'API\Admin\AdminController@getProducts');
    Route::post('/products/{id}', 'API\Admin\AdminController@setProductsStatus');

    Route::get('/shippers', 'API\Admin\AdminController@getShippers');
    Route::post('/shippers', 'API\Admin\AdminController@addShipper');
    Route::post('/shippers/{id}', 'API\Admin\AdminController@editShipper');
    Route::delete('/shippers/{id}', 'API\Admin\AdminController@deleteShipper');

    Route::get('/shipping', 'API\Admin\AdminController@getShipping');
    Route::post('/shippers', 'API\Admin\AdminController@addShipping');
    Route::post('/shipping/{shipping}', 'API\Admin\AdminController@editShipping');
    Route::delete('/shipping/{shipping}', 'API\Admin\AdminController@deleteShipping');

    Route::get('/cities/{country}', 'API\Admin\AdminController@getCities');

    Route::get('/withdraws', 'API\Admin\AdminController@getWithdraws');
    Route::post('/withdraws/{withdraw}', 'API\Admin\AdminController@setWithdrawStatus');
});

Route::prefix('checkout')->group(function () {
    Route::post('/', 'API\Checkout\CheckOutController@index');
});

Route::prefix('payment')->group(function () {
    Route::get('/', 'API\Payment\PaymentController@getPayments');
    Route::post('/', 'API\Payment\PaymentController@addPayment');
    Route::post('/{payemnt}/{token}', 'API\Payment\PaymentController@editPayment');
    Route::delete('/{payment}/{token}', 'API\Payment\PaymentController@deletePayment');
    // Route::get('/{payment}', 'API\Payment\PaymentController@getPayment');
});

Route::prefix('withdraw')->group(function () {
    Route::get('/', 'API\Withdraw\WithdrawController@getWitdraws');
    Route::post('/', 'API\Withdraw\WithdrawController@addWitdraw');
    // Route::post('/{payemnt}', 'API\Withdraw\WithdrawController@editPayment');
    // Route::delete('/{payment}/{token}', 'API\Withdraw\WithdrawController@deletePayment');
    // Route::get('/{payment}', 'API\Withdraw\WithdrawController@getPayment');
});


Route::prefix('affiliate')->group(function () {
    Route::get('/earning', 'API\Affiliate\AffiliateController@affiliateEarning');
    Route::get('/level', 'API\Affiliate\AffiliateController@getAffiliateLevel');
});


Route::prefix('seller')->group(function () {
    Route::get('/earning', 'API\Seller\SellerController@sellerEarning');
    Route::get('/products', 'API\Seller\SellerController@getProducts');
});

Route::prefix('return')->group(function () {
    Route::get('/reasons', 'API\Returning\ReturnController@getReturnReasons');
    Route::post('/', 'API\Returning\ReturnController@setReturnProduct');
});
