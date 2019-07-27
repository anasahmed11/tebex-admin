<?php

namespace App\Http\Controllers\API\User;

use App\Affiliate;
use App\Http\Requests\AffiliateRequest;
use App\Http\Requests\SellerRequest;
use App\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProgramController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function Stores(SellerRequest $request){
        $store= new Store($request->all());
        $store->User()->associate(Auth::user());
        if($store->save())
            return response()->json(['message'=>'application send successfully']);
        else
            return response()->json(['error'=>'error in application']);
    }
    public function Affiliates(AffiliateRequest $request){
        $aff = new Affiliate($request->all());
        $aff->User()->associate(Auth::user());
        if($aff->save())
            return response()->json(['message'=>'application send successfully']);
        else
            return response()->json(['error'=>'error in application']);
    }
}
