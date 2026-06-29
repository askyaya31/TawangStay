import { useState, useCallback } from "react";

const KRITERIA = ["harga", "rating", "wifi", "parkir", "ac", "kolam", "sarapan"];
const LABEL_KRITERIA = {
  harga: "Harga/Malam", rating: "Rating", wifi: "Wi-Fi",
  parkir: "Parkir", ac: "AC", kolam: "Kolam Renang", sarapan: "Sarapan",
};

const SAATY = { 0: 1, 1: 3, 2: 5, 3: 7, 4: 9, 5: 9 };
const RI    = { 1:0, 2:0, 3:0.58, 4:0.90, 5:1.12, 6:1.24, 7:1.32, 8:1.41 };

const C = {
  rosewood:       "#7C5D5A",
  cream:          "#F8F4E6",
  gold:           "#E2C781",
  teal:           "#5BB2B5",
  rosewoodDark:   "#5E3F3C",
  rosewoodSoft:   "rgba(124,93,90,.08)",
  rosewoodBorder: "rgba(124,93,90,.20)",
  rosewoodMed:    "rgba(124,93,90,.45)",
  goldSoft:       "rgba(226,199,129,.15)",
  goldBorder:     "rgba(226,199,129,.45)",
  goldDeep:       "#C4A254",
  tealDark:       "#3E8F92",
  tealSoft:       "rgba(91,178,181,.12)",
  tealBorder:     "rgba(91,178,181,.35)",
  tealDeep:       "#2A7679",
  ink:            "#2B2118",
  muted:          "#9B7E7B",
  cardBg:         "#FDFAF2",
  border:         "#EBE3D0",
  borderDark:     "#D9CEBC",
  // Featured card: warm rosewood gradient instead of solid dark
  featGradStart:  "#6B3D38",
  featGradEnd:    "#4A2820",
  featText:       "#F8F4E6",
  featMuted:      "rgba(248,244,230,.60)",
  featDim:        "rgba(248,244,230,.40)",
  featSurface:    "rgba(255,255,255,.08)",
  featBorder:     "rgba(255,255,255,.12)",
};

const TIPE_COLOR = {
  Hotel:          { bg: "#E2C781", tx: "#3D2C0E" },
  Villa:          { bg: "#7C5D5A", tx: "#F8F4E6" },
  Resort:         { bg: "#5BB2B5", tx: "#0E3B3D" },
  Glamping:       { bg: "#C97A45", tx: "#fff"    },
  Homestay:       { bg: "#A89070", tx: "#fff"    },
  "Guest House":  { bg: "#B5987A", tx: "#fff"    },
};

const ALAMAT = {
  1:"Jl. Lawu No.11, Beji",2:"Jl. Grojogan Sewu, Beji",3:"Jl. Lawu–KarangKulon, Beji",
  4:"Jl. Nano, Tawangmangu",5:"Jl. Banjarsari, Nano",6:"Jl. Lawu–Bener, Nano",
  7:"Jl. Sekipan, Kramat, Kalisoro",8:"Kramat, Kalisoro",9:"Jl. Majapahit III, Nusukan, Surakarta",
  10:"Kramat, Kalisoro",11:"Jl. Sekipan, Kramat, Kalisoro",12:"Jl. Sekipan, Kramat, Kalisoro",
  13:"Jl. Lawu, Kramat, Kalisoro",14:"Kramat, Kalisoro",15:"Ombang-Ombang, Blumbang",
  16:"Jl. Nurul Alfiah, Beji",17:"Jl. Pancot Lor, Jetis, Kalisoro",18:"Kramat, Kalisoro",
  19:"Jl. Watusambang, Plumbon",20:"Ombang-Ombang, Blumbang",21:"Jl. Grojogan Sewu, Nano",
  22:"Area Hutan, Tawangmangu",23:"Kramat, Kalisoro",24:"Nglurah, Pleseran",
  25:"Kalisoro, Tawangmangu",26:"Hutan Lindung, Blumbang",27:"Kramat, Kalisoro",
  28:"Jl. Raya Solo-Tawangmangu No.1, Nano",29:"Blumbang, Tawangmangu",
  30:"Jl. Raya Solo-Tawangmangu KM.30, Gondosuli",31:"Jl. Watusambang, Plumbon",
  32:"Kramat, Kalisoro",33:"Jl. Lawu, Kalisoro",34:"Jl. Raya Solo-Tawangmangu KM.32, Gondosuli",
  35:"Pancot, Kalisoro",36:"Blumbang, Tawangmangu",37:"Gondosuli Kidul, Gondosuli",
  38:"Berjo, Ngargoyoso",39:"Jl. Sekipan, Kramat, Kalisoro",40:"Jl. Lawu No.22, Karanglo",
  41:"Jl. Podang, Beji",42:"Area Hutan, Gondosuli",43:"Kramat, Kalisoro",
  44:"Terminal Tawangmangu",45:"Jl. Lawu Kav.15-16, Tawangmangu",46:"Blumbang, Tawangmangu",
  47:"Jl. Pancot, Kalisoro",48:"Karanglo, Tawangmangu",49:"Jl. Sekipan, Kramat, Kalisoro",
  50:"Gondosuli, Tawangmangu",
};

