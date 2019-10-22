<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
       # return Auth::user()->Store() >0 ? true:false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required|string|min:10',
            'name_en'=>'required|string|min:10',
            'sku'=>'required|string',
            'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description'=>'required',
            'description_en'=>'required',
            'price'=>'required|numeric',
            'sale_price'=>'numeric',
            'quantity'=>'required|integer',
            'commission'=>'required|numeric|gt:0',
            'category'=>'required|exists:categories,id',
            'specs.*.id'=>'required|exists:specs',
            'specs.*.value'=>'required|integer'
        ];
    }
}
