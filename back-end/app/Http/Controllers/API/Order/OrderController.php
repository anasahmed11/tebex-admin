<?php

namespace App\Http\Controllers\API\Order;

use App\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Enums\OrderStatus;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('show');
    }

    public function index()
    {
        $orders = Auth::user()->Orders()->with('Address', 'Products.Product.Store', 'Shipper')->paginate(1);

        // $user = Auth::user()->id;
        // $orders = Order::with('Address', 'Products.Product.Store', 'Shipper')->whereHas('Address.User', function ($q) use ($user) {
        //     $q->where([['id', $user]]);
        // })->get();
        return response()->json($orders, 200);
    }
    public function show($order, $token)
    {
        return response()->json(Order::with('Address', 'Products.Product.Store', 'Shipper')->where(['id' => $order, '_token' => $token])->first());
    }

    private function totalAffiliateOrders()
    {
        $user = Auth::user();
        $userOrders = $user->Orders()->count();
        $affiliateOrders = Order::where('referral_id', $user->id)->count();
        return ($userOrders + $affiliateOrders);
    }


    private function totalDeliveredAffiliateOrders()
    {
        $user = Auth::user();
        $userOrders = $user->Orders()->where('status', OrderStatus::Delivered()->key)->count();
        $affiliateOrders = Order
            ::where([
                ['referral_id', $user->id],
                ['status', OrderStatus::Delivered()->key]
            ])
            ->count();
        return ($userOrders + $affiliateOrders);
    }


    public function numAffiliateOrders()
    {
        return response()->json(['totalOrders' => $this->totalAffiliateOrders(), 'totalDeiveredOrders' => $this->totalDeliveredAffiliateOrders()], 200);
    }
}
