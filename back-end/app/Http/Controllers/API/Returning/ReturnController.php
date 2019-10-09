<?php

namespace App\Http\Controllers\API\Returning;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\ReturnReason;

class ReturnController extends Controller
{
    public function getReturnReasons()
    {
        return response()->json(ReturnReason::all(), 200);
    }
}
