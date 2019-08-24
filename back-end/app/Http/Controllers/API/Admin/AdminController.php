<?php

namespace App\Http\Controllers\API\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\StatusRequest;
use App\Affiliate;
use App\Country;
use App\Http\Requests\ShipperRequest;
use App\Http\Requests\ShippingRequest;
use App\Order;
use App\Product;
use App\Shipper;
use App\Shipping;
use App\Store;
use Symfony\Component\HttpFoundation\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('Mekky');
    }




    public function getSellersApplications(Request $request)
    {
        if ($request->status == null) return response()->json(Store::orderBy('status', 'desc')->get(), 200);
        return response()->json(Store::query()->where('status', $request->status)->get(), 200);
    }
    public function setSellersStatus(StatusRequest $request, $id)
    {
        $store = Store::find($id);
        if ($store == null) return response()->json(['message' => 'Store id not found'], 400);

        $store->status = $request->input('status');
        $store->save();
        return response()->json(['message' => 'ok'], 200);
    }






    public function getAffiliatesApplications(Request $request)
    {
        if ($request->status == null) return response()->json(Affiliate::orderBy('status', 'desc')->get(), 200);
        return response()->json(Affiliate::query()->where('status', $request->status)->get(), 200);
    }
    public function setAffiliatesStatus(StatusRequest $request, $id)
    {
        $affiliate = Affiliate::find($id);
        if ($affiliate == null) return response()->json(['message' => 'Affiliate id not found'], 400);

        $affiliate->status = $request->input('status');
        $affiliate->save();
        return response()->json(['message' => 'ok'], 200);
    }




    public function getOrders(Request $request)
    {
        if ($request->status == null) return response()->json(Order::orderBy('status', 'desc')->get(), 200);
        return response()->json(Order::query()->where('status', $request->status)->get(), 200);
    }

    public function setOrdersStatus(Request $request, $id)
    {
        $order = Order::find($id);
        if ($order == null) return response()->json(['message' => 'Order id not found'], 400);

        $order->status = $request->input('status');
        $order->save();
        return response()->json(['message' => 'ok'], 200);
    }






    public function getProducts(Request $request)
    {
        if ($request->status == null) return response()->json(Product::orderBy('status', 'desc')->get(), 200);
        return response()->json(Product::query()->where('status', $request->status)->get(), 200);
    }

    public function setProductsStatus(StatusRequest $request, $id)
    {
        $product = Product::find($id);
        if ($product == null) return response()->json(['message' => 'Product id not found'], 400);

        $product->status = $request->input('status');
        $product->save();
        return response()->json(['message' => 'ok'], 200);
    }




    public function getShippers()
    {
        return response()->json(Shipper::all(), 200);
    }
    public function editShipper(ShipperRequest $request, $id)
    {
        $shipper = Shipper::find($id);
        if ($shipper == null) return response()->json(['message' => 'Shipper id not found'], 400);
        $shipper->update($request->all());
        $shipper->save();
        return response()->json(['message' => 'Data updated successfully', 'data' => $shipper], 201);
    }

    public function addShipper(ShipperRequest $request)
    {
        $shipper = new Shipper($request->all());
        if ($shipper == null) return response()->json(['message' => 'Shipper id not found'], 400);
        $shipper->save();
        return response()->json(['message' => 'Data added successfully', 'data' => $shipper], 201);
    }
    public function deleteShipper($id)
    {
        $shipper = Shipper::find($id);
        if ($shipper == null) return response()->json(['message' => 'Shipper id not found'], 400);
        $shipper->delete();
        return response()->json(null, 204);
    }




    public function addShipping(ShippingRequest $request)
    {
        $shipping = new Shipping($request->all());
        if ($shipping == null) return response()->json(['message' => 'Shipping id not found'], 400);
        $shipping->save();
        return response()->json(['message' => 'Data added successfully', 'data' => $shipping], 201);
    }
    public function getShipping()
    {
        return response()->json(Shipping::with('Shipper', 'City')->get(), 200);
    }
    public function editShipping(ShippingRequest $request, Shipping $shipping)
    {
        if ($shipping == null) return response()->json(['message' => 'Shipping id not found'], 400);
        try {
            $shipping->update($request->all());
            $shipping->save();
        } catch (\Exception $e) {

            return response()->json(['message' => 'Shipping id or Ciry id aren\'t exist'], 400);
        }
        return response()->json(['message' => 'Data updated successfully', 'data' => $shipping], 201);
    }

    public function deleteShipping(Shipping $shipping)
    {
        if ($shipping == null) return response()->json(['message' => 'Shipping id not found'], 400);
        $shipping->delete();
        return response()->json(null, 204);
    }




    public function getCities(Country $country){
        return response()->json($country->cities()->get(),200);
    }
}
