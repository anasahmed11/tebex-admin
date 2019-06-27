<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
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
            'first_name'=>'required|string',
            'last_name'=>'required|string',
            'address'=>'required|string',
            'email'=>'required|string',
            'phone'=>'required|string',
            'country'=>'required|integer|exists:countries,id',
            'city'=>'required|integer|exists:cities,id',
            'area'=>'integer|exists:areas,id',
            'landmark'=>'string',
            'notes'=>'string',
        ];
    }
}