const DATA = [
  {id:1, nama:"Hotel Agro Tawangmangu",tipe:"Hotel",rating:4.5,ulasan:38,harga:230294,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6637,lon:111.1248},
  {id:2, nama:"Samara Homestay",tipe:"Homestay",rating:4.6,ulasan:143,harga:205159,wifi:1,parkir:1,ac:0,kolam:0,sarapan:1,lat:-7.6641,lon:111.1272},
  {id:3, nama:"Hotel Grand Bintang",tipe:"Hotel",rating:3.9,ulasan:1544,harga:308035,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6665,lon:111.1248},
  {id:4, nama:"ARTICA Hotel & Homestay",tipe:"Hotel",rating:4.6,ulasan:72,harga:270270,wifi:1,parkir:1,ac:0,kolam:1,sarapan:1,lat:-7.6680,lon:111.1285},
  {id:5, nama:"RedDoorz near Grojogan Sewu",tipe:"Hotel",rating:4.2,ulasan:382,harga:146027,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6698,lon:111.1295},
  {id:6, nama:"Hotel Bintang Tawangmangu",tipe:"Hotel",rating:3.8,ulasan:1797,harga:284428,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6695,lon:111.1268},
  {id:7, nama:"Red Chilies Hill Hotel",tipe:"Hotel",rating:3.6,ulasan:98,harga:174038,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6688,lon:111.1350},
  {id:8, nama:"De Jempol Tawangmangu",tipe:"Hotel",rating:4.7,ulasan:73,harga:212406,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6679,lon:111.1342},
  {id:9, nama:"RedDoorz near Balekambang",tipe:"Hotel",rating:4.3,ulasan:229,harga:166072,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.5506,lon:110.8279},
  {id:10,nama:"RedDoorz Hotel Tejomoyo",tipe:"Hotel",rating:4.3,ulasan:270,harga:123337,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6689,lon:111.1348},
  {id:11,nama:"Villa Batumarta",tipe:"Villa",rating:4.3,ulasan:140,harga:1249560,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6688,lon:111.1350},
  {id:12,nama:"Villa SEMESTA Tawangmangu",tipe:"Villa",rating:4.9,ulasan:55,harga:800000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6690,lon:111.1348},
  {id:13,nama:"Villa Pandawa Tawangmangu",tipe:"Villa",rating:4.3,ulasan:98,harga:685186,wifi:1,parkir:1,ac:0,kolam:0,sarapan:1,lat:-7.6682,lon:111.1340},
  {id:14,nama:"Pondok Jempol 1",tipe:"Guest House",rating:4.5,ulasan:186,harga:134356,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6681,lon:111.1342},
  {id:15,nama:"Villa Roemah Iboek",tipe:"Villa",rating:4.9,ulasan:52,harga:1500000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:1,lat:-7.6834,lon:111.1248},
  {id:16,nama:"Villa Sulthon",tipe:"Villa",rating:4.4,ulasan:33,harga:1571612,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6635,lon:111.1255},
  {id:17,nama:"Villa Kusuma Tawangmangu",tipe:"Villa",rating:5.0,ulasan:7,harga:1200000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6675,lon:111.1330},
  {id:18,nama:"Allura Azana Resort",tipe:"Resort",rating:4.7,ulasan:1641,harga:352000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6688,lon:111.1355},
  {id:19,nama:"Atsiri Glamping",tipe:"Glamping",rating:4.7,ulasan:207,harga:1307741,wifi:1,parkir:1,ac:1,kolam:0,sarapan:1,lat:-7.6782,lon:111.1264},
  {id:20,nama:"Tawangmangu Wonder Park",tipe:"Hotel",rating:4.5,ulasan:3834,harga:450000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:1,lat:-7.6810,lon:111.1261},
  {id:21,nama:"Nava Hotel Tawangmangu",tipe:"Hotel",rating:4.8,ulasan:10080,harga:480000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6631,lon:111.1231},
  {id:22,nama:"Diiza Glamping Tawangmangu",tipe:"Glamping",rating:4.8,ulasan:6,harga:400000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6757,lon:111.1389},
  {id:23,nama:"Glamping Bahagia Sekipan",tipe:"Glamping",rating:4.9,ulasan:40,harga:400000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6691,lon:111.1346},
  {id:24,nama:"SCENIC GLAMPING",tipe:"Villa",rating:5.0,ulasan:15,harga:700000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.7025,lon:111.1260},
  {id:25,nama:"Naomi Villa Tawangmangu",tipe:"Villa",rating:4.6,ulasan:12,harga:1300000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6685,lon:111.1348},
  {id:26,nama:"HANA Villa Syariah",tipe:"Villa",rating:4.9,ulasan:32,harga:1700000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6830,lon:111.1260},
  {id:27,nama:"Villa Nuansa Tawangmangu",tipe:"Villa",rating:4.9,ulasan:3791,harga:1680000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6691,lon:111.1348},
  {id:28,nama:"Super OYO Hotel Sido Mukti",tipe:"Hotel",rating:3.8,ulasan:420,harga:110000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6605,lon:111.1345},
  {id:29,nama:"Cemara Asri Guest House",tipe:"Guest House",rating:4.2,ulasan:85,harga:180000,wifi:0,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6625,lon:111.1182},
  {id:30,nama:"Sakura Hills Tawangmangu",tipe:"Glamping",rating:4.5,ulasan:1200,harga:650000,wifi:1,parkir:1,ac:1,kolam:0,sarapan:1,lat:-7.6680,lon:111.1400},
  {id:31,nama:"Rumah Atsiri Glamping Premium",tipe:"Glamping",rating:4.8,ulasan:210,harga:2500000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6655,lon:111.1365},
  {id:32,nama:"Homestay Sekipan Murah",tipe:"Homestay",rating:4.0,ulasan:12,harga:950000,wifi:0,parkir:0,ac:0,kolam:0,sarapan:0,lat:-7.6541,lon:111.1281},
  {id:33,nama:"Homestay Backpacker Tawangmangu",tipe:"Homestay",rating:3.9,ulasan:14,harga:85000,wifi:0,parkir:0,ac:0,kolam:0,sarapan:0,lat:-7.6550,lon:111.1290},
  {id:34,nama:"Griya Sarangan Hotel",tipe:"Hotel",rating:4.1,ulasan:280,harga:195000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6690,lon:111.1410},
  {id:35,nama:"Villa Parikesit Kembar",tipe:"Villa",rating:4.5,ulasan:45,harga:2200000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6518,lon:111.1258},
  {id:36,nama:"RedDoorz near Air Terjun",tipe:"Hotel",rating:4.0,ulasan:88,harga:135000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6628,lon:111.1184},
  {id:37,nama:"Mountain Cabin Tawangmangu",tipe:"Glamping",rating:4.7,ulasan:112,harga:950000,wifi:1,parkir:1,ac:1,kolam:0,sarapan:1,lat:-7.6675,lon:111.1395},
  {id:38,nama:"Homestay Asri Berjo",tipe:"Homestay",rating:4.4,ulasan:31,harga:150000,wifi:0,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6450,lon:111.1200},
  {id:39,nama:"Villa Executive Sekipan",tipe:"Villa",rating:4.8,ulasan:19,harga:350000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6546,lon:111.1286},
  {id:40,nama:"Hotel Wahyu Utomo",tipe:"Hotel",rating:3.7,ulasan:156,harga:160000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6558,lon:111.1298},
  {id:41,nama:"Pondok Asri Tawangmangu",tipe:"Guest House",rating:4.2,ulasan:410,harga:225000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:1,lat:-7.6565,lon:111.1305},
  {id:42,nama:"Bobocabin Mantiq Tawangmangu",tipe:"Glamping",rating:4.8,ulasan:340,harga:890000,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6670,lon:111.1390},
  {id:43,nama:"Villa Pinus Tawangmangu",tipe:"Villa",rating:4.3,ulasan:62,harga:1100000,wifi:1,parkir:0,ac:0,kolam:0,sarapan:0,lat:-7.6544,lon:111.1284},
  {id:44,nama:"Losmen Murah Meriah",tipe:"Guest House",rating:3.5,ulasan:24,harga:90000,wifi:0,parkir:0,ac:0,kolam:0,sarapan:0,lat:-7.6600,lon:111.1338},
  {id:45,nama:"Hotel Komajaya Komaratih",tipe:"Hotel",rating:4.2,ulasan:180,harga:380000,wifi:1,parkir:1,ac:1,kolam:0,sarapan:1,lat:-7.6564,lon:111.1304},
  {id:46,nama:"Pringgondani Glamping",tipe:"Glamping",rating:4.6,ulasan:53,harga:550000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:1,lat:-7.6632,lon:111.1188},
  {id:47,nama:"Villa Bukit Indah",tipe:"Villa",rating:4.4,ulasan:28,harga:1800000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:1,lat:-7.6516,lon:111.1256},
  {id:48,nama:"Omah Lowo Homestay",tipe:"Homestay",rating:4.0,ulasan:9,harga:175000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6556,lon:111.1296},
  {id:49,nama:"Resort Sekipan Mewah",tipe:"Resort",rating:4.9,ulasan:89,harga:1450000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6547,lon:111.1287},
  {id:50,nama:"Glamping Lawu Camp",tipe:"Glamping",rating:4.3,ulasan:104,harga:425000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:1,lat:-7.6672,lon:111.1392},
].map(d => ({ ...d, alamat: ALAMAT[d.id] || "" }));

