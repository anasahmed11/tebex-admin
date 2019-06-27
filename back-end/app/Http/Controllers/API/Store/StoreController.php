<?php

namespace App\Http\Controllers\API\Store;

use App\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
    public function show(){
        return Store::all();
    }
}
