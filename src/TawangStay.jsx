import { useState, useCallback, useRef, useEffect } from "react";

const GRAPH_DASAR = {
  "Terminal": [
    [
      "Simpang_Pasar",
      1.37,
      2.7
    ],
    [
      "Jl_Lawu_Utara",
      1.52,
      2.8
    ],
    [
      "Kramat_Tengah",
      2.79,
      2.9
    ],
    [
      "Kramat_Utara",
      3.3,
      3.3
    ],
    [
      "Bukit_Sekipan",
      3.44,
      4.3
    ]
  ],
  "Simpang_Pasar": [
    [
      "Jalur_Grojogan",
      0.75,
      2.1
    ],
    [
      "Jalur_Tembus",
      0.39,
      1.2
    ]
  ],
  "Jalur_Grojogan": [
    [
      "Jalur_Tembus",
      0.58,
      1.5
    ]
  ],
  "Jalur_Tembus": [
    [
      "Sekipan_Tengah",
      2.31,
      4.9
    ]
  ],
  "Jl_Lawu_Utara": [
    [
      "Simpang_Kramat",
      1.13,
      2.9
    ],
    [
      "Simpang_Beji",
      1.1,
      2.8
    ],
    [
      "Sekipan_Tengah",
      2.57,
      4.6
    ],
    [
      "Kramat_Utara",
      3.96,
      5.5
    ],
    [
      "Kramat_Tengah",
      3.45,
      5.1
    ]
  ],
  "Simpang_Kramat": [
    [
      "Simpang_Beji",
      0.21,
      0.7
    ],
    [
      "Kramat_Tengah",
      2.09,
      2.9
    ]
  ],
  "Jl_Sekipan": [
    [
      "Jalur_Tembus",
      3.2,
      7.8
    ],
    [
      "Simpang_Kramat",
      2.02,
      5.1
    ],
    [
      "Sekipan_Tengah",
      3.47,
      6.8
    ],
    [
      "Jl_Lawu_Utara",
      0.89,
      2.2
    ]
  ],
  "Jl_Pancot": [
    [
      "Simpang_Kramat",
      1.22,
      2.4
    ],
    [
      "Jl_Lawu_Utara",
      2.57,
      4.6
    ]
  ],
  "Jl_Nano": [
    [
      "Simpang_Pasar",
      0,
      0
    ],
    [
      "Jalur_Grojogan",
      0.75,
      2.1
    ],
    [
      "Jl_Blumbang",
      3.53,
      8.8
    ]
  ],
  "Jl_Blumbang": [
    [
      "Terminal",
      2.59,
      6.4
    ],
    [
      "Jalur_Tembus",
      3.81,
      9.6
    ]
  ],
  "Gondosuli": [
    [
      "Jl_Lawu_Utara",
      4.02,
      6.3
    ],
    [
      "Terminal",
      3.36,
      4.1
    ]
  ],
  "Sekipan_Tengah": [
    [
      "Bukit_Sekipan",
      2.25,
      3.7
    ]
  ],
  "Kramat_Tengah": [
    [
      "Kramat_Utara",
      0.75,
      1.2
    ],
    [
      "Bukit_Sekipan",
      0.6,
      1.6
    ]
  ]
};

const KONEKSI = {
  1: [
    [
      "Simpang_Beji",
      0.29,
      0.8
    ],
    [
      "Simpang_Kramat",
      0.37,
      1.1
    ],
    [
      "Terminal",
      1.1,
      1.9
    ]
  ],
  2: [
    [
      "Jl_Nano",
      1.3,
      3.3
    ],
    [
      "Simpang_Pasar",
      1.3,
      3.3
    ],
    [
      "Terminal",
      1.15,
      1.5
    ],
    [
      "Simpang_Beji",
      0.01,
      0
    ]
  ],
  3: [
    [
      "Simpang_Beji",
      0.57,
      1.5
    ],
    [
      "Jl_Lawu_Utara",
      1.11,
      2.5
    ],
    [
      "Terminal",
      0.8,
      1.4
    ]
  ],
  4: [
    [
      "Jl_Nano",
      1.03,
      2.8
    ],
    [
      "Simpang_Pasar",
      1.03,
      2.8
    ],
    [
      "Terminal",
      1.23,
      1.6
    ]
  ],
  5: [
    [
      "Jl_Nano",
      1.67,
      3.5
    ],
    [
      "Simpang_Pasar",
      1.67,
      3.5
    ]
  ],
  6: [
    [
      "Simpang_Beji",
      1,
      2.6
    ],
    [
      "Jl_Lawu_Utara",
      1.75,
      4.1
    ],
    [
      "Terminal",
      1.06,
      2
    ],
    [
      "Simpang_Pasar",
      0.31,
      0.7
    ]
  ],
  7: [
    [
      "Bukit_Sekipan",
      0.1,
      0.3
    ],
    [
      "Sekipan_Tengah",
      2.26,
      3.8
    ]
  ],
  8: [
    [
      "Kramat_Utara",
      0.86,
      1.5
    ],
    [
      "Jl_Lawu_Utara",
      3.93,
      5.2
    ]
  ],
  9: [
    [
      "Kramat_Tengah",
      0.3,
      0.6
    ],
    [
      "Simpang_Kramat",
      1.8,
      2.3
    ]
  ],
  10: [
    [
      "Kramat_Tengah",
      0.22,
      0.7
    ],
    [
      "Jl_Sekipan",
      4.62,
      7.7
    ]
  ],
  11: [
    [
      "Kramat_Tengah",
      0.11,
      0.3
    ],
    [
      "Jl_Sekipan",
      4.5,
      7.4
    ]
  ],
  12: [
    [
      "Kramat_Tengah",
      0.28,
      0.6
    ],
    [
      "Jl_Sekipan",
      4.06,
      6.7
    ]
  ],
  13: [
    [
      "Kramat_Tengah",
      0.32,
      0.8
    ],
    [
      "Jl_Sekipan",
      4.41,
      7.2
    ]
  ],
  14: [
    [
      "Jl_Blumbang",
      0.38,
      0.9
    ],
    [
      "Terminal",
      2.97,
      7.3
    ]
  ],
  15: [
    [
      "Simpang_Beji",
      0.19,
      0.5
    ],
    [
      "Simpang_Kramat",
      0.31,
      0.9
    ],
    [
      "Terminal",
      1.2,
      1.9
    ]
  ],
  16: [
    [
      "Jl_Pancot",
      2.62,
      4.1
    ],
    [
      "Simpang_Kramat",
      3.11,
      4.5
    ]
  ],
  17: [
    [
      "Kramat_Tengah",
      0.25,
      0.6
    ],
    [
      "Jl_Sekipan",
      4.34,
      7
    ]
  ],
  18: [
    [
      "Jl_Blumbang",
      1.26,
      5
    ],
    [
      "Terminal",
      2.42,
      7.7
    ]
  ],
  19: [
    [
      "Kramat_Utara",
      0.46,
      1
    ],
    [
      "Gondosuli",
      1.39,
      2.7
    ]
  ],
  20: [
    [
      "Simpang_Kramat",
      0.56,
      1.5
    ],
    [
      "Jl_Lawu_Utara",
      0.56,
      1.4
    ],
    [
      "Jl_Nano",
      1.49,
      3.4
    ],
    [
      "Simpang_Pasar",
      1.49,
      3.4
    ],
    [
      "Terminal",
      0.96,
      1.4
    ]
  ],
  21: [
    [
      "Jalur_Tembus",
      1.56,
      6.8
    ],
    [
      "Gondosuli",
      5.04,
      12.6
    ]
  ],
  22: [
    [
      "Kramat_Tengah",
      0.29,
      0.8
    ],
    [
      "Jl_Sekipan",
      4.68,
      7.9
    ]
  ],
  23: [
    [
      "Terminal",
      7.62,
      16.1
    ],
    [
      "Gondosuli",
      10.98,
      20.2
    ],
    [
      "Jl_Blumbang",
      5.04,
      9.8
    ]
  ],
  24: [
    [
      "Sekipan_Tengah",
      0.84,
      2
    ],
    [
      "Jl_Sekipan",
      3.26,
      6.7
    ]
  ],
  25: [
    [
      "Jl_Blumbang",
      0.43,
      1
    ],
    [
      "Terminal",
      3.01,
      7.4
    ]
  ],
  26: [
    [
      "Bukit_Sekipan",
      0.05,
      0.1
    ],
    [
      "Kramat_Tengah",
      0.55,
      1.4
    ]
  ],
  /* 
  27: [
    [
      "Gondosuli",
      0.62,
      1.7
    ],
    [
      "Jl_Nano",
      2.9,
      5
    ],
    [
      "Terminal",
      2.76,
      3.2
    ]
  ],
  */
  28: [
    [
      "Jl_Lawu_Utara",
      0.87,
      2.3
    ],
    [
      "Simpang_Beji",
      1.98,
      5.1
    ],
    [
      "Jl_Sekipan",
      0.26,
      0.7
    ]
  ],
  29: [
    [
      "Jl_Lawu_Utara",
      0.91,
      2.4
    ],
    [
      "Simpang_Beji",
      2.01,
      5.2
    ],
    [
      "Jl_Sekipan",
      0.3,
      0.7
    ]
  ]
};




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

