import { PersonalInfo, Project, SkillCategory, ExperienceItem, EducationItem, CertificationItem } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Azzahra Attaqina",
  role: "Web Developer & Data Analyst",
  secondaryRole: "Teknik Informatika Student @ Polinema",
  tagline: "Building digital experiences that are simple, useful, and impactful.",
  bio: "Mahasiswa Sarjana Terapan Teknik Informatika di Politeknik Negeri Malang yang memiliki minat besar dalam bidang Web Development dan Data Analytics. Berkomitmen untuk menciptakan solusi digital yang fungsional dan berdampak positif.",
  fullBio: "Mahasiswa Sarjana Terapan Teknik Informatika di Politeknik Negeri Malang yang memiliki minat besar dalam bidang Web Development dan Data Analytics. Memiliki kemampuan dalam mengembangkan aplikasi web responsif serta menganalisis data untuk menghasilkan insight yang bermanfaat. Berkomitmen untuk terus belajar, berkolaborasi, dan berinovasi guna berkembang sebagai talenta digital yang adaptif.",
  email: "azzahraattaqina59@gmail.com",
  location: "Malang, Jawa Timur, Indonesia",
  github: "https://github.com/azzazhr",
  linkedin: "https://www.linkedin.com/in/azzahraattaqina",
  instagram: "https://www.instagram.com/azzazhr._/",
  whatsapp: "6282264651009",
  whatsappMessage: "Halo Azzahra, saya melihat portfolio Anda dan tertarik untuk berdiskusi lebih lanjut.",
  stats: [
    { label: "Projects Completed", value: "5+", numericValue: 5, suffix: "+" },
    { label: "Years Experience", value: "2+", numericValue: 2, suffix: "+" },
    { label: "Sertifikasi & Penghargaan", value: "3", numericValue: 3, suffix: "" },
    { label: "Commitment", value: "100%", numericValue: 100, suffix: "%" },
  ]
};

