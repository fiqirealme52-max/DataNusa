/* DataNusa — semua angka dan sumbernya.
   Setiap angka di bawah ini diambil dari rilis resmi BPS dan diverifikasi
   pada 26 November 2026. Tidak ada satu pun angka tanpa sumber dan tahun.
   Nilai tampil memakai koma desimal Indonesia; nilai hitung memakai titik. */

var FIGURES = {
  verifiedOn: "26 November 2026",
  population: {
    total: 284.67, totalUnit: "juta jiwa", totalExact: 284667253,
    growth: 1.08, growthNote: "per tahun, 2020-2025",
    javaShare: 55.65, dependency: 45.05, elderly: 11.97,
    genZ: 24.93, millennial: 24.34,
    source: "BPS, Hasil Survei Penduduk Antar Sensus (SUPAS) 2025, BRS No. 51/05/Th. XXIX, 5 Mei 2026"
  },
  economy: {
    growth: 5.11, growthPrev: 5.03, growthUnit: "persen (c-to-c)",
    quarter4: 5.39, nominal: 23821.1, nominalUnit: "Rp triliun (ADHB)",
    real: 13580.5, realUnit: "Rp triliun (ADHK)",
    perCapita: 83.7, perCapitaUsd: 5083.4,
    source: "BPS, Pertumbuhan Ekonomi Indonesia Triwulan IV 2025, BRS No. 18/02/Th. XXIX, 5 Februari 2026"
  },
  prices: {
    headline: 2.92, headlineUnit: "persen yoy, Desember 2025",
    cpiNow: 109.92, cpiThen: 106.80, cpiBase: "2022 = 100",
    monthly: 0.64, core: 2.38, volatile: 6.21, administered: 1.93,
    target: "2,5 ± 1 persen",
    source: "BPS, Perkembangan Indeks Harga Konsumen Desember 2025 (rilis Januari 2026); Bank Indonesia, 5 Januari 2026"
  },
  labour: {
    tpt: 4.85, tptPrev: 4.91, tptUnit: "persen, Agustus 2025",
    force: 154.00, forceUnit: "juta orang angkatan kerja",
    employed: 146.54, employedUnit: "juta orang bekerja",
    added: 1.90, addedUnit: "juta pekerja baru dalam setahun",
    source: "BPS, Keadaan Ketenagakerjaan Indonesia Agustus 2025"
  },
  poverty: {
    rate: 8.47, ratePrev: 8.57, rateUnit: "persen, Maret 2025",
    people: 23.85, peopleUnit: "juta jiwa",
    urban: 6.73, rural: 11.03, line: 609160,
    lineUnit: "rupiah per kapita per bulan",
    extreme: 0.85, extremeUnit: "persen, kemiskinan ekstrem",
    source: "BPS, Profil Kemiskinan Maret 2025, Susenas Maret 2025 (rilis 25 Juli 2025)"
  },
  hdi: {
    value: 75.90, prev: 75.02, delta: 0.88, level: "Tinggi",
    life: 74.47, lifeUnit: "tahun umur harapan hidup",
    expectedSchool: 13.30, meanSchool: 9.07, spending: 12.80,
    spendingUnit: "Rp juta per kapita per tahun",
    top: "DKI Jakarta", topValue: 85.05,
    bottom: "Papua Pegunungan", bottomValue: 54.91,
    value2020: 72.81,
    source: "BPS, Indeks Pembangunan Manusia (IPM) 2025, BRS No. 104/11/Th. XXVIII, 5 November 2025"
  }
};

/* Angka terbaru (2026) yang sudah rilis saat situs ini disusun. */
var FRESH = [
  { label: "Inflasi Oktober 2026", value: "3,23%", note: "yoy · BPS, rilis 2 Nov 2026" },
  { label: "TPT Agustus 2026", value: "4,75%", note: "turun dari 4,85% · BPS" },
  { label: "Kemiskinan September 2025", value: "8,25%", note: "23,36 jt jiwa · BPS" }
];

