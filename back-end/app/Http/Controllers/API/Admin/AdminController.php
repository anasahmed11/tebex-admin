<?php

namespace App\Http\Controllers\API\Admin;

use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Http\Requests\StatusRequest;
use App\Affiliate;
use App\Country;
use App\Http\Requests\ReturnApplicationStatusRequest;
use App\Http\Requests\ReturnReasonRequest;
use App\Http\Requests\SellerStatusRequest;
use App\Http\Requests\ShipperRequest;
use App\Http\Requests\ShippingRequest;
use App\Http\Requests\withdrawStatusRequest;
use App\Jobs\CommissionJob;
use App\Jobs\OrderJob;
use App\Order;
use App\Product;
use App\ReturnApplication;
use App\ReturnReason;
use App\Shipper;
use App\Shipping;
use App\Store;
use App\User;
use App\Withdraw;
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
    public function setSellersStatus(SellerStatusRequest $request, $id)
    {
        $store = Store::find($id);
        if ($store == null) return response()->json(['message' => 'Store id not found'], 404);

        $store->status = $request->input('status');
        $store->save();

        $storeProds = $store->Products()->get();
        if($request->status == 'blocked'){
            $storeProds->map(function($storeProd) {
                if($storeProd->status == 'approved'){
                    $storeProd->status = 'blocked';
                    $storeProd->status_message = 'The product is blocked';
                    $storeProd->save();
                }
            });
        }
        elseif($request->status == 'approved'){
            $storeProds->map(function($storeProd) {
                if($storeProd->status == 'blocked'){
                    $storeProd->status = 'approved';
                    $storeProd->status_message = '';
                    $storeProd->save();
                }
            });
        }

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
        if ($affiliate == null) return response()->json(['message' => 'Affiliate id not found'], 404);

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
        if ($order == null) return response()->json(['message' => 'Order id not found'], 404);

        DB::beginTransaction();
        try {
            $order->status = $request->input('status');
            $order->save();

            if($order->status == 'delivered')
                OrderJob::dispatch($order)->delay(now()->addWeek(2));

            DB::commit();
        }catch (\Exception $exception){

            DB::rollback();
            return response()->json(["error" => "An error occurred"], 400);
        }


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
        if ($product == null) return response()->json(['message' => 'Product id not found'], 404);

        $product->status = $request->input('status');
        $product->status_message = $request->input('status_message');
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
        if ($shipper == null) return response()->json(['message' => 'Shipper id not found'], 404);
        $shipper->update($request->all());
        $shipper->save();
        return response()->json(['message' => 'Data updated successfully', 'data' => $shipper], 201);
    }

    public function addShipper(ShipperRequest $request)
    {
        $shipper = new Shipper($request->all());
        if ($shipper == null) return response()->json(['message' => 'Shipper id not found'], 404);
        $shipper->save();
        return response()->json(['message' => 'Data added successfully', 'data' => $shipper], 201);
    }
    public function deleteShipper($id)
    {
        $shipper = Shipper::find($id);
        if ($shipper == null) return response()->json(['message' => 'Shipper id not found'], 404);
        $shipper->delete();
        return response()->json(null, 204);
    }




    public function addShipping(ShippingRequest $request)
    {
        $shipping = new Shipping($request->all());
        if ($shipping == null) return response()->json(['message' => 'Shipping id not found'], 404);
        $shipping->save();
        return response()->json(['message' => 'Data added successfully', 'data' => $shipping], 201);
    }
    public function getShipping()
    {
        return response()->json(Shipping::with('Shipper', 'Governorate')->get(), 200);
    }
    public function editShipping(ShippingRequest $request, Shipping $shipping)
    {
        if ($shipping == null) return response()->json(['message' => 'Shipping id not found'], 404);
        try {
            $shipping->update($request->all());
            $shipping->save();
        } catch (\Exception $e) {

            return response()->json(['message' => 'Shipping id or City id aren\'t exist'], 400);
        }
        return response()->json(['message' => 'Data updated successfully', 'data' => $shipping], 201);
    }

    public function deleteShipping(Shipping $shipping)
    {
        if ($shipping == null) return response()->json(['message' => 'Shipping id not found'], 400);
        $shipping->delete();
        return response()->json(null, 204);
    }




    public function getGovernorates(Country $country){
        return response()->json($country->governorates()->get(),200);
    }



    public function getWithdraws(Request $request)
    {
        if($request->status)
            return response()->json(Withdraw::query()->where('status', $request->status), 200);

        return response()->json(Withdraw::all(), 200);
    }
    public function setWithdrawStatus(Withdraw $withdraw, withdrawStatusRequest $request)
    {
        if($withdraw==null)
            return response()->json(['message' => 'Withdraw id not found'], 404);

        $withdraw->status = $request->get('status');
        $withdraw->save();

        return response()->json(['message' => 'ok'], 200);
    }





    public function getReturnApplication(Request $request)
    {
        if($request->status)
            return response()->json(ReturnApplication::where('status', $request->status)->with('OrderProduct')->get(), 200);

        return response()->json(ReturnApplication::with('OrderProduct')->get(), 200);
    }
    public function getOwing()
    {
        $users = [];
        ReturnApplication::where('status','returned')->each(function($returnApplication) use (&$users) {
            $user = $returnApplication->OrderProduct()->first()->Order()->first()->Address()->first()->User()->first();
            if(!array_key_exists($user->id,$users))
                $users[$user->id] = ['user'=>$user, 'total_returned'=>0];
            $users[$user->id]['total_returned'] += $returnApplication->OrderProduct()->first()->price;
        });

        return response()->json($users, 200);
    }
    public function setReturnApplication(ReturnApplication $returnApplication, ReturnApplicationStatusRequest $request)
    {
        if($returnApplication==null)
            return response()->json(['message' => 'Return application id not found'], 404);


        $returnApplication->status = $request->get('status');
        $returnApplication->status_message = $request->get('status_message');
        $returnApplication->save();

        if($returnApplication->status == 'canceled'){

            $product=$returnApplication->OrderProduct()->first();
            $pp = $product->Product()->first()->Store()->first();
            $pp->balance += (($product->price - $product->commission) * $product->quantity) - 10;
            $pp->save();
            $ppp = User::find(1)->Store()->first();
            $ppp->balance += ($product->price * (2.5 / 100)) * $product->quantity + 10;
            $ppp->save();
            // earning for affiliate and seller
            $product->returnable=false;
            $product->save();
            $child=new User();
            $current=$product->Order()->get()->Referral()->first()??User::find(1);
            while ($current){
                CommissionJob::dispatch($current->Affiliate()->first(), $child->Affiliate()->first(), $product->commission*$product->quantity);
                $child=$current;
                $current=$current->parent()->first();
            }
        }


        return response()->json(['message' => 'ok'], 200);
    }



    public function getReasons()
    {
        return response()->json(ReturnReason::all(), 200);
    }
    public function setReason(ReturnReason $returnReason, ReturnReasonRequest $request)
    {
        if($returnReason == null) return response()->json(['message' => 'Reason id not found'], 404);
        $returnReason->update($request->all());
        $returnReason->save();
        return response()->json(['message' => 'Data updated successfully', 'data' => $returnReason], 201);
    }
    public function addReason(ReturnReasonRequest $request)
    {
        $returnReason = new ReturnReason($request->all());
        $returnReason->save();
        return response()->json(['message' => 'Data added successfully', 'data' => $returnReason], 201);
    }
    public function deleteReason(ReturnReason $returnReason)
    {
        if($returnReason == null) return response()->json(['message' => 'Reason id not found'], 404);
        $returnReason->delete();
        return response()->json(null, 204);
    }
}
