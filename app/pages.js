/* DataNusa — halaman-halaman situs.
   Satu fungsi render per halaman. Setiap halaman menampilkan angka besar
   yang bisa dibaca sekilas, penjelasan singkat cara membacanya, satu chart,
   dan catatan sumber lengkap dengan tanggal rilis. */

var PAGE_STATE = { shape: "batang", provSort: "pop", provDir: -1, provQuery: "" };

function sourceLine(text) {
  return '<p class="source">Sumber: ' + text + '.</p>';
}

function statBlock(value, unit, caption) {
  return '<div class="stat"><div class="stat-value">' + value +
    '</div><div class="stat-unit">' + unit + '</div><div class="stat-cap">' +
    caption + '</div></div>';
}

function chartBox(canvasId, title, hint) {
  return '<div class="chart-wrap"><div class="chart-head"><h3>' + title +
    '</h3><div class="toggle" data-canvas="' + canvasId +
    '"><button type="button" data-shape="batang" class="on">Batang</button>' +
    '<button type="button" data-shape="garis">Garis</button></div></div>' +
    '<canvas id="' + canvasId + '" class="chart"></canvas>' +
    '<p class="hint">' + hint + '</p></div>';
}

function wireToggles(root, series) {
  var groups = root.querySelectorAll(".toggle");
  for (var i = 0; i < groups.length; i++) {
    (function (group) {
      var buttons = group.querySelectorAll("button");
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener("click", function () {
          for (var k = 0; k < buttons.length; k++) buttons[k].classList.remove("on");
          this.classList.add("on");
          PAGE_STATE.shape = this.getAttribute("data-shape");
          paintChart(group.getAttribute("data-canvas"), series, PAGE_STATE.shape);
        });
      }
    })(groups[i]);
  }
}

function renderHome(root) {
  var cards = "";
  for (var i = 0; i < CARDS.length; i++) {
    var c = CARDS[i];
    cards += '<a class="card" href="#/' + c.route + '" data-search="' +
      (c.title + " " + c.line + " " + c.big).toLowerCase() + '">' +
      '<div class="card-name">' + c.title + '</div>' +
      '<div class="card-big">' + c.big + ' <span>' + c.unit + '</span></div>' +
      '<div class="card-line">' + c.line + '</div>' +
      '<div class="card-src">' + c.source + '</div></a>';
  }
  var fresh = "";
  for (var f = 0; f < FRESH.length; f++) {
    fresh += '<div class="fresh-item"><b>' + FRESH[f].value + '</b><span>' +
      FRESH[f].label + '</span><i>' + FRESH[f].note + '</i></div>';
  }
  root.innerHTML =
    '<section class="hero"><p class="kicker">Statistik Indonesia · Data resmi BPS</p>' +
    '<h1>Indonesia dalam angka, <span>tanpa tebak-tebakan.</span></h1>' +
    '<p class="lede">Enam indikator utama — penduduk, ekonomi, harga, kerja, ' +
    'kemiskinan, dan pembangunan manusia — lengkap dengan sumber, tahun data, ' +
    'dan tanggal rilis. Semua angka di situs ini diverifikasi pada ' +
    FIGURES.verifiedOn + '.</p>' +
    '<div class="hero-stats">' +
    statBlock("284,67", "juta jiwa", "Penduduk, SUPAS 2025") +
    statBlock("5,11%", "tumbuh 2025", "Ekonomi (c-to-c)") +
    statBlock("75,90", "IPM 2025", "Kategori Tinggi") +
    '</div></section>' +
    '<section class="fresh"><h2>Terbaru yang sudah rilis</h2><div class="fresh-row">' +
    fresh + '</div></section>' +
    '<section class="search-row"><label for="q">Cari indikator</label>' +
    '<input id="q" type="search" placeholder="Contoh: inflasi, kemiskinan, IPM…" autocomplete="off">' +
    '<p class="hint">Ketik untuk menyaring enam kartu di bawah ini.</p></section>' +
    '<section class="cards" id="cards">' + cards + '</section>' +
    chartBox("home-chart", "Pertumbuhan ekonomi 2024-2025",
      "PDB tumbuh 5,11% pada 2025, lebih tinggi dari 5,03% pada 2024.") +
    '<section class="note"><h2>Cara membaca situs ini</h2>' +
    '<p>Setiap halaman dibuka dengan angka utamanya, lalu penjelasan singkat, ' +
    'lalu chart. Di bawah setiap angka selalu ada sumber dan tanggal rilisnya. ' +
    'Kalau sebuah angka belum ada rilis resminya, situs ini tidak menampilkannya.</p></section>';
  var input = document.getElementById("q");
  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    var items = document.querySelectorAll("#cards .card");
    for (var i = 0; i < items.length; i++) {
      var hit = items[i].getAttribute("data-search").indexOf(q) !== -1;
      items[i].style.display = q === "" || hit ? "" : "none";
    }
  });
  paintChart("home-chart", SERIES.growth, PAGE_STATE.shape);
  wireToggles(root, SERIES.growth);
}

