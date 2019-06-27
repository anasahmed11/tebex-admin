<?php

namespace App\Http\Controllers\API\Category;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        return response()->json($category->Product()->get());
    }
    public function filter(Category $category){
        return response()->json($category->Product()->get());
    }
}
