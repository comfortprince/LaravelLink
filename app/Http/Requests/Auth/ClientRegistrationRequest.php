<?php

namespace App\Http\Requests\Auth;

use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use App\Models\User;

class ClientRegistrationRequest extends FormRequest
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
            'roleId' => [
                'required',
                'integer',
                Rule::in($this->getValidRoleIds())
            ],
            'firstName' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'profile_picture_id'=> '',
            'country' => [
                'required',
                'string',
                Rule::in($this->getCountries())
            ],
            'city' => '',
            'website_link' => '',
            'bio' => '',
        ];
    }

    private function getValidRoleIds(): array {
        return Role::whereIn('name', ['client','freelancer'])
            ->pluck('id')
            ->toArray();
    }

    private function getCountries(): array {
        return config('custom_constants.countries', []);
    }
}
