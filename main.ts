// DataNusa — program penyerahan (entrypoint).
// Menyalin app/ dan screenshots/ dari repo ini ke direktori output, lalu
// menulis dossier.json dari hasil penyalinan itu memakai pustaka dossier
// milik kit (vendor/makefun-frontend.ts). Dijalankan dua kali oleh grader;
// kedua jalan harus menghasilkan byte yang sama.
import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

function countFiles(dir: string): number {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) total += countFiles(join(dir, entry.name));
    else total += 1;
  }
  return total;
}

function handIn(): void {
  mkdirSync(outDir, { recursive: true });
  const appSrc = join(repoRoot, "app");
  const shotsSrc = join(repoRoot, "screenshots");
  if (!existsSync(appSrc)) throw new Error("app/ tidak ditemukan di repo");
  if (!existsSync(shotsSrc)) throw new Error("screenshots/ tidak ditemukan di repo");
  cpSync(appSrc, join(outDir, "app"), { recursive: true });
  cpSync(shotsSrc, join(outDir, "screenshots"), { recursive: true });
  const dossier = buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  writeFileSync(join(outDir, "dossier.json"), dossier);
  console.log(
    "DataNusa handed in: " +
      countFiles(join(outDir, "app")) +
      " app files, " +
      countFiles(join(outDir, "screenshots")) +
      " screenshots, dossier " +
      dossier.length +
      " bytes",
  );
}

handIn();
