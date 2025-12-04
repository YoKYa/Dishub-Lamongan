# Sistem Layanan Perizinan - Dinas Perhubungan Kabupaten Lamongan

![Banner/Logo Dishub](https://dishub.lamongankab.go.id/wp-content/uploads/2021/06/logo-dishub.png) **Website Layanan Perizinan** ini adalah platform digital yang dikembangkan untuk Dinas Perhubungan Kabupaten Lamongan guna mempermudah proses pengajuan, verifikasi, dan penerbitan izin terkait transportasi dan perhubungan secara online.

Repositori: [https://github.com/YoKYa/Dishub-Lamongan](https://github.com/YoKYa/Dishub-Lamongan)

## 📋 Daftar Isi

-   [Tentang Aplikasi](#tentang-aplikasi)
-   [Fitur Utama](#fitur-utama)
-   [Teknologi](#teknologi)
-   [Prasyarat](#prasyarat)
-   [Instalasi](#instalasi)
-   [Penggunaan](#penggunaan)
-   [Kontribusi](#kontribusi)
-   [Lisensi](#lisensi)

## 📖 Tentang Aplikasi

Aplikasi ini bertujuan untuk mendigitalisasi layanan birokrasi di Dishub Lamongan, meningkatkan transparansi, serta mempercepat waktu pelayanan kepada masyarakat. Sistem ini mencakup modul untuk pemohon (masyarakat/perusahaan) dan modul admin (petugas Dishub).

## ✨ Fitur Utama

-   **Pendaftaran & Autentikasi Pengguna:** Login aman untuk pemohon dan admin.
-   **Pengajuan Izin Online:**
    -   Izin Trayek Angkutan.
    -   Izin ANDALALIN (Analisis Dampak Lalu Lintas).
    -   Izin Operasi Angkutan Sewa/Pariwisata.
-   **Dashboard Pemohon:** Memantau status pengajuan izin secara _real-time_ (Menunggu Verifikasi, Disetujui, Ditolak).
-   **Upload Dokumen:** Fitur unggah berkas persyaratan (KTP, STNK, KIR, dll).
-   **Verifikasi Berkas (Admin):** Validasi dokumen yang masuk oleh petugas.
-   **Cetak Izin Digital:** Pembuatan surat izin otomatis dalam format PDF dengan QR Code.
-   **Laporan & Statistik:** Rekapitulasi data perizinan.

## 🛠 Teknologi

Aplikasi ini dibangun menggunakan teknologi berikut:

-   **Bahasa Pemrograman:** [PHP]
-   **Framework:** [Laravel]
-   **Database:** [MySQL/PostgreSQL]
-   **Frontend:** [Bootstrap]
-   **Server:** [Apache]

## ⚙️ Prasyarat

Sebelum menginstal, pastikan sistem Anda memiliki:

1.  Web Server (XAMPP/Laragon/WAMP) atau Docker.
2.  PHP versi [7.4 / 8.x].
3.  Composer (jika menggunakan framework PHP).
4.  Database MySQL/MariaDB.
5.  Git.

## 🚀 Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di lingkungan lokal (Localhost):

1.  **Clone Repositori**

    ```bash
    git clone [https://github.com/YoKYa/Dishub-Lamongan.git](https://github.com/YoKYa/Dishub-Lamongan.git)
    cd Dishub-Lamongan
    ```

2.  **Instal Dependensi** (Sesuaikan dengan framework)

    ```bash
    composer install
    # atau
    npm install
    ```

3.  **Konfigurasi Environment**
    Salin file konfigurasi contoh dan sesuaikan dengan database lokal Anda.

    ```bash
    cp .env.example .env
    ```

    Buka file `.env` dan atur detail database:

    ```env
    DB_DATABASE=nama_database_anda
    DB_USERNAME=root
    DB_PASSWORD=
    ```

4.  **Generate Key**

    ```bash
    php artisan key:generate
    ```

5.  **Migrasi Database**
    Impor file SQL yang tersedia di folder `database/` atau jalankan migrasi:

    ```bash
    php artisan migrate --seed
    ```

6.  **Jalankan Server**
    ```bash
    npm run dev
    # atau akses melalui http://dishub-lamongan.test
    ```

## 🖥️ Penggunaan

1.  Buka browser dan akses alamat lokal proyek.
2.  **Akun Demo (Default):**
    -   **Admin:**
        -   Ganti Role ke `admin`
    -   **User:**
        -   Dapat melakukan registrasi mandiri di halaman utama.

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin memperbaiki _bug_ atau menambahkan fitur:

1.  Fork repositori ini.
2.  Buat branch fitur baru (`git checkout -b fitur-keren`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4.  Push ke branch (`git push origin fitur-keren`).
5.  Buat Pull Request.

## 📄 Lisensi

MIT License.

---

_Dibuat dengan ❤️ untuk kemajuan Kabupaten Lamongan._
