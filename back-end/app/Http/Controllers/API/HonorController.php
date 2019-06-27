<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class HonorController extends Controller
{
    public function index(){
        return response()->json(User::where('honored','1')->get(),200);
    }
}
