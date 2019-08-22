<?php

namespace App\Http\Controllers\API\User;

use App\Affiliate;
use App\Http\Requests\AffiliateRequest;
use App\Http\Requests\SellerRequest;
use App\Store;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProgramController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function Stores(SellerRequest $request)
    {
        if (Store::with('User')->find(Auth::user())->whereIn('status', ['pending', 'approved'])->count() == 0) {
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

            $aff = new Affiliate($request->all());
            $aff->User()->associate(Auth::user());
            if ($aff->save())
                return response()->json(['message' => 'application send successfully']);
            else
                return response()->json(['error' => 'error in application']);
        } else
            return response()->json(['error' => 'you have pending request or already approved']);
    }

}
