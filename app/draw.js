/* DataNusa — gambar chart di canvas, tanpa library apa pun.
   Dua bentuk saja: batang dan garis. Toggle di halaman memanggil ulang
   fungsi yang sama dengan bentuk berbeda, jadi keduanya selalu konsisten. */

var INK = "#14201b";
var PINE = "#0f3d2e";
var AMBER = "#e8a317";
var FAINT = "#d8cfbc";
var GRID = "#e6dfd0";

function setupCanvas(canvas) {
  var ratio = window.devicePixelRatio || 1;
  var w = canvas.clientWidth || 640;
  var h = canvas.clientHeight || 260;
  canvas.width = Math.round(w * ratio);
  canvas.height = Math.round(h * ratio);
  var ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx: ctx, w: w, h: h };
}

function chartFrame(ctx, w, h, max) {
  var padL = 44, padB = 30, padT = 14, padR = 10;
  var plotW = w - padL - padR;
  var plotH = h - padT - padB;
  ctx.strokeStyle = GRID;
  ctx.fillStyle = "#6b7268";
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.lineWidth = 1;
  var steps = 4;
  for (var i = 0; i <= steps; i++) {
    var v = (max * i) / steps;
    var y = padT + plotH - (plotH * i) / steps;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();
    ctx.fillText(idNum(v, v < 10 ? 1 : 0), padL - 8, y + 4);
  }
  return { padL: padL, padB: padB, padT: padT, plotW: plotW, plotH: plotH };
}

function seriesMax(series) {
  var m = 0;
  for (var i = 0; i < series.length; i++) if (series[i].value > m) m = series[i].value;
  return m * 1.15;
}

function drawBars(canvas, series) {
  var s = setupCanvas(canvas);
  var ctx = s.ctx;
  var max = seriesMax(series);
  var f = chartFrame(ctx, s.w, s.h, max);
  var slot = f.plotW / series.length;
  var barW = Math.min(64, slot * 0.55);
  ctx.textAlign = "center";
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var barH = (f.plotH * item.value) / max;
    var x = f.padL + slot * i + (slot - barW) / 2;
    var y = f.padT + f.plotH - barH;
    ctx.fillStyle = i === series.length - 1 ? AMBER : PINE;
    ctx.fillRect(x, y, barW, barH);
    ctx.fillStyle = INK;
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.fillText(idNum(item.value, 2), x + barW / 2, y - 8);
    ctx.fillStyle = "#3c453d";
    ctx.font = "12px system-ui, sans-serif";
    ctx.fillText(item.year || item.label, x + barW / 2, s.h - 10);
  }
}

function drawLine(canvas, series) {
  var s = setupCanvas(canvas);
  var ctx = s.ctx;
  var max = seriesMax(series);
  var min = 0;
  for (var i = 0; i < series.length; i++) if (series[i].value < min) min = series[i].value;
  var span = max - min;
  var f = chartFrame(ctx, s.w, s.h, max);
  function px(i) {
    return f.padL + (f.plotW * i) / (series.length - 1 || 1);
  }
  function py(v) {
    return f.padT + f.plotH - (f.plotH * (v - min)) / span;
  }
  ctx.strokeStyle = PINE;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (var i = 0; i < series.length; i++) {
    if (i === 0) ctx.moveTo(px(i), py(series[i].value));
    else ctx.lineTo(px(i), py(series[i].value));
  }
  ctx.stroke();
  ctx.textAlign = "center";
  for (var j = 0; j < series.length; j++) {
    var item = series[j];
    ctx.fillStyle = j === series.length - 1 ? AMBER : PINE;
    ctx.beginPath();
    ctx.arc(px(j), py(item.value), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.fillText(idNum(item.value, 2), px(j), py(item.value) - 14);
    ctx.fillStyle = "#3c453d";
    ctx.font = "12px system-ui, sans-serif";
    ctx.fillText(item.year || item.label, px(j), s.h - 10);
  }
}

/* Gambar chart ke canvas berdasarkan bentuk yang dipilih pengguna. */
function paintChart(canvasId, series, shape) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (shape === "garis") drawLine(canvas, series);
  else drawBars(canvas, series);
}
