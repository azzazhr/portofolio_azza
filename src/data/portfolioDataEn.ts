import { PersonalInfo, Project, SkillCategory, ExperienceItem, EducationItem, CertificationItem } from "@/types";

export const personalInfoEn: PersonalInfo = {
  name: "Azzahra Attaqina",
  role: "Web Developer & Data Analyst",
  secondaryRole: "Informatics Engineering Student @ Polinema",
  tagline: "Building digital experiences that are simple, useful, and impactful.",
  bio: "Applied Bachelor of Informatics Engineering student at Politeknik Negeri Malang with a strong passion for Web Development and Data Analytics. Committed to creating functional and impactful digital solutions.",
  fullBio: "Applied Bachelor of Informatics Engineering student at Politeknik Negeri Malang with a strong passion for Web Development and Data Analytics. Skilled in developing responsive web applications and analyzing data to derive actionable insights. Dedicated to continuous learning, collaboration, and innovation as an adaptive digital talent.",
  email: "azzahraattaqina59@gmail.com",
  location: "Malang, East Java, Indonesia",
  github: "https://github.com/azzazhr",
  linkedin: "https://www.linkedin.com/in/azzahraattaqina",
  instagram: "https://www.instagram.com/azzazhr._/",
  whatsapp: "6282264651009",
  whatsappMessage: "Hi Azzahra, I saw your portfolio and I'd love to discuss further.",
  stats: [
    { label: "Projects Completed", value: "5+", numericValue: 5, suffix: "+" },
    { label: "Years Experience", value: "2+", numericValue: 2, suffix: "+" },
    { label: "Awards & Certifications", value: "3", numericValue: 3, suffix: "" },
    { label: "Commitment", value: "100%", numericValue: 100, suffix: "%" },
  ]
};

