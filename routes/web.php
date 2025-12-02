<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'public/welcome')->name('home');
Route::inertia('/alur-perizinan', 'public/alur-perizinan')->name('alur-perizinan');
Route::inertia('/cek-permohonan', 'public/cek-permohonan')->name('cek-permohonan');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
