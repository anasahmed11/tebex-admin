<?php

namespace App\Http\Controllers\API\Order;

use App\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('index');
    }

    public function index()
    {
        $user = Auth::user()->id;
        $orders = Order::with('Address', 'Products.Product.Store', 'Shipper')->whereHas('Address.User', function ($q) use ($user) {
            $q->where([['id', $user]]);
        });
        return response()->json($orders->get());
    }
    public function show($order, $token)
    {
        return response()->json(Order::with('Address', 'Products.Product.Store', 'Shipper')->where(['id' => $order, '_token' => $token])->first());
    }
}