const GRAPH_DASAR = {
  Terminal:[["Simpang_Pasar",1.2],["Jl_Lawu_Utara",0.4]],
  Simpang_Pasar:[["Terminal",1.2],["Jalur_Grojogan",0.4],["Jalur_Tembus",1.0]],
  Jalur_Grojogan:[["Simpang_Pasar",0.4],["Jalur_Tembus",1.0]],
  Jalur_Tembus:[["Simpang_Pasar",1.0],["Jalur_Grojogan",1.0]],
  Jl_Lawu_Utara:[["Terminal",0.4],["Simpang_Kramat",0.2],["Simpang_Beji",0.3]],
  Simpang_Kramat:[["Jl_Lawu_Utara",0.2],["Simpang_Beji",0.2]],
  Simpang_Beji:[["Jl_Lawu_Utara",0.3],["Simpang_Kramat",0.2]],
};
const KONEKSI = {
  1:[["Simpang_Beji",0.3],["Simpang_Kramat",0.4]],2:[["Simpang_Pasar",0.5],["Simpang_Beji",0.6]],
  3:[["Simpang_Beji",0.2],["Jl_Lawu_Utara",0.9]],4:[["Jalur_Tembus",0.8],["Simpang_Pasar",0.8]],
  5:[["Jalur_Tembus",0.6],["Simpang_Pasar",1.0]],6:[["Simpang_Beji",0.7],["Jl_Lawu_Utara",0.9]],
  7:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.1]],8:[["Jalur_Tembus",0.3],["Simpang_Pasar",0.9]],
  9:[["Terminal",34.0]],10:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.1]],
  11:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.1]],12:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.1]],
  13:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.0]],14:[["Jalur_Tembus",0.3],["Simpang_Pasar",1.0]],
  15:[["Terminal",2.3],["Jalur_Tembus",2.3]],16:[["Simpang_Beji",0.4],["Simpang_Kramat",0.5]],
  17:[["Jalur_Tembus",0.4],["Simpang_Pasar",0.8]],18:[["Jalur_Tembus",0.3],["Simpang_Pasar",1.2]],
  19:[["Jalur_Tembus",1.6],["Terminal",1.7]],20:[["Jalur_Tembus",1.9],["Terminal",2.0]],
  21:[["Simpang_Kramat",0.3],["Jl_Lawu_Utara",0.7]],22:[["Jalur_Tembus",1.3],["Jalur_Grojogan",2.1]],
  23:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.1]],24:[["Jalur_Tembus",4.8],["Terminal",5.0]],
  25:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.1]],26:[["Jalur_Tembus",2.2],["Terminal",2.3]],
  27:[["Jalur_Tembus",0.2],["Simpang_Pasar",1.1]],28:[["Terminal",0.5],["Jl_Lawu_Utara",0.8]],
  29:[["Terminal",1.8],["Jalur_Tembus",1.9]],30:[["Jalur_Grojogan",0.5],["Simpang_Pasar",0.8]],
  31:[["Jalur_Tembus",1.5],["Jalur_Grojogan",1.8]],32:[["Jalur_Tembus",0.3],["Simpang_Pasar",1.0]],
  33:[["Jalur_Tembus",0.4],["Simpang_Pasar",0.9]],34:[["Jalur_Grojogan",0.3],["Simpang_Pasar",0.6]],
  35:[["Jl_Lawu_Utara",0.5],["Simpang_Kramat",0.6]],36:[["Terminal",1.5],["Jl_Lawu_Utara",1.8]],
  37:[["Jalur_Grojogan",1.0],["Jalur_Tembus",1.5]],38:[["Jl_Lawu_Utara",2.5],["Terminal",2.8]],
  39:[["Jalur_Tembus",0.3],["Simpang_Pasar",0.9]],40:[["Simpang_Beji",0.5],["Jl_Lawu_Utara",0.7]],
  41:[["Simpang_Beji",0.4],["Simpang_Pasar",0.7]],42:[["Jalur_Grojogan",0.8],["Jalur_Tembus",1.2]],
  43:[["Jalur_Tembus",0.3],["Simpang_Pasar",1.0]],44:[["Terminal",0.3],["Jl_Lawu_Utara",0.6]],
  45:[["Simpang_Beji",0.3],["Jl_Lawu_Utara",0.5]],46:[["Terminal",1.6],["Jalur_Tembus",2.0]],
  47:[["Jl_Lawu_Utara",0.6],["Simpang_Kramat",0.7]],48:[["Simpang_Beji",0.5],["Simpang_Pasar",0.8]],
  49:[["Jalur_Tembus",0.3],["Simpang_Pasar",0.9]],50:[["Jalur_Grojogan",0.9],["Jalur_Tembus",1.3]],
};

function buildMatriks(pref) {
  const n = KRITERIA.length;
  const M = Array.from({length:n}, () => Array(n).fill(1));
  for (let i = 0; i < n; i++) {
    for (let j = i+1; j < n; j++) {
      const selisih = pref[KRITERIA[i]] - pref[KRITERIA[j]];
      const val = SAATY[Math.min(Math.abs(selisih), 5)];
      M[i][j] = selisih >= 0 ? val : 1/val;
      M[j][i] = selisih >= 0 ? 1/val : val;
    }
  }
  return M;
}

function estimasiWaktuTempuh(jarakKm, kecepatanKmPerJam = 30) {
  if (jarakKm === null || jarakKm === 999) return "—";
  const menit = Math.round((jarakKm / kecepatanKmPerJam) * 60);
  if (menit < 60) return `${menit} mnt`;
  const jam = Math.floor(menit / 60);
  const sisaMenit = menit % 60;
  return sisaMenit > 0 ? `${jam} j ${sisaMenit} mnt` : `${jam} jam`;
}

function hitungBobot(M) {
  const n = M.length;
  const colSum = Array(n).fill(0);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) colSum[j] += M[i][j];
  const norm = M.map(row => row.map((v,j) => v / colSum[j]));
  const bobot = norm.map(row => row.reduce((a,b)=>a+b,0)/n);
  const ws = M.map((row,i) => row.reduce((s,v,j)=>s+v*bobot[j],0));
  const lambdaMax = ws.reduce((s,v,i)=>s+v/bobot[i],0)/n;
  const ci = (lambdaMax - n) / (n - 1);
  const cr = ci / (RI[n] || 1.32);
  return { bobot, lambdaMax, ci, cr };
}

