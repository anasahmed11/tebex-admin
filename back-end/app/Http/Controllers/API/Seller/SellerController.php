<?php

namespace App\Http\Controllers\API\Seller;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SellerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function pendingOrders(){

        $store = Auth::user()->Store()->where('status','approved')->first();
        if($store==null) return response()->json(['message'=>'You aren\'t registered in seller program!'], 403);

        $o = [];

        $prodcuts = Auth::user()->Products()->get();
        foreach ($prodcuts as $prodcut) {
            $prodOrders = $prodcut->Orders()->where('status','pending')->get();
            foreach ($prodOrders as $prodOrder)array_push($o,$prodOrder);
        }

        return response()->json($o,200);
    }
    public function pendingProductConfirm(Request $request){


        return response()->json('s',200);
    }
}
