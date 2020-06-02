<?php

namespace App\Http\Controllers;
use App\Address;
use App\Affiliate;
use App\Order;
use App\OrderProduct;
use App\PaymentAccount;
use App\Plan;
use App\Store;
use App\User;
use App\Withdraw;
use Illuminate\Http\Request;
use Response;
use DB;
use App\Product;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $rules =
        [
            'status' => 'required',
        ];
    protected $plan_rules =
        [
            'plan_id' => 'required',
        ];
    /*products*/
    public function index()
    {
        $products=Product::all();
        return view('admin_dash/admin-products')->with('products',$products);
    }
    public function product_search_index()
    {
        $products=Product::all();
        return response()->json($products);
    }
    public function status_type($status)
    {
        $data =Product::where('status','=',$status)->get();
        return response()->json($data);

    }
    public function product_search(Request $request,$query){
        if($request->ajax()){
            if($query != '')
            {
                $data = Product::where('name_en', 'like', '%'.$query.'%')
                    ->orderBy('id', 'desc')
                    ->get();
                return  response()->json($data);

            }
        }

    }
    /*orders*/
    public function index_orders()
    {
        $orders=Order::all();
        return view('admin_dash/admin-orders')->with('orders',$orders);
    }
    public function order_status_type($status)
    {
        $data =Order::where('status','=',$status)->get();
        return response()->json($data);

    }
    public function address_details($id){
        $details=Address::where('id', '=',$id )->get();
        return  response()->json($details);
    }
    public function referral_details($id){
        $details=User::where('id', '=',$id )->get();
        return  response()->json($details);
    }
    public function order_total($id){
        $sum=OrderProduct::join('orders', 'order_products.order_id', '=', 'orders.id')->groupBy('orders.shipping_fees')
            ->selectRaw('SUM((quantity*price))+shipping_fees as total')
            ->where('orders.id',$id)->get();
        return response()->json($sum);
    }
    public function order_details($id){
        $details=OrderProduct::where('order_id', '=',$id )->get();
        return  response()->json($details);
    }
    /*affiliate*/
    public function index_affiliates()
    {
        $orders=Affiliate::all();
        $plans=Plan::pluck('name', 'id');
        return view('admin_dash/admin-affiliates')->with('orders',$orders)->with('plans',$plans);
    }
    public function affiliate_status_type($status)
    {
        $data =Affiliate::where('status','=',$status)->get();
        return response()->json($data);

    }
    public function plan_details($id){
        $details=Plan::where('id', '=',$id )->get();
        return  response()->json($details);
    }
    public function team(User $user)
    {
        $team = User::whereDescendantOf($user)->get(['id', 'image', 'parent_id', 'first_name', 'last_name', 'gender', 'created_at']);
        return response()->json($team, 200);
    }
    /*withdraws*/
    public function index_withdraws()
    {
        $orders=Withdraw::all();
        return view('admin_dash/admin-withdraws')->with('orders',$orders);
    }
    public function withdraw_status_type($status)
    {
        $data =Withdraw::where('status','=',$status)->get();
        return response()->json($data);
    }
    public function payment_details($id){
        $details=PaymentAccount::where('id', '=',$id )->get();
        return  response()->json($details);
    }
    /*sellers*/
    public function index_sellers()
    {
        $orders=Store::all();
        return view('admin_dash/admin-sellers')->with('orders',$orders);
    }
    public function seller_status_type($status)
    {
        $data =Store::where('status','=',$status)->get();
        return response()->json($data);
    }
    public function sel_products_details($id){
        $details=Product::where('store_id', '=',$id )->get();
        return  response()->json($details);
    }
    public function total_sel_orders($id){
        $sum= DB::table('stores')
            ->join('orders', 'stores.user_id', '=', 'orders.referral_id')
            ->join('order_products', 'orders.id', '=', 'order_products.order_id')
            ->selectRaw('SUM(order_products.quantity*order_products.price) as total')
            ->where('stores.user_id', '=', $id)
            ->get();
        return response()->json($sum);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update_status(Request $request, $id)
    {
        $validator = Validator::make(Input::all(), $this->rules);
        if ($validator->fails()) {
            return Response::json(array('errors' => $validator->getMessageBag()->toArray()));
        } else {
            $status = Product::find($id);
            $status->status = $request->input('status');
            $status->save();
            return response()->json($status);
        }
    }
    public function update_aff_status(Request $request, $id)
    {
        $validator = Validator::make(Input::all(), $this->rules);
        if ($validator->fails()) {
            return Response::json(array('errors' => $validator->getMessageBag()->toArray()));
        } else {
            $status = Affiliate::find($id);
            $status->status = $request->input('status');
            $status->save();
            return response()->json($status);
        }
    }
    public function update_aff_plan(Request $request, $id)
    {
        $validator = Validator::make(Input::all(), $this->plan_rules);
        if ($validator->fails()) {
            return Response::json(array('errors' => $validator->getMessageBag()->toArray()));
        } else {
            $plan = Affiliate::find($id);
            $plan->plan_id = $request->input('plan_id');
            $plan->save();
            return response()->json($plan);
        }
    }
    public function update_wit_status(Request $request, $id)
    {
        $validator = Validator::make(Input::all(), $this->rules);
        if ($validator->fails()) {
            return Response::json(array('errors' => $validator->getMessageBag()->toArray()));
        } else {
            $status = Withdraw::find($id);
            $status->status = $request->input('status');
            $status->save();
            return response()->json($status);
        }
    }
    public function update_sel_status(Request $request, $id)
    {
        $validator = Validator::make(Input::all(), $this->rules);
        if ($validator->fails()) {
            return Response::json(array('errors' => $validator->getMessageBag()->toArray()));
        } else {
            $status = Store::find($id);
            $status->status = $request->input('status');
            $status->save();
            return response()->json($status);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
