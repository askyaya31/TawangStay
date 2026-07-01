import { writeFile } from "node:fs/promises";

const ROAD_NODES_COORD = {
  Terminal:        { lat: -7.6688, lon: 111.1195 },
  Simpang_Pasar:   { lat: -7.6695, lon: 111.1290 },
  Jalur_Grojogan:  { lat: -7.6710, lon: 111.1320 },
  Jalur_Tembus:    { lat: -7.6700, lon: 111.1305 },
  Jl_Lawu_Utara:   { lat: -7.6600, lon: 111.1260 },
  Simpang_Kramat:  { lat: -7.6645, lon: 111.1265 },
  Simpang_Beji:    { lat: -7.6640, lon: 111.1272 },
  Jl_Sekipan:      { lat: -7.6546, lon: 111.1286 },
  Jl_Pancot:       { lat: -7.6675, lon: 111.1330 },
  Jl_Nano:         { lat: -7.6698, lon: 111.1295 },
  Jl_Blumbang:     { lat: -7.6810, lon: 111.1261 },
  Gondosuli:       { lat: -7.6690, lon: 111.1410 },
  Sekipan_Tengah:  { lat: -7.6688, lon: 111.1345 },
  Kramat_Tengah:   { lat: -7.664352,  lon: 111.142549  },
  Kramat_Utara:    { lat: -7.660985,  lon: 111.145997  },
};

const GRAPH_DASAR_EDGES = [
  ["Terminal","Simpang_Pasar"],
  ["Terminal","Jl_Lawu_Utara"],
  ["Simpang_Pasar","Jalur_Grojogan"],
  ["Simpang_Pasar","Jalur_Tembus"],
  ["Jalur_Grojogan","Jalur_Tembus"],
  ["Jalur_Tembus","Sekipan_Tengah"],
  ["Jl_Lawu_Utara","Simpang_Kramat"],
  ["Jl_Lawu_Utara","Simpang_Beji"],
  ["Simpang_Kramat","Simpang_Beji"],
  ["Jl_Sekipan","Jalur_Tembus"],
  ["Jl_Sekipan","Simpang_Kramat"],
  ["Jl_Sekipan","Sekipan_Tengah"],
  ["Jl_Sekipan","Jl_Lawu_Utara"], 
  ["Jl_Pancot","Simpang_Kramat"],
  ["Jl_Pancot","Jl_Lawu_Utara"],
  ["Jl_Nano","Simpang_Pasar"],
  ["Jl_Nano","Jalur_Grojogan"],
  ["Jl_Nano","Jl_Blumbang"],
  ["Jl_Blumbang","Terminal"],
  ["Jl_Blumbang","Jalur_Tembus"],
  ["Gondosuli","Jl_Lawu_Utara"],
  ["Gondosuli","Terminal"],
  ["Jl_Lawu_Utara","Sekipan_Tengah"],
  ["Sekipan_Tengah","Bukit_Sekipan"],
  ["Simpang_Kramat","Kramat_Tengah"],
  ["Jl_Lawu_Utara","Kramat_Utara"],
  ["Jl_Lawu_Utara","Kramat_Tengah"],  
  ["Kramat_Tengah","Kramat_Utara"],
  ["Kramat_Tengah","Bukit_Sekipan"],
  ["Terminal","Kramat_Tengah"],      
  ["Terminal","Kramat_Utara"],       
  ["Terminal","Bukit_Sekipan"],     
];

const KONEKSI_NODES = {
  1: ["Simpang_Beji", "Simpang_Kramat", "Terminal"],
  2: ["Jl_Nano", "Simpang_Pasar", "Terminal", "Simpang_Beji"],
  3: ["Simpang_Beji", "Jl_Lawu_Utara", "Terminal"],
  4: ["Jl_Nano", "Simpang_Pasar", "Terminal"],
  5: ["Jl_Nano", "Simpang_Pasar"],
  6: ["Simpang_Beji", "Jl_Lawu_Utara", "Terminal", "Simpang_Pasar"],
  7: ["Bukit_Sekipan", "Sekipan_Tengah"],
  8: ["Kramat_Utara", "Jl_Lawu_Utara"],
  9: ["Kramat_Tengah", "Simpang_Kramat"],
  10: ["Kramat_Tengah", "Jl_Sekipan"],
  11: ["Kramat_Tengah", "Jl_Sekipan"],
  12: ["Kramat_Tengah", "Jl_Sekipan"],
  13: ["Kramat_Tengah", "Jl_Sekipan"],
  14: ["Jl_Blumbang", "Terminal"],
  15: ["Simpang_Beji", "Simpang_Kramat", "Terminal"],
  16: ["Jl_Pancot", "Simpang_Kramat"],
  17: ["Kramat_Tengah", "Jl_Sekipan"],
  18: ["Jl_Blumbang", "Terminal"],
  19: ["Kramat_Utara", "Gondosuli"],
  20: ["Simpang_Kramat", "Jl_Lawu_Utara", "Jl_Nano", "Simpang_Pasar", "Terminal"], 
  21: ["Jalur_Tembus", "Gondosuli"],
  22: ["Kramat_Tengah", "Jl_Sekipan"],
  23: ["Terminal", "Gondosuli", "Jl_Blumbang"],
  24: ["Sekipan_Tengah", "Jl_Sekipan"],
  25: ["Jl_Blumbang", "Terminal"],
  26: ["Bukit_Sekipan", "Kramat_Tengah"],
  27: ["Gondosuli", "Jl_Nano", "Terminal"], 
  28: ["Jl_Lawu_Utara", "Simpang_Beji", "Jl_Sekipan"],
  29: ["Jl_Lawu_Utara", "Simpang_Beji", "Jl_Sekipan"],
};

