<?php

namespace App\Http\Controllers\API\CheckOut;

use App\Address;
use App\Cart;
use App\City;
use App\Jobs\OrderJob;
use App\Notifications\OrderPlaced;
use App\Order;
use App\OrderProduct;
use App\Product;
use App\Shipper;
use App\Http\Controllers\Controller;

use App\Shipping;
use App\User;
use function foo\func;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use mysql_xdevapi\Exception;
use PHPUnit\Util\Json;

class CheckOutController extends Controller
{
    public function index(Request $request){
        DB::beginTransaction();
        try {
            $address = Address::where(['id'=>$request->address,'_token'=>$request->token])->first();
            if (!$address) {
                throw new \Exception('address not found');
            }
            $shipper = Shipper::find(1);
            $order = new Order(['_token'=>Str::random(20)]);
            $order->Address()->associate($address);
            $order->Shipper()->associate($shipper);
            if(!Auth('api')->check()) {
                $referral = User::find($request->referral);
                $order->Referral()->associate($referral);
            }
            $location = $address->Governorate()->first();
            $shipping = Shipping::where('shipper_id', $shipper->id)
                ->where('governorate_id', $location->id)
                ->first();
            $order->shipping_fees = $shipping->fees;
            $order->save();
            $products = $request->products;
            if(count($products)<=0) throw new Exception('there is no product');
            foreach ($products as $product) {
                $p = Product::find($product['id']);
                if ($p && $p->quantity >= $product['quantity']) {
                    $item = new OrderProduct(["order_id" => $order->id, "product_id" => $p->id, "price" => $p->sale_price ?? $p->price, "quantity" => $product['quantity'], "commission"=>$p->commission, "commission_percent"=>$p->comm_percent]);
                    $item->save();
                    $p->quantity -= $product['quantity'];
                    $p->save();

                    if(Auth('api')->check()){
                        $pp=Cart::whereHas('User',function ($q){
                            $q->where([['id',Auth('api')->user()->id]]);
                        })
                            ->whereHas('Product',function($q) use ($p){
                                $q->where([['id',$p->id]]);
                            })->first();
                        if($pp==null) throw new \Exception('item not in cart');
                        $pp->delete();
                    }
                } else {
                    throw new \Exception('quantity of items less than exist');
                }
            }
            if (Auth('api')->check() && Auth('api')->user()->Affiliate()->where('status', 'approved')->first()) {
                $order->Referral()->associate(Auth('api')->user());
            }else
                $order->Referral()->associate(User::find($request->input('referral'))??User::find(1));

            $order->save();
            // OrderJob::dispatch($order)->delay(now()->addWeek(2));
            DB::commit();
            $address->notify(new OrderPlaced($order));
            return response()->json(["success" => "order placed successfully",
                "url"=>url(config('app.url').route('order.mail', ['id' => $order->id,'token'=>$order->_token], false))
                                    ]);
        }catch (\Exception $exception){
            DB::rollback();
            return response()->json(["error" => "order can't be placed reason: ".$exception->getMessage()], 400);
        }

    }
    public function shipping_fees(){

    }
}
