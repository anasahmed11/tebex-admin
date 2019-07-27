<?php

namespace App\Http\Requests;

use App\Enums\AppStatus;
use App\Enums\Methods;
use Illuminate\Foundation\Http\FormRequest;

class SellerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
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
            'name'=>'required|string',
            'name_en'=>'required|string',
            'url'=>'string',
            'address'=>'required|string',
            'phone'=>'required|string',
            'email'=>'string',
            'slug'=>'required|string',
            'method'=>'required|enum_key:'. Methods::class,
            'account'=>'required|json',

        ];
    }
}
