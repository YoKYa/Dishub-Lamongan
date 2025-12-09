<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 13px; }
        .center { text-align:center; }
        .bold { font-weight:bold; }
        .underline { text-decoration: underline; }
    </style>
</head>
<body>

<div class="center bold">
    <h3>Pemerintah Kabupaten Lamongan</h3>
    <h2>Dinas Perhubungan</h2>
</div>

<hr>

<div class="center">
    <h3 class="underline">{{ $surat['judul'] }}</h3>
    <p class="bold">Nomor: {{ $surat['nomor'] }}</p>
</div>

<p>Kepala Dinas Perhubungan Kabupaten Lamongan memberikan izin kepada:</p>

<ul>
    <li><b>Nama:</b> {{ $surat['nama'] }}</li>
    <li><b>Perusahaan:</b> {{ $surat['usaha'] }}</li>
    <li><b>{{ $surat['objek']['label'] }}:</b> {{ $surat['objek']['value'] }}</li>
</ul>

<p><b>Keterangan Teknis:</b></p>
<p>{{ $surat['detail'] }}</p>

<p>Izin ini berlaku selama 5 (lima) tahun sejak tanggal diterbitkan.</p>

<br><br>

<div class="center">
    <p>Ditetapkan di Lamongan</p>
    <p>Pada tanggal: {{ $surat['tanggal'] }}</p>

    <br><br><br>

    <p class="bold underline">Drs. HERU WIDODO, M.M.</p>
    <p>NIP. 19700101 199003 1 001</p>
</div>

</body>
</html>
