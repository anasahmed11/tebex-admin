<?php
namespace App\Http\Controllers\API\Auth;
use App\Enums\Gender;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest:api')->except('logout','details');

    }

    /**
     * login api
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only(['email', 'password'])))
            return response()->json([
                'message' => 'Unauthorized.'
            ], 422);
        $tokenResult = Auth::user()->createToken(config('app.name'));
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(2);
        $token->save();
        return response([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);

    }

    /**
     * Register api
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {
        $request['password'] = Hash::make($request['password']);
        $request['level']=0;
        $request['image']='';
        event(new Registered($user = User::create($request->except('referral'),User::find($request->only('referral'))->first())));
        #event(new Registered($user = User::create($request)));
        $tokenResult = $user->createToken(config('app.name'));
        return response([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response([
            'message' => 'Successfully logged out'
        ]);
    }
    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {   $authUser=Auth::user();
        return response($authUser, 200);
    }

}