function renderPenduduk(root) {
  var p = FIGURES.population;
  root.innerHTML =
    '<section class="page"><p class="kicker">Penduduk</p>' +
    '<h1>284,67 juta jiwa tinggal di Indonesia</h1>' +
    '<p class="lede">Hasil Survei Penduduk Antar Sensus (SUPAS) 2025: pertengahan ' +
    '2025 Indonesia berisi 284,67 juta manusia, naik dari 270,20 juta pada ' +
    'Sensus Penduduk 2020.</p><div class="stats">' +
    statBlock("284,67", "juta jiwa", "Penduduk, pertengahan 2025") +
    statBlock("1,08%", "per tahun", "Laju tumbuh 2020-2025, melambat dari 1,10%") +
    statBlock("55,65%", "di Pulau Jawa", "Lebih dari separuh penduduk di satu pulau") +
    statBlock("45,05", "rasio ketergantungan", "Tiap 100 usia produktif menanggung 45 nonproduktif") +
    '</div>' +
    '<h2>Siapa penduduk Indonesia?</h2>' +
    '<ul class="facts">' +
    '<li><b>11,97%</b> penduduk berusia lanjut (60 tahun ke atas) — Indonesia menua.</li>' +
    '<li><b>24,93%</b> penduduk adalah Gen Z dan <b>24,34%</b> Milenial — dua generasi muda mendominasi.</li>' +
    '<li><b>Provinsi terbanyak:</b> Jawa Barat, 50.942.801 jiwa. <b>Paling sedikit:</b> Papua Selatan, 550.308 jiwa.</li>' +
    '<li><b>Pertumbuhan melambat:</b> 1,08% per tahun, turun dari 1,10% pada periode sensus sebelumnya.</li>' +
    '</ul>' +
    chartBox("pop-chart", "Penduduk lima provinsi teratas (juta jiwa)",
      "Tiga provinsi teratas semuanya di Pulau Jawa.") +
    sourceLine(p.source) + '</section>';
  var popTop = [
    { label: "Jabar", value: 50.94 }, { label: "Jatim", value: 42.11 },
    { label: "Jateng", value: 38.26 }, { label: "Sumut", value: 15.80 },
    { label: "Kalbar", value: 5.77 }
  ];
  paintChart("pop-chart", popTop, PAGE_STATE.shape);
  wireToggles(root, popTop);
}

