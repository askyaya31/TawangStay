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
featBg: "#8C6460",
featBorder:  "#E2C781",
featText:    "#F8F4E6",
featMuted:   "rgba(248,244,230,.65)",
  featDim:        "rgba(94,63,60,.40)",   
  featSurface:    "rgba(255,255,255,.55)", 
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

async function ukurBobotKoneksi() {
  for (const [id, edges] of Object.entries(KONEKSI)) {
    const p = DATA.find(d => d.id === +id);
    for (const [node] of edges) {
      const c = ROAD_NODES_COORD[node];
      const url = `https://router.project-osrm.org/route/v1/driving/${p.lon},${p.lat};${c.lon},${c.lat}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();
      const km = data.code === "Ok" ? +(data.routes[0].distance/1000).toFixed(2) : null;
      console.log(`${id} (${p.nama}) → ${node}: ${km} km`);
    }
  }
}

// ukurBobotKoneksi();

const GRAPH_DASAR = {
  Terminal:       [["Simpang_Pasar",1.97],["Jl_Lawu_Utara",0.87]],
  Simpang_Pasar:  [["Terminal",1.97],["Jalur_Grojogan",0.75],["Jalur_Tembus",0.39]],
  Jalur_Grojogan: [["Simpang_Pasar",0.75],["Jalur_Tembus",0.58]],
  Jalur_Tembus:   [["Simpang_Pasar",0.39],["Jalur_Grojogan",0.58]],
  Jl_Lawu_Utara:  [["Terminal",0.87],["Simpang_Kramat",1.13],["Simpang_Beji",1.1]],
  Simpang_Kramat:  [["Jl_Lawu_Utara",1.13],["Simpang_Beji",0.21]],
  Simpang_Beji:   [["Jl_Lawu_Utara",1.1],["Simpang_Kramat",0.21]],
  Jl_Sekipan:     [["Jalur_Tembus",3.2],["Simpang_Kramat",2.02]],
  Jl_Pancot:      [["Simpang_Kramat",1.22],["Jl_Lawu_Utara",2.57]],
  Jl_Nano:        [["Simpang_Pasar",0.3],["Jalur_Grojogan",0.75],["Jl_Blumbang",3.53]],
  Jl_Blumbang:    [["Terminal",4.02],["Jalur_Tembus",3.81],["Jl_Nano",3.56]],
  Gondosuli:      [["Jl_Lawu_Utara",4.02],["Terminal",3.32]],
};
const KONEKSI = {
  1:  [["Simpang_Beji",0.29],  ["Simpang_Kramat",0.37]],
  2:  [["Jl_Nano",1.3],        ["Simpang_Pasar",1.3]],
  3:  [["Simpang_Beji",0.57],  ["Jl_Lawu_Utara",1.11]],
  4:  [["Jl_Nano",1.03],       ["Simpang_Pasar",1.03]],
  5:  [["Jl_Nano",0.3],        ["Simpang_Pasar",0.3]],
  6:  [["Simpang_Beji",1.0],   ["Jl_Lawu_Utara",1.75]],
  7:  [["Jalur_Tembus",2.51],  ["Simpang_Kramat",2.02]],
  8:  [["Jalur_Tembus",2.31],  ["Simpang_Kramat",2.02]],
  9:  [["Terminal",40.47]],
  10: [["Jalur_Tembus",2.31],  ["Simpang_Kramat",2.02]],
  11: [["Jalur_Tembus",2.51],  ["Jl_Sekipan",3.67]],
  12: [["Jalur_Tembus",2.31],  ["Jl_Sekipan",3.47]],
  13: [["Jalur_Tembus",2.31],  ["Jl_Sekipan",3.47]],
  14: [["Jalur_Tembus",2.31],  ["Jl_Sekipan",3.47]],
  15: [["Jl_Blumbang",0.38],   ["Terminal",4.4]],
  16: [["Simpang_Beji",0.19],  ["Simpang_Kramat",0.31]],
  17: [["Jl_Pancot",0.2],      ["Simpang_Kramat",1.22]],
  18: [["Jalur_Tembus",2.51],  ["Jl_Sekipan",3.67]],
  19: [["Jl_Blumbang",1.26],   ["Terminal",3.23]],
  20: [["Jl_Blumbang",0.2],    ["Terminal",4.02]],
  21: [["Simpang_Kramat",0.56],["Jl_Lawu_Utara",0.56]],
  22: [["Jalur_Tembus",1.56],  ["Gondosuli",5.04]],
  23: [["Jalur_Tembus",2.31],  ["Jl_Sekipan",3.47]],
  24: [["Terminal",9.06],      ["Gondosuli",10.98]],
  25: [["Jalur_Tembus",2.51],  ["Jl_Sekipan",3.67]],
  26: [["Jl_Blumbang",0.43],   ["Terminal",4.45]],
  27: [["Jalur_Tembus",2.31],  ["Jl_Sekipan",3.47]],
  28: [["Terminal",1.81],      ["Jl_Lawu_Utara",2.43]],
  29: [["Terminal",1.3],       ["Jl_Blumbang",3.76]],
  30: [["Gondosuli",0.62],     ["Jl_Nano",2.9]],
  31: [["Gondosuli",1.92],     ["Jalur_Tembus",2.6]],
  32: [["Jl_Sekipan",0.07],    ["Jalur_Tembus",3.26]],
  33: [["Jl_Sekipan",0.12],    ["Jalur_Tembus",3.07]],
  34: [["Gondosuli",0.2],      ["Jl_Nano",3.51]],
  35: [["Jl_Lawu_Utara",1.63],["Jl_Pancot",5.78]],
  36: [["Terminal",1.26],      ["Jl_Lawu_Utara",1.35]],
  37: [["Gondosuli",0.67],     ["Jalur_Tembus",3.21]],
  38: [["Terminal",4.32],      ["Jl_Lawu_Utara",4.32]],
  39: [["Jl_Sekipan",0.1],     ["Jalur_Tembus",3.2]],
  40: [["Jl_Lawu_Utara",0.87],["Simpang_Beji",1.98]],
  41: [["Simpang_Beji",2.03],  ["Simpang_Pasar",2.99]],
  42: [["Gondosuli",0.67],     ["Jalur_Tembus",3.21]],
  43: [["Jl_Sekipan",0.04],    ["Jalur_Tembus",3.23]],
  44: [["Terminal",2.68],      ["Jl_Lawu_Utara",3.3]],
  45: [["Jl_Lawu_Utara",0.91],["Simpang_Beji",2.01]],
  46: [["Terminal",1.21],      ["Jl_Blumbang",3.68]],
  47: [["Jl_Lawu_Utara",1.63],["Jl_Pancot",5.78]],
  48: [["Simpang_Beji",1.83],  ["Simpang_Pasar",2.78]],
  49: [["Jl_Sekipan",0.1],     ["Jalur_Tembus",3.18]],
  50: [["Gondosuli",0.67],     ["Jalur_Tembus",3.21]],
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

async function jarakJalanOSRM(lat1, lon1, lat2, lon2) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== "Ok") return haversine(lat1, lon1, lat2, lon2) * 1.4;
    return data.routes[0].distance / 1000;
  } catch {
    return haversine(lat1, lon1, lat2, lon2) * 1.4; 
  }
}

const ROAD_NODES_COORD = {
  Terminal:        { lat: -7.6622, lon: 111.1258 },
  Simpang_Pasar:   { lat: -7.6695, lon: 111.1290 },
  Jalur_Grojogan:  { lat: -7.6710, lon: 111.1320 },
  Jalur_Tembus:    { lat: -7.6700, lon: 111.1305 },
  Jl_Lawu_Utara:  { lat: -7.6600, lon: 111.1260 },
  Simpang_Kramat:  { lat: -7.6645, lon: 111.1265 },
  Simpang_Beji:    { lat: -7.6640, lon: 111.1272 },
  Jl_Sekipan:      { lat: -7.6546, lon: 111.1286 },
  Jl_Pancot:       { lat: -7.6675, lon: 111.1330 },
  Jl_Nano:         { lat: -7.6698, lon: 111.1295 },
  Jl_Blumbang:     { lat: -7.6810, lon: 111.1261 },
  Gondosuli:       { lat: -7.6690, lon: 111.1410 },
};

const NODE_LABEL = {
  Terminal:       "Terminal Tawangmangu",
  Simpang_Pasar:  "Simpang Pasar",
  Jalur_Grojogan: "Jalur Grojogan Sewu",
  Jalur_Tembus:   "Jalur Tembus Kalisoro",
  Jl_Lawu_Utara:  "Jl. Lawu Utara",
  Simpang_Kramat:  "Simpang Kramat",
  Simpang_Beji:   "Simpang Beji",
  Jl_Sekipan:     "Jl. Sekipan, Kramat",
  Jl_Pancot:      "Jl. Pancot, Kalisoro",
  Jl_Nano:        "Jl. Nano, Tawangmangu",
  Jl_Blumbang:    "Kawasan Blumbang",
  Gondosuli:      "Kawasan Gondosuli",
};
window.__KONEKSI = KONEKSI;
window.__DATA = DATA;
window.__ROAD_NODES_COORD = ROAD_NODES_COORD;

async function jarakOriginKeNodeOSRM(originLat, originLon, nodeName) {
  const c = ROAD_NODES_COORD[nodeName];
  if (!c) return 999;
  return await jarakJalanOSRM(originLat, originLon, c.lat, c.lon);
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

async function hitungRute(topN, originLat, originLon) {
  const graph = {};
  for (const [node, edges] of Object.entries(GRAPH_DASAR))
    graph[node] = edges.map(([n, w]) => [n, w]);

  for (const p of topN) {
    const key = `P_${p.id}`;
    const koneksi = KONEKSI[p.id] || [];
    graph[key] = koneksi.map(([n, w]) => [n, w]);
    for (const [n, w] of koneksi) {
      if (!graph[n]) graph[n] = [];
      graph[n].push([key, w]);
    }
  }

  const roadNodes = Object.keys(ROAD_NODES_COORD);
  const jarakList = await Promise.all(
    roadNodes.map(rn => jarakOriginKeNodeOSRM(originLat, originLon, rn))
  );

  // const JARAK_MIN_LEWAT_NODE = 0.3;
  // graph["Origin"] = roadNodes
  //   .map((rn, i) => [rn, jarakList[i]])
  //   .filter(([, d]) => d >= JARAK_MIN_LEWAT_NODE);

  // if (graph["Origin"].length === 0) {
  //   graph["Origin"] = roadNodes.map((rn, i) => [rn, jarakList[i]]);
  // }
  graph["Origin"] = roadNodes.map((rn, i) => [rn, jarakList[i]]);

  for (let i = 0; i < roadNodes.length; i++) {
    const rn = roadNodes[i];
    if (!graph[rn]) graph[rn] = [];
    graph[rn].push(["Origin", jarakList[i]]);
  }

  const { dist, prev } = dijkstra(graph, "Origin");
  const peta = {};
  for (const p of topN) {
    const key = `P_${p.id}`;
    const jalurKeys = rekonstruksiJalur(prev, key);
    peta[p.id] = {
      jarakKm: dist[key] === Infinity ? null : +dist[key].toFixed(2),
      jalur: jalurKeys.map(k =>
        k.startsWith("P_")
          ? topN.find(x => x.id === +k.split("_")[1])?.nama || k
          : k === "Origin" ? "Lokasi Anda"
          : NODE_LABEL[k] || k.replace(/_/g, " ")
      ),
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

const KRITERIA_ICON = {
  harga: ({ size=12, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
),
  rating:  ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  wifi:    ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill={color}/>
    </svg>
  ),
  parkir:  ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
    </svg>
  ),
  ac:      ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9h20"/><rect x="2" y="5" width="20" height="8" rx="2"/>
      <path d="M7 13v4M12 13v4M17 13v4"/>
    </svg>
  ),
  kolam:   ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
      <path d="M14 5a2 2 0 1 0-4 0v7"/>
    </svg>
  ),
  sarapan: ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
};

function RankBadge({ rank }) {
  return (
    <span style={{
      fontSize:10,fontWeight:700,
      color:C.goldDeep,background:C.goldSoft,border:`1px solid ${C.goldBorder}`,
      borderRadius:4,padding:"2px 8px",letterSpacing:".05em",
    }}>#{rank}</span>
  );
}

function IconWifi({ size=12, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill={color}/>
    </svg>
  );
}

function IconParkir({ size=12, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
    </svg>
  );
}

function IconAC({ size=12, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9h20"/><rect x="2" y="5" width="20" height="8" rx="2"/>
      <path d="M7 13v4M12 13v4M17 13v4"/>
    </svg>
  );
}

function IconKolam({ size=12, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
      <path d="M14 5a2 2 0 1 0-4 0v7"/>
    </svg>
  );
}

function IconSarapan({ size=12, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  );
}

const FAC_ICON = {
  "Wi-Fi":       IconWifi,
  "Parkir":      IconParkir,
  "AC":          IconAC,
  "Kolam Renang":IconKolam,
  "Kolam":       IconKolam,
  "Sarapan":     IconSarapan,
};

function FacTag({ label, val, dark=false }) {
  const Icon = FAC_ICON[label];
  const iconColor = dark
    ? (val ? "#fff" : "rgba(255,255,255,.35)")      
    : (val ? C.tealDeep : C.muted);
 if (dark) return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:5,
      fontSize:10.5,padding:"3px 9px",borderRadius:4,fontWeight:500,
      background: val ? "rgba(226,199,129,.20)" : "rgba(255,255,255,.06)",
      color: iconColor,
      border: val ? "1px solid rgba(226,199,129,.40)" : "1px solid rgba(255,255,255,.10)",  
      textDecoration: val ? "none" : "line-through",
    }}>
      {Icon && <Icon size={11} color={iconColor} />}{label}
    </span>
  );
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:5,
      fontSize:10.5,padding:"3px 9px",borderRadius:4,fontWeight:500,
      background: val ? C.tealSoft : C.rosewoodSoft,
      color: iconColor,
      border: val ? `1px solid ${C.tealBorder}` : `1px solid ${C.rosewoodBorder}`,
      textDecoration: val ? "none" : "line-through",
    }}>
      {Icon && <Icon size={11} color={iconColor} />}{label}
    </span>
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

function MetaLine({ ulasan, alamat, dark=false }) {
  const color = dark ? "#fff" : C.muted;
  return (
    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:4,fontSize:11.5,color}}>
      <span>{ulasan.toLocaleString("id-ID")} ulasan</span>
      {alamat && (
        <>
          <span style={{opacity:0.45, fontSize:14, lineHeight:1}}>·</span>
          <span style={{display:"flex",alignItems:"center",gap:4}}>
            <IconPin size={10} color={dark ? "#fff" : C.muted} />
            <span style={{lineHeight:1.35}}>{alamat}</span>
          </span>
        </>
      )}
    </div>
  );
}

function RincianSkor({ p, wJarak, dark=false }) {
  const [open, setOpen] = useState(false);
  const accent = dark ? "#fff" : C.teal;          
  const border = dark ? C.featBorder : C.border;
  const txt    = dark ? C.featText  : C.ink;
  const muted  = dark ? C.featMuted : C.muted;
  const bg = dark ? "#4a2e2e" : C.cardBg;  

  const ahpLabel = p.ahpNorm >= 0.75 ? "Sesuai preferensi"
    : p.ahpNorm >= 0.5  ? "Cukup sesuai"
    : p.ahpNorm >= 0.25 ? "Kurang sesuai"
    : "Tidak sesuai";

  const lokasiLabel = p.jarNorm <= 0.25 ? "Dekat"
    : p.jarNorm <= 0.5  ? "Cukup dekat"
    : p.jarNorm <= 0.75 ? "Agak jauh"
    : "Jauh";

  return (
    <div style={{position:"relative"}}>
      <button
        onClick={()=>setOpen(o=>!o)}
        style={{
          display:"flex",alignItems:"center",gap:5,
          background:"none",border:"none",cursor:"pointer",padding:0,
          fontFamily:"'DM Sans',sans-serif",
          fontSize:dark?11:10.5,fontWeight:600,color:accent,
        }}
      >
        {open ? "Tutup" : "Lihat Rincian Skor"}
        <span style={{fontSize:8,transform:open?"rotate(180deg)":"none",transition:"transform .2s"}}>▾</span>
      </button>
     {open && (
        <div style={{
            position:"absolute",bottom:"calc(100% + 6px)",
            left:0,        
            minWidth:220,  
            zIndex:10,
            padding:"11px 12px",borderRadius:8,background:bg,
            border:`1px solid rgba(226,199,129,.55)`, 
            boxShadow:"0 4px 20px rgba(0,0,0,.35)",    
            display:"flex",flexDirection:"column",gap:8,
        }}>
          <SkorBaris
            label="Preferensi" value={ahpLabel}
            nilai={p.ahpNorm}
            warna={dark ? C.goldDeep : C.tealDeep}
            track={C.border}
            txt={txt} muted={muted}
          />
          <SkorBaris
            label="Lokasi" value={`${lokasiLabel} · ${fmtKm(p.jarakKm)}`}
            nilai={1 - p.jarNorm}
            warna={dark ? C.goldDeep : C.tealDeep}
            track={C.border}
            txt={txt} muted={muted}
          />
          <div style={{
            display:"flex",justifyContent:"space-between",alignItems:"center",
            paddingTop:7,borderTop:`1px solid ${border}`,
            fontSize:11.5,fontWeight:700,color:txt,
          }}>
            <span>Skor akhir</span>
            <span style={{color:dark?C.goldDeep:C.tealDeep}}>{(p.nilaiAkhir*100).toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SkorBaris({ label, value, sublabel, nilai, warna, track, txt, muted }) {
  const pct = Math.round(nilai * 100);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:3}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8}}>
        <div>
          <span style={{fontSize:11,fontWeight:600,color:txt}}>{label}: </span>
          <span style={{fontSize:11,color:txt}}>{value}</span>
          <div style={{fontSize:10,color:muted,marginTop:1}}>{sublabel}</div>
        </div>
        <span style={{fontSize:11,fontWeight:700,color:txt,whiteSpace:"nowrap",flexShrink:0}}>{pct}%</span>
      </div>
      <div style={{height:3,borderRadius:2,background:track,overflow:"hidden"}}>
        <div style={{height:3,width:`${pct}%`,background:warna,borderRadius:2}} />
      </div>
    </div>
  );
}

function RutePill({ jalur, dark=false }) {
  if (!jalur || jalur.length === 0) return null;
  return (
    <div style={{
      display:"flex",alignItems:"center",flexWrap:"wrap",gap:3,
      padding:"7px 10px",borderRadius:7,
      background: dark ? "rgba(0,0,0,.20)" : C.rosewoodSoft,
      border: dark ? "1px solid rgba(0,0,0,.25)" : `1px solid ${C.rosewoodBorder}`,
    }}>
      <span style={{flexShrink:0}}>
        <IconRoute size={13} color={dark ? "#fff" : C.teal} />
      </span>
      {jalur.map((node, i) => (
        <span key={i} style={{display:"flex",alignItems:"center",gap:3}}>
          <span style={{
            fontSize:10,
            fontWeight:i===0||i===jalur.length-1?700:400,
            color: dark
              ? (i===0||i===jalur.length-1 ? "#fff" : "rgba(255,255,255,.60)")
              : C.rosewoodDark,
          }}>{node}</span>
          {i < jalur.length-1 && (
            <span style={{fontSize:10,color: dark ? "rgba(255,255,255,.50)" : C.rosewoodDark}}>›</span>
          )}
        </span>
      ))}
    </div>
  );
}

async function ukurSemuaBobot() {
  const hasil = {};
  for (const [nodeA, edges] of Object.entries(GRAPH_DASAR)) {
    hasil[nodeA] = [];
    for (const [nodeB] of edges) {
      const ca = ROAD_NODES_COORD[nodeA];
      const cb = ROAD_NODES_COORD[nodeB];
      const url = `https://router.project-osrm.org/route/v1/driving/${ca.lon},${ca.lat};${cb.lon},${cb.lat}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();
      const km = data.code === "Ok" ? +(data.routes[0].distance / 1000).toFixed(2) : null;
      hasil[nodeA].push([nodeB, km]);
      console.log(`${nodeA} → ${nodeB}: ${km} km`);
    }
  }
  console.log(JSON.stringify(hasil, null, 2));
}

