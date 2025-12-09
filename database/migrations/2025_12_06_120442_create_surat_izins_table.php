<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('surat_izins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id')->constrained('requests')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            $table->string('nomor_surat')->unique();
            $table->string('judul');
            $table->date('tanggal_terbit');
            $table->date('tanggal_kadaluwarsa');
            $table->string('file_pdf'); // path file yang disimpan

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surat_izins');
    }
};