function renderEkonomi(root) {
  var e = FIGURES.economy;
  root.innerHTML =
    '<section class="page"><p class="kicker">Ekonomi</p>' +
    '<h1>Ekonomi tumbuh 5,11% sepanjang 2025</h1>' +
    '<p class="lede">Perekonomian Indonesia tumbuh 5,11% (c-to-c) pada 2025 — lebih ' +
    'tinggi dari 5,03% pada 2024. Triwulan IV 2025 menjadi triwulan terkuat ' +
    'sejak pandemi, tumbuh 5,39% (yoy).</p><div class="stats">' +
    statBlock("5,11%", "tumbuh 2025", "Kumulatif, c-to-c") +
    statBlock("Rp23.821 T", "PDB 2025", "ADHB: Rp23.821,1 triliun") +
    statBlock("Rp13.580 T", "PDB riil", "ADHK: Rp13.580,5 triliun") +
    statBlock("Rp83,7 jt", "per kapita", "Setara USD 5.083,4 per tahun") +
    '</div>' +
    '<h2>Apa artinya?</h2>' +
    '<ul class="facts">' +
    '<li><b>Pertumbuhan kumulatif 5,11%</b> berarti seluruh aktivitas ekonomi 2025 ' +
    'lebih besar 5,11% dibanding 2024, setelah memperhitungkan harga.</li>' +
    '<li><b>PDB per kapita Rp83,7 juta</b> adalah pembagian sederhana PDB dengan ' +
    'jumlah penduduk — bukan pendapatan yang diterima tiap orang.</li>' +
    '<li><b>Triwulan IV tumbuh 5,39%</b>, capaian triwulan IV tertinggi sejak pandemi Covid-19.</li>' +
    '</ul>' +
    chartBox("eco-chart", "Pertumbuhan ekonomi tahunan (persen)",
      "Dua tahun terakhir: 5,03% lalu 5,11%.") +
    sourceLine(e.source) + '</section>';
  paintChart("eco-chart", SERIES.growth, PAGE_STATE.shape);
  wireToggles(root, SERIES.growth);
}

function renderHarga(root) {
  var h = FIGURES.prices;
  root.innerHTML =
    '<section class="page"><p class="kicker">Harga</p>' +
    '<h1>Inflasi Desember 2025: 2,92% setahun</h1>' +
    '<p class="lede">Indeks Harga Konsumen naik dari 106,80 (Desember 2024) menjadi ' +
    '109,92 (Desember 2025). Inflasi tetap dalam sasaran Bank Indonesia ' +
    '2,5 ± 1 persen.</p><div class="stats">' +
    statBlock("2,92%", "yoy Des 2025", "Inflasi umum tahunan") +
    statBlock("0,64%", "per bulan", "Inflasi bulanan Desember 2025") +
    statBlock("2,38%", "inflasi inti", "Di luar pangan bergejolak & harga diatur") +
    statBlock("6,21%", "pangan bergejolak", "Penyumbang utama: emas dan cabai") +
    '</div>' +
    '<h2>Dari mana inflasi datang?</h2>' +
    '<ul class="facts">' +
    '<li><b>Makanan, minuman, dan tembakau</b> naik 4,58% setahun, dengan andil 1,33 poin.</li>' +
    '<li><b>Harga yang diatur pemerintah</b> naik 1,93% — lebih rendah dari komponen lain.</li>' +
    '<li><b>Angka terbaru:</b> inflasi Oktober 2026 tercatat 3,23% (yoy), rilis BPS 2 November 2026.</li>' +
    '</ul>' +
    chartBox("price-chart", "Inflasi menurut komponen, Des 2025 (persen yoy)",
      "Pangan bergejolak jauh di atas inflasi umum.") +
    sourceLine(h.source) + '</section>';
  paintChart("price-chart", SERIES.priceParts, PAGE_STATE.shape);
  wireToggles(root, SERIES.priceParts);
}

