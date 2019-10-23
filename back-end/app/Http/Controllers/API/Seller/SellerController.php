<?php

namespace App\Http\Controllers\API\Seller;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SellerActionRequest;
use App\Order;
use App\OrderProduct;
use App\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SellerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getProducts(){
        $store = Auth::User()->Store()->where('status', 'approved')->first();
        if ($store)
            return response()->json($store->Products()->get(), 200);

        return response()->json(['message' => 'You Aren\'t Registerd to Seller Program'], 401);
    }

    public function pendingOrders()
    {
        $store = Auth::user()->Store()->where('status', 'approved')->first(['id']);
        if ($store == null) return response()->json(['message' => 'You aren\'t registered in seller program!'], 403);

        $orderProds = OrderProduct::query()->where('status', 'pending')->get();

        $pedningProds = $orderProds->filter(function ($orderProd) use ($store) {
            return $orderProd->product->store->id == $store->id;
        })->values();

        return response()->json($pedningProds, 200);

        // $store = Auth::user()->Store()->where('status','approved')->first();
        // if($store==null) return response()->json(['message'=>'You aren\'t registered in seller program!'], 403);

        // $o = [];

        // $products = Auth::user()->Products()->get();
        // foreach ($products as $prodcut) {
        //     $prodOrders = $prodcut->Orders()->where('status','pending')->get();
        //     foreach ($prodOrders as $prodOrder)array_push($o,$prodOrder);
        // }

        // return response()->json($o,200);
    }
    public function pendingProductAction(SellerActionRequest $request)
    {
        DB::beginTransaction();
        try {

            $orderProd = OrderProduct::query()->where([
                ['product_id', '=', $request->input('product_id')],
                ['order_id', '=', $request->input('order_id')],
                ['status', '=', 'pending']
            ])->first();

            if ($orderProd == null) return response()->json(['message' => 'Invalid Data'], 403);

            $store = Auth::user()->Store()->where('status', 'approved')->first();
            if ($store == null) return response()->json(['message' => 'You aren\'t registered in seller program!'], 403);

            if ($orderProd->product->store->id != $store->id) return response()->json(['message' => 'The product is not belong to your store'], 403);

            $orderProd->status = $request->input('status');
            $orderProd->save();
            $message = '';
            if ($orderProd->order->status == 'pending') {
                if ($orderProd->status == 'confirmed') {
                    $pendingOrdersCnt = OrderProduct::query()->where([
                        ['order_id', '=', $request->input('order_id')],
                        ['status', '=', 'pending']
                    ])->count();

                    if ($pendingOrdersCnt == 0) {
                        $order = Order::find($request->input('order_id'));
                        $order->status = 'active';
                        $order->save();
                        $message = 'Order of the product is confirmed and order is active now';
                    } else $message = 'Order of the product is confirmed successfully and waiting for other sellers confirmation';
                } else {
                    $order = Order::find($request->input('order_id'));
                    $order->status = 'canceled';
                    $order->status_message = 'Store: ' . $store->name_en . ' has refused the order, try to buy from another store.';
                    $order->save();
                    $message = 'Order of the product is refused';
                }
            } else $message = 'Order is already canceled due to a refuse by another seller';

            DB::commit();
            return response()->json(['message' => $message], 200);
        } catch (\Exception $exception) {
            DB::rollback();
            return response()->json(["message" => 'Error occured, try again later or contact with support'], 400);
        }
    }



    public function processingOrders()
    {


        $store = Auth::user()->Store()->where('status', 'approved')->first(['id']);
        if ($store == null) return response()->json(['message' => 'You aren\'t registered in seller program!'], 403);

        $orderProds = OrderProduct::query()->where('status', '!=', 'pending')->get();

        $processingProds = $orderProds->filter(function ($orderProd) use ($store) {
            return $orderProd->product->store->id == $store->id && in_array($orderProd->order->status, ['active', 'shipped', 'delivered']);
        })->values();

        return response()->json($processingProds, 200);
    }

    public function completedOrders()
    {

        $store = Auth::user()->Store()->where('status', 'approved')->first(['id']);
        if ($store == null) return response()->json(['message' => 'You aren\'t registered in seller program!'], 403);

        $orderProds = OrderProduct::query()->where('status', '!=', 'pending')->get();

        $processingProds = $orderProds->filter(function ($orderProd) use ($store) {
            return $orderProd->product->store->id == $store->id && in_array($orderProd->order->status, ['canceled', 'returned']);
        })->values();

        return response()->json($processingProds, 200);
    }



    public function toggle(Product $product)
    {
        if ($product == null)
            return response()->json(["error" => "product not found"], 400);

        $store = Auth::user()->Store()->where('status', 'approved')->first(['id']);
        if ($store == null)
            return response()->json(['message' => 'You aren\'t registered in seller program!'], 403);

        if ($product->store_id != $store->id)
            return response()->json(['message' => 'This product is not belong to your store!'], 403);

        $product->active = !$product->active;
        $product->save();

        return response()->json(['message' => 'update successfully'], 204);
    }

    public function getProduct(Product $product)
    {
        if ($product == null)
        return response()->json(["error" => "product not found"], 400);

        $store = Auth::user()->Store()->where('status', 'approved')->first(['id']);
        if ($store == null)
            return response()->json(['message' => 'You aren\'t registered in seller program!'], 403);

        if ($product->store_id != $store->id)
            return response()->json(['message' => 'This product is not belong to your store!'], 403);

        return response()->json($product, 200);
    }
    public function sellerEarning()
    {
        $seller = Auth::user()->Store()->where('status', 'approved')->first();
        if ($seller == null) return response()->json(['message' => 'You aren\'t registered in seller program!'], 403);



        $pendingEarn = OrderProduct::query()->whereHas('Product',function ($q) use ($seller){
            $q->where('store_id',$seller->id);
        })->whereHas('Order', function ($q){
            $q->where('status','<>','delivered');
        })->selectRaw('SUM(price * quantity) as total')->get()->sum('total');

        $approvedEarn = OrderProduct::query()->whereHas('Product',function ($q) use ($seller){
            $q->where('store_id',$seller->id);
        })->where('returnable','1')->whereHas('Order', function ($q){
            $q->where('status','delivered');
        })->selectRaw('SUM(price * quantity) as total')->get()->sum('total');

        $confirmedEarn = OrderProduct::query()->whereHas('Product',function ($q) use ($seller){
            $q->where('store_id',$seller->id);
        })->where('returnable','0')->whereHas('Order', function ($q){
            $q->where('status','delivered');
        })->selectRaw('SUM(price * quantity) as total')->get()->sum('total');

        return response()->json([
            'confirmed_earn'=>$confirmedEarn,
            'pending_earn'=>$pendingEarn,
            'approved_earn'=>$approvedEarn,
        ], 200);
    }
}
