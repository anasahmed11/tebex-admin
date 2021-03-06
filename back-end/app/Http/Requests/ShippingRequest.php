<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingRequest extends FormRequest
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
            'shipper_id' => 'required|integer|exists:shippers,id',
            'governorate_id' => 'required|integer|exists:governorates,id',
            'min_days' => 'required|integer',
            'fees'=>'required|integer',
        ];
    }
}