function normalisasiData(list) {
  const hMin = Math.min(...list.map(d=>d.harga));
  const hMax = Math.max(...list.map(d=>d.harga));
  const rMin = Math.min(...list.map(d=>d.rating));
  const rMax = Math.max(...list.map(d=>d.rating));
  const totWifi    = list.reduce((s,d)=>s+d.wifi,0)    || 1;
  const totParkir  = list.reduce((s,d)=>s+d.parkir,0)  || 1;
  const totAC      = list.reduce((s,d)=>s+d.ac,0)      || 1;
  const totKolam   = list.reduce((s,d)=>s+d.kolam,0)   || 1;
  const totSarapan = list.reduce((s,d)=>s+d.sarapan,0) || 1;
  return list.map(d => ({
    ...d,
    norm_harga:   hMax===hMin ? 1 : (hMax-d.harga)/(hMax-hMin),
    norm_rating:  rMax===rMin ? 1 : (d.rating-rMin)/(rMax-rMin),
    norm_wifi:    d.wifi    / totWifi,
    norm_parkir:  d.parkir  / totParkir,
    norm_ac:      d.ac      / totAC,
    norm_kolam:   d.kolam   / totKolam,
    norm_sarapan: d.sarapan / totSarapan,
  }));
}

function hitungSkorAHP(normList, bobot) {
  return normList.map(d => ({
    ...d,
    skorAHP: KRITERIA.reduce((s,k,i) => s + bobot[i] * d[`norm_${k}`], 0),
  })).sort((a,b) => b.skorAHP - a.skorAHP);
}

