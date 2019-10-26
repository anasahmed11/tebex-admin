<?php

namespace App\Http\Controllers\API\Category;

use App\Category;
use App\Http\Requests\FilterRequest;
use App\Product;
use App\ProductSpec;
use App\Spec;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

class CategoryController extends Controller
{
    protected $sortCols = [
        ['column_name'=>'created_at','direction'=>'desc'],
        ['column_name'=>'price','direction'=>'desc'],
        ['column_name'=>'price','direction'=>'asc'],
        ['column_name'=>'name_en','direction'=>'asc'],
        ['column_name'=>'name_en','direction'=>'desc'],
    ];
    public function index()
    {
        Category::fixTree();
        return response()->json(Category::get()->toTree(), 200);
    }
    public function productsCount($category)
    {
        $cats = Category::descendantsAndSelf($category)->toFlatTree();
        $count = 0;
        foreach ($cats as $cat) {
            $count += $cat->Product()->where('status','approved')->where('active','1')->count();
        }
        return response()->json(["data" => ["count" => $count]]);
    }
    public function specsCount($category)
    {
        $cats = Category::descendantsAndSelf($category)->toFlatTree();
        $catids = [];
        foreach ($cats as $cat) {
            $catids[] = $cat->id;
        }
        return response()->json(["data" => ProductSpec::whereHas('Product', function ($q) use ($catids) {
            $q->where('status','approved')->where('active','1')->whereIn('category_id', $catids);
        })->get()->groupBy([
            function ($item) {
                $spec = Spec::find($item['spec_id']);
                return json_encode(["id" => $spec->id, "name_en" => $spec->name_en, "name" => $spec->name, "values" => $spec->values]);
            },
            function ($item) {
                return json_encode($item['value']);
            }
        ])->map(function ($value) {
            return $value->map(function ($value) {
                return $value->count();
            });
        })]);
    }
    public function specs($category)
    {
        $cats = Category::descendantsAndSelf($category)->toFlatTree();
        $specs = [];
        $ids = [];
        foreach ($cats as $cat) {
            $specss = $cat->Specs()->get();

            foreach ($specss as $spec) {
                if (!isset($ids[$spec->id])) $ids[$spec->id] = false;

                if (!$ids[$spec->id]) {
                    $specs[] = $spec;
                    $ids[$spec->id] = true;
                }
            }
        }

        return response()->json(["data" => $specs]);
    }
    public function products(Category $category, FilterRequest $filters)
    {

        $cats = Category::descendantsAndSelf($category)->toFlatTree();
        $func = function ($value) {
            return $value['id'];
        };

        $cats = array_map($func, $cats->toArray());

        $products = Product::where('active', '1')->where('status','approved')->whereIn('category_id', $cats);

        if ($filters->isMethod('post')) {
            if($filters->q){
                $matching = Product::search($filters->q)->where('active', '1')->where('status','approved')->get('id')->pluck('id');
                $products = $products->whereIn('id', $matching);
            }
            $setting = $filters->only('settings')['settings'];
            $specs = $filters->only('specs')['specs'];
            $specsfilters = [];
            foreach ($specs as $spec) {
                if (count($spec['values']) == 0) continue;
                $sp = Spec::find($spec['id']);
                foreach ($spec['values'] as $value) {
                    $v["ar"] = $sp->values["ar"][$value];
                    $v["en"] = $sp->values["en"][$value];
                    $specsfilters[] = trim(str_replace([":\"", ","], [": \"", ", "], json_encode($v)));
                }
            }
            if (count($specsfilters)==1)
                $specsfilters[] = $specsfilters[0];

            $products->whereHas('Specs', function ($q) use ($specsfilters) {
                if (count($specsfilters))
                    $q->whereIn('value', $specsfilters);
            })->whereBetween('price', $setting[0]['values']);
        }


        $prices = ["max_price" => $products->max('price'), "min_price" => $products->min('price')];

        $sortCol = $this->sortCols[$setting[2]['values']];
        return response()->json(array_merge($products->orderBy($sortCol['column_name'], $sortCol['direction'])->paginate(isset($setting)  ? $setting[1]['values'] : 30)->toArray(), $prices));
    }
    public function filter(Category $category)
    {
        return response()->json($category->Product()->get());
    }
    public function paginate($items, $perPage = 30, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
}
