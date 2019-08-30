<?php

namespace App\Http\Controllers\API\Product;

use App\Category;
use App\Http\Requests\ProductRequest;
use App\Product;
use App\ProductSpec;
use App\Spec;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only('show', 'delete', 'add', 'update');
    }

    public function show()
    {
        $store = Auth::User()->Store()->where('status', 'approved')->first();
        if ((count((array) $store))) return response()->json($store->Products()->get(), 200);

        return response()->json(['message' => 'You Aren\'t Registerd to Seller Program'], 401);
    }

    public function product(Product $product)
    {
        if ($product == null || $product->status == "pending") return response()->json(["error" => "product not found"], 400);
        return response()->json($product, 200);
    }
    public function specs(Product $product)
    {
        if ($product == null)
            return response()->json(["error" => "product not found"], 400);
        return response()->json($product->toArray()['specs'], 200);
    }
    public function sku($product, $sku)
    {
        return response()->json(Product::where('sku', $sku)->get()->map(function ($e) {
            return ['id' => $e->id, 'slug' => $e->slug, 'specs' => $e->toArray()['specs']];
        }));
    }

    /*
    // This function takes sku and specs and returns matching products if exist.
    public function skuSpecs($sku, Request $request)
    {
        // print_r($sku);
        $specs = $request->input('specs');
        $p = Product::select(['id','sku','slug']);
        $p->where('sku', '=', $sku);
        foreach($specs as $spec){
            $p->whereIn('id', function($query) use ($spec){
                $query->select('product_id')->from('product_specs');
                $query->where('spec_id', '=', $spec['id']);
                $query->where('value', '=', $spec['value']);
            });
        }
        return response()->json($p->get());
    }
    */

    public function search(Request $request)
    {
        $products = Product::search($request->input('q'))->paginate(10);
        return response()->json($products);
    }
    public function add(ProductRequest $product)
    {
        DB::beginTransaction();
        try {
            $p = new Product($product->except(['category', 'image', 'description', 'description_en']));
            $p->description = json_decode($product->input('description'));
            $p->description_en = json_decode($product->input('description_en'));

            $p->images = [];
            $store = Auth::User()->Store()->where('status', 'approved')->first();
            if (!(count((array) $store))) throw new  \Exception('user have no  store');
            $p->Store()->associate($store);
            $p->Category()->associate(Category::find($product->category));
            $p->save();
            $i = [];
            foreach ($product->file('image') as $image)
                $i[] = Storage::url($image->store('public/product/' . $p->id));
            $p->images = $i;
            foreach ($product->only('specs')['specs'] as $spec) {
                $s = Spec::find($spec['id']);
                $ar = $s->values['ar'];
                $en = $s->values['en'];
                if (count($ar) == count($en) && count($ar) > $spec['value']) {
                    $ar = $ar[$spec['value']];
                    $en = $en[$spec['value']];
                    $v['ar'] = $ar;
                    $v['en'] = $en;
                    /*$ps=$p->Specs()->firstOrNew(["spec_id"=>$s->id]);
                    $ps->value=$v;
                    $ps->save();*/
                    $ps = ProductSpec::firstOrNew(["product_id" => $p->id, "spec_id" => $s->id]);
                    $ps->value = $v;
                    $ps->save();
                } else
                    throw new \Exception('spec value error');
            }
            $p->save();
            DB::commit();

            return response()->json("ok", 200);
        } catch (\Exception $exception) {
            DB::rollback();
            //dd($exception);
            return response()->json("error", 400);
        }
    }
    public function update(ProductRequest $product, Product $pid)
    {
        DB::beginTransaction();
        try {
            if ($pid->Store()->first()->User()->first()->id != Auth::user()->id) throw new \Exception('access error');
            $pid->update($product->except(['category', 'image', 'description', 'description_en']));
            $pid->status = "pending";
            $pid->description = json_decode($product->input('description'));
            $pid->description_en = json_decode($product->input('description_en'));

            $p = $pid;
            $p->images = [];
            $p->Category()->associate(Category::find($product->category));
            $p->save();
            $i = [];
            foreach ($product->file('image') as $image)
                $i[] = Storage::url($image->store('public/product/' . $p->id));
            $p->images = $i;
            ProductSpec::where(["product_id" => $p->id])->delete();
            foreach ($product->only('specs')['specs'] as $spec) {
                $s = Spec::find($spec['id']);
                $ar = $s->values['ar'];
                $en = $s->values['en'];
                if (count($ar) == count($en) && count($ar) > $spec['value']) {
                    $ar = $ar[$spec['value']];
                    $en = $en[$spec['value']];
                    $v['ar'] = $ar;
                    $v['en'] = $en;
                    /*$ps=$p->Specs()->firstOrNew(["spec_id"=>$s->id]);
                    $ps->value=$v;
                    $ps->save();*/
                    $ps = ProductSpec::firstOrNew(["product_id" => $p->id, "spec_id" => $s->id]);
                    $ps->value = $v;
                    $ps->save();
                } else
                    throw new \Exception('spec value error');
            }
            $p->save();
            DB::commit();
            return response()->json("ok", 200);
        } catch (\Exception $exception) {
            DB::rollback();
            //dd($exception);
            return response()->json("error", 400);
        }
    }
}
