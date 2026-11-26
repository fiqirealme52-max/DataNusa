[![DataNusa](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/fiqirealme52-max/DataNusa/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/fiqirealme52-max/DataNusa/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# DataNusa — Statistik Indonesia

Situs statistik Indonesia berbahasa Indonesia. Semua angka berasal dari
rilis resmi Badan Pusat Statistik (BPS) dan diverifikasi pada 26 November
2026 — tiap angka dicantumkan bersama sumber, tahun data, dan tanggal
rilisnya.

## Yang ditampilkan

Sembilan halaman, masing-masing bisa dibuka lewat tautan di navigasi:

- **Beranda** — enam indikator utama, strip angka terbaru 2026, pencarian,
  dan chart pertumbuhan ekonomi.
- **Penduduk** — 284,67 juta jiwa (SUPAS 2025), laju tumbuh 1,08% per tahun,
  55,65% tinggal di Pulau Jawa, rasio ketergantungan 45,05.
- **Ekonomi** — tumbuh 5,11% pada 2025, PDB Rp23.821,1 triliun, PDB per
  kapita Rp83,7 juta (USD 5.083,4).
- **Harga** — inflasi 2,92% (yoy, Desember 2025), IHK 109,92, inflasi inti
  2,38%, pangan bergejolak 6,21%.
- **Kerja** — TPT 4,85% (Agustus 2025), 146,54 juta orang bekerja dari
  154,00 juta angkatan kerja.
- **Kemiskinan** — 8,47% (Maret 2025), 23,85 juta jiwa, garis kemiskinan
  Rp609.160 per kapita per bulan.
- **IPM** — 75,90 (2025, kategori Tinggi), umur harapan hidup 74,47 tahun,
  DKI Jakarta 85,05 tertinggi dan Papua Pegunungan 54,91 terendah.
- **Provinsi** — tabel penduduk provinsi yang bisa dicari dan diurutkan,
  dari data SUPAS 2025.
- **Sumber & Metode** — daftar lengkap rilis BPS yang dipakai.

Setiap chart bisa diganti bentuknya (Batang/Garis), tabel provinsi bisa
diurutkan dengan mengklik judul kolom, dan pencarian di beranda menyaring
keenam kartu indikator.

## Menjalankan

Situs statis tanpa build step dan tanpa jaringan. Sajikan folder `app/`:

```sh
cd app && python3 -m http.server 8080
```

Lalu buka `http://localhost:8080/` di desktop atau HP. Semua halaman adalah
hash route (`#/ekonomi`, `#/provinsi`, …), semua chart digambar di canvas
tanpa library, dan semua kontrol berfungsi.

## Susunan file

- `app/index.html` — kerangka, navigasi, footer
- `app/style.css` — seluruh tampilan
- `app/figures.js` — semua angka beserta sumbernya
- `app/draw.js` — chart batang dan garis di canvas
- `app/pages.js` — renderer sembilan halaman
- `app/boot.js` — router hash dan penanda navigasi aktif
- `main.ts` — menyerahkan `app/` dan `screenshots/` beserta `dossier.json`
- `vendor/makefun-frontend.ts` — pustaka dossier dari kit make.fun, tidak diubah

DataNusa bukan situs resmi BPS dan tidak berafiliasi dengan BPS.
