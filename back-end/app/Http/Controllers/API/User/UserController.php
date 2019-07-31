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
        $sellerStatus='Not Applied';
        if($user->Store()->where('status','refused')->count() > 0)
            $sellerStatus='Refused';
        elseif($user->Store()->where('status','pending')->count() > 0)
            $sellerStatus='Pending';
        elseif($user->Store()->where('status','approved')->count() > 0)
            $sellerStatus='Approved';
        $affStatus='Not Applied';
        #dd($aff->where('status','pending')->count());
        if($user->Affiliate()->where('status','refused')->count() > 0)
            $affStatus='Refused';
        elseif($user->Affiliate()->where('status','pending')->count() > 0)
            $affStatus='Pending';
        elseif($user->Affiliate()->where('status','approved')->count() > 0)
            $affStatus='Approved';
        $data['program']['seller']= $sellerStatus;
        $data['program']['affiliate']= $affStatus;
        return response()->json($data);
    }
}