const VERIFIED = {
  16: true,
};

const ALAMAT = {
  1:"Jl. Lawu No.11, Beji, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  2:"Jalan grojogan sèwu beji, RT.04/RW.08, Beji, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  3:"Jl. Lawu Jl. KarangKulon, Beji, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  4:"Jl, Nano, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  5:"Jl. Banjarsari, Nano, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  6:"Jl. Lawu Jl. Bener, Nano, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57128",
  7:"Jl. Sekipan, Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  8:"84QW+5R5, Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  9:"Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  10:"Jl. Sekipan, Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  11:"Jl. Sekipan, Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  12:"Jl. Lawu, Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  13:"RT.3/RW.3, Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  14:"Ombang- Ombang, Blumbang, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  15:"Jl. Nurul Alfiah Street, Beji, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  16:"Jl. Pancot Lor, Jetis, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  17:"Kramat, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  18:"Jl. Watusambang, Watusambang, Plumbon, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  19:"Jalan, Ombang- Ombang, Blumbang, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  20:"Jl. Grojogan sewu Pintu II Ngunut Lor, RT.4/RW.6, Nano, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792, Indonesia",
  21:"Area Hutan, Tawangmangu, Karanganyar Regency, Central Java, Indonesia",
  22:"RT.2/RW.2, Kramat, Kalisoro, Tawangmangu, Surakarta, Central Java 57792, Indonesia",
  23:"Nglurah, Pleseran, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792, Indonesia",
  24:"Kalisoro, Tawangmangu, Karanganyar Regency, Central Java, Indonesia",
  25:"Area Hutan Lindung, Blumbang, Tawangmangu, Karanganyar Regency, Central Java, Indonesia",
  26:"Kramat, Kalisoro, Tawangmangu, Karanganyar Regency, Central Java, Indonesia",
  28:"Tawangmangu Beji RT04 RW08 Gang Jambu, Beji, Tawangmangu, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  29:"Jl. Lawu Kav. 150-151 Tawangmangu, Kalisoro, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
};

