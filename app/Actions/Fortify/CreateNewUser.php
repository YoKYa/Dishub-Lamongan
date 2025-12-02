<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'identity_number'=>['string','min:15','max:16', Rule::unique(User::class),],
            'phone'=>['required','string','max:13','min:10'],
            'address'=>['required','string','max:255'],
            'file_identity'=>['max:2048'],
            'skpj'=>['max:2048'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();
            
        try {
            $user = User::create([
                'name' => $input['name'],
                'identity_number' => $input['identity_number'],
                'phone' => $input['phone'],
                'address' => $input['address'],
                'role' => $input['role'],
                'email' => $input['email'],
                'password' => $input['password'],
            ]);
            $file = $input['file_identity']->store('documents/user/file_identity','public');
            $file2 = $input['skpj']->store('documents/user/skpj','public');
            $user->applicant()->create([
                'file_identity' => $file,
                'skpj' => $file2,
            ]);
            return $user;
        } catch (\Exception $e) {
            return throw new \RuntimeException('Failed to create user: ' . $e->getMessage());
        }
        
    }
}
