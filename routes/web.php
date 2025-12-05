<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{RequestController, ProfileController};

Auth::login(User::find(1));
Route::inertia('/', 'public/welcome')->name('home');
Route::inertia('alur-perizinan', 'public/alur-perizinan')->name('alur-perizinan');
Route::inertia('cek-permohonan', 'public/cek-permohonan')->name('cek-permohonan');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'pemohon/dashboard')->name('dashboard');
    Route::get('profile', [ProfileController::class, 'index'])->name('profile');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::inertia('/bantuan', 'pemohon/bantuan')->name('bantuan');
    Route::inertia('/ajukan-permohonan', 'pemohon/ajukan-permohonan')->name('ajukan-permohonan');


    // Request
    Route::post('/submit-request', [RequestController::class, 'store'])->name('submit-request');
});

require __DIR__.'/settings.php';