const DATA = [
  {id:1, nama:"Hotel Agro Tawangmangu",tipe:"Hotel",rating:4.5,ulasan:38,harga:230294,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6637,lon:111.1248},
  {id:2, nama:"Samara Homestay",tipe:"Homestay",rating:4.6,ulasan:143,harga:205159,wifi:1,parkir:1,ac:0,kolam:0,sarapan:1,lat:-7.6641,lon:111.1272},
  {id:3, nama:"Hotel Grand Bintang",tipe:"Hotel",rating:3.9,ulasan:1544,harga:308035,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6665,lon:111.1248},
  {id:4, nama:"ARTICA Hotel & Homestay",tipe:"Hotel",rating:4.6,ulasan:72,harga:270270,wifi:1,parkir:1,ac:0,kolam:1,sarapan:1,lat:-7.668,lon:111.1285},
  {id:5, nama:"RedDoorz near Grojogan Sewu",tipe:"Hotel",rating:4.2,ulasan:382,harga:146027,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.664885,lon:111.1313518},
  {id:6, nama:"Hotel Bintang Tawangmangu",tipe:"Hotel",rating:3.8,ulasan:1797,harga:284428,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6695,lon:111.1268},
  {id:7, nama:"Red Chilies Hill Hotel",tipe:"Hotel",rating:3.6,ulasan:98,harga:174038,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6690371,lon:111.1438578},
  {id:8, nama:"De Jempol Tawangmangu",tipe:"Hotel",rating:4.7,ulasan:73,harga:212406,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6619725,lon:111.1469784},
  {id:9, nama:"RedDoorz Hotel Tejomoyo Near Bukit Sekipan Tawangmangu",tipe:"Hotel",rating:4.3,ulasan:270,harga:123337,wifi:1,parkir:1,ac:1,kolam:0,sarapan:0,lat:-7.6634271,lon:111.1405778},
  {id:10, nama:"Villa Batumarta",tipe:"Villa",rating:4.3,ulasan:140,harga:1249560,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6658627,lon:111.1430862},
  {id:11, nama:"Villa SEMESTA Tawangmangu",tipe:"Villa",rating:4.9,ulasan:55,harga:800000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6648418,lon:111.1431418},
  {id:12, nama:"Villa Pandawa Tawangmangu",tipe:"Villa",rating:4.3,ulasan:98,harga:685186,wifi:1,parkir:1,ac:0,kolam:0,sarapan:1,lat:-7.6634656,lon:111.1407279},
  {id:13, nama:"Pondok Jempol 1",tipe:"Guest House",rating:4.5,ulasan:186,harga:134356,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6632833,lon:111.1433643},
  {id:14, nama:"Villa Roemah Iboek",tipe:"Villa",rating:4.9,ulasan:52,harga:1500000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:1,lat:-7.6834,lon:111.1248},
  {id:15, nama:"Villa Sulthon",tipe:"Villa",rating:4.4,ulasan:33,harga:1571612,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6635,lon:111.1255},
  {id:16, nama:"Villa Kusuma Tawangmangu",tipe:"Villa",rating:5,ulasan:7,harga:1200000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6588301,lon:111.1424162},
  {id:17, nama:"Allura Azana Resort",tipe:"Resort",rating:4.7,ulasan:1641,harga:352000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6636846,lon:111.143252},
  {id:18, nama:"Atsiri Glamping",tipe:"Glamping",rating:4.7,ulasan:207,harga:1307741,wifi:1,parkir:1,ac:1,kolam:0,sarapan:1,lat:-7.6782,lon:111.1264},
  {id:19, nama:"Tawangmangu Wonder Park",tipe:"Hotel",rating:4.5,ulasan:3834,harga:450000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:1,lat:-7.6599967,lon:111.1450153},
  {id:20, nama:"Nava Hotel Tawangmangu",tipe:"Hotel",rating:4.8,ulasan:10080,harga:480000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6631,lon:111.1231},
  {id:21, nama:"Diiza Glamping Tawangmangu",tipe:"Glamping",rating:4.8,ulasan:6,harga:400000,wifi:1,parkir:1,ac:1,kolam:1,sarapan:1,lat:-7.6757,lon:111.1389},
  {id:22, nama:"Glamping Bahagia Sekipan Tawangmangu Mitra RedDoorz",tipe:"Glamping",rating:4.9,ulasan:40,harga:400000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6658991,lon:111.1436957},
  {id:23, nama:"SCENIC GLAMPING",tipe:"Villa",rating:5,ulasan:15,harga:700000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.7025,lon:111.126},
  {id:24, nama:"Naomi Villa Tawangmangu",tipe:"Villa",rating:4.6,ulasan:12,harga:1300000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6609423,lon:111.1344069},
  {id:25, nama:"HANA Villa Syariah",tipe:"Villa",rating:4.9,ulasan:32,harga:1700000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.683,lon:111.126},
  {id:26, nama:"Villa Nuansa Tawangmangu",tipe:"Villa",rating:4.9,ulasan:3791,harga:1680000,wifi:1,parkir:1,ac:0,kolam:1,sarapan:0,lat:-7.6685409,lon:111.1437225},
  // id:27 (Sakura Hills Tawangmangu) di-exclude — OSRM publik snap ke jalan yg tidak benar2 tembus
  {id:28, nama:"Homestay Wahyu Utomo",tipe:"Homestay",rating:4.4,ulasan:82,harga:160000,wifi:1,parkir:1,ac:0,kolam:0,sarapan:0,lat:-7.6558,lon:111.1298},
  {id:29, nama:"Hotel Komajaya Komaratih",tipe:"Hotel",rating:4.2,ulasan:491,harga:120000,wifi:1,parkir:1,ac:1,kolam:0,sarapan:1,lat:-7.6564,lon:111.1304},
].map(d => ({ ...d, alamat: ALAMAT[d.id] || "", verified: !!VERIFIED[d.id] }));


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
  return list.map(d => ({
    ...d,
    norm_harga:   hMax===hMin ? 1 : (hMax-d.harga)/(hMax-hMin),
    norm_rating:  rMax===rMin ? 1 : (d.rating-rMin)/(rMax-rMin),
    norm_wifi:    d.wifi,
    norm_parkir:  d.parkir,
    norm_ac:      d.ac,
    norm_kolam:   d.kolam,
    norm_sarapan: d.sarapan,
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

async function jarakWaktuOSRM(lat1, lon1, lat2, lon2) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== "Ok") {
      const km = haversine(lat1, lon1, lat2, lon2) * 1.4;
      return { km, menit: (km / 18) * 60 };
    }
    return {
      km: data.routes[0].distance / 1000,
      menit: data.routes[0].duration / 60,
    };
  } catch {
    const km = haversine(lat1, lon1, lat2, lon2) * 1.4;
    return { km, menit: (km / 18) * 60 };
  }
}

const ROAD_NODES_COORD = {
  Terminal: { lat: -7.6688, lon: 111.1195 },
  Simpang_Pasar:   { lat: -7.6695, lon: 111.1290 },
  Jalur_Grojogan:  { lat: -7.6710, lon: 111.1320 },
  Jalur_Tembus:    { lat: -7.6700, lon: 111.1305 },
  Jl_Lawu_Utara:   { lat: -7.6600, lon: 111.1260 },
  Simpang_Kramat:  { lat: -7.6645, lon: 111.1265 },
  Simpang_Beji:    { lat: -7.6640, lon: 111.1272 },
  Jl_Sekipan:       { lat: -7.6546, lon: 111.1286 },
  Jl_Pancot:       { lat: -7.6675, lon: 111.1330 },
  Jl_Nano:         { lat: -7.6698, lon: 111.1295 },
  Jl_Blumbang:     { lat: -7.6810, lon: 111.1261 },
  Gondosuli:       { lat: -7.6690, lon: 111.1410 },
  Sekipan_Tengah:  { lat: -7.6688, lon: 111.1345 },
  Bukit_Sekipan:   { lat: -7.6679918, lon: 111.1438577 },
  Kramat_Tengah:   { lat: -7.664352,  lon: 111.142549  },
  Kramat_Utara:    { lat: -7.660985,  lon: 111.145997  },
};
const NODE_LABEL = {
  Terminal:       "Terminal Tawangmangu",
  Simpang_Pasar:  "Simpang Pasar",
  Jalur_Grojogan: "Jalur Grojogan Sewu",
  Jalur_Tembus:   "Jalur Tembus Kalisoro",
  Jl_Lawu_Utara:  "Jl. Lawu Utara",
  Simpang_Kramat: "Simpang Kramat",
  Simpang_Beji:   "Simpang Beji",
  Jl_Sekipan:     "Jl. Sekipan, Kramat",
  Jl_Pancot:      "Jl. Pancot, Kalisoro",
  Jl_Nano:        "Jl. Nano, Tawangmangu",
  Jl_Blumbang:    "Kawasan Blumbang",
  Gondosuli:      "Kawasan Gondosuli",
  Sekipan_Tengah: "Sekipan Tengah",
  Bukit_Sekipan:  "Kawasan Bukit Sekipan, Kramat",
  Kramat_Tengah:  "Kawasan Kramat Tengah, Kalisoro",
  Kramat_Utara:   "Kawasan Kramat Utara, Kalisoro",
};

