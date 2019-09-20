<?php

namespace App\Http\Controllers\API\Address;

use App\Address;

use App\Http\Requests\AddressRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AddressController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('show', 'delete', 'edit');
    }

    public function show()
    {
        return response()->json(Auth::User()->Addresses()->get(), 200);
    }
    public function create(AddressRequest $request)
    {
        $address = new Address($request->except('country'));
        $address->_token = Str::random(20);
        $address->User()->associate(Auth('api')->user());
        $address->save();
        return response()->json(Address::find($address->id), 200);
    }
    public function edit(AddressRequest $request, Address $address)
    {
        if ($address == null)
            return response()->json(["message" => "Address not found"], 404);

        if ($address->user()->first(['id'])->id != Auth::user()->id)
            return response()->json(["message" => "Address belong to another user!"], 400);

        $address->update($request->all());
        $address->save();

        return response()->json($address, 200);
    }
    public function delete($id)
    {
        $res = Auth::User()->Addresses()->find($id);
        if ($res != null && $res->delete())
            return response()->json(["message" => "Address deleted successfully"]);
        else
            return response()->json(["message" => "Can't be deleted"], 400);
    }

    public function shipping(Address $address)
    {
        if ($address == null)
            return response()->json(["message" => "address not found"], 404);

        $shipping = $address->Governorate()->first()->shipping()->first();
        if ($shipping == null)
            return response()->json(["error" => "shipping to this governorate not available"], 400);

        return response()->json($shipping);
    }

    // public function city_shipping($location)
    // {
    //     $shipping = Shipping::where('shipper_id', 1)
    //         ->where('city_id', $location)
    //         ->first();
    //     if ($shipping != null)
    //         return response()->json($shipping);
    //     else {
    //         return response()->json(["error" => "shipping to this address not available"], 400);
    //     }
    // }

    // public function countries()
    // {
    //     return response()->json(Country::all(), 200);
    // }


    // public function cities(Country $country)
    // {
    //     return response()->json($country->cities()->whereHas('shipping', function ($query) {
    //         $query->whereNotNull('id');
    //     })->get(), 200);
    // }
    // public function areas(City $city)
    // {
    //     return response()->json($city->areas()->get(), 200);
    // }
}
