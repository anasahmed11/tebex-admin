<?php

namespace App\Http\Controllers\API\User;

use App\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');

    }

    public function user(){
        $data=[];
        $user=Auth::user();
        $data['user']=$user;
        $data['user']['verified']=$user->hasVerifiedEmail();
        $seller=$user->Store();
        $sellerStatus='Not Applied';
        if($seller->where('status','refused')->count()>0)
            $sellerStatus='Refused';
        elseif($seller->where('status','pending')->count()>0)
            $sellerStatus='Pending';
        elseif($seller->where('status','approved')->count()>0)
            $sellerStatus='Approved';
        $aff=$user->Affiliate();
        $affStatus='Not Applied';
        if($aff->where('status','refused')->count()>0)
            $affStatus='Refused';
        elseif($aff->where('status','pending')->count()>0)
            $affStatus='Pending';
        elseif($aff->where('status','approved')->count()>0)
            $affStatus='Approved';
        $data['program']['seller']= $sellerStatus;
        $data['program']['affiliate']=$affStatus;
        return response()->json($data);
    }
}
