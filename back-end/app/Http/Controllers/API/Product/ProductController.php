<?php

namespace App\Http\Controllers\API\Product;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only('show','delete');
    }

    public function show(){
        $store = Auth::User()->Store()->where('status','approved')->first();
        if((count((array)$store))){
            return response()->json($store->Products()->get(),200);
        }
        return response()->json(['message'=>'You Aren\'t Registerd to Seller Program'],401);
    }

    public function product(Product $product){
        if ($product == null)
            return response()->json(["error"=>"product not found"], 400);
        return response()->json($product, 200);
    }
    public function specs(Product $product){
            if ($product== null)
                return response()->json(["error"=>"product not found"], 400);
            return response()->json($product->Specs()->get(),200);
    }
    public function sku($product,$sku){
       return response()->json( Product::where('sku',$sku)->get()->map(function ($e){
           return ['id'=>$e->id,'specs'=>$e->Specs()->get()];
       }));
    }
    public function search(Request $request){
        $products = Product::search($request->input('q'))->paginate(10);
        return response()->json($products);
    }
}
