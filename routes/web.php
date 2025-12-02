<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'public/welcome')->name('home');
Route::inertia('alur-perizinan', 'public/alur-perizinan')->name('alur-perizinan');
Route::inertia('cek-permohonan', 'public/cek-permohonan')->name('cek-permohonan');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'pemohon/dashboard')->name('dashboard');
    Route::get('profile', [ProfileController::class, 'index'])->name('profile');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::inertia('/bantuan', 'pemohon/bantuan')->name('bantuan');
    //  Route::get('profile', function () {
    //      return Inertia::render('pemohon/profile');
    //  })->name('profile');
});

require __DIR__.'/settings.php';
