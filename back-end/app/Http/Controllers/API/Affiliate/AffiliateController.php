<?php

namespace App\Http\Controllers\API\Affiliate;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AffiliateController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('CheckAffiliate');
    }
    public function affiliateEarning()
    {
        $affiliate = Auth::user()->Affiliate()->where('status', 'approved')->first(['active_balance', 'inactive_balance', 'suspended_balance']);
        return response()->json($affiliate, 200);
    }

    public function getAffiliateLevel()
    {
        $affiliate = Auth::user()->Affiliate()->where('status', 'approved')->first(['plan_id']);
        return response()->json($affiliate, 200);
    }
}