/* Enam kartu utama di beranda. Urutan = urutan halaman di navigasi. */
var CARDS = [
  { route: "penduduk", title: "Penduduk", big: "284,67", unit: "juta jiwa",
    line: "SUPAS 2025 · tumbuh 1,08% per tahun",
    source: "BPS, SUPAS 2025" },
  { route: "ekonomi", title: "Ekonomi", big: "5,11%", unit: "tumbuh 2025",
    line: "PDB Rp23.821,1 T · per kapita Rp83,7 jt",
    source: "BPS, 5 Feb 2026" },
  { route: "harga", title: "Harga", big: "2,92%", unit: "inflasi Des 2025",
    line: "IHK 109,92 · dalam sasaran 2,5 ± 1%",
    source: "BPS, Jan 2026" },
  { route: "kerja", title: "Kerja", big: "4,85%", unit: "TPT Agu 2025",
    line: "146,54 jt bekerja dari 154,00 jt angkatan kerja",
    source: "BPS, Agu 2025" },
  { route: "kemiskinan", title: "Kemiskinan", big: "8,47%", unit: "Maret 2025",
    line: "23,85 jt jiwa · garis kemiskinan Rp609.160",
    source: "BPS, Susenas Mar 2025" },
  { route: "ipm", title: "IPM", big: "75,90", unit: "kategori Tinggi",
    line: "Naik 0,88 poin · umur harapan hidup 74,47 tahun",
    source: "BPS, 5 Nov 2025" }
];

/* Provinsi: hanya baris yang terverifikasi dari SUPAS 2025 (BPS).
   Tabel di halaman Provinsi menampilkan baris-baris ini saja, dengan
   catatan jujur bahwa ini provinsi teratas dan terbawah, bukan 38 baris. */
var PROVINCES = [
  { name: "Jawa Barat", pop: 50942801 },
  { name: "Jawa Timur", pop: 42111119 },
  { name: "Jawa Tengah", pop: 38261423 },
  { name: "Sumatera Utara", pop: 15801821 },
  { name: "Kalimantan Barat", pop: 5771745 },
  { name: "Kalimantan Utara", pop: 750146 },
  { name: "Papua Barat Daya", pop: 637189 },
  { name: "Papua Barat", pop: 588374 },
  { name: "Papua Selatan", pop: 550308 }
];
var PROVINCE_SOURCE = "BPS, Jumlah Penduduk menurut Provinsi, SUPAS 2025 (total nasional 284.667.253 jiwa)";

/* Deret untuk chart — semuanya dari angka yang sudah terverifikasi di atas. */
var SERIES = {
  growth: [
    { year: "2024", value: 5.03 },
    { year: "2025", value: 5.11 }
  ],
  priceParts: [
    { label: "Umum", value: 2.92 },
    { label: "Inti", value: 2.38 },
    { label: "Bergejolak", value: 6.21 },
    { label: "Diatur pem.", value: 1.93 }
  ],
  tpt: [
    { year: "Agu 2024", value: 4.91 },
    { year: "Agu 2025", value: 4.85 },
    { year: "Agu 2026", value: 4.75 }
  ],
  poverty: [
    { year: "Sep 2024", value: 8.57 },
    { year: "Mar 2025", value: 8.47 },
    { year: "Sep 2025", value: 8.25 }
  ],
  hdi: [
    { year: "2020", value: 72.81 },
    { year: "2024", value: 75.02 },
    { year: "2025", value: 75.90 }
  ]
};

/* Format angka gaya Indonesia: pemisah ribuan titik, desimal koma. */
function idNum(n, decimals) {
  var fixed = n.toFixed(decimals === undefined ? 2 : decimals);
  var parts = fixed.split(".");
  var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.length > 1 ? whole + "," + parts[1] : whole;
}
function idInt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