// ukurSemuaBobot();

export default function TawangStay() {
  const [pref, setPref] = useState(Object.fromEntries(KRITERIA.map(k=>[k,3])));
  const [jumlah, setJumlah]       = useState(10);
  const [wJarak, setWJarak]       = useState(30);
  const [originLat, setOriginLat] = useState(-7.6622);  
  const [originLon, setOriginLon] = useState(111.1258); 
  const [originLabel, setOriginLabel] = useState("Terminal Tawangmangu (lokasi default)");
  const [isDefaultLocation, setIsDefaultLocation] = useState(true);
  const [locInput, setLocInput]   = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hasil, setHasil]         = useState(null);
  const [crInfo, setCrInfo]       = useState(null);
  const [crError, setCrError]     = useState(false);
  const [loading, setLoading] = useState(false);


  const setPrefVal = (k, v) => setPref(p => ({...p, [k]: v}));

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return alert("Geolokasi tidak didukung browser ini.");
    navigator.geolocation.getCurrentPosition(pos => {
      setOriginLat(pos.coords.latitude);
      setOriginLon(pos.coords.longitude);
      setOriginLabel(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      setLocInput(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
      setIsDefaultLocation(false);
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
    setIsDefaultLocation(false);
    setShowModal(false);
  }, [locInput]);

const runAll = useCallback(async () => {
  const M = buildMatriks(pref);
  const { bobot, lambdaMax, ci, cr } = hitungBobot(M);
  setCrInfo({ cr: +cr.toFixed(4), ci: +ci.toFixed(4), lambdaMax: +lambdaMax.toFixed(4) });
  if (cr >= 0.1) { setCrError(true); setHasil(null); return; }
  setCrError(false);

  setLoading(true); 
  try {
    const n        = Math.min(15, Math.max(1, jumlah || 10));
    const normList = normalisasiData(DATA);
    const ranked   = hitungSkorAHP(normList, bobot).slice(0, n);
    const rute     = await hitungRute(ranked, originLat, originLon); 
    const final    = hitungNilaiAkhir(ranked, rute, wJarak / 100);
    setHasil({ final, bobot, M, n });
  } finally {
    setLoading(false);
  }
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
          Tawang<span style={{color:C.teal}}>Stay</span>
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
                background:"rgba(43,33,24,.62)",
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                gap:8,padding:"0 16px",
              }}>
                <div style={{
                  display:"flex",alignItems:"center",gap:6,
                  background: isDefaultLocation ? C.gold : C.teal,
                  borderRadius:20,padding:"6px 14px",
                }}>
                  <span style={{fontSize:11.5,fontWeight:600,color: isDefaultLocation ? "#3D2C0E" : "#fff"}}>
                    {isDefaultLocation ? "Pilih lokasi anda" : "Ubah lokasi"}
                  </span>
                </div>
                <div style={{fontSize:12,fontWeight:600,color:"#fff",textAlign:"center"}}>
                  {originLabel}
                </div>
                {isDefaultLocation && (
                  <div style={{fontSize:10,color:"rgba(255,255,255,.65)",textAlign:"center"}}>
                    Lokasi default — klik untuk ubah
                  </div>
                )}
              </div>
            </div>
          </SidebarSection>

          <Accordion title="Bobot Kriteria (1 – 5)" defaultOpen={true}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 12px"}}>
              {KRITERIA.map(k => {
  const Icon = KRITERIA_ICON[k];
  return (
    <div key={k}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <span style={{display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:600,color:C.rosewoodDark}}>
          {Icon && <Icon size={12} color={C.rosewoodDark} />}
          {LABEL_KRITERIA[k]}
        </span>
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
  );
})}
            </div>
          </Accordion>

          <Accordion title="Bobot Jarak & Jumlah Hasil">
            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                <span style={{fontSize:11,color:C.muted}}>
                    AHP <strong style={{color:C.rosewood}}>{100-wJarak}%</strong> — Jarak <strong style={{color:C.rosewood}}>{wJarak}%</strong>
                </span>
                <span style={{
                  fontSize:10,fontWeight:700,
                  background:C.rosewood,color:C.cream,
                  borderRadius:20,padding:"1px 7px",
                }}>{wJarak}%</span>
              </div>
              <input
                className="range-jarak"
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
  disabled={loading}
  style={{
    width:"100%", padding:"11px",
    background: loading ? C.muted : C.teal, color:"#fff",
    border:"none", borderRadius:8,
    fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:13,
    letterSpacing:".05em",
    cursor: loading ? "not-allowed" : "pointer",
    transition:"background .15s",
  }}
>
  {loading ? "Menghitung rute..." : "Cari Rekomendasi"}
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

function FeaturedCard({ p, wJarak }) {
  const mapsQ = encodeURIComponent(p.nama + " Tawangmangu");
  const facs = [["Wi-Fi",p.wifi],["Parkir",p.parkir],["AC",p.ac],["Kolam Renang",p.kolam],["Sarapan",p.sarapan]];
  return (
    <div style={{
      background:"#89615d",
      borderRadius:16,padding:"24px 26px",
      position:"relative",
      borderLeft:`4px solid ${C.gold}`,
      boxShadow:"0 6px 24px rgba(124,93,90,.20)",
    }}>
      <div style={{
        position:"absolute",top:16,right:16,
        background:C.gold,color:"#3D2C0E",
        fontSize:10,fontWeight:700,letterSpacing:".06em",
        padding:"4px 12px",borderRadius:20,
      }}>
        #1 Rekomendasi
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,lineHeight:1.2,color:C.featText}}>
            {p.nama}
          </div>
          <MetaLine ulasan={p.ulasan} alamat={p.alamat} dark iconColor="#fff" textColor="#fff" />
        </div>
        <div style={{
          display:"inline-block",alignSelf:"flex-start",
          fontSize:10,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",
          padding:"3px 9px",borderRadius:4,
          background:"rgba(254, 227, 157, 0.18)",color:C.gold,
          border:`1px solid rgba(226,199,129,.35)`,
        }}>
          {p.tipe}
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[
            {label:"Rating",      value:`${p.rating} ★`},
            {label:"Harga/Malam", value:`Rp\u202f${(p.harga/1000).toFixed(0)}rb`},
            {label:"Jarak",       value:fmtKm(p.jarakKm)},
            {label:"Waktu",       value:p.estimasiWaktu},
          ].map(({label,value}) => (
            <div key={label} style={{
              flex:"1 1 0",minWidth:80,
              background:"rgba(255,255,255,.10)",
              border:"1.5px solid rgba(255,255,255,.15)",
              borderRadius:8,padding:"8px 10px",
              display:"flex",flexDirection:"column",gap:2,
            }}>
              <span style={{fontSize:15,fontWeight:700,lineHeight:1.15,color:C.featText}}>{value}</span>
              <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:C.featMuted}}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {facs.map(([l,v])=><FacTag key={l} label={l} val={v} dark />)}
        </div>
        <RutePill jalur={p.jalur} dark iconColor="#fff" textColor="#fff" />
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <RincianSkor p={p} wJarak={wJarak} dark textColor="#fff" chevronColor="#fff" />
          <button
            onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${mapsQ}`,"_blank")}
            style={{
              padding:"8px 18px",background:"transparent",
              border:"1.5px solid #fff",borderRadius:8,
              fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:"#fff",
              cursor:"pointer",letterSpacing:".04em",transition:"all .15s",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; }}
          >
            Cek Rute di Google Maps
          </button>
        </div>
      </div>
    </div>
  );
}

function RankCard({ p, rank, bestScore, wJarak }) {
  const mapsQ = encodeURIComponent(p.nama + " Tawangmangu");
  const facs = [["Wi-Fi",p.wifi],["Parkir",p.parkir],["AC",p.ac],["Kolam",p.kolam],["Sarapan",p.sarapan]];
  return (
    <div
      style={{
        background:C.cardBg,borderRadius:12,padding:"14px",
        display:"flex",flexDirection:"column",gap:8,
        border:`1px solid ${C.border}`,
        overflow:"visible",
        transition:"border-color .15s, box-shadow .15s",
      }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.teal; e.currentTarget.style.boxShadow=`0 6px 20px rgba(91,178,181,.14)`; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}
    >
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

      <div>
        <div style={{fontWeight:700,fontSize:13,color:C.ink,lineHeight:1.3}}>{p.nama}</div>
        <div style={{marginTop:4}}>
          <MetaLine ulasan={p.ulasan} alamat={p.alamat} />
        </div>
      </div>

      <TipeBadge tipe={p.tipe} small />

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

      <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
        {facs.map(([l,v])=><FacTag key={l} label={l} val={v} />)}
      </div>
      <RutePill jalur={p.jalur} />
      <RincianSkor p={p} wJarak={wJarak} />
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