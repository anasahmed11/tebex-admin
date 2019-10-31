<?php

namespace App\Http\Controllers\API\Withdraw;

use App\Http\Controllers\Controller;
use App\Http\Requests\withdrawRequest;
use App\PaymentAccount;
use App\Withdraw;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WithdrawController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function getWitdraws()
    {

        return response()->json(Auth::user()->Withdraws()->get(), 200);
    }
    public function addWitdraw(withdrawRequest $request)
    {
        $user_id = PaymentAccount::find($request->get('payment_account_id'))->User()->first(['id'])->id;
        if (Auth::user()->id != $user_id)
            return response()->json(['message' => 'payment information doesn\'t belong to this user'], 403);

        switch ($request->get('type')) {
            case 'affiliate':
                $affiliate = Auth::user()->Affiliate()->where('status', 'approved')->first();
                $balance = $affiliate->active_balance;
                if ($balance == 0)
                    return response()->json(['message' => 'you don\'t have enough balance'], 403);

                DB::beginTransaction();
                try {
                    $withdraw = new Withdraw([
                        'payment_account_id' => $request->get('payment_account_id'),
                        'cash' => $balance,
                    ]);
                    $affiliate->active_balance = 0;

                    $withdraw->save();
                    $affiliate->save();

                    DB::commit();
                } catch (Exception $exception) {
                    DB::rollback();
                    return response()->json(['message' => 'an error occured, try again later'], 400);
                }



                break;
            case 'store':
                $store = Auth::user()->Store()->where('status', 'approved')->first();
                $balance = $store->balance;

                $balance = OrderProduct::query()->whereHas('Product',function ($q) use ($store){
                    $q->where('store_id',$store->id);
                })->where('returnable','0')->whereHas('Order', function ($q){
                    $q->where('status','delivered');
                })->selectRaw('SUM(price * quantity) as total')->get()->sum('total');

                // TO DO
                // balance - commission

                if ($balance == 0)
                    return response()->json(['message' => 'you don\'t have enough balance'], 403);

                DB::beginTransaction();
                try {
                    $withdraw = new Withdraw([
                        'payment_account_id' => $request->get('payment_account_id'),
                        'cash' => $balance,
                    ]);
                    $store->balance = 0;

                    $withdraw->save();
                    $store->save();

                    DB::commit();
                } catch (Exception $exception) {
                    DB::rollback();
                    return response()->json(['message' => 'an error occured, try again later'], 400);
                }
                break;

            default:
                return response()->json(['message' => 'type not found'], 404);
        }


        return response()->json(['message' => 'request accepted'], 200);
    }
}
