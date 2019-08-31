<?php

namespace App\Http\Controllers\API\Spec;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpecRequest;
use App\Spec;
use Illuminate\Support\Facades\Auth;

class SpecController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api');
    }


    public function addSpec(Spec $spec, SpecRequest $request)
    {
        if ($spec == null)
            return response()->json(['message' => 'spec id not valid'], 400);

        $store = Auth::user()->store()->where('status', 'approved')->first();
        if ($store == null)
            return response()->json(['message' => 'you aren\'t registered as store'], 400);



        $values = $spec->values;

        array_push($values['ar'], $request->input('ar'));
        array_push($values['en'], $request->input('en'));

        $spec->values = $values;

        $spec->save();

        return response()->json(['data' => $spec, 'message' => 'Spec Value Added Successfully'], 200);
    }
}