function renderKerja(root) {
  var l = FIGURES.labour;
  root.innerHTML =
    '<section class="page"><p class="kicker">Kerja</p>' +
    '<h1>Pengangguran terbuka 4,85%</h1>' +
    '<p class="lede">Pada Agustus 2025, 4,85% angkatan kerja menganggur — turun dari ' +
    '4,91% setahun sebelumnya. Angkatan kerja mencapai 154,00 juta orang, ' +
    'dan 146,54 juta di antaranya bekerja.</p><div class="stats">' +
    statBlock("4,85%", "TPT Agu 2025", "Turun 0,06 poin dari Agu 2024") +
    statBlock("154,00 jt", "angkatan kerja", "Penduduk usia kerja yang bekerja + menganggur") +
    statBlock("146,54 jt", "bekerja", "Bertambah 1,90 jt dalam setahun") +
    statBlock("4,75%", "TPT Agu 2026", "Angka terbaru, terus turun") +
    '</div>' +
    '<h2>Apa itu TPT?</h2>' +
    '<p>Tingkat Pengangguran Terbuka (TPT) adalah persentase penganggur terhadap ' +
    'angkatan kerja. Seseorang dihitung menganggur bila tidak bekerja, sedang ' +
    'mencari pekerjaan, atau bersedia bekerja. Pertanian, kehutanan, dan ' +
    'perikanan menyerap tambahan pekerja terbanyak: +0,49 juta orang.</p>' +
    chartBox("work-chart", "TPT Agustus, tiga tahun terakhir (persen)",
      "Tren menurun: 4,91% lalu 4,85% lalu 4,75%.") +
    sourceLine(l.source) + '</section>';
  paintChart("work-chart", SERIES.tpt, PAGE_STATE.shape);
  wireToggles(root, SERIES.tpt);
}

function renderKemiskinan(root) {
  var k = FIGURES.poverty;
  root.innerHTML =
    '<section class="page"><p class="kicker">Kemiskinan</p>' +
    '<h1>8,47% penduduk hidup di bawah garis kemiskinan</h1>' +
    '<p class="lede">Maret 2025: 23,85 juta jiwa (8,47%) hidup di bawah garis kemiskinan — ' +
    'turun 0,21 juta dari September 2024. Ini tingkat terendah dalam sejarah ' +
    'survei BPS.</p><div class="stats">' +
    statBlock("8,47%", "Maret 2025", "Turun dari 8,57% (Sep 2024)") +
    statBlock("23,85 jt", "jiwa miskin", "Berkurang 210 ribu orang") +
    statBlock("Rp609.160", "per kapita/bulan", "Garis kemiskinan nasional") +
    statBlock("0,85%", "ekstrem", "Kemiskinan ekstrem, dari 0,99%") +
    '</div>' +
    '<h2>Kota dan desa tidak sama</h2>' +
    '<ul class="facts">' +
    '<li><b>Perkotaan 6,73%</b>, naik tipis dari 6,66% — jumlah penduduk miskin kota justru bertambah 220 ribu orang.</li>' +
    '<li><b>Perdesaan 11,03%</b> — hampir dua kali lipat kota.</li>' +
    '<li><b>Garis kemiskinan Rp609.160</b> per kapita per bulan, sekitar Rp20.305 per hari, untuk kebutuhan makanan (2.100 kkal) dan nonmakanan.</li>' +
    '<li><b>Angka terbaru:</b> September 2025 turun lagi ke 8,25% (23,36 jt jiwa); garis kemiskinan naik ke Rp641.443; rasio gini 0,375 menjadi 0,363.</li>' +
    '</ul>' +
    chartBox("poor-chart", "Tingkat kemiskinan (persen)",
      "Sep 2024: 8,57% · Mar 2025: 8,47% · Sep 2025: 8,25%.") +
    sourceLine(k.source) + '</section>';
  paintChart("poor-chart", SERIES.poverty, PAGE_STATE.shape);
  wireToggles(root, SERIES.poverty);
}

