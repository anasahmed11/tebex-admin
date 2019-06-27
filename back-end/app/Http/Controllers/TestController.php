<?php

namespace App\Http\Controllers;

use App\Area;
use App\City;
use App\Shipping;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(Request $request){
        return response()->json($request->only('list'));
    }

    public function index(){
        $term=City::find(1);
      return  Shipping::where(function ($query) use ($term) {
              $query->where([
                  'location_type' => 'App\City',
                  'location_id' => $term->id,
              ]);
          })
          ->orWhere('City', function ($query) use ($term) {
              $query->where([
                  'location_type' => 'App\Area',
                  'location_id' => $term->id
              ]);
          })->get()   ;
    }
}
