<?php

namespace App\Http\Controllers\API\Returning;


use App\Http\Controllers\Controller;
use App\Http\Requests\ReturnApplicationRequest;
use App\OrderProduct;
use App\ReturnApplication;
use App\ReturnReason;
use Illuminate\Support\Facades\DB;

class ReturnController extends Controller
{
    public function getReturnReasons()
    {
        return response()->json(ReturnReason::all(), 200);
    }

    public function setReturnProduct(ReturnApplicationRequest $request)
    {

        $orderProduct = OrderProduct::where([['order_id','=', $request->order_id],['product_id','=', $request->product_id]])->first();
        if($orderProduct == null)
            return response()->json("The product is not associated with specified order.", 400);
        if($orderProduct->return_id != null)
            return response()->json("A return application already submitted.", 400);
        if($orderProduct->returnable == false)
            return response()->json("Product is not returnable.", 400);

        try {
            DB::beginTransaction();
            $returnApplication = new ReturnApplication($request->all());
            $returnApplication->save();

            $orderProduct->return_id = $returnApplication->id;
            $orderProduct->save();

            DB::commit();
            return response()->json($returnApplication, 201);
        } catch (\Exception $exception) {
            DB::rollback();
            dd($exception);
            return response()->json("Unknown error occurred ", 400);
        }

    }
}
