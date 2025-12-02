<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return inertia('pemohon/profile', [
            'file' => $request->user()->applicant()->first(),
        ]);
    }

    // Menggunakan nama 'update' karena kita memperbarui data
    public function update(Request $request)
    {
        $user = $request->user();

        // 1. Validasi Input
        $validated = $request->validate([
            'nama'    => 'required|string|max:255',
            'phone'   => 'required|string|max:20',
            'address' => 'nullable|string',
            // Validasi foto: harus gambar, max 2MB, nullable
            'photo_profile'   => 'nullable|image|mimes:jpeg,png,jpg|max:2048', 
        ]);

        // 2. Update Data Text
        $user->name = $validated['nama'];
        $user->phone = $validated['phone'];
        $user->address = $validated['address'];

        // 3. Handle Upload Foto
        if ($request->hasFile('photo_profile')) {
            // Hapus foto lama jika ada dan bukan default/avatar eksternal
            if ($user->photo_profile && Storage::disk('public')->exists($user->photo_profile)) {
                Storage::disk('public')->delete($user->photo_profile);
            }

            // Simpan foto baru ke folder 'photos' di storage public
            $path = $request->file('photo_profile')->store('photos', 'public');
            $user->photo_profile = $path;
        }

        // 4. Simpan ke Database
        $user->save();

        // 5. Redirect kembali dengan notifikasi (opsional, karena sudah ada modal di front)
        return back();
    }
}