export const projectsData: Project[] = [
  {
    id: "magang-in",
    title: "Magang.in",
    subtitle: "Sistem Informasi Manajemen Rekomendasi Magang",
    description: "Sistem informasi berbasis web untuk pengelolaan dan rekomendasi magang mahasiswa. Membantu kampus mencatat perusahaan mitra, mengelola lowongan, dan merekomendasikan posisi magang sesuai minat mahasiswa.",
    longDescription: "Magang.in adalah platform manajemen magang komprehensif yang dirancang untuk menjembatani mahasiswa, kampus, dan perusahaan mitra. Memiliki fitur filter lowongan, rekomendasi posisi magang otomatis, dashboard admin kampus, serta tracker pengajuan magang secara terstruktur.",
    image: "/images/magangin.png",
    category: "Web Development",
    technologies: ["Laravel", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/RanggaPtr/SIM-REKOMENDASI-MAGANG-TI2B-KELOMPOK2-2025-NEW",
    isOngoing: false,
  },
  {
    id: "prestasicore",
    title: "PrestasiCore",
    subtitle: "Sistem Rekomendasi Pencatatan Prestasi Mahasiswa",
    description: "Sistem berbasis web untuk pencatatan dan evaluasi prestasi akademik maupun non-akademik mahasiswa dengan pengolahan data terstruktur untuk pelaporan kampus.",
    longDescription: "PrestasiCore memfasilitasi pencatatan prestasi mahasiswa secara digital dengan validasi multi-level (Mahasiswa, Dosen Pembimbing, dan Admin). Sistem ini dilengkapi dengan sistem poin pencatatan prestasi dan pemeringkatan otomatis.",
    image: "/images/prestasicore.png",
    category: "Web Development",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML/CSS"],
    githubUrl: "https://github.com/dedybayu/pbl_presma_kel2",
    isOngoing: false,
  },
  {
    id: "katadata",
    title: "KATADATA",
    subtitle: "Sistem Berita Online & Media Portal",
    description: "Sistem berita online berbasis web yang memungkinkan pengguna membaca berita terkini secara efisien, menjelajahi berbagai kategori, serta memberikan komentar.",
    longDescription: "KATADATA menyajikan berita dengan tampilan responsif, pengelompokan kategori (Teknologi, Politik, Kesehatan, Hiburan), section Trending Articles, serta portal admin untuk pengelolaan artikel dan moderasi komentar secara real-time.",
    image: "/images/katadata.png",
    category: "Web Development",
    technologies: ["MongoDB", "Express / Node.js", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/dedybayu/Project_MongoDB_Basdat",
    isOngoing: false,
  },
  {
    id: "kas-online",
    title: "Kas Online Java",
    subtitle: "Sistem Pengelolaan Kas Mahasiswa Real-Time",
    description: "Aplikasi pengelolaan keuangan & kas berbasis web dan Java yang mendukung pencatatan transaksi kas, denda keterlambatan, dan pemantauan saldo secara transparan.",
    longDescription: "Dikembangkan menggunakan bahasa pemrograman Java untuk backend logic dan web interface. Mendukung penarikan kas, pembayaran bulanan/mingguan, penghitungan denda otomatis, dan ekspor laporan keanggotaan.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    technologies: ["Java", "MySQL", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/riotrip/kas-online-java",
    isOngoing: false,
  },
  {
    id: "bidsmart-app",
    title: "BidSmart App",
    subtitle: "Sistem Lelang Online & Real-time Bidding",
    description: "Platform informasi dan pelaksanaan lelang digital dengan pendaftaran barang, penawaran (bidding) real-time, dan transparansi riwayat harga terbaru.",
    longDescription: "BidSmart membantu meningkatkan efisiensi dan keadilan transaksi lelang. Menampilkan countdown penawaran, proteksi bidding otomatis, serta dashboard riwayat transaksi bagi penjual maupun pembeli.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    technologies: ["Laravel", "JavaScript", "MySQL", "WebSockets"],
    githubUrl: "https://github.com/riotrip/bidsmart-app",
    isOngoing: true,
  },
  {
    id: "multidigit",
    title: "MultiDigit",
    subtitle: "Aplikasi Pengenalan Angka Multidigit",
    description: "Aplikasi mobile berbasis pengenalan citra untuk mengenali angka multidigit melalui kamera maupun unggahan foto. Aplikasi ini memproses gambar untuk mendeteksi dan mengenali angka secara otomatis, sehingga memudahkan pengguna dalam membaca angka dari objek atau dokumen.",
    longDescription: "MultiDigit merupakan aplikasi pengenalan citra cerdas (Image Processing / Computer Vision) yang dirancang untuk mendeteksi dan mengklasifikasikan urutan angka multidigit secara otomatis. Mendukung pengambilan gambar langsung dari kamera smartphone serta pengunggahan foto dari galeri dengan pemrosesan ekstraksi fitur presisi tinggi.",
    image: "/images/multidigit.png",
    category: "Mobile / Desktop",
    technologies: ["Python", "OpenCV", "Machine Learning", "Image Processing", "Mobile App"],
    githubUrl: "https://github.com/Archin0/multidigit-recognition",
    isOngoing: false,
  },
  {
    id: "astraea",
    title: "ASTRAEA",
    subtitle: "Adaptive Traffic Monitoring System",
    description: "Sistem pemantauan lampu lalu lintas adaptif berbasis IoT, Cloud, dan Big Data. Sistem ini memantau kondisi lalu lintas secara real-time dan mengolah data untuk mendukung pengaturan lampu lalu lintas yang lebih adaptif dan efisien.",
    longDescription: "ASTRAEA mengintegrasikan sensor IoT dan analisis Big Data untuk memantau kepadatan kendaraan secara real-time. Memungkinkan kontrol lampu lalu lintas adaptif guna mengurangi kemacetan dan mengoptimalkan durasi sinyal lalu lintas di persimpangan jalan.",
    image: "/images/astraea.png",
    category: "Web Development & IoT",
    technologies: ["IoT", "Cloud Computing", "Big Data", "Python", "YOLO / Computer Vision"],
    githubUrl: "https://github.com/aslamrosul/adaptive-traffic-monitoring",
    isOngoing: false,
  },
];

export const skillCategoriesData: SkillCategory[] = [
  {
    categoryName: "Pengembangan Web (Frontend & Backend)",
    description: "Terampil membangun aplikasi web responsif dan terstruktur dengan menerapkan prinsip UI/UX dan clean code.",
    skills: [
      { name: "HTML5", level: "Advanced", badgeColor: "from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30" },
      { name: "CSS3", level: "Advanced", badgeColor: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30" },
      { name: "JavaScript (ES6+)", level: "Advanced", badgeColor: "from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30" },
      { name: "TypeScript", level: "Intermediate", badgeColor: "from-blue-600/20 to-indigo-600/20 text-blue-300 border-blue-600/30" },
      { name: "React", level: "Intermediate", badgeColor: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30" },
      { name: "Next.js", level: "Intermediate", badgeColor: "from-slate-700/40 to-slate-900/40 text-slate-200 border-slate-700/50" },
      { name: "PHP", level: "Advanced", badgeColor: "from-purple-600/20 to-indigo-600/20 text-purple-300 border-purple-500/30" },
      { name: "Laravel", level: "Advanced", badgeColor: "from-red-600/20 to-rose-600/20 text-red-400 border-red-500/30" },
      { name: "Java", level: "Intermediate", badgeColor: "from-amber-600/20 to-orange-600/20 text-amber-400 border-amber-500/30" },
      { name: "Tailwind CSS", level: "Advanced", badgeColor: "from-teal-500/20 to-cyan-500/20 text-teal-300 border-teal-500/30" },
    ]
  },
  {
    categoryName: "Analisis Data & Database",
    description: "Pengolahan, analisis, visualisasi data, dan manajemen basis data untuk pengambilan keputusan berbasis data.",
    skills: [
      { name: "Python", level: "Advanced", badgeColor: "from-sky-500/20 to-blue-600/20 text-sky-300 border-sky-500/30" },
      { name: "Pandas", level: "Intermediate", badgeColor: "from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30" },
      { name: "Matplotlib", level: "Intermediate", badgeColor: "from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-500/30" },
      { name: "Google Looker Studio", level: "Advanced", badgeColor: "from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30" },
      { name: "Microsoft Excel (VBA/Pivot)", level: "Advanced", badgeColor: "from-emerald-600/20 to-green-600/20 text-emerald-300 border-emerald-500/30" },
      { name: "MySQL", level: "Advanced", badgeColor: "from-blue-600/20 to-slate-700/20 text-blue-300 border-blue-500/30" },
      { name: "MongoDB", level: "Intermediate", badgeColor: "from-green-600/20 to-emerald-700/20 text-green-300 border-green-500/30" },
    ]
  },
  {
    categoryName: "Desain, Tools & Kolaborasi",
    description: "Perancangan UI/UX yang user-friendly serta manajemen versi kode.",
    skills: [
      { name: "Figma", level: "Advanced", badgeColor: "from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/30" },
      { name: "Canva", level: "Advanced", badgeColor: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30" },
      { name: "UI/UX Design", level: "Intermediate", badgeColor: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30" },
      { name: "Git & GitHub", level: "Advanced", badgeColor: "from-slate-700/30 to-zinc-800/30 text-slate-200 border-zinc-700/50" },
      { name: "Postman", level: "Intermediate", badgeColor: "from-orange-600/20 to-amber-600/20 text-orange-300 border-orange-500/30" },
      { name: "Kerja Sama Tim & Komunikasi", level: "Advanced", badgeColor: "from-indigo-500/20 to-violet-500/20 text-indigo-300 border-indigo-500/30" },
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "bnsp-cert",
    position: "Junior Web Developer (Sertifikasi BNSP)",
    organization: "Badan Nasional Sertifikasi Profesi (BNSP)",
    type: "Project-Based Certification",
    period: "2025",
    description: "Mengembangkan aplikasi web responsif menggunakan HTML, CSS, JavaScript, PHP, dan MySQL. Menerapkan prinsip clean coding, version control menggunakan Git, serta mengoptimalkan performa sistem sesuai standar industri nasional BNSP.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Git"],
  },
  {
    id: "vsga-dts",
    position: "Junior Web Developer Trainee",
    organization: "VSGA Digital Talent Scholarship",
    type: "Scholarship / Intensive Training",
    period: "2025",
    description: "Menyelesaikan pelatihan profesional selama 24 jam mengenai implementasi UI, pemrograman terstruktur, dan pengembangan web modular. Mengembangkan kemampuan teknis dan kerja sama tim melalui proyek praktik.",
    technologies: ["Modular Web Dev", "UI Implementation", "Structured Programming"],
  },
  {
    id: "volunteer-iyva",
    position: "Volunteer – Divisi Education",
    organization: "Indonesia Youth Volunteer Association",
    type: "Volunteer",
    period: "2025",
    description: "Berkontribusi dalam program pendidikan masyarakat dengan merancang materi pembelajaran berbasis web serta memfasilitasi sesi literasi digital bagi masyarakat.",
    technologies: ["Web Literacy", "Educational Content", "Public Speaking"],
  },
  {
    id: "karirnex-excel",
    position: "Excel Bootcamp Trainee",
    organization: "Karirnex",
    type: "Bootcamp",
    period: "2025",
    description: "Mengikuti bootcamp Excel intensif selama 2 minggu yang mencakup Data Cells & Ranges, Worksheets, Formula & Functions (SUM, COUNT, IF, VLOOKUP), Charts, Data Validation, Pivot Tables, serta dasar VBA Macro.",
    technologies: ["Excel VBA Macro", "Pivot Table", "Data Analysis & Visualization"],
  },
  {
    id: "dq-lab",
    position: "Mini Bootcamp Trainee – Introduction to Data Analytics",
    organization: "DQLab",
    type: "Bootcamp",
    period: "2025",
    description: "Mengikuti bootcamp online Data Analytics selama 6 hari yang berfokus pada konsep dasar data, manajemen database, dan penerapan data science dengan bimbingan praktisi data industri.",
    technologies: ["Data Analytics", "Database Management", "Data Science Fundamentals"],
  }
];

export const educationData: EducationItem[] = [
  {
    id: "polinema",
    institution: "Politeknik Negeri Malang",
    degree: "Sarjana Terapan Teknik Informatika",
    period: "2023 - Sekarang",
    details: [
      "Saat ini sedang menempuh semester 7 dengan fokus utama pada Web Development dan Data Analytics.",
      "Aktif mengikuti proyek akademik, workshop teknologi, dan program inovasi digital.",
      "Telah menyelesaikan sertifikasi nasional BNSP sebagai Junior Web Developer."
    ]
  },
  {
    id: "sman7",
    institution: "SMA Negeri 7 Malang",
    degree: "MIPA (Matematika & Ilmu Pengetahuan Alam)",
    period: "2021 - 2023",
    details: [
      "Berfokus pada ilmu pengetahuan alam dan literasi komputer.",
      "Aktif berpartisipasi dalam kegiatan teknologi dan kreativitas di sekolah."
    ]
  }
];

export const certificationData: CertificationItem[] = [
  {
    id: "bnsp-jwd-2025",
    title: "Junior Web Developer – Sertifikasi BNSP",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    year: "2025",
    registrationNo: "BNSP-JWD-2025-AZZAHRA",
    images: ["/images/bnsp-certificate.jpg", "/images/bnsp-moment.jpg"],
    description: "Menunjukkan kemampuan dalam mengembangkan aplikasi web full-stack dengan menerapkan pemrograman terstruktur, clean code, dan manajemen database. Sertifikasi ini memvalidasi kompetensi dalam membuat website dinamis dan responsif menggunakan HTML, CSS, JavaScript, PHP, dan MySQL sesuai standar industri nasional.",
    skillsValidated: [
      "Pengembangan Web Full-Stack",
      "Clean Code & Structured Programming",
      "Database Management (MySQL)",
      "Responsive Web Design (HTML/CSS/JS)",
      "Version Control System (Git)"
    ]
  },
  {
    id: "kmipn-juara",
    title: "Juara 1 Kategori Implementasi Sistem pada KMIPN (Kompetisi Mahasiswa Informatika Politeknik Nasional)",
    issuer: "KMIPN",
    year: "2026",
    images: ["/images/sertif-juara.png"],
    description: "Menjadi bagian dari tim YAKEHOKYA dan berhasil meraih juara kategori pada ajang Kompetisi Mahasiswa Informatika Politeknik Nasional (KMIPN) di tingkat nasional. Dalam kompetisi ini, kami merancang dan mengimplementasikan sistem pemantauan lampu lalu lintas berbasis Internet of Things (IoT). Sistem ini dibuat untuk memantau serta mengelola arus lalu lintas secara cerdas dan efisien melalui integrasi data sensor secara real-time.",
    skillsValidated: [
      "Internet of Things (IoT)",
      "Sistem Pemantauan Cerdas",
      "Kerja Sama Tim",
      "Analisis Data Sensor"
    ]
  },
  {
    id: "kmipn-finalis",
    title: "FINALIS KMIPN (Kompetisi Mahasiswa Informatika Politeknik Nasional) dengan kategori Internet of Things",
    issuer: "KMIPN",
    year: "2026",
    images: ["/images/sertif-finalis.png"],
    description: "Berhasil mencapai babak final tingkat nasional pada ajang Kompetisi Mahasiswa Informatika Politeknik Nasional (KMIPN) bersama tim YAKEHOKYA. Kami mengusung proyek sistem pemantauan lampu lalu lintas berbasis Internet of Things (IoT) yang dirancang untuk membantu optimalisasi dan manajemen arus kendaraan secara terintegrasi dan efisien.",
    skillsValidated: [
      "Internet of Things (IoT)",
      "Manajemen Arus Kendaraan",
      "Problem Solving",
      "Presentasi & Komunikasi"
    ]
  }
];