const PROPERTI_COORD = {
  1:{lat:-7.6637,lon:111.1248}, 2:{lat:-7.6641,lon:111.1272}, 3:{lat:-7.6665,lon:111.1248}, 4:{lat:-7.668,lon:111.1285}, 5:{lat:-7.664885,lon:111.1313518}, 6:{lat:-7.6695,lon:111.1268}, 7:{lat:-7.6690371,lon:111.1438578}, 8:{lat:-7.6619725,lon:111.1469784}, 9:{lat:-7.6634271,lon:111.1405778}, 10:{lat:-7.6658627,lon:111.1430862}, 11:{lat:-7.6648418,lon:111.1431418}, 12:{lat:-7.6634656,lon:111.1407279}, 13:{lat:-7.6632833,lon:111.1433643}, 14:{lat:-7.6834,lon:111.1248}, 15:{lat:-7.6635,lon:111.1255}, 16:{lat:-7.6588301,lon:111.1424162}, 17:{lat:-7.6636846,lon:111.143252}, 18:{lat:-7.6782,lon:111.1264}, 19:{lat:-7.6599967,lon:111.1450153}, 20:{lat:-7.6631,lon:111.1231}, 21:{lat:-7.6757,lon:111.1389}, 22:{lat:-7.6658991,lon:111.1436957}, 23:{lat:-7.7025,lon:111.126}, 24:{lat:-7.6609423,lon:111.1344069}, 25:{lat:-7.683,lon:111.126}, 26:{lat:-7.6685409,lon:111.1437225}, 27:{lat:-7.668,lon:111.14}, 28:{lat:-7.6558,lon:111.1298}, 29:{lat:-7.6564,lon:111.1304},
};


function validateInput() {
  const errors = [];
  const nodeNames = new Set(Object.keys(ROAD_NODES_COORD));

  for (const [a, b] of GRAPH_DASAR_EDGES) {
    if (!nodeNames.has(a)) errors.push(`GRAPH_DASAR_EDGES: node "${a}" tidak ada di ROAD_NODES_COORD`);
    if (!nodeNames.has(b)) errors.push(`GRAPH_DASAR_EDGES: node "${b}" tidak ada di ROAD_NODES_COORD`);
  }

  for (const [id, nodes] of Object.entries(KONEKSI_NODES)) {
    if (!PROPERTI_COORD[id]) errors.push(`KONEKSI_NODES: properti id ${id} tidak ada di PROPERTI_COORD`);
    if (nodes.length === 0) errors.push(`KONEKSI_NODES: properti id ${id} tidak punya node tujuan sama sekali`);
    for (const n of nodes) {
      if (!nodeNames.has(n)) errors.push(`KONEKSI_NODES[${id}]: node "${n}" tidak ada di ROAD_NODES_COORD`);
    }
  }

  if (errors.length) {
    console.error("VALIDASI GAGAL, perbaiki dulu sebelum query OSRM:\n");
    errors.forEach(e => console.error(" - " + e));
    process.exit(1);
  }
  console.error(`Validasi OK. ${GRAPH_DASAR_EDGES.length} edge graph, ${Object.keys(KONEKSI_NODES).length} properti akan di-query.\n`);
}

const DELAY_MS = 1000;    
const MAX_RETRY = 5;      
const RETRY_BACKOFF_MS = 3000;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const SUSPICIOUS_RATIO = 1.15;
const suspiciousEdges = [];

async function osrmRoute(lat1, lon1, lat2, lon2, label) {
  const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;

  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      const data = await res.json();
      if (data.code !== "Ok") throw new Error(`OSRM code=${data.code}`);
      return {
        km: +(data.routes[0].distance / 1000).toFixed(2),
        menit: +(data.routes[0].duration / 60).toFixed(1),
      };
    } catch (e) {
      const isLast = attempt === MAX_RETRY;
      console.error(`  [percobaan ${attempt}/${MAX_RETRY}] gagal untuk ${label}: ${e.message}${isLast ? " -> MENYERAH" : " -> retry..."}`);
      if (isLast) throw e;
      await sleep(RETRY_BACKOFF_MS * attempt);
    }
  }
}