function buildSymmetricGraph(graphDasar) {
  const graph = {};
  for (const [node, edges] of Object.entries(graphDasar)) {
    if (!graph[node]) graph[node] = [];
    for (const [to, w, t] of edges) {
      if (!graph[node].some(([n]) => n === to)) graph[node].push([to, w, t]);
      if (!graph[to]) graph[to] = [];
      if (!graph[to].some(([n]) => n === node)) graph[to].push([node, w, t]);
    }
  }
  return graph;
}

function dijkstraTanpaLewatProperti(graph, start, topN) {
  const idProperti = new Set(topN.map(p => `P_${p.id}`));
  const dist = {}, prev = {};
  const Q = new Set(Object.keys(graph));
  for (const n of Q) dist[n] = Infinity;
  dist[start] = 0;
  while (Q.size) {
    let u = null;
    for (const n of Q) if (u===null || dist[n]<dist[u]) u=n;
    if (dist[u]===Infinity) break;
    Q.delete(u);
    if (idProperti.has(u)) continue;
    for (const [v, w] of (graph[u]||[])) {
      if (!Q.has(v)) continue;
      const alt = dist[u] + w;
      if (alt < dist[v]) { dist[v]=alt; prev[v]=u; }
    }
  }
  return { dist, prev };
}

function RouteMap({ originLat, originLon, jalurKeys, destLat, destLon, destNama }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!window.L || !mapRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = window.L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([originLat, originLon], 14);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    const coords = [[originLat, originLon]];
    (jalurKeys || []).slice(1, -1).forEach(k => {
      const c = ROAD_NODES_COORD[k];
      if (c) coords.push([c.lat, c.lon]);
    });
    coords.push([destLat, destLon]);

    const polyline = window.L.polyline(coords, { color: C.rosewoodDark, weight: 4, opacity: 0.85, dashArray: "1 8", lineCap: "round" }).addTo(map);

    window.L.circleMarker([originLat, originLon], { radius: 7, color: C.rosewoodDark, fillColor: C.teal, fillOpacity: 1, weight: 2 })
      .addTo(map).bindPopup('Lokasi Anda');

    (jalurKeys || []).slice(1, -1).forEach(k => {
      const c = ROAD_NODES_COORD[k];
      if (c) {
        window.L.circleMarker([c.lat, c.lon], { radius: 5, color: C.tealDeep, fillColor: C.teal, fillOpacity: 1, weight: 2 })
          .addTo(map).bindPopup(NODE_LABEL[k] || k);
      }
    });

    window.L.circleMarker([destLat, destLon], { radius: 8, color: C.rosewoodDark, fillColor: C.gold, fillOpacity: 1, weight: 2 })
      .addTo(map).bindPopup(destNama);

    map.fitBounds(polyline.getBounds(), { padding: [28, 28] });
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [originLat, originLon, jalurKeys, destLat, destLon]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: 320, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }} />
  );
}

function rekonstruksiJalur(prev, tujuan) {
  const jalur = [];
  let node = tujuan;
  while (node) { jalur.unshift(node); node = prev[node]; }
  return jalur;
}

function hitungWaktuSepanjangJalur(jalurKeys, graph) {
  let totalMenit = 0;
  for (let i = 0; i < jalurKeys.length - 1; i++) {
    const u = jalurKeys[i], v = jalurKeys[i+1];
    const edge = (graph[u] || []).find(([node]) => node === v);
    if (edge) totalMenit += edge[2] ?? 0;
  }
  return totalMenit;
}

