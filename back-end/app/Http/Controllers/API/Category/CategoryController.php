<?php

namespace App\Http\Controllers\API\Category;

use App\Category;
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
    public function index(){
        Category::fixTree();
        return response()->json(Category::get()->toTree(),200);
    }
    public function specs($category){
        $lang = ['ar','en'];
        $cats=Category::descendantsAndSelf($category)->toFlatTree();
        $specs=[];
        $catids=[];

        foreach ($cats as $cat){
            $catids[]=$cat->id;
            $specss=$cat->Specs()->get();
            foreach ($specss as $spec){
                $specs[$spec->id] = $spec;
            }
        }

        $stat= ProductSpec::whereHas('Product',function ($q) use ($catids){
            $q->whereIn('category_id',$catids);
        })->get()->groupBy([
            function ($item) use($lang){
                $spec=Spec::find($item['spec_id']);
                return $lang[INPUT::get('lang')] =='ar'? $spec->name: $spec->name_en;
            },
            function ($item) use ($lang){
                return $item['value'][$lang[INPUT::get('lang')]];
            }])->map(function($value){
                return $value->map(function ($value){
                    return $value->count();
                });
        });
        return response()->json(["Specs"=>$specs,"Count"=>$stat]);
    }
    public function products(Category $category){
        $cats=Category::descendantsAndSelf($category)->toFlatTree();
        $func = function($value) {
            return $value['id'];
        };
        $cats=array_map($func,$cats->toArray());
        $products=Product::whereIn('category_id',$cats);
        $products->paginate(30);
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
        return response()->json($products->paginate(Input::get("perpage")??30));
    }
    public function filter(Category $category){
        return response()->json($category->Product()->get());
    }
    public function paginate($items, $perPage = 30, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
}
