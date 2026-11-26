/* DataNusa — router hash dan kabel navigasi.
   Satu-satunya tugas file ini: membaca hash, memanggil renderer halaman
   yang cocok, menandai tautan aktif, dan menggulir ke atas. */

var NAV = [
  ["", "Beranda"], ["penduduk", "Penduduk"], ["ekonomi", "Ekonomi"],
  ["harga", "Harga"], ["kerja", "Kerja"], ["kemiskinan", "Kemiskinan"],
  ["ipm", "IPM"], ["provinsi", "Provinsi"], ["sumber", "Sumber & Metode"]
];

function currentRoute() {
  var hash = window.location.hash || "#/";
  var route = hash.replace(/^#\/?/, "").split("?")[0];
  return PAGES[route] ? route : "";
}

function markNav(route) {
  var links = document.querySelectorAll("nav a");
  for (var i = 0; i < links.length; i++) {
    var target = links[i].getAttribute("href").replace(/^#\/?/, "");
    if (target === route) links[i].setAttribute("aria-current", "page");
    else links[i].removeAttribute("aria-current");
  }
}

function showPage() {
  var route = currentRoute();
  var root = document.getElementById("app");
  PAGES[route](root);
  markNav(route);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", showPage);
document.addEventListener("DOMContentLoaded", showPage);
if (document.readyState !== "loading") showPage();