async function hitungRute(topN, originLat, originLon) {
  const graph = buildSymmetricGraph(GRAPH_DASAR);

  for (const p of topN) {
    const key = `P_${p.id}`;
    const koneksi = KONEKSI[p.id] || [];
    graph[key] = koneksi.map(([n, w, t]) => [n, w, t]);
    for (const [n, w, t] of koneksi) {
      if (!graph[n]) graph[n] = [];
      graph[n].push([key, w, t]);
    }
  }

  const roadNodes = Object.keys(ROAD_NODES_COORD);
  const hasilOrigin = await Promise.all(
    roadNodes.map(rn => {
      const c = ROAD_NODES_COORD[rn];
      return jarakWaktuOSRM(originLat, originLon, c.lat, c.lon);
    })
  );

  let idxTerdekat = 0;
  for (let i = 1; i < roadNodes.length; i++) {
    if (hasilOrigin[i].km < hasilOrigin[idxTerdekat].km) idxTerdekat = i;
  }
  const nodeTerdekat = roadNodes[idxTerdekat];
  const { km: kmTerdekat, menit: menitTerdekat } = hasilOrigin[idxTerdekat];

  graph["Origin"] = [[nodeTerdekat, kmTerdekat, menitTerdekat]];
  if (!graph[nodeTerdekat]) graph[nodeTerdekat] = [];
  graph[nodeTerdekat].push(["Origin", kmTerdekat, menitTerdekat]);

  const { dist, prev } = dijkstraTanpaLewatProperti(graph, "Origin", topN);

  const peta = {};
  for (const p of topN) {
    const key = `P_${p.id}`;
    const jalurKeys = rekonstruksiJalur(prev, key);
    const waktuMenit = hitungWaktuSepanjangJalur(jalurKeys, graph);
    peta[p.id] = {
      jarakKm: dist[key] === Infinity ? null : +dist[key].toFixed(2),
      waktuMenit: dist[key] === Infinity ? null : +waktuMenit.toFixed(1),
      jalurKeys,
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

function fmtMenit(menit) {
  if (menit === null || menit === undefined) return "—";
  const m = Math.round(menit);
  if (m < 60) return `${m} mnt`;
  const jam = Math.floor(m / 60), sisa = m % 60;
  return sisa > 0 ? `${jam} j ${sisa} mnt` : `${jam} jam`;
}


function hitungNilaiAkhir(topN, ruteMap, wJarak = 0.3) {
  const denganJarak = topN.map(p => ({
    ...p,
    jarakKm: ruteMap[p.id]?.jarakKm ?? null,
    jalur:   ruteMap[p.id]?.jalur   ?? [],
    jalurKeys: ruteMap[p.id]?.jalurKeys ?? [],
    estimasiWaktu: fmtMenit(ruteMap[p.id]?.waktuMenit),
  }));

  const ahpMax = Math.max(...denganJarak.map(d=>d.skorAHP));
  const ahpMin = Math.min(...denganJarak.map(d=>d.skorAHP));

  const terjangkau = denganJarak.filter(d => d.jarakKm !== null);
  const jarMax = terjangkau.length ? Math.max(...terjangkau.map(d=>d.jarakKm)) : 0;
  const jarMin = terjangkau.length ? Math.min(...terjangkau.map(d=>d.jarakKm)) : 0;

  const hasil = denganJarak.map(d => {
    const ahpNorm = ahpMax===ahpMin ? 1 : (d.skorAHP-ahpMin)/(ahpMax-ahpMin);

    if (d.jarakKm === null) {
      return { ...d, ahpNorm, jarNorm: 1, nilaiAkhir: (1-wJarak)*ahpNorm, takTerjangkau: true };
    }
    const jarNorm = jarMax===jarMin ? 0 : (d.jarakKm-jarMin)/(jarMax-jarMin);
    const nilaiAkhir = (1-wJarak)*ahpNorm + wJarak*(1-jarNorm);
    return { ...d, ahpNorm, jarNorm, nilaiAkhir, takTerjangkau: false };
  });

  return hasil.sort((a, b) => {
    if (a.takTerjangkau !== b.takTerjangkau) return a.takTerjangkau ? 1 : -1;
    return b.nilaiAkhir - a.nilaiAkhir;
  });
}

const fmtKm = km => km === null || km === undefined ? "—" : km < 1 ? (km*1000).toFixed(0)+" m" : km.toFixed(1)+" km";

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
function IconMap({ size=13, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
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
const KRITERIA_ICON = {
  harga: ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  rating: ({ size=12, color="currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  wifi: IconWifi,
  parkir: IconParkir,
  ac: IconAC,
  kolam: IconKolam,
  sarapan: IconSarapan,
};
const FAC_ICON = {
  "Wi-Fi": IconWifi, "Parkir": IconParkir, "AC": IconAC,
  "Kolam Renang": IconKolam, "Kolam": IconKolam, "Sarapan": IconSarapan,
};

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

function RankBadge({ rank }) {
  return (
    <span style={{
      fontSize:10,fontWeight:700,
      color:C.goldDeep,background:C.goldSoft,border:`1px solid ${C.goldBorder}`,
      borderRadius:4,padding:"2px 8px",letterSpacing:".05em",
    }}>#{rank}</span>
  );
}

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

function RincianSkor({ p, dark=false }) {
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

  const lokasiLabel = p.takTerjangkau ? "Tidak terjangkau"
    : p.jarNorm <= 0.25 ? "Dekat"
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
          left:0,minWidth:220,zIndex:10,
          padding:"11px 12px",borderRadius:8,background:bg,
          border:`1px solid rgba(226,199,129,.55)`,
          boxShadow:"0 4px 20px rgba(0,0,0,.35)",
          display:"flex",flexDirection:"column",gap:8,
        }}>
          <SkorBaris label="Preferensi" value={ahpLabel} nilai={p.ahpNorm}
            warna={dark ? C.goldDeep : C.tealDeep} track={C.border} txt={txt} muted={muted} />
          <SkorBaris label="Lokasi" value={`${lokasiLabel} · ${fmtKm(p.jarakKm)}`} nilai={1 - p.jarNorm}
            warna={dark ? C.goldDeep : C.tealDeep} track={C.border} txt={txt} muted={muted} />
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

function SkorBaris({ label, value, nilai, warna, track, txt, muted }) {
  const pct = Math.round(nilai * 100);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:3}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8}}>
        <div>
          <span style={{fontSize:11,fontWeight:600,color:txt}}>{label}: </span>
          <span style={{fontSize:11,color:txt}}>{value}</span>
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
  const [expanded, setExpanded] = useState(false);
  if (!jalur || jalur.length === 0) return null;

  const PANJANG_MAKS = 4;
  const perluCollapse = jalur.length > PANJANG_MAKS && !expanded;
  const tampil = perluCollapse
    ? [jalur[0], jalur[1], "...", jalur[jalur.length-1]]
    : jalur;

  return (
    <div style={{
      display:"flex",alignItems:"center",flexWrap:"wrap",gap:3,
      padding:"7px 10px",borderRadius:7,
      background: dark ? "rgba(0,0,0,.20)" : C.rosewoodSoft,
      border: dark ? "1px solid rgba(0,0,0,.25)" : `1px solid ${C.rosewoodBorder}`,
    }}>
      <span style={{flexShrink:0}}>
        <IconRoute size={13} color={dark ? "#fff" : C.rosewoodDark} />
      </span>
      {tampil.map((node, i) => {
        const isLast = i === tampil.length - 1;
        return (
          <span key={i} style={{display:"flex",alignItems:"center",gap:3,flexShrink:0, ...(isLast && {flex:"0 1 auto",minWidth:0})}}>
            {node === "..." ? (
              <button
                onClick={()=>setExpanded(true)}
                style={{
                  fontSize:10,fontWeight:700,
                  color: dark ? "#fff" : C.rosewoodDark,
                  background: dark ? "rgba(255,255,255,.10)" : C.rosewoodSoft,
                  border: dark ? "none" : `1px solid ${C.rosewoodBorder}`,
                  borderRadius:4,padding:"1px 6px",
                  cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
                  flexShrink:0,
                }}
              >
                +{jalur.length - 3} lainnya
              </button>
            ) : (
              <span style={{
                fontSize:10,
                fontWeight:i===0||isLast?700:400,
                color: dark
                  ? (i===0||isLast ? "#fff" : "rgba(255,255,255,.60)")
                  : C.rosewoodDark,
                whiteSpace: isLast ? "normal" : "nowrap",
              }}>{node}</span>
            )}
            {i < tampil.length-1 && tampil[i] !== "..." && (
              <span style={{fontSize:10,color: dark ? "rgba(255,255,255,.50)" : C.rosewoodDark,flexShrink:0}}>›</span>
            )}
          </span>
        );
      })}
      {expanded && jalur.length > PANJANG_MAKS && (
        <button
          onClick={()=>setExpanded(false)}
          style={{
            fontSize:9,fontWeight:600,
            color: dark ? "rgba(255,255,255,.55)" : C.muted,
            background:"none",border:"none",cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif",marginLeft:4,
          }}
        >
          (tutup)
        </button>
      )}
    </div>
  );
}

function RouteMapModal({ open, onClose, p, originLat, originLon }) {
  if (!open || !p) return null;
  return (
    <div
      onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}
      style={{position:"fixed",inset:0,background:"rgba(43,33,24,.65)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
    >
      <div style={{background:C.cream,borderRadius:16,padding:22,width:"min(94vw,640px)",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 16px 60px rgba(61,44,30,.3)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,gap:10}}>
          <div>
            <div style={{fontSize:9.5,fontWeight:700,letterSpacing:".13em",textTransform:"uppercase",color:C.teal,marginBottom:3}}>
              Peta Rute Dijkstra
            </div>
            <div style={{fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:C.rosewoodDark}}>
              {p.nama}
            </div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.muted,flexShrink:0}}>×</button>
        </div>

        <div style={{marginBottom:10}}>
          <RutePill jalur={p.jalur} />
        </div>

        <RouteMap
          originLat={originLat}
          originLon={originLon}
          jalurKeys={p.jalurKeys}
          destLat={p.lat}
          destLon={p.lon}
          destNama={p.nama}
        />

        <div style={{display:"flex",gap:14,marginTop:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11.5,color:C.muted}}>
            <span style={{width:10,height:10,borderRadius:"50%",background:C.teal,display:"inline-block"}} />
            Lokasi Anda & simpul jalan
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11.5,color:C.muted}}>
            <span style={{width:10,height:10,borderRadius:"50%",background:C.gold,display:"inline-block"}} />
            {p.nama}
          </div>
        </div>
        <div style={{fontSize:11,color:C.muted,marginTop:8,lineHeight:1.5}}>
          Garis putus-putus menggambarkan urutan simpul graph hasil algoritma Dijkstra, bukan rute jalan sesungguhnya. Jarak tempuh aktual: {fmtKm(p.jarakKm)} ({p.estimasiWaktu}).
        </div>
      </div>
    </div>
  );
}
 