async function main() {
  validateInput();

  const graphResult = {};
  const gagalGraph = [];

  console.error("=== Query GRAPH_DASAR (antar node jalan) ===");
  for (const [a, b] of GRAPH_DASAR_EDGES) {
    const ca = ROAD_NODES_COORD[a], cb = ROAD_NODES_COORD[b];
    const label = `${a} <-> ${b}`;
    try {
      const { km, menit } = await osrmRoute(ca.lat, ca.lon, cb.lat, cb.lon, label);
      if (!graphResult[a]) graphResult[a] = [];
      graphResult[a].push([b, km, menit]);
      const lurus = haversineKm(ca.lat, ca.lon, cb.lat, cb.lon);
      const ratio = km / lurus;
      const flag = ratio < SUSPICIOUS_RATIO ? "  <-- RASIO RENDAH, VERIFIKASI MANUAL" : "";
      if (ratio < SUSPICIOUS_RATIO) suspiciousEdges.push(`${label}: ${km}km jalan vs ${lurus.toFixed(2)}km lurus (rasio ${ratio.toFixed(2)})`);
      console.error(`OK   ${label}: ${km} km, ${menit} mnt${flag}`);
    } catch {
      gagalGraph.push(label);
    }
    await sleep(DELAY_MS);
  }

  const koneksiResult = {};
  const gagalKoneksi = [];

  console.error("\n=== Query KONEKSI (properti -> node jalan) ===");
  for (const [id, nodeNames] of Object.entries(KONEKSI_NODES)) {
    const pc = PROPERTI_COORD[id];
    koneksiResult[id] = [];
    for (const nodeName of nodeNames) {
      const nc = ROAD_NODES_COORD[nodeName];
      const label = `Properti ${id} <-> ${nodeName}`;
      try {
        const { km, menit } = await osrmRoute(pc.lat, pc.lon, nc.lat, nc.lon, label);
        koneksiResult[id].push([nodeName, km, menit]);
        const lurus = haversineKm(pc.lat, pc.lon, nc.lat, nc.lon);
        const ratio = km / lurus;
        const flag = ratio < SUSPICIOUS_RATIO ? "  <-- RASIO RENDAH, VERIFIKASI MANUAL" : "";
        if (ratio < SUSPICIOUS_RATIO) suspiciousEdges.push(`${label}: ${km}km jalan vs ${lurus.toFixed(2)}km lurus (rasio ${ratio.toFixed(2)})`);
        console.error(`OK   ${label}: ${km} km, ${menit} mnt${flag}`);
      } catch {
        gagalKoneksi.push(label);
      }
      await sleep(DELAY_MS);
    }
  }

  const graphJs =
    "// Auto-generated dari OSRM. Jangan diedit manual — jalankan ulang generate_graph.mjs.\n" +
    "export const GRAPH_DASAR = " + JSON.stringify(graphResult, null, 2) + ";\n";

  const koneksiJs =
    "// Auto-generated dari OSRM. Jangan diedit manual — jalankan ulang generate_graph.mjs.\n" +
    "export const KONEKSI = " + JSON.stringify(koneksiResult, null, 2).replace(/"(\d+)":/g, "$1:") + ";\n";

  await writeFile("graph_dasar.generated.js", graphJs, "utf8");
  await writeFile("koneksi.generated.js", koneksiJs, "utf8");

  console.error("\n=== SELESAI ===");
  console.error(`File ditulis: graph_dasar.generated.js, koneksi.generated.js`);

  if (gagalGraph.length || gagalKoneksi.length) {
    console.error(`\nPERINGATAN: ada edge yang GAGAL setelah ${MAX_RETRY}x percobaan — graph tidak lengkap!`);
    if (gagalGraph.length) {
      console.error(`\nGRAPH_DASAR gagal (${gagalGraph.length}):`);
      gagalGraph.forEach(l => console.error(" - " + l));
    }
    if (gagalKoneksi.length) {
      console.error(`\nKONEKSI gagal (${gagalKoneksi.length}):`);
      gagalKoneksi.forEach(l => console.error(" - " + l));
    }
    console.error("\nJalankan ulang script (query yang sukses akan tertimpa ulang tapi konsisten),");
    console.error("atau isi manual bagian yang gagal di file .generated.js sebelum dipakai.");
  } else {
    console.error("\nSemua query sukses. Tidak ada yang perlu diisi manual.");
  }

  if (suspiciousEdges.length) {
    console.error(`\nPERINGATAN: ${suspiciousEdges.length} edge punya rasio jalan/garis-lurus < ${SUSPICIOUS_RATIO} — kemungkinan OSRM salah ambil jalur (trail/jalan tak layak) di medan pegunungan:`);
    suspiciousEdges.forEach(l => console.error(" - " + l));
    console.error("Cek edge di atas dengan overview=full&geometries=geojson lalu plot ke geojson.io sebelum dipakai produksi.");
  }

  console.error(
    "\nLangkah selanjutnya: copy isi GRAPH_DASAR dari graph_dasar.generated.js dan\n" +
    "KONEKSI dari koneksi.generated.js ke kode utama TawangStay, menggantikan\n" +
    "GRAPH_DASAR & KONEKSI yang lama. buildSymmetricGraph() di kode utama akan\n" +
    "otomatis menambahkan arah baliknya, jadi tidak perlu tambah edge manual."
  );
}

main().catch(err => {
  console.error("\nScript berhenti karena error fatal:", err);
  process.exit(1);
});