export const projectsDataEn: Project[] = [
  {
    id: "magang-in",
    title: "Magang.in",
    subtitle: "Internship Management & Recommendation Information System",
    description: "Web-based information system for managing student internships and recommendations. Helps campus track partner companies, manage job openings, and match internships based on student interests.",
    longDescription: "Magang.in is a comprehensive internship management platform designed to bridge students, campus, and partner companies. Features job filters, automated internship matching, campus admin dashboard, and structured application trackers.",
    image: "/images/magangin.png",
    category: "Web Development",
    technologies: ["Laravel", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/RanggaPtr/SIM-REKOMENDASI-MAGANG-TI2B-KELOMPOK2-2025-NEW",
    isOngoing: false,
  },
  {
    id: "prestasicore",
    title: "PrestasiCore",
    subtitle: "Student Achievement Recording & Recommendation System",
    description: "Web-based system for recording and evaluating student academic and non-academic achievements with structured data processing for campus reporting.",
    longDescription: "PrestasiCore facilitates digital recording of student achievements with multi-level validation (Student, Academic Advisor, Admin). Features automated point scoring and leaderboard rankings.",
    image: "/images/prestasicore.png",
    category: "Web Development",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML/CSS"],
    githubUrl: "https://github.com/dedybayu/pbl_presma_kel2",
    isOngoing: false,
  },
  {
    id: "katadata",
    title: "KATADATA",
    subtitle: "Online News System & Media Portal",
    description: "Web-based news portal enabling users to read latest news efficiently, browse categories, and engage through comments.",
    longDescription: "KATADATA presents news with a responsive interface, category filtering (Tech, Politics, Health, Entertainment), Trending Articles section, and an admin portal for real-time article management and comment moderation.",
    image: "/images/katadata.png",
    category: "Web Development",
    technologies: ["MongoDB", "Express / Node.js", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/dedybayu/Project_MongoDB_Basdat",
    isOngoing: false,
  },
  {
    id: "kas-online",
    title: "Kas Online Java",
    subtitle: "Real-Time Student Treasury Management System",
    description: "Web and Java-based financial management application supporting transparent transaction logs, late fee calculations, and balance monitoring.",
    longDescription: "Developed using Java for backend logic and web interface. Supports cash withdrawals, monthly/weekly payments, automated penalty calculation, and membership report exports.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    technologies: ["Java", "MySQL", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/riotrip/kas-online-java",
    isOngoing: false,
  },
  {
    id: "bidsmart-app",
    title: "BidSmart App",
    subtitle: "Online Auction & Real-time Bidding System",
    description: "Digital auction platform featuring item registration, real-time bidding, and transparent price history tracking.",
    longDescription: "BidSmart enhances efficiency and fairness in auction transactions. Features bidding countdown timers, automated bidding protection, and transaction history dashboards for sellers and buyers.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    category: "Web Development",
    technologies: ["Laravel", "JavaScript", "MySQL", "WebSockets"],
    githubUrl: "https://github.com/riotrip/bidsmart-app",
    isOngoing: true,
  },
  {
    id: "multidigit",
    title: "MultiDigit",
    subtitle: "Multidigit Number Recognition App",
    description: "Image recognition-based mobile application to recognize multidigit numbers via camera or photo upload. Automatically processes images to detect and recognize numbers, making it easier to read digits from objects or documents.",
    longDescription: "MultiDigit is a smart image processing & computer vision application engineered to automatically detect and classify multidigit number sequences. Supports live smartphone camera capture and gallery photo uploads with high-precision feature extraction.",
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
    description: "IoT, Cloud, and Big Data-based adaptive traffic light monitoring system. Monitors traffic conditions in real-time and processes data to support more adaptive and efficient traffic light management.",
    longDescription: "ASTRAEA integrates IoT sensors and Big Data analytics to monitor vehicle density in real-time. Enables adaptive traffic light control to reduce congestion and optimize signal durations at road intersections.",
    image: "/images/astraea.png",
    category: "Web Development & IoT",
    technologies: ["IoT", "Cloud Computing", "Big Data", "Python", "YOLO / Computer Vision"],
    githubUrl: "https://github.com/aslamrosul/adaptive-traffic-monitoring",
    isOngoing: false,
  },
];

export const skillCategoriesDataEn: SkillCategory[] = [
  {
    categoryName: "Web Development (Frontend & Backend)",
    description: "Skilled in building responsive, structured web applications applying UI/UX principles and clean code.",
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
    categoryName: "Data Analytics & Databases",
    description: "Data processing, analytics, visualization, and database management for data-driven decision making.",
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
    categoryName: "Design, Tools & Collaboration",
    description: "User-friendly UI/UX design and code version control management.",
    skills: [
      { name: "Figma", level: "Advanced", badgeColor: "from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/30" },
      { name: "Canva", level: "Advanced", badgeColor: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30" },
      { name: "UI/UX Design", level: "Intermediate", badgeColor: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30" },
      { name: "Git & GitHub", level: "Advanced", badgeColor: "from-slate-700/30 to-zinc-800/30 text-slate-200 border-zinc-700/50" },
      { name: "Postman", level: "Intermediate", badgeColor: "from-orange-600/20 to-amber-600/20 text-orange-300 border-orange-500/30" },
      { name: "Teamwork & Communication", level: "Advanced", badgeColor: "from-indigo-500/20 to-violet-500/20 text-indigo-300 border-indigo-500/30" },
    ]
  }
];

export const experienceDataEn: ExperienceItem[] = [
  {
    id: "bnsp-cert",
    position: "Junior Web Developer (BNSP Certification)",
    organization: "National Professional Certification Board (BNSP)",
    type: "Project-Based Certification",
    period: "2025",
    description: "Developed responsive web applications using HTML, CSS, JavaScript, PHP, and MySQL. Applied clean coding principles, version control with Git, and system performance optimization according to BNSP national industry standards.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Git"],
  },
  {
    id: "vsga-dts",
    position: "Junior Web Developer Trainee",
    organization: "VSGA Digital Talent Scholarship",
    type: "Scholarship / Intensive Training",
    period: "2025",
    description: "Completed 24-hour professional training covering UI implementation, structured programming, and modular web development. Enhanced technical abilities and teamwork through practical hands-on projects.",
    technologies: ["Modular Web Dev", "UI Implementation", "Structured Programming"],
  },
  {
    id: "volunteer-iyva",
    position: "Volunteer – Education Division",
    organization: "Indonesia Youth Volunteer Association",
    type: "Volunteer",
    period: "2025",
    description: "Contributed to community education programs by designing web-based learning materials and facilitating digital literacy sessions for the public.",
    technologies: ["Web Literacy", "Educational Content", "Public Speaking"],
  },
  {
    id: "karirnex-excel",
    position: "Excel Bootcamp Trainee",
    organization: "Karirnex",
    type: "Bootcamp",
    period: "2025",
    description: "Participated in an intensive 2-week Excel bootcamp covering Data Cells & Ranges, Worksheets, Formulas & Functions (SUM, COUNT, IF, VLOOKUP), Charts, Data Validation, Pivot Tables, and VBA Macro basics.",
    technologies: ["Excel VBA Macro", "Pivot Table", "Data Analysis & Visualization"],
  },
  {
    id: "dq-lab",
    position: "Mini Bootcamp Trainee – Introduction to Data Analytics",
    organization: "DQLab",
    type: "Bootcamp",
    period: "2025",
    description: "Attended a 6-day online Data Analytics bootcamp focusing on core data concepts, database management, and data science fundamentals guided by industry data practitioners.",
    technologies: ["Data Analytics", "Database Management", "Data Science Fundamentals"],
  }
];

export const educationDataEn: EducationItem[] = [
  {
    id: "polinema",
    institution: "Politeknik Negeri Malang",
    degree: "Applied Bachelor of Informatics Engineering",
    period: "2023 - Present",
    details: [
      "Currently pursuing 7th semester with primary focus on Web Development and Data Analytics.",
      "Actively engaged in academic projects, tech workshops, and digital innovation programs.",
      "Completed national BNSP certification as a Junior Web Developer."
    ]
  },
  {
    id: "sman7",
    institution: "SMA Negeri 7 Malang",
    degree: "Natural Sciences (MIPA)",
    period: "2021 - 2023",
    details: [
      "Focused on natural sciences and computer literacy.",
      "Actively participated in technology and creative activities at school."
    ]
  }
];

export const certificationDataEn: CertificationItem[] = [
  {
    id: "bnsp-jwd-2025",
    title: "Junior Web Developer – BNSP Certification",
    issuer: "National Professional Certification Board (BNSP)",
    year: "2025",
    registrationNo: "BNSP-JWD-2025-AZZAHRA",
    images: ["/images/bnsp-certificate.jpg", "/images/bnsp-moment.jpg"],
    description: "Demonstrates capability in full-stack web application development applying structured programming, clean code, and database management. Validates competency in creating dynamic and responsive websites using HTML, CSS, JavaScript, PHP, and MySQL according to national industry standards.",
    skillsValidated: [
      "Full-Stack Web Development",
      "Clean Code & Structured Programming",
      "Database Management (MySQL)",
      "Responsive Web Design (HTML/CSS/JS)",
      "Version Control System (Git)"
    ]
  },
  {
    id: "kmipn-juara",
    title: "1st Place in System Implementation Category at KMIPN (National Polytechnic Informatics Student Competition)",
    issuer: "KMIPN",
    year: "2026",
    images: ["/images/sertif-juara.png"],
    description: "Became part of the YAKEHOKYA team and successfully won 1st place in the category at the National Polytechnic Informatics Student Competition (KMIPN) at the national level. In this competition, we designed and implemented an Internet of Things (IoT) based traffic light monitoring system. This system is created to monitor and manage traffic flow smartly and efficiently through real-time sensor data integration.",
    skillsValidated: [
      "Internet of Things (IoT)",
      "Smart Monitoring System",
      "Teamwork",
      "Sensor Data Analysis"
    ]
  },
  {
    id: "kmipn-finalis",
    title: "KMIPN FINALIST (National Polytechnic Informatics Student Competition) in Internet of Things Category",
    issuer: "KMIPN",
    year: "2026",
    images: ["/images/sertif-finalis.png"],
    description: "Successfully reached the national final round at the National Polytechnic Informatics Student Competition (KMIPN) with the YAKEHOKYA team. We proposed an Internet of Things (IoT) based traffic light monitoring system project designed to help optimize and manage vehicle flow in an integrated and efficient manner.",
    skillsValidated: [
      "Internet of Things (IoT)",
      "Vehicle Flow Management",
      "Problem Solving",
      "Presentation & Communication"
    ]
  }
];
