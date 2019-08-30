<?php

namespace App\Http\Controllers\API\Cart;

use App\Cart;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function show(){
        return response()->json(Auth::User()->Cart()->get(),200);
    }
    public function add(Request $request){
        $product=Product::find($request->product['id']);
        $cart= Cart::firstOrNew(['user_id'=>Auth::user()->id,'product_id'=>$request->product['id']]);
        $cart->quantity=($product->quantity>= $request->product['quantity'])? $request->product['quantity']:$product->quantity;
        $cart->save();
        return response()->json($cart);
    }
    public function remove(Request $request){
        $cart=Cart::where(['user_id'=>Auth::user()->id,'product_id'=>$request->product['id']])->first();
        if($cart ==null){
            return response()->json(["error"=>"item deleted unsuccessfully"],400);
        }
        $cart->delete();
        return response()->json(["success"=>"item deleted successfully"]);
    }
}
