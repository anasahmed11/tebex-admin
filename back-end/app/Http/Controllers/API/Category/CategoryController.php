<?php

namespace App\Http\Controllers\API\Category;

use App\Category;
use App\Http\Requests\FilterRequest;
use App\Http\Resources\ProductCollection;
use App\Product;
use App\ProductSpec;
use App\Spec;
use function foo\func;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

class CategoryController extends Controller
{
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
            $count += $cat->Product()->count();
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
            $q->whereIn('category_id', $catids);
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
        $products = Product::where('active', 1)->whereIn('category_id', $cats);

        if ($filters->isMethod('post')) {
            $setting = $filters->only('settings')['settings'];
            $specs = $filters->only('specs')['specs'];
            $specsfilters = [];
            foreach ($specs as $spec) {
                if (count($spec['values']) == 0) continue;
                $sp = Spec::find($spec['id']);
                #$fil = [];
                foreach ($spec['values'] as $value) {
                    $v["ar"] = $sp->values["ar"][$value];
                    $v["en"] = $sp->values["en"][$value];
                    #$fil[] = trim(str_replace([":\"",","],[": \"",", "],json_encode($v)));
                    $specsfilters[] = trim(str_replace([":\"", ","], [": \"", ", "], json_encode($v)));
                }
            }
            $products->whereHas('Specs', function ($q) use ($specsfilters) {
                if (count($specsfilters))
                    $q->whereIn('value', $specsfilters);
            })->whereBetween('price', $setting[0]['values']);
        }
        /*$products=$cats[0]->Product()->get();
        for ($i=1;$i < $cats->count();$i++){
           $products=$products->merge($cats[$i]->Product()->get());
        }
        $pages=($this->paginate($products->all(),Input::get("perpage")??30,Input::get("page")??1));
        $response=[];
        $response['data']=$pages->all();
        $response['paging']['current']=$pages->currentPage();
        $response['paging']['last']=$pages->lastPage();
        $response['paging']['items']=$pages->total();*/

        $prices = ["max_price" => $products->max('price'), "min_price" => $products->min('price')];
        return response()->json(array_merge($products->paginate(isset($setting)  ? $setting[1]['values'] : 30)->toArray(), $prices));
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
