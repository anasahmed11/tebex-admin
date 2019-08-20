<?php

namespace App\Http\Controllers\API\Seller;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SellerActionRequest;
use App\Order;
use App\OrderProduct;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SellerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function pendingOrders(){
        $store = Auth::user()->Store()->where('status','approved')->first(['id']);
        if($store==null) return response()->json(['message'=>'You aren\'t registered in seller program!'], 403);

        $orderProds = OrderProduct::query()->where('status','pending')->get();

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
    public function pendingProductAction(SellerActionRequest $request){
        DB::beginTransaction();
        try{

            $orderProd = OrderProduct::query()->where([
                ['product_id','=',$request->input('product_id')],
                ['order_id','=',$request->input('order_id')],
                ['status','=','pending']
            ])->first();

            if($orderProd==null) return response()->json(['message'=>'Invalid Data'], 403);


            $store = Auth::user()->Store()->where('status','approved')->first();
            if($store==null) return response()->json(['message'=>'You aren\'t registered in seller program!'], 403);

            if($orderProd->product->store->id != $store->id) return response()->json(['message'=>'The product is not belong to your store'], 403);


            $orderProd->status = $request->input('status');
            $orderProd->save();
            $message = '';
            if($orderProd->order->status=='pending'){
                if($orderProd->status=='confirmed'){
                    $pendingOrdersCnt = OrderProduct::query()->where([
                        ['order_id','=',$request->input('order_id')],
                        ['status','=','pending']
                    ])->count();

                    if($pendingOrdersCnt==0){
                        $order = Order::find($request->input('order_id'));
                        $order->status = 'active';
                        $order->save();
                        $message = 'Order of the product is confirmed and order is active now';

                    } else $message = 'Order of the product is confirmed successfully and waiting for other sellers confirmation';

                }
                else{
                    $order = Order::find($request->input('order_id'));
                    $order->status = 'canceled';
                    $order->status_message = 'Store: '.$store->name_en.' has refused the order, try to buy from another store.';
                    $order->save();
                    $message = 'Order of the product is refused';
                }
            }
            else $message = 'Order is already canceled due to a refuse by another seller';

            DB::commit();
            return response()->json(['message'=>$message],200);

        }catch (\Exception $exception){
            DB::rollback();
            return response()->json(["message"=>'Error occured, try again later or contact with support'],400);
        }


    }



    public function processingOrders(){


        $store = Auth::user()->Store()->where('status','approved')->first(['id']);
        if($store==null) return response()->json(['message'=>'You aren\'t registered in seller program!'], 403);

        $orderProds = OrderProduct::query()->where('status','!=','pending')->get();

        $processingProds = $orderProds->filter(function ($orderProd) use ($store) {
            return $orderProd->product->store->id == $store->id && in_array($orderProd->order->status, ['active','shipped','delivered']);
        })->values();

        return response()->json($processingProds, 200);

    }

    public function completedOrders(){

        $store = Auth::user()->Store()->where('status','approved')->first(['id']);
        if($store==null) return response()->json(['message'=>'You aren\'t registered in seller program!'], 403);

        $orderProds = OrderProduct::query()->where('status','!=','pending')->get();

        $processingProds = $orderProds->filter(function ($orderProd) use ($store) {
            return $orderProd->product->store->id == $store->id && in_array($orderProd->order->status, ['canceled','returned']);
        })->values();

        return response()->json($processingProds, 200);

    }
}