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
        $data['program']['seller']= $user->Store()->count();
        $data['program']['affiliate']=$user->Affiliate()->count();
        return response()->json($data);
    }
}
