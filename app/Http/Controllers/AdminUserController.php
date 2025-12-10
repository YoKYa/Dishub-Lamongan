<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        return inertia('admin/manajemen-user', [
            'users' => User::all()
        ]);
    }

    public function store(Request $r)
    {
        User::create([
            'name' => $r->name,
            'email' => $r->email,
            'role' => $r->role,
            'password' => Hash::make($r->password),
        ]);
    }

    public function update(Request $r, $id)
    {
        $user = User::find($id);

        $user->name = $r->name;
        $user->email = $r->email;
        $user->role = $r->role;

        if ($r->password) {
            $user->password = Hash::make($r->password);
        }

        $user->save();
    }

    public function destroy($id)
    {
        User::find($id)->delete();
    }
}
