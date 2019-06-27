<?php

namespace App\Http\Controllers\API\Product;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index(){
        return response()->json(Product::all());
    }
    public function product(Product $product){
        if ($product== null)
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
}