function haversine(lat1,lon1,lat2,lon2) {
  const R = 6371, dLat=(lat2-lat1)*Math.PI/180, dLon=(lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

const ROAD_NODES_COORD = {
  Terminal:{lat:-7.6622,lon:111.1258},
  Simpang_Pasar:{lat:-7.6695,lon:111.1290},
  Jalur_Grojogan:{lat:-7.6710,lon:111.1320},
  Jalur_Tembus:{lat:-7.6700,lon:111.1305},
  Jl_Lawu_Utara:{lat:-7.6600,lon:111.1260},
  Simpang_Kramat:{lat:-7.6645,lon:111.1265},
  Simpang_Beji:{lat:-7.6640,lon:111.1272},
};

function jarakOriginKeNode(originLat, originLon, nodeName) {
  const c = ROAD_NODES_COORD[nodeName];
  if (!c) return 999;
  return haversine(originLat, originLon, c.lat, c.lon);
}

function dijkstra(graph, start) {
  const dist = {}, prev = {};
  const Q = new Set(Object.keys(graph));
  for (const n of Q) dist[n] = Infinity;
  dist[start] = 0;
  while (Q.size) {
    let u = null;
    for (const n of Q) if (u===null || dist[n]<dist[u]) u=n;
    if (dist[u]===Infinity) break;
    Q.delete(u);
    for (const [v, w] of (graph[u]||[])) {
      if (!Q.has(v)) continue;
      const alt = dist[u] + w;
      if (alt < dist[v]) { dist[v]=alt; prev[v]=u; }
    }
  }
  return { dist, prev };
}

function rekonstruksiJalur(prev, tujuan) {
  const jalur = [];
  let node = tujuan;
  while (node) { jalur.unshift(node); node = prev[node]; }
  return jalur;
}

function hitungRute(topN, originLat, originLon) {
  const graph = {};
  for (const [node, edges] of Object.entries(GRAPH_DASAR))
    graph[node] = edges.map(([n,w])=>[n,w]);
  for (const p of topN) {
    const key = `P_${p.id}`;
    const koneksi = KONEKSI[p.id] || [];
    graph[key] = koneksi.map(([n,w])=>[n,w]);
    for (const [n,w] of koneksi) {
      if (!graph[n]) graph[n] = [];
      graph[n].push([key, w]);
    }
  }
  graph["Origin"] = Object.keys(ROAD_NODES_COORD).map(rn => [rn, jarakOriginKeNode(originLat, originLon, rn)]);
  for (const rn of Object.keys(ROAD_NODES_COORD)) {
    if (!graph[rn]) graph[rn] = [];
    graph[rn].push(["Origin", jarakOriginKeNode(originLat, originLon, rn)]);
  }
  const { dist, prev } = dijkstra(graph, "Origin");
  const peta = {};
  for (const p of topN) {
    const key = `P_${p.id}`;
    const jalurKeys = rekonstruksiJalur(prev, key);
    peta[p.id] = {
      jarakKm: dist[key] === Infinity ? null : +dist[key].toFixed(2),
      jalur: jalurKeys.map(k => k.startsWith("P_")
        ? topN.find(x=>x.id===+k.split("_")[1])?.nama || k
        : k === "Origin" ? "Lokasi Anda" : k.replace(/_/g," ")),
    };
  }
  return peta;
}

function hitungNilaiAkhir(topN, ruteMap, wJarak = 0.3) {
  const denganJarak = topN.map(p => ({
    ...p,
    jarakKm: ruteMap[p.id]?.jarakKm ?? 999,
    jalur:   ruteMap[p.id]?.jalur   ?? [],
    estimasiWaktu: estimasiWaktuTempuh(ruteMap[p.id]?.jarakKm ?? 999),
  }));
  const ahpMax = Math.max(...denganJarak.map(d=>d.skorAHP));
  const ahpMin = Math.min(...denganJarak.map(d=>d.skorAHP));
  const jarMax = Math.max(...denganJarak.map(d=>d.jarakKm));
  const jarMin = Math.min(...denganJarak.map(d=>d.jarakKm));
  return denganJarak.map(d => {
    const ahpNorm  = ahpMax===ahpMin ? 1 : (d.skorAHP-ahpMin)/(ahpMax-ahpMin);
    const jarNorm  = jarMax===jarMin ? 0 : (d.jarakKm-jarMin)/(jarMax-jarMin);
    const nilaiAkhir = (1-wJarak)*ahpNorm + wJarak*(1-jarNorm);
    return { ...d, ahpNorm, jarNorm, nilaiAkhir };
  }).sort((a,b) => b.nilaiAkhir - a.nilaiAkhir);
}

const fmtRp = n => "Rp\u202f" + n.toLocaleString("id-ID") + "/malam";
const fmtKm = km => km === 999 || km === null ? "—" : km < 1 ? (km*1000).toFixed(0)+" m" : km.toFixed(1)+" km";

// ── Icon components ─────────────────────────────────────────────────────────
function IconPin({ size=11, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function IconRoute({ size=11, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
      <circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>
      <circle cx="18" cy="5" r="3"/>
    </svg>
  );
}

// ── UI atoms ─────────────────────────────────────────────────────────────────
function TipeBadge({ tipe, small=false }) {
  const s = TIPE_COLOR[tipe] || {bg:"#ccc",tx:"#333"};
  return (
    <span style={{
      display:"inline-block",alignSelf:"flex-start",
      fontSize: small ? 9 : 10,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",
      padding: small ? "2px 6px" : "3px 8px",borderRadius:4,
      background:s.bg,color:s.tx,
      border: s.border ? `1px solid ${s.border}` : "none",
    }}>{tipe}</span>
  );
}

function FacTag({ label, val, dark=false }) {
  if (dark) return (
    <span style={{
      fontSize:10.5,padding:"3px 9px",borderRadius:4,fontWeight:500,
      background: val ? "rgba(226,199,129,.18)" : "rgba(255,255,255,.05)",
      color: val ? C.gold : C.featDim,
      border: val ? "1px solid rgba(226,199,129,.35)" : "1px solid rgba(255,255,255,.07)",
      textDecoration: val ? "none" : "line-through",
    }}>{label}</span>
  );
  return (
    <span style={{
      fontSize:11,padding:"3px 8px",borderRadius:3,fontWeight:500,
      background: val ? C.tealSoft : "#f5f1ea",
      color: val ? C.tealDeep : "#c4b0a8",
      border: val ? `1px solid ${C.tealBorder}` : "1px solid transparent",
      textDecoration: val ? "none" : "line-through",
    }}>{label}</span>
  );
}

function ScoreBar({ value, max }) {
  const pct = max ? Math.round((value/max)*100) : 0;
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <div style={{flex:1,height:4,background:C.border,borderRadius:2,overflow:"hidden"}}>
          <div style={{height:4,width:`${pct}%`,background:C.teal,borderRadius:2,transition:"width .3s ease"}} />
        </div>
        <span style={{fontSize:11,fontWeight:600,color:C.rosewoodDark,minWidth:36,textAlign:"right"}}>
          {(value*100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

function RankBadge({ rank }) {
  return (
    <span style={{
      fontSize:10,fontWeight:700,
      color:C.goldDeep,background:C.goldSoft,border:`1px solid ${C.goldBorder}`,
      borderRadius:4,padding:"2px 8px",letterSpacing:".05em",
    }}>#{rank}</span>
  );
}

function SidebarSection({ label, children }) {
  return (
    <div>
      <div style={{fontSize:9.5,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.teal,marginBottom:10}}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Accordion({ title, children, defaultOpen=false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",marginBottom:8}}>
      <button
        onClick={()=>setOpen(o=>!o)}
        style={{
          width:"100%",padding:"10px 14px",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          background:C.cardBg,border:"none",cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",fontSize:12.5,fontWeight:600,
          color:C.rosewoodDark,textAlign:"left",
        }}
      >
        {title}
        <span style={{fontSize:10,color:C.muted,transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
      </button>
      {open && (
        <div style={{padding:"12px 14px",background:C.cream}}>{children}</div>
      )}
    </div>
  );
}

// ── Rincian skor — FIX: tidak mendorong height grid card ─────────────────────
// Menggunakan posisi absolut supaya expand tidak mengubah tinggi card di grid.
// Wrapper perlu `position:relative` dan `overflow:visible`.
function RincianSkor({ p, wJarak, dark=false }) {
  const [open, setOpen] = useState(false);
  const bobotAhp   = (100 - wJarak) / 100;
  const bobotJarak = wJarak / 100;
  const skorLokasi = 1 - p.jarNorm;
  const kontribAhp   = p.ahpNorm * bobotAhp;
  const kontribJarak = skorLokasi * bobotJarak;

  const accent = dark ? C.gold : C.teal;
  const border = dark ? "rgba(255,255,255,.12)" : C.border;

  return (
    <div style={{position:"relative"}}>
      <button
        onClick={()=>setOpen(o=>!o)}
        style={{
          display:"flex",alignItems:"center",gap:5,
          background:"none",border:"none",cursor:"pointer",padding:0,
          fontFamily:"'DM Sans',sans-serif",
          fontSize: dark ? 11 : 10.5,fontWeight:600,color:accent,
        }}
      >
        {open ? "Tutup rincian" : "Rincian skor"}
        <span style={{fontSize:8,transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
      </button>

      {open && (
        <div style={{
          // Absolute: tidak mendorong tinggi card tetangga di grid
          position:"absolute",
          bottom:"calc(100% + 6px)",
          left:0, right:0,
          zIndex:10,
          padding:"11px 12px",borderRadius:8,
          background: dark ? "#3D2620" : C.cardBg,
          border:`1px solid ${border}`,
          boxShadow:"0 4px 20px rgba(0,0,0,.18)",
        }}>
          <div style={{fontSize:10.5,fontWeight:700,color: dark ? C.gold : C.rosewoodDark,marginBottom:8}}>
            Rincian Skor
          </div>
          <RincianBaris
            label={`AHP · bobot ${Math.round(bobotAhp*100)}%`}
            nilai={p.ahpNorm} kontribusi={kontribAhp}
            warna={dark ? C.gold : C.tealDeep}
            track={dark?"rgba(255,255,255,.08)":C.border}
            muted={dark?C.featMuted:C.muted} txt={dark?C.featText:C.ink}
          />
          <div style={{height:6}} />
          <RincianBaris
            label={`Lokasi · bobot ${Math.round(bobotJarak*100)}%`}
            nilai={skorLokasi} kontribusi={kontribJarak}
            warna={dark ? C.teal : C.rosewoodDark}
            track={dark?"rgba(255,255,255,.08)":C.border}
            muted={dark?C.featMuted:C.muted} txt={dark?C.featText:C.ink}
          />
          <div style={{height:8,borderTop:`1px solid ${border}`,marginTop:8}} />
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11.5,fontWeight:700,color:dark?C.featText:C.ink}}>
            <span>Skor akhir</span>
            <span>{(p.nilaiAkhir*100).toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

function RincianBaris({ label, nilai, kontribusi, warna, track, muted, txt }) {
  const pct = Math.round(nilai*100);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",fontSize:10.5,marginBottom:3,gap:8}}>
        <span style={{color:muted}}>{label}</span>
        <span style={{fontWeight:700,color:txt,whiteSpace:"nowrap"}}>
          {pct}%<span style={{color:muted,fontWeight:500}}> → {(kontribusi*100).toFixed(1)}%</span>
        </span>
      </div>
      <div style={{height:4,borderRadius:2,background:track,overflow:"hidden"}}>
        <div style={{height:4,width:`${pct}%`,background:warna,borderRadius:2}} />
      </div>
    </div>
  );
}

// ── Rute pill: compact readable route display ─────────────────────────────────
function RutePill({ jalur, dark=false }) {
  if (!jalur || jalur.length === 0) return null;
  // Show max 4 nodes, collapse middle with "…" if longer
  let display = jalur;
  if (jalur.length > 4) {
    display = [jalur[0], jalur[1], "…", jalur[jalur.length - 1]];
  }
  return (
    <div style={{
      display:"flex", alignItems:"center", flexWrap:"wrap", gap:3,
      padding:"7px 10px", borderRadius:7,
      background: dark ? "rgba(255,255,255,.06)" : C.rosewoodSoft,
      border: dark ? `1px solid rgba(255,255,255,.10)` : `1px solid ${C.rosewoodBorder}`,
    }}>
      <span style={{marginRight:4,flexShrink:0}}>
        <IconRoute size={11} color={dark ? C.featDim : C.rosewoodMed} />
      </span>
      {display.map((node, i) => (
        <span key={i} style={{display:"flex",alignItems:"center",gap:3}}>
          <span style={{
            fontSize:10,fontWeight: i===0 || i===display.length-1 ? 700 : 400,
            color: dark
              ? (i===0||i===display.length-1 ? C.featText : C.featMuted)
              : (i===0||i===display.length-1 ? C.rosewoodDark : C.muted),
          }}>{node}</span>
          {i < display.length-1 && (
            <span style={{fontSize:10,color: dark ? C.featDim : C.muted}}>›</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ── Meta line: ulasan + alamat dengan pemisah jelas ──────────────────────────
function MetaLine({ ulasan, alamat, dark=false }) {
  const color = dark ? C.featMuted : C.muted;
  return (
    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:4,fontSize:11.5,color}}>
      <span>{ulasan.toLocaleString("id-ID")} ulasan</span>
      {alamat && (
        <>
          <span style={{opacity:0.45, fontSize:14, lineHeight:1}}>·</span>
          <span style={{display:"flex",alignItems:"center",gap:4}}>
            <IconPin size={10} color={dark ? C.featDim : C.muted} />
            <span style={{lineHeight:1.35}}>{alamat}</span>
          </span>
        </>
      )}
    </div>
  );
}

// ── Main app ─────────────────────────────────────────────────────────────────
export default function TawangStay() {
  const [pref, setPref] = useState(Object.fromEntries(KRITERIA.map(k=>[k,3])));
  const [jumlah, setJumlah]       = useState(10);
  const [wJarak, setWJarak]       = useState(30);
  const [originLat, setOriginLat] = useState(-7.6637);
  const [originLon, setOriginLon] = useState(111.1248);
  const [originLabel, setOriginLabel] = useState("");
  const [locInput, setLocInput]   = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hasil, setHasil]         = useState(null);
  const [crInfo, setCrInfo]       = useState(null);
  const [crError, setCrError]     = useState(false);

  const setPrefVal = (k, v) => setPref(p => ({...p, [k]: v}));

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return alert("Geolokasi tidak didukung browser ini.");
    navigator.geolocation.getCurrentPosition(pos => {
      setOriginLat(pos.coords.latitude);
      setOriginLon(pos.coords.longitude);
      setOriginLabel(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      setLocInput(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      setShowModal(false);
    }, () => alert("Tidak dapat mengambil lokasi."));
  }, []);

  const confirmLocation = useCallback(() => {
    const parts = locInput.split(",").map(s=>parseFloat(s.trim()));
    if (parts.length===2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      setOriginLat(parts[0]); setOriginLon(parts[1]);
      setOriginLabel(locInput);
    } else {
      setOriginLabel(locInput || "Lokasi manual");
    }
    setShowModal(false);
  }, [locInput]);

  const runAll = useCallback(() => {
    const M = buildMatriks(pref);
    const { bobot, lambdaMax, ci, cr } = hitungBobot(M);
    setCrInfo({ cr: +cr.toFixed(4), ci: +ci.toFixed(4), lambdaMax: +lambdaMax.toFixed(4) });
    if (cr >= 0.1) { setCrError(true); setHasil(null); return; }
    setCrError(false);
    const n       = Math.min(15, Math.max(1, jumlah || 10));
    const normList= normalisasiData(DATA);
    const ranked  = hitungSkorAHP(normList, bobot).slice(0, n);
    const rute    = hitungRute(ranked, originLat, originLon);
    const final   = hitungNilaiAkhir(ranked, rute, wJarak/100);
    setHasil({ final, bobot, M, n });
  }, [pref, jumlah, originLat, originLon, wJarak]);

  return (
    <div style={{
      background:C.cream,minHeight:"100vh",
      fontFamily:"'DM Sans',sans-serif",color:C.ink,fontSize:14,
      width:"100%",maxWidth:"100%",overflowX:"hidden",boxSizing:"border-box",
    }}>
      <header style={{
        padding:"28px 40px 22px",
        borderBottom:`1px solid ${C.border}`,
        background:`linear-gradient(135deg, ${C.cream} 0%, #F2EDD8 100%)`,
      }}>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:".18em",textTransform:"uppercase",color:C.teal,marginBottom:5}}>
          Sistem Rekomendasi Penginapan · AHP + Dijkstra
        </div>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:38,fontWeight:900,lineHeight:1,color:C.rosewoodDark,margin:0}}>
          Tawang<span style={{color:C.teal}}> Stay</span>
        </h1>
        <div style={{fontSize:12,color:C.muted,marginTop:6,fontStyle:"italic"}}>
          Tawangmangu, Karanganyar · 50 penginapan tersedia
        </div>
      </header>

      <main style={{display:"grid",gridTemplateColumns:"300px minmax(0,1fr)",minHeight:"calc(100vh - 100px)",width:"100%"}}>
        <aside style={{
          borderRight:`1px solid ${C.border}`,
          padding:"20px 16px",
          display:"flex",flexDirection:"column",gap:14,
          background:"#FAF6EC",
          position:"sticky",top:0,alignSelf:"start",
        }}>
          <SidebarSection label="Titik Keberangkatan">
            <div
              onClick={()=>setShowModal(true)}
              style={{
                borderRadius:10,overflow:"hidden",height:160,position:"relative",
                cursor:"pointer",background:C.borderDark,border:`1px solid ${C.border}`,
              }}
            >
              <iframe
                title="peta"
                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8000!2d${originLon}!3d${originLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1700000000!5m2!1sid!2sid`}
                style={{width:"100%",height:"100%",border:"none",pointerEvents:"none"}}
                loading="lazy"
              />
              <div style={{
                position:"absolute",inset:0,
                background:"rgba(61,44,30,.52)",
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              }}>
                <div style={{
                  background:C.teal,borderRadius:6,padding:"6px 14px",
                  fontSize:12,fontWeight:700,color:"#fff",letterSpacing:".04em",
                }}>
                  {originLabel ? "Ubah Lokasi" : "Pilih Lokasi Anda"}
                </div>
                {originLabel && (
                  <div style={{fontSize:9.5,color:C.gold,marginTop:6,textAlign:"center",padding:"0 12px",lineHeight:1.5}}>
                    {originLabel}
                  </div>
                )}
              </div>
            </div>
          </SidebarSection>

          <Accordion title="Bobot Kriteria (1 – 5)" defaultOpen={true}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 12px"}}>
              {KRITERIA.map(k => (
                <div key={k}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontSize:11,fontWeight:600,color:C.rosewoodDark}}>{LABEL_KRITERIA[k]}</span>
                    <span style={{
                      fontSize:10,fontWeight:700,
                      background:C.teal,color:"#fff",
                      borderRadius:20,padding:"1px 7px",
                    }}>{pref[k]}</span>
                  </div>
                  <input
                    type="range" min={1} max={5} value={pref[k]}
                    onChange={e => setPrefVal(k, +e.target.value)}
                    style={{
                      WebkitAppearance:"none",width:"100%",height:4,borderRadius:2,
                      outline:"none",cursor:"pointer",
                      background:`linear-gradient(to right,${C.teal} 0%,${C.teal} ${((pref[k]-1)/4)*100}%,${C.border} ${((pref[k]-1)/4)*100}%,${C.border} 100%)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="Bobot Jarak & Jumlah Hasil">
            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <span style={{fontSize:11,color:C.muted}}>
                  AHP <strong style={{color:C.teal}}>{100-wJarak}%</strong> — Jarak <strong style={{color:C.rosewood}}>{wJarak}%</strong>
                </span>
                <span style={{
                  fontSize:10,fontWeight:700,
                  background:C.rosewood,color:C.cream,
                  borderRadius:20,padding:"1px 7px",
                }}>{wJarak}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={wJarak}
                onChange={e=>setWJarak(+e.target.value)}
                style={{
                  WebkitAppearance:"none",width:"100%",height:4,borderRadius:2,
                  outline:"none",cursor:"pointer",
                  background:`linear-gradient(to right,${C.rosewood} 0%,${C.rosewood} ${wJarak}%,${C.border} ${wJarak}%,${C.border} 100%)`,
                }}
              />
              <div style={{fontSize:10,color:C.muted,marginTop:5}}>
                Nilai akhir = {100-wJarak}% skor AHP + {wJarak}% kedekatan lokasi
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:11,color:C.muted,flexShrink:0}}>Jumlah hasil</span>
              <input
                type="number" min={1} max={15} value={jumlah}
                onChange={e => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val)) setJumlah(val);
                }}
                style={{
                  width:60,padding:"5px 8px",
                  border:`1.5px solid ${C.border}`,borderRadius:6,
                  fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.ink,
                  background:"#fff",outline:"none",
                }}
              />
              <span style={{fontSize:10,color:C.muted}}>maks. 15</span>
            </div>
          </Accordion>

          <button
            onClick={runAll}
            style={{
              width:"100%",padding:"11px",
              background:C.teal,color:"#fff",
              border:"none",borderRadius:8,
              fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,
              letterSpacing:".05em",cursor:"pointer",
              transition:"background .15s",
            }}
            onMouseEnter={e=>e.currentTarget.style.background=C.tealDark}
            onMouseLeave={e=>e.currentTarget.style.background=C.teal}
          >
            Cari Rekomendasi
          </button>

          {crError && (
            <div style={{fontSize:11,color:"#c44",lineHeight:1.5}}>
              Tidak konsisten · CR = {crInfo.cr} (harus &lt; 0.1). Sesuaikan bobot dan coba lagi.
            </div>
          )}
        </aside>

        <div style={{padding:"28px 36px",display:"flex",flexDirection:"column",gap:24,minWidth:0}}>
          {!hasil && !crError && (
            <div style={{padding:"80px 24px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
              <div style={{
                width:64,height:64,borderRadius:"50%",
                background:C.goldSoft,border:`2px solid ${C.goldBorder}`,
                display:"flex",alignItems:"center",justifyContent:"center",marginBottom:4,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div style={{fontFamily:"Georgia,serif",fontSize:22,color:C.rosewoodDark,fontWeight:700}}>
                Temukan penginapan terbaik Anda
              </div>
              <div style={{fontSize:13,color:C.muted,maxWidth:340,lineHeight:1.6}}>
                Atur preferensi di panel kiri, lalu klik <strong>Cari Rekomendasi</strong> untuk mendapatkan hasil rekomendasi berbasis AHP + Dijkstra.
              </div>
            </div>
          )}

          {crError && (
            <div style={{padding:20,background:"#fff5f5",borderRadius:12,border:"1px solid #f5a0a0",color:"#c00"}}>
              <div style={{fontWeight:700,marginBottom:4}}>Rasio konsistensi melebihi batas (CR ≥ 0.1)</div>
              <div style={{fontSize:12,lineHeight:1.6}}>
                Perbedaan preferensi antar kriteria tidak konsisten secara logis. Sesuaikan nilai slider dan coba lagi.
              </div>
            </div>
          )}

          {hasil && <HasilPanel hasil={hasil} wJarak={wJarak} />}
        </div>
      </main>

      {showModal && (
        <div
          onClick={e=>{ if(e.target===e.currentTarget) setShowModal(false); }}
          style={{position:"fixed",inset:0,background:"rgba(43,33,24,.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}
        >
          <div style={{background:C.cream,borderRadius:18,padding:28,width:"min(94vw,680px)",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 16px 60px rgba(61,44,30,.25)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700,color:C.rosewoodDark}}>Titik Keberangkatan</span>
              <button onClick={()=>setShowModal(false)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.muted}}>×</button>
            </div>
            <p style={{fontSize:12,color:C.muted,marginBottom:14}}>
              Masukkan koordinat (lat, lon) sebagai titik awal perhitungan rute.
            </p>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <input
                value={locInput}
                onChange={e=>setLocInput(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter") confirmLocation(); }}
                placeholder="Contoh: -7.6637, 111.1248"
                style={{flex:1,padding:"10px 14px",borderRadius:7,border:`1.5px solid ${C.border}`,fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none",background:"#fff"}}
              />
              <button onClick={confirmLocation} style={{padding:"10px 16px",background:C.teal,color:"#fff",border:"none",borderRadius:7,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                Konfirmasi
              </button>
              <button onClick={detectLocation} style={{padding:"10px 16px",background:C.rosewood,color:C.cream,border:"none",borderRadius:7,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                Lokasi Saya
              </button>
            </div>
            <iframe
              title="peta-modal"
              src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10000!2d${originLon}!3d${originLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1700000000!5m2!1sid!2sid`}
              style={{width:"100%",height:360,borderRadius:12,border:"none",display:"block"}}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Hasil panel ──────────────────────────────────────────────────────────────
function HasilPanel({ hasil, wJarak }) {
  const { final } = hasil;
  const best = final[0];
  const rest = final.slice(1);
  const bestScore = best.nilaiAkhir;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,color:C.rosewoodDark}}>
        Penginapan Terbaik Ditemukan!
      </div>

      <div>
        <div style={{fontSize:9.5,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:C.teal,marginBottom:10}}>
          Rekomendasi Utama — Peringkat 1
        </div>
        <FeaturedCard p={best} wJarak={wJarak} />
      </div>

      {rest.length > 0 && (
        <div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <span style={{fontSize:9.5,fontWeight:700,letterSpacing:".13em",textTransform:"uppercase",color:C.muted}}>
              Peringkat Lainnya
            </span>
            <div style={{flex:1,height:1,background:C.border}} />
          </div>
          {/* FIX: overflow:visible agar RincianSkor absolute popup tidak terpotong */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:14,overflow:"visible"}}>
            {rest.map((p, i) => (
              <RankCard key={p.id} p={p} rank={i+2} bestScore={bestScore} wJarak={wJarak} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Featured card: warm gradient, tidak lagi solid coklat gelap penuh ────────
function FeaturedCard({ p, wJarak }) {
  const mapsQ = encodeURIComponent(p.nama + " Tawangmangu");
  const facs = [["Wi-Fi",p.wifi],["Parkir",p.parkir],["AC",p.ac],["Kolam Renang",p.kolam],["Sarapan",p.sarapan]];
  return (
    <div style={{
      // Warm rosewood gradient — lebih terang dari sebelumnya, kurangi kesan "kotak hitam"
      background:`linear-gradient(145deg, ${C.featGradStart} 0%, ${C.featGradEnd} 100%)`,
      borderRadius:16,padding:"24px 26px",
      position:"relative",
      // Subtle gold top border sebagai aksen, menggantikan kesan solid penuh
      borderTop:`3px solid ${C.gold}`,
      boxShadow:"0 8px 32px rgba(61,44,30,.28), 0 2px 8px rgba(61,44,30,.14)",
    }}>
      {/* Badge #1 */}
      <div style={{
        position:"absolute",top:0,left:0,
        background:C.gold,color:"#3D2C0E",
        fontSize:11,fontWeight:700,letterSpacing:".06em",
        padding:"5px 14px",borderRadius:"16px 0 12px 0",
      }}>
        #1 Rekomendasi
      </div>

      <div style={{marginTop:28,display:"flex",flexDirection:"column",gap:14}}>
        {/* Nama + meta */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,lineHeight:1.2,color:C.featText}}>
            {p.nama}
          </div>
          {/* FIX: ulasan + alamat dalam satu baris dengan pemisah "·" yang jelas */}
          <MetaLine ulasan={p.ulasan} alamat={p.alamat} dark />
        </div>

        <TipeBadge tipe={p.tipe} />

        {/* Stats grid */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[
            {label:"Skor Akhir",  value:`${(p.nilaiAkhir*100).toFixed(1)}%`,                 accent:true},
            {label:"Rating",      value:`${p.rating} ★`,                                     accent:false},
            {label:"Harga/Malam", value:`Rp\u202f${(p.harga/1000).toFixed(0)}rb`,            accent:false},
            {label:"Jarak",       value:fmtKm(p.jarakKm),                                    accent:false},
            {label:"Waktu",       value:p.estimasiWaktu,                                      accent:false},
          ].map(({label,value,accent}) => (
            <div key={label} style={{
              flex:"1 1 0",minWidth:80,
              background: accent ? "rgba(226,199,129,.18)" : "rgba(255,255,255,.08)",
              border:`1px solid ${accent ? "rgba(226,199,129,.35)" : "rgba(255,255,255,.12)"}`,
              borderRadius:8,padding:"8px 10px",
              display:"flex",flexDirection:"column",gap:2,
            }}>
              <span style={{fontSize:15,fontWeight:700,lineHeight:1.15,color: accent ? C.gold : "#fff"}}>{value}</span>
              <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:C.featDim}}>{label}</span>
            </div>
          ))}
        </div>

        {/* Fasilitas */}
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {facs.map(([l,v])=><FacTag key={l} label={l} val={v} dark />)}
        </div>

        {/* FIX: Rute — selalu tampil bila ada data */}
        <RutePill jalur={p.jalur} dark />

        {/* Rincian skor — popup ke atas supaya tidak dorong layout */}
        <RincianSkor p={p} wJarak={wJarak} dark />

        {/* CTA */}
        <button
          onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${mapsQ}`,"_blank")}
          style={{
            width:"100%",padding:"10px",
            background:C.teal,border:"none",borderRadius:8,
            fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:"#fff",
            cursor:"pointer",letterSpacing:".04em",
            transition:"background .15s",
          }}
          onMouseEnter={e=>e.currentTarget.style.background=C.tealDark}
          onMouseLeave={e=>e.currentTarget.style.background=C.teal}
        >
          Cek Rute di Google Maps
        </button>
      </div>
    </div>
  );
}

// ── Rank card: overflow visible + rute selalu tampil ─────────────────────────
function RankCard({ p, rank, bestScore, wJarak }) {
  const mapsQ = encodeURIComponent(p.nama + " Tawangmangu");
  const facs = [["Wi-Fi",p.wifi],["Parkir",p.parkir],["AC",p.ac],["Kolam",p.kolam],["Sarapan",p.sarapan]];
  return (
    <div
      style={{
        background:C.cardBg,borderRadius:12,padding:"14px",
        display:"flex",flexDirection:"column",gap:8,
        border:`1px solid ${C.border}`,
        // FIX: overflow visible agar popup RincianSkor tidak terpotong
        overflow:"visible",
        transition:"border-color .15s, box-shadow .15s",
      }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.boxShadow=`0 6px 20px rgba(91,178,181,.14)`; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}
    >
      {/* Header: rank + jarak */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <RankBadge rank={rank} />
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          {p.jarakKm !== 999 && p.jarakKm !== null && (
            <span style={{
              fontSize:11,fontWeight:600,color:C.tealDeep,
              padding:"3px 8px",borderRadius:4,
              background:C.tealSoft,border:`1px solid ${C.tealBorder}`,
            }}>
              {fmtKm(p.jarakKm)}
            </span>
          )}
          {p.estimasiWaktu && p.estimasiWaktu !== "—" && (
            <span style={{
              fontSize:11,fontWeight:600,color:C.muted,
              padding:"3px 8px",borderRadius:4,
              background:C.rosewoodSoft,border:`1px solid ${C.rosewoodBorder}`,
            }}>
              {p.estimasiWaktu}
            </span>
          )}
        </div>
      </div>

      {/* Nama + meta */}
      <div>
        <div style={{fontWeight:700,fontSize:13,color:C.ink,lineHeight:1.3}}>{p.nama}</div>
        {/* FIX: ulasan + alamat dengan pemisah jelas */}
        <div style={{marginTop:4}}>
          <MetaLine ulasan={p.ulasan} alamat={p.alamat} />
        </div>
      </div>

      <TipeBadge tipe={p.tipe} small />

      {/* Mini stats */}
      <div style={{display:"flex",gap:6}}>
        <div style={{
          flex:"1 1 0",minWidth:0,
          background:C.rosewoodSoft,border:`1px solid ${C.rosewoodBorder}`,
          borderRadius:8,padding:"6px 10px",
          display:"flex",flexDirection:"column",gap:1,
        }}>
          <span style={{fontSize:14,fontWeight:700,lineHeight:1.2,color:C.rosewoodDark}}>{p.rating} ★</span>
          <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:C.muted}}>Rating</span>
        </div>
        <div style={{
          flex:"1 1 0",minWidth:0,
          background:C.rosewoodSoft,border:`1px solid ${C.rosewoodBorder}`,
          borderRadius:8,padding:"6px 10px",
          display:"flex",flexDirection:"column",gap:1,
        }}>
          <span style={{fontSize:14,fontWeight:700,lineHeight:1.2,color:C.rosewoodDark}}>Rp{(p.harga/1000).toFixed(0)}rb</span>
          <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:C.muted}}>Harga</span>
        </div>
      </div>

      {/* Fasilitas */}
      <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
        {facs.map(([l,v])=><FacTag key={l} label={l} val={v} />)}
      </div>

      {/* Score bar */}
      <ScoreBar value={p.nilaiAkhir} max={bestScore} />

      {/* FIX: Rute — selalu tampil bila ada jalur */}
      <RutePill jalur={p.jalur} />

      {/* Rincian skor — popup ke atas */}
      <RincianSkor p={p} wJarak={wJarak} />

      {/* CTA */}
      <button
        onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${mapsQ}`,"_blank")}
        style={{
          marginTop:"auto",
          display:"flex",alignItems:"center",justifyContent:"flex-end",gap:4,
          padding:"4px 0",
          border:"none",background:"transparent",
          color:C.teal,fontFamily:"'DM Sans',sans-serif",
          fontWeight:600,fontSize:11.5,cursor:"pointer",
          letterSpacing:".03em",
          transition:"color .15s",
        }}
        onMouseEnter={e=>e.currentTarget.style.color=C.tealDark}
        onMouseLeave={e=>e.currentTarget.style.color=C.teal}
      >
        Cek Rute
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </button>
    </div>
  );
}