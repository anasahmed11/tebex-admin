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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/verify/email/{id}',function(){
    return view('welcome');
})->name('verification.verify');
Route::get('/reset/password/{token}',function (){
    return view('welcome');
})->name('password.reset');
Route::get('/{route}',function(){
    //return view('welcome');
});