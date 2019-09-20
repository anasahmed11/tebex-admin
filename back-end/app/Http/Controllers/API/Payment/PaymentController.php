<?php

namespace App\Http\Controllers\API\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentAccountRequest;
use App\PaymentAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function getPayments()
    {
        return response()->json(Auth::user()->Payments()->get(), 200);
    }
    public function addPayment(PaymentAccountRequest $request)
    {
        $payment = new PaymentAccount($request->all());
        $payment->_token = Str::random(20);
        $payment->user_id = Auth::user()->id;
        $payment->save();
        return response()->json($payment, 200);
    }
    public function editPayment(PaymentAccount $payment, PaymentAccountRequest $request)
    { }
    public function deletePayment(PaymentAccount $payment, $token)
    {
        if ($payment == null)
            return response()->json(['message' => 'not found'], 404);

        if ($payment->_token != $token)
            return response()->json(['message' => 'not found'], 403);

        $payment->delete();

        return response()->json(['message' => 'deleted successfully'], 204);
    }
}
