<?php

namespace App\Http\Controllers\API\User;

use App\Affiliate;
use App\Http\Requests\AffiliateRequest;
use App\Http\Requests\SellerRequest;
use App\Store;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\PaymentAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProgramController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function Stores(SellerRequest $request)
    {
        if (Store::where('user_id',Auth('api')->user()->id)->whereIn('status', ['pending', 'approved'])->count() == 0) {
            $store = new Store($request->all());
            $store->User()->associate(Auth::user());
            if ($store->save())
                return response()->json(['message' => 'application send successfully']);
            else
                return response()->json(['error' => 'error in application']);
        } else
            return response()->json(['error' => 'you have pending request or already approved']);
    }
    public function Affiliates(AffiliateRequest $request)
    {
            if (Affiliate::with('User')->find(Auth::user())->whereIn('status', ['pending', 'approved'])->count() == 0) {
                DB::beginTransaction();
                try{
                    $payment = new PaymentAccount($request->except('plan_id'));
                    $payment->_token = Str::random(20);
                    $payment->user_id = Auth::user()->id;
                    $payment->save();

                    $aff = new Affiliate($request->only('plan_id'));
                    $aff->User()->associate(Auth::user());
                    $aff->save();

                    DB::commit();
                    return response()->json(['message' => 'application send successfully']);
                }
                catch (\Exception $exception){
                    DB::rollback();
                    return response()->json(['error' => 'error in application']);
                }
            } else
                return response()->json(['error' => 'you have pending request or already approved']);


    }
}