export default function TawangStay() {
  const [pref, setPref] = useState(Object.fromEntries(KRITERIA.map(k=>[k,3])));
  const [jumlah, setJumlah]       = useState(10);
  const [wJarak, setWJarak]       = useState(30);
  const [originLat, setOriginLat] = useState(-7.6688);
  const [originLon, setOriginLon] = useState(111.1195);
  const [originLabel, setOriginLabel] = useState("Terminal Tawangmangu (Klik untuk Ubah)");
  const [isDefaultLocation, setIsDefaultLocation] = useState(true);
  const [locInput, setLocInput]   = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hasil, setHasil]         = useState(null);
  const [crInfo, setCrInfo]       = useState(null);
  const [crError, setCrError]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [view, setView]           = useState("form");
  const [routeModalFor, setRouteModalFor] = useState(null);
  const [openKriteria, setOpenKriteria] = useState(null);

  const setPrefVal = (k, v) => setPref(p => ({...p, [k]: v}));
  const toggleKriteria = (k) => setOpenKriteria(o => o === k ? null : k);

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
      setView("hasil");
    } finally {
      setLoading(false);
    }
  }, [pref, jumlah, originLat, originLon, wJarak]);

  const kembaliKeForm = () => setView("form");

  return (
    <div style={{
      background:C.cream,minHeight:"100vh",
      fontFamily:"'DM Sans',sans-serif",color:C.ink,fontSize:14,
      width:"100%",maxWidth:"100%",overflowX:"hidden",boxSizing:"border-box",
      position:"relative",
    }}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .ts-fade { animation: fadeIn .35s ease both; }
      `}</style>

      <header style={{
        position:"relative",
        padding:"38px 40px 26px",
        background:`linear-gradient(135deg, ${C.cream} 0%, #F2EDD8 100%)`,
        borderBottom:`1px solid ${C.border}`,
      }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
          <div>
            <div style={{
                display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",
                color:C.teal,background:C.tealSoft,border:`1px solid ${C.tealBorder}`,
                borderRadius:20,padding:"4px 12px",marginBottom:10,
              }}>
                Sistem Rekomendasi Penginapan di Tawangmangu
              </div>
              <h1 style={{
                fontFamily:"Georgia,serif",fontSize:44,fontWeight:900,lineHeight:1,
                color:C.rosewoodDark,margin:0,letterSpacing:".01em",
              }}>
                Tawang<span style={{color:C.teal}}>Stay</span>
              </h1>
              <div style={{
                fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:13,fontWeight:600,
                letterSpacing:".02em",color:C.rosewoodDark,opacity:.65,
                marginTop:12,
              }}>
                Berbasis Analytical Hierarchy Process & Algoritma Dijkstra
              </div>
          </div>

          {view === "hasil" && (
            <button
              onClick={kembaliKeForm}
              style={{
                display:"flex",alignItems:"center",gap:7,
                padding:"10px 18px",borderRadius:30,
                background:"#fff",border:`1.5px solid ${C.border}`,
                color:C.rosewoodDark,fontWeight:700,fontSize:12.5,
                fontFamily:"'DM Sans',sans-serif",cursor:"pointer",
                boxShadow:"0 4px 14px rgba(124,93,90,.12)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Atur Ulang Preferensi
            </button>
          )}
        </div>
      </header>

      {view === "form" && (
        <main className="ts-fade" style={{padding:"24px 40px 56px",display:"flex",flexDirection:"column",gap:32}}>
          <div style={{display:"grid",gridTemplateColumns:"400px minmax(0,1fr)",gap:36,alignItems:"start"}}>
            <div style={{
                display:"flex",flexDirection:"column",gap:14,
                background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:18,
                padding:"22px 20px",boxShadow:"0 8px 24px rgba(124,93,90,.08)",
                alignSelf:"start",
              }}>
              <div style={{
                fontSize:11,fontWeight:900,letterSpacing:".08em",textTransform:"uppercase",
                color:C.rosewoodDark,
                lineHeight:1,WebkitTextStroke:"0.2px currentColor",
              }}>
                Atur Preferensi Anda
              </div>

              <div style={{
                fontSize:8.5,fontWeight:700,letterSpacing:".04em",textTransform:"uppercase",
                color:C.rosewood,marginTop:-3,
                lineHeight:1,
              }}>
                Ketuk tiap baris untuk membuka pengaturan
              </div>

              <div style={{
                display:"flex",flexDirection:"column",
                border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",
              }}>
                {KRITERIA.map((k, idx) => {
                  const Icon = KRITERIA_ICON[k];
                  const isOpen = openKriteria === k;
                  return (
                    <div
                      key={k}
                      style={{
                        borderTop: idx === 0 ? "none" : `1px solid ${C.border}`,
                      }}
                    >
                      <button
                        onClick={() => toggleKriteria(k)}
                        style={{
                          width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
                          gap:10,padding:"11px 12px",background: isOpen ? C.tealSoft : "#fff",
                          border:"none",cursor:"pointer",textAlign:"left",
                          transition:"background .15s",
                        }}
                      >
                        <span style={{display:"flex",alignItems:"center",gap:9,minWidth:0}}>
                          {Icon && (
                            <span style={{
                              width:24,height:24,borderRadius:7,flexShrink:0,
                              background:C.tealSoft,display:"flex",alignItems:"center",justifyContent:"center",
                            }}>
                              <Icon size={13} color={C.tealDeep} />
                            </span>
                          )}
                          <span style={{fontSize:13.5,fontWeight:700,color:C.rosewoodDark,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                            {LABEL_KRITERIA[k]}
                          </span>
                        </span>
                        <span style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                          <span style={{
                            fontSize:11,fontWeight:700,color:"#fff",
                            background:C.teal,borderRadius:20,padding:"2px 9px",minWidth:18,textAlign:"center",
                          }}>{pref[k]}</span>
                          <svg
                            width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke={C.rosewoodDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ transform: isOpen ? "rotate(180deg)" : "none", transition:"transform .2s", flexShrink:0 }}
                          >
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </span>
                      </button>

                      <div style={{
                        maxHeight: isOpen ? 160 : 0,
                        overflow:"hidden",
                        transition:"max-height .2s ease",
                        background:C.cardBg,
                      }}>
                        <div style={{padding:"4px 14px 14px"}}>
                          <input
                            type="range" min={1} max={5} value={pref[k]}
                            onChange={e => setPrefVal(k, +e.target.value)}
                            style={{
                              WebkitAppearance:"none",width:"100%",height:5,borderRadius:3,
                              outline:"none",cursor:"pointer",margin:"6px 0",
                              background:`linear-gradient(to right,${C.teal} 0%,${C.teal} ${((pref[k]-1)/4)*100}%,${C.border} ${((pref[k]-1)/4)*100}%,${C.border} 100%)`,
                            }}
                          />
                          <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>
                            Seberapa penting {LABEL_KRITERIA[k].toLowerCase()} menjadi faktor pertimbangan anda dalam memilih penginapan?
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                background:C.rosewoodSoft,border:`1px solid ${C.rosewoodBorder}`,
                borderRadius:14,padding:"14px 16px",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:7,fontSize:13.5,fontWeight:700,color:C.rosewoodDark,marginBottom:10}}>
                  <span style={{
                    width:24,height:24,borderRadius:7,flexShrink:0,
                    background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    <IconRoute size={13} color={C.rosewood} />
                  </span>
                  Komposisi Penilaian
                </div>

                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{
                    fontSize:11,fontWeight:700,color:C.cream,
                    background:C.rosewood,borderRadius:20,padding:"2px 9px",minWidth:54,textAlign:"center",
                  }}>Jarak {wJarak}%</span>
                  <span style={{
                    fontSize:11,fontWeight:700,color:C.tealDeep,
                    background:"#fff",border:`1px solid ${C.tealBorder}`,
                    borderRadius:20,padding:"2px 9px",minWidth:54,textAlign:"center",
                  }}>AHP {100 - wJarak}%</span>
                </div>

                <input
                  type="range" min={0} max={100} value={wJarak}
                  onChange={e=>setWJarak(+e.target.value)}
                  style={{
                    WebkitAppearance:"none",width:"100%",height:5,borderRadius:3,
                    outline:"none",cursor:"pointer",margin:"6px 0",
                    background:`linear-gradient(to right,${C.rosewood} 0%,${C.rosewood} ${wJarak}%,${C.tealDeep} ${wJarak}%,${C.tealDeep} 100%)`,
                  }}
                />
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:6}}>
                  <span>Kedekatan Lokasi</span>
                  <span>Skor Preferensi (AHP)</span>
                </div>
                <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>
                  Geser ke kanan untuk memprioritaskan jarak terdekat, geser ke kiri untuk memprioritaskan kecocokan preferensi.
                </div>
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:9.5,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:C.rosewoodDark}}>
                  Titik Keberangkatan
                </span>
                <span style={{
                  display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:600,
                  color: !isDefaultLocation ? C.tealDeep : C.muted,
                }}>
                  <span style={{
                    width:7,height:7,borderRadius:"50%",
                    background: !isDefaultLocation ? C.teal : C.borderDark,
                  }} />
                  {!isDefaultLocation ? "Lokasi terpilih" : "Lokasi default"}
                </span>
              </div>

              <div
                onClick={()=>setShowModal(true)}
                style={{
                  borderRadius:28,overflow:"hidden",height:340,position:"relative",
                  cursor:"pointer",border:`1px solid ${C.border}`,
                  boxShadow:"0 14px 36px rgba(124,93,90,.18)",
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
                  background:"linear-gradient(180deg, rgba(61,44,30,0) 55%, rgba(61,44,30,.45) 100%)",
                  pointerEvents:"none",
                }} />
                <div style={{
                  position:"absolute",top:18,right:18,
                  background:"rgba(255,255,255,.92)",color:C.rosewoodDark,
                  fontSize:11,fontWeight:700,padding:"6px 12px",borderRadius:20,
                  display:"flex",alignItems:"center",gap:6,
                  boxShadow:"0 4px 12px rgba(61,44,30,.18)",
                }}>
                  <IconPin size={11} color={C.rosewood} />
                  Klik peta untuk ubah lokasi
                </div>
              </div>

              <button
                onClick={()=>setShowModal(true)}
                style={{
                  alignSelf:"center",
                  background:C.gold,color:"#3D2C0E",
                  fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,
                  padding:"13px 32px",borderRadius:30,border:"none",cursor:"pointer",
                  boxShadow:"0 8px 18px rgba(226,199,129,.45)",
                  maxWidth:"90%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                  transition:"transform .15s, box-shadow .15s",
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 22px rgba(226,199,129,.55)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 8px 18px rgba(226,199,129,.45)"; }}
              >
                {originLabel}
              </button>

              <div style={{
                display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,
                background:"#fff",border:`1.5px solid ${C.border}`,borderRadius:16,
                padding:"16px 18px",
                boxShadow:"0 6px 18px rgba(124,93,90,.10)",
              }}>
                <div>
                  <div style={{fontSize:13.5,fontWeight:700,color:C.rosewoodDark,marginBottom:2}}>
                    Jumlah Penginapan
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>
                    Maksimal 15 hasil rekomendasi
                  </div>
                </div>
                <div style={{
                  display:"flex",alignItems:"stretch",
                  border:`1.5px solid ${C.border}`,borderRadius:12,overflow:"hidden",flexShrink:0,
                }}>
                  <button
                    onClick={()=>setJumlah(j => Math.max(1, (j||1) - 1))}
                    aria-label="Kurangi"
                    style={{
                      width:38,border:"none",borderRight:`1.5px solid ${C.border}`,
                      background:C.cream,fontSize:19,fontWeight:700,color:C.rosewoodDark,
                      cursor:"pointer",lineHeight:1,
                    }}
                  >−</button>
                  <div style={{
                    width:50,display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:17,fontWeight:700,color:C.ink,background:"#fff",
                  }}>
                    {jumlah}
                  </div>
                  <button
                    onClick={()=>setJumlah(j => Math.min(15, (j||0) + 1))}
                    aria-label="Tambah"
                    style={{
                      width:38,border:"none",borderLeft:`1.5px solid ${C.border}`,
                      background:C.cream,fontSize:19,fontWeight:700,color:C.rosewoodDark,
                      cursor:"pointer",lineHeight:1,
                    }}
                  >+</button>
                </div>
              </div>

              <button
                onClick={runAll}
                disabled={loading}
                style={{
                  width:"100%",padding:"16px",borderRadius:14,border:"none",
                  background: loading ? C.muted : C.teal,color:"#fff",
                  fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:15,letterSpacing:".02em",
                  cursor: loading ? "not-allowed" : "pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:9,
                  boxShadow: loading ? "none" : "0 10px 22px rgba(91,178,181,.35)",
                  transition:"transform .15s, box-shadow .15s",
                }}
                onMouseEnter={e=>{ if(!loading){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 26px rgba(91,178,181,.45)"; } }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow= loading ? "none" : "0 10px 22px rgba(91,178,181,.35)"; }}
              >
                {loading ? (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" style={{animation:"spin 0.9s linear infinite"}}>
                      <path d="M21 12a9 9 0 1 1-9-9" />
                    </svg>
                    Menghitung rute...
                  </>
                ) : (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Cari Rekomendasi
                  </>
                )}
              </button>

              {crError && (
                <div style={{
                  fontSize:12,color:"#c00",lineHeight:1.6,
                  background:"#fff5f5",border:"1px solid #f5a0a0",borderRadius:10,padding:"12px 16px",
                }}>
                  <strong>Rasio konsistensi melebihi batas (CR ≥ 0.1).</strong> CR = {crInfo?.cr} (harus &lt; 0.1) — perbedaan preferensi antar kriteria tidak konsisten secara logis. Sesuaikan nilai slider dan coba lagi.
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {view === "hasil" && hasil && (
        <main className="ts-fade" style={{padding:"24px 40px 56px"}}>
          <HasilPanel
            hasil={hasil}
            originLat={originLat}
            originLon={originLon}
            onLihatPeta={(p)=>setRouteModalFor(p)}
          />
        </main>
      )}

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

      <RouteMapModal
        open={!!routeModalFor}
        onClose={()=>setRouteModalFor(null)}
        p={routeModalFor}
        originLat={originLat}
        originLon={originLon}
      />
    </div>
  );
}

function HasilPanel({ hasil, originLat, originLon, onLihatPeta }) {
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
        <FeaturedCard p={best} originLat={originLat} originLon={originLon} onLihatPeta={onLihatPeta} />
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
              <RankCard key={p.id} p={p} rank={i+2} bestScore={bestScore} originLat={originLat} originLon={originLon} onLihatPeta={onLihatPeta} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ p, originLat, originLon, onLihatPeta }) {
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
          <MetaLine ulasan={p.ulasan} alamat={p.alamat} dark />
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
        <RutePill jalur={p.jalur} dark />
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <RincianSkor p={p} dark />
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button
              onClick={()=>onLihatPeta(p)}
              style={{
                display:"flex",alignItems:"center",gap:6,
                padding:"8px 16px",background:"rgba(255,255,255,.10)",
                border:"1.5px solid rgba(255,255,255,.35)",borderRadius:8,
                fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:"#fff",
                cursor:"pointer",letterSpacing:".03em",transition:"all .15s",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.18)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.10)"; }}
            >
              <IconMap size={13} color="#fff" />
              Peta Rute Dijkstra
            </button>
            <button
              onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLon}&destination=${mapsQ}`,"_blank")}
              style={{
                padding:"8px 18px",background:"transparent",
                border:"1.5px solid #fff",borderRadius:8,
                fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:12,color:"#fff",
                cursor:"pointer",letterSpacing:".04em",transition:"all .15s",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; }}
            >
              {p.verified ? "Cek Rute di Google Maps" : "Cek Area di Google Maps"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RankCard({ p, rank, originLat, originLon, onLihatPeta }) {
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
          {p.jarakKm !== null && (
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
      <RincianSkor p={p} />
      <div style={{marginTop:"auto",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
        <button
          onClick={()=>onLihatPeta(p)}
          style={{
            display:"flex",alignItems:"center",gap:4,
            padding:"4px 0",border:"none",background:"transparent",
            color:C.rosewoodDark,fontFamily:"'DM Sans',sans-serif",
            fontWeight:600,fontSize:11.5,cursor:"pointer",letterSpacing:".03em",
            transition:"color .15s",
          }}
          onMouseEnter={e=>e.currentTarget.style.color=C.rosewood}
          onMouseLeave={e=>e.currentTarget.style.color=C.rosewoodDark}
        >
          <IconMap size={12} />
          Peta Rute
        </button>
        <button
          onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLon}&destination=${mapsQ}`,"_blank")}
          style={{
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
          {p.verified ? "Google Maps" : "Google Maps"}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}