<?php

namespace App\Http\Controllers\API\Category;

use App\Category;
use App\Http\Resources\ProductCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Input;

class CategoryController extends Controller
{
    public function index(){
        Category::fixTree();
        return response()->json(Category::get()->toTree(),200);
    }
    public function specs(Category $category){
        return response()->json($category->Specs()->get());
    }
    public function products(Category $category){
        $cats=$category::get()->toFlatTree();
        $products=$cats[0]->Product()->get();
        for ($i=1;$i < $cats->count();$i++){
           $products=$products->merge($cats[$i]->Product()->get());
        }
        $pages=($this->paginate($products->all(),Input::get("perpage")??30,Input::get("page")??1));
        $response=[];
        $response['data']=$pages->all();
        $response['paging']['current']=$pages->currentPage();
        $response['paging']['last']=$pages->lastPage();
        $response['paging']['items']=$pages->total();
        return response()->json($response);
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
