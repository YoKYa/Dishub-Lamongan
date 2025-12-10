<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            margin: 0;
            padding: 25px 40px;
            color: #000;
        }

        .center { text-align: center; }
        .bold { font-weight: bold; }
        .underline { text-decoration: underline; }

        .kop {
            text-align: center;
            margin-bottom: 5px;
        }

        .kop h3, .kop h2 {
            margin: 0;
            padding: 0;
        }

        /* Garis double */
        .double-line {
            border-bottom: 3px double #000;
            margin-top: 8px;
            margin-bottom: 25px;
        }

        /* TABEL DATA */
        .info-table {
            margin-left: 25px;
            margin-bottom: 25px;
            width: 90%;
        }
        .info-table td {
            padding: 4px 0;
            vertical-align: top;
        }

        /* BOX KETERANGAN TEKNIS */
        .tech-box {
            background: #fff8e6;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e5cf94;
            margin-left: 15px;
            width: 90%;
            font-weight: bold;
        }

        /* FOOTER TTD */
        .footer {
            margin-top: 45px;
            text-align: center;
        }

        .qr-area {
            text-align: center;
            margin-top: 40px;
            font-size: 11px;
        }

        .qr-box {
            width: 110px;
            height: 110px;
            border: 1px solid #000;
            margin: 0 auto 8px auto;
        }
    </style>
</head>

<body>

    <!-- KOP SURAT -->
    <div class="kop">
        <img src="{{ public_path('assets/images/logo_dishub.png') }}" height="60" style="margin-bottom:10px;">
        <h3 class="bold">PEMERINTAH KABUPATEN LAMONGAN</h3>
        <h2 class="bold">DINAS PERHUBUNGAN</h2>
        <div style="font-size:12px; margin-top:4px;">
            JL. JAKSA AGUNG SUPRAPTO No. XX, TUMENGGUNGAN, KEC. LAMONGAN
        </div>
    </div>

    <div class="double-line"></div>

    <!-- JUDUL SURAT -->
    <div class="center">
        <h3 class="bold underline" style="margin-bottom:3px;">
            {{ strtoupper($surat['judul']) }}
        </h3>
        <p class="bold" style="margin-top:0;">
            Nomor: {{ $surat['nomor'] }}
        </p>
    </div>

    <p>
        Kepala Dinas Perhubungan Kabupaten Lamongan memberikan izin kepada:
    </p>

    <!-- INFORMASI PEMOHON -->
    <table class="info-table">
        <tr>
            <td width="150"><b>Nama Perusahaan</b></td>
            <td width="10">:</td>
            <td>{{ $surat['usaha'] }}</td>
        </tr>

        <tr>
            <td><b>Penanggung Jawab</b></td>
            <td>:</td>
            <td>{{ $surat['nama'] }}</td>
        </tr>

        <tr>
            <td><b>Kendaraan</b></td>
            <td>:</td>
            <td>{{ $surat['objek']['value'] }}</td>
        </tr>
    </table>

    <p class="bold">Keterangan Teknis:</p>

    <!-- BOX KETERANGAN -->
<div class="tech-box">
    <ul style="margin:0; padding-left:15px; list-style: none;">
        @foreach ($surat['detail'] as $d)
            <li><b>{{ $d['label'] ?? $d['name'] }}</b>: {{ $d['value'] }}</li>
        @endforeach
    </ul>
</div>


    <p style="margin-top:25px;">
        Izin ini berlaku selama <b>5 (lima) tahun</b> sejak tanggal diterbitkan, dengan kewajiban melakukan daftar ulang setiap tahun.
    </p>

    <!-- FOOTER + TTD -->
    <div class="footer">
        <p>Ditetapkan di: <b>Lamongan</b></p>
        <p>Pada Tanggal: <b>{{ $surat['tanggal'] }}</b></p>

        <br><br><br>

        <p class="bold">KEPALA DINAS PERHUBUNGAN</p>
        <p class="bold underline" style="margin-top:10px;">
            Drs. HERU WIDODO, M.M.
        </p>
        <p>NIP. 19700101 199003 1 001</p>
    </div>

    <!-- QR-CODE AREA -->
    {{-- <div class="qr-area">
        <div class="qr-box">

            @if(isset($surat['qr']))
                <img src="data:image/png;base64, {{ $surat['qr'] }}" width="110" height="110">
            @endif
        </div>
        Dokumen ini sah dan ditandatangani secara elektronik.
    </div> --}}

</body>
</html>
