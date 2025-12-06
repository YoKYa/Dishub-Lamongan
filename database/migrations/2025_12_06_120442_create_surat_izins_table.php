<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surat_izins', function (Blueprint $table) {
            $table->id();

            // Relasi ke permohonan/request
            $table->unsignedBigInteger('request_id');
            $table->unsignedBigInteger('user_id');

            // Informasi surat
            $table->string('jenis_izin');
            $table->string('nomor_surat')->unique();
            $table->date('tanggal_terbit');

            // Informasi pemohon / usaha
            $table->string('nama_pemohon');
            $table->string('nama_usaha')->nullable();

            // Objek (Kendaraan / Lokasi / dll)
            $table->string('objek_label'); // contoh: Kendaraan, Lokasi
            $table->string('objek_value'); // contoh: Mitsubishi Colt (S 1234 UJ)

            // Detail teknis
            $table->text('keterangan')->nullable();

            // File PDF (opsional)
            $table->string('file_pdf')->nullable();

            // QR Code (opsional)
            $table->string('qr_code')->nullable();

            // Status surat (Aktif / Kadaluarsa / Dicabut)
            $table->string('status')->default('Aktif');

            $table->timestamps();

            // Foreign Key
            $table->foreign('request_id')->references('id')->on('requests')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_izins');
    }
};