function renderIpm(root) {
  var d = FIGURES.hdi;
  root.innerHTML =
    '<section class="page"><p class="kicker">Pembangunan Manusia</p>' +
    '<h1>IPM 75,90 — kategori Tinggi</h1>' +
    '<p class="lede">Indeks Pembangunan Manusia Indonesia 2025 mencapai 75,90, naik 0,88 ' +
    'poin dari 75,02 pada 2024. Kenaikan didorong ketiga komponennya sekaligus: ' +
    'kesehatan, pendidikan, dan standar hidup.</p><div class="stats">' +
    statBlock("75,90", "IPM 2025", "Naik 0,88 poin dari 75,02") +
    statBlock("74,47", "tahun", "Umur harapan hidup saat lahir") +
    statBlock("13,30", "tahun", "Harapan lama sekolah") +
    statBlock("9,07", "tahun", "Rata-rata lama sekolah (25 thn ke atas)") +
    '</div>' +
    '<h2>Jarak antarprovinsi masih lebar</h2>' +
    '<ul class="facts">' +
    '<li><b>Tertinggi:</b> DKI Jakarta, 85,05. <b>Terendah:</b> Papua Pegunungan, 54,91 — selisih 30,14 poin.</li>' +
    '<li><b>Pengeluaran riil</b> per kapita yang disesuaikan mencapai Rp12,80 juta per tahun, naik sekitar Rp460 ribu.</li>' +
    '<li><b>Sejak 2020</b> IPM naik rata-rata 0,83% per tahun, dari 72,81 menjadi 75,90.</li>' +
    '</ul>' +
    chartBox("hdi-chart", "IPM Indonesia (indeks)",
      "2020: 72,81 · 2024: 75,02 · 2025: 75,90.") +
    sourceLine(d.source) + '</section>';
  paintChart("hdi-chart", SERIES.hdi, PAGE_STATE.shape);
  wireToggles(root, SERIES.hdi);
}

function provinceRows() {
  var rows = PROVINCES.slice();
  var q = PAGE_STATE.provQuery;
  if (q) {
    rows = rows.filter(function (r) {
      return r.name.toLowerCase().indexOf(q) !== -1;
    });
  }
  rows.sort(function (a, b) {
    var d = PAGE_STATE.provDir;
    if (PAGE_STATE.provSort === "name") return d * (a.name < b.name ? -1 : 1);
    return d * (a.pop - b.pop);
  });
  var out = "";
  for (var i = 0; i < rows.length; i++) {
    var share = (rows[i].pop / FIGURES.population.totalExact) * 100;
    out += "<tr><td>" + rows[i].name + "</td><td class=\"num\">" +
      idInt(rows[i].pop) + "</td><td class=\"num\">" + idNum(share, 2) +
      "%</td></tr>";
  }
  return out;
}

function renderProvinsi(root) {
  root.innerHTML =
    '<section class="page"><p class="kicker">Provinsi</p>' +
    '<h1>Di mana 284,67 juta penduduk tinggal?</h1>' +
    '<p class="lede">Tabel di bawah memakai data SUPAS 2025 dan menampilkan provinsi ' +
    'dengan penduduk terbanyak dan paling sedikit — sembilan baris yang ' +
    'terverifikasi. Klik judul kolom untuk mengurutkan, ketik untuk mencari.</p>' +
    '<div class="stats">' +
    statBlock("50.942.801", "jiwa", "Jawa Barat — provinsi terpadat") +
    statBlock("550.308", "jiwa", "Papua Selatan — paling sedikit") +
    statBlock("85,05 / 54,91", "IPM", "DKI Jakarta tertinggi, Papua Pegunungan terendah") +
    statBlock("3,72%", "kemiskinan", "Bali terendah, Maret 2025") +
    '</div>' +
    '<div class="search-row"><label for="pq">Cari provinsi</label>' +
    '<input id="pq" type="search" placeholder="Contoh: Jawa, Papua, Kalimantan…" autocomplete="off"></div>' +
    '<table class="prov"><thead><tr>' +
    '<th data-sort="name">Provinsi ↕</th><th data-sort="pop">Penduduk (jiwa) ↕</th>' +
    '<th>Pangsa nasional</th></tr></thead><tbody id="prov-body">' +
    provinceRows() + '</tbody></table>' +
    '<p class="hint">Menampilkan 9 dari 38 provinsi: empat teratas, satu tengah ' +
    '(Kalimantan Barat), dan empat terbawah. Baris lain tidak ditampilkan karena ' +
    'angkanya belum terverifikasi untuk situs ini.</p>' +
    chartBox("prov-chart", "Penduduk provinsi teratas (juta jiwa)",
      "Tiga provinsi di Jawa menampung lebih dari 130 juta jiwa.") +
    sourceLine(PROVINCE_SOURCE + ". IPM provinsi: BPS, 5 Nov 2025. " +
      "Kemiskinan Bali: BPS, Maret 2025.") + '</section>';
  var input = document.getElementById("pq");
  input.addEventListener("input", function () {
    PAGE_STATE.provQuery = input.value.trim().toLowerCase();
    document.getElementById("prov-body").innerHTML = provinceRows();
  });
  var heads = root.querySelectorAll("th[data-sort]");
  for (var i = 0; i < heads.length; i++) {
    heads[i].addEventListener("click", function () {
      var key = this.getAttribute("data-sort");
      if (PAGE_STATE.provSort === key) PAGE_STATE.provDir *= -1;
      else { PAGE_STATE.provSort = key; PAGE_STATE.provDir = key === "name" ? 1 : -1; }
      document.getElementById("prov-body").innerHTML = provinceRows();
    });
  }
  paintChart("prov-chart", [
    { label: "Jabar", value: 50.94 }, { label: "Jatim", value: 42.11 },
    { label: "Jateng", value: 38.26 }, { label: "Sumut", value: 15.80 }
  ], PAGE_STATE.shape);
  wireToggles(root, [
    { label: "Jabar", value: 50.94 }, { label: "Jatim", value: 42.11 },
    { label: "Jateng", value: 38.26 }, { label: "Sumut", value: 15.80 }
  ]);
}

