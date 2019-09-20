<?php

namespace App\Http\Controllers\API\Governorate;

use App\Governorate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GovernorateController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth:api')->only('show', 'delete', 'edit');
    }


    public function getGovernorates()
    {
        return response()->json(Governorate::query()->whereHas('shipping', function ($query) {
            $query->whereNotNull('id');
        })->get(), 200);
    }

    public function getGovernorateShippingPrice(Governorate $governorate)
    {
        if ($governorate == null)
            return response()->json(["message" => "Governorate not found"], 404);

        $shipping = $governorate->shipping()->first();

        if ($shipping == null)
            return response()->json(["message" => "shipping to this governorate not available"], 400);

        return response()->json($shipping);


    }
}
