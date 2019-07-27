<?php

namespace App\Http\Requests;

use App\Enums\AppStatus;
use App\Enums\Methods;
use Illuminate\Foundation\Http\FormRequest;

class AffiliateRequest extends FormRequest
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
            'level'=>'required|integer',
            'method'=>'required|enum_key:'. Methods::class,
            'account'=>'required|json',
        ];
    }
}
