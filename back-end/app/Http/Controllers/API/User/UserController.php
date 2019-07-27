<?php

namespace App\Http\Controllers\API\User;

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
        return response()->json(Auth::user());
    }
}
