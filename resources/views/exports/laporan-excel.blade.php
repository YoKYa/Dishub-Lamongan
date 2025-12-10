<h3>Laporan Arsip Perizinan</h3>
<p>Bulan: {{ $bulan }} {{ $tahun }}</p>
<table width="100%" border="1" cellspacing="0" cellpadding="4">
    <tr style="font-weight:bold;">
        <td>No Reg</td>
        <td>Pemohon</td>
        <td>Jenis</td>
        <td>Status</td>
        <td>Tanggal</td>
    </tr>

    @foreach($arsip as $a)
    <tr>
        <td>{{ $a['reg'] }}</td>
        <td>{{ $a['pemohon'] }}</td>
        <td>{{ $a['jenis'] }}</td>
        <td>{{ $a['status'] }}</td>
        <td>{{ $a['tgl'] }}</td>
    </tr>
    @endforeach
</table>