function renderSumber(root) {
  root.innerHTML =
    '<section class="page"><p class="kicker">Sumber &amp; Metode</p>' +
    '<h1>Dari mana semua angka ini?</h1>' +
    '<p class="lede">Seluruh angka di DataNusa berasal dari Badan Pusat Statistik (BPS). ' +
    'Daftar di bawah mencatat rilis persisnya, supaya setiap angka bisa ' +
    'dilacak kembali. Verifikasi terakhir: ' + FIGURES.verifiedOn + '.</p>' +
    '<ol class="sources">' +
    '<li><b>Penduduk</b> — ' + FIGURES.population.source + '.</li>' +
    '<li><b>Ekonomi</b> — ' + FIGURES.economy.source + '.</li>' +
    '<li><b>Harga</b> — ' + FIGURES.prices.source + '.</li>' +
    '<li><b>Kerja</b> — ' + FIGURES.labour.source + '.</li>' +
    '<li><b>Kemiskinan</b> — ' + FIGURES.poverty.source + '.</li>' +
    '<li><b>IPM</b> — ' + FIGURES.hdi.source + '.</li>' +
    '<li><b>Provinsi</b> — ' + PROVINCE_SOURCE + '.</li>' +
    '<li><b>Angka terbaru</b> — BPS, Perkembangan IHK Oktober 2026 (rilis 2 November 2026); ' +
    'BPS, Keadaan Ketenagakerjaan Agustus 2026; BPS, Profil Kemiskinan September 2025.</li>' +
    '</ol>' +
    '<h2>Metode</h2>' +
    '<ul class="facts">' +
    '<li>Angka persen memakai koma desimal Indonesia (contoh: 5,11%).</li>' +
    '<li>Pangsa provinsi dihitung dari jumlah penduduk SUPAS 2025 (284.667.253 jiwa).</li>' +
    '<li>Situs ini statis dan luring: tidak mengambil data dari mana pun saat dibuka.</li>' +
    '<li>DataNusa bukan situs resmi BPS dan tidak berafiliasi dengan BPS.</li>' +
    '</ul></section>';
}

var PAGES = {
  "": renderHome,
  "penduduk": renderPenduduk,
  "ekonomi": renderEkonomi,
  "harga": renderHarga,
  "kerja": renderKerja,
  "kemiskinan": renderKemiskinan,
  "ipm": renderIpm,
  "provinsi": renderProvinsi,
  "sumber": renderSumber
};
