<?php

namespace Database\Seeders;

use App\Models\TypeRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama_izin' => 'Izin Trayek Angkutan Umum',
                'deskripsi' => 'Izin untuk operasional trayek angkutan umum dalam kota/kabupaten.',
                'syarat_dokumen' => 'KTP Pemohon, STNK Kendaraan, Bukti Lulus Uji KIR',
            ],
            [
                'nama_izin' => 'Izin Pemanfaatan Lahan Terminal',
                'deskripsi' => 'Izin penggunaan lahan di area terminal untuk usaha atau kegiatan.',
                'syarat_dokumen' => 'Surat Permohonan Pemanfaatan, Denah Lokasi, Fotokopi KTP Pemohon, NPWP Perusahaan, Surat Kuasa (jika diwakilkan), Surat Rekomendasi dari Dinas Perhubungan',
            ],
            [
                'nama_izin' => 'Pendaftaran Uji KIR Kendaraan',
                'deskripsi' => 'Pendaftaran pengujian kendaraan bermotor berkala.',
                'syarat_dokumen' => 'Dokumen Digital STNK, Bukti Pembayaran Retribusi',
            ],
            [
                'nama_izin' => 'Izin Operasional Angkutan Barang',
                'deskripsi' => 'Izin operasional untuk kendaraan pengangkut barang logistik/material.',
                'syarat_dokumen' => 'KTP atau Akta Pendirian Usaha, STNK Kendaraan, Bukti Lulus Uji KIR',
            ],
            [
                'nama_izin' => 'Izin Angkutan Pariwisata',
                'deskripsi' => 'Izin operasional untuk armada bus atau kendaraan wisata.',
                'syarat_dokumen' => 'Akta Pendirian Usaha, NPWP Perusahaan, STNK Kendaraan, Bukti Lulus Uji KIR, Foto Kendaraan(Depan, Samping, Belakang)',
            ],
            [
                'nama_izin' => 'Izin Penggunaan Terminal',
                'deskripsi' => 'Izin penggunaan fasilitas terminal untuk event atau kegiatan insidentil.',
                'syarat_dokumen' => 'Surat Permohonan, Identitas Penanggung Jawab(KTP), Bukti Pembayaran Retribusi',
            ],[
                'nama_izin' => 'Izin Usaha Perparkiran',
                'deskripsi' => 'Izin pengelolaan lahan parkir di area pengawasan Dishub.',
                'syarat_dokumen' => 'Proposal Lokasi, Denah Lahan Parkir, NPWP, Surat Rekomendasi Dishub',
            ],
            ];
        TypeRequest::insert($data);
    }
}
