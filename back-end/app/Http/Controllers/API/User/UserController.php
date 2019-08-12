<?php

namespace App\Http\Controllers\API\User;

use App\Store;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\MainSettings;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function user()
    {
        $data = [];
        $user = Auth::user();
        $data['user'] = $user;
        $data['user']['verified'] = $user->hasVerifiedEmail();
        $sellerStatus = 'Not Applied';
        if ($user->Store()->where('status', 'refused')->count() > 0)
            $sellerStatus = 'Refused';
        elseif ($user->Store()->where('status', 'pending')->count() > 0)
            $sellerStatus = 'Pending';
        elseif ($user->Store()->where('status', 'approved')->count() > 0)
            $sellerStatus = 'Approved';
        $affStatus = 'Not Applied';
        #dd($aff->where('status','pending')->count());
        if ($user->Affiliate()->where('status', 'refused')->count() > 0)
            $affStatus = 'Refused';
        elseif ($user->Affiliate()->where('status', 'pending')->count() > 0)
            $affStatus = 'Pending';
        elseif ($user->Affiliate()->where('status', 'approved')->count() > 0)
            $affStatus = 'Approved';
        $data['program']['seller'] = $sellerStatus;
        $data['program']['affiliate'] = $affStatus;
        return response()->json($data);
    }

    public function editUserMainSettings(MainSettings $request)
    {
        $user = Auth::user();
        $user->first_name = $request->input('first_name');
        $user->last_name = $request->input('last_name');
        $user->save();
        return response()->json($user, 200);
    }
    public function team()
    {

        $team = User::whereDescendantOf(Auth::User())->get(['id', 'image', 'parent_id', 'first_name', 'last_name', 'gender', 'active_points', 'inactive_points', 'suspended_points']);
        return response()->json($team, 200);
    }
}
