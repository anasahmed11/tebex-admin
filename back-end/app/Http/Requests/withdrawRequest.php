<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class withdrawRequest extends FormRequest
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
            'payment_account_id'=>'required|integer|exists:payment_accounts,id',
            'type'=>'required|in:affiliate,store'
        ];
    }
}
