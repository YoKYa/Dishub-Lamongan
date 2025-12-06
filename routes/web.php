<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DraftController;
use App\Http\Controllers\SuratIzinController;
use App\Http\Controllers\StatusPengajuanController;
use App\Http\Controllers\{RequestController, ProfileController};

Route::inertia('/', 'public/welcome')->name('home');
Route::inertia('alur-perizinan', 'public/alur-perizinan')->name('alur-perizinan');
Route::inertia('cek-permohonan', 'public/cek-permohonan')->name('cek-permohonan');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'pemohon/dashboard')->name('dashboard');
    Route::get('profile', [ProfileController::class, 'index'])->name('profile');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::inertia('/bantuan', 'pemohon/bantuan')->name('bantuan');
    Route::inertia('/ajukan-permohonan', 'pemohon/ajukan-permohonan')->name('ajukan-permohonan');
    Route::get('/draft', [DraftController::class, 'index'])->name('draft.index');
    Route::delete('/draft/{id}', [DraftController::class, 'destroy'])->name('draft.destroy');
    Route::get('/ajukan-permohonan/{draft}', [RequestController::class, 'editDraft'])->name('permohonan.edit');


    // Request
    Route::post('/submit-request', [RequestController::class, 'store'])->name('submit-request');
    Route::put('/submit-request/{id}', [RequestController::class, 'store'])->name('request.update');
    Route::post('/submit-draft/{id}', [RequestController::class, 'store'])->name('draft.update');

    Route::get('/status-pengajuan', [StatusPengajuanController::class, 'index'])->name('status-pengajuan');
    Route::get('/detail-pengajuan/{id}', [RequestController::class, 'detail'])->name('pengajuan.detail');
    Route::get('/daftar-surat', [SuratIzinController::class, 'index'])->name('surat.index');
    Route::get('/surat-izin/{id}', [SuratIzinController::class, 'show'])->name('surat.show');

});

require __DIR__.'/settings.php';
