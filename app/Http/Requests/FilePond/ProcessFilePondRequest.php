<?php

namespace App\Http\Requests\Filepond;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\File;
use \Illuminate\Contracts\Validation\Validator;

class ProcessFilePondRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'profile_picture' => [
                'required', 
                'image',
                File::image()->max('1mb')
            ]
        ];
    }

    public function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json([
            'status' => 'fail',
            'errors' => $validator->errors(),
        ], 403));
    }

    public function passedValidation() {
    }
}
