export type Entry = {
  company: string;
  role?: string;
  period: string;
  icon: "briefcase" | "organization" | "certificate";
  brand?: string;
  description?: string[];
  pdfUrl?: string;
};

export type Section = "experience" | "organization" | "certificate";

export const TABS: Array<{ id: Section; label: string }> = [
  { id: "experience", label: "Experience" },
  { id: "organization", label: "Organization" },
  { id: "certificate", label: "Certificate" },
];

export const EXPERIENCE: Entry[] = [
  {
    company: "PT. Lintas Data Prima",
    role: "Internship",
    period: "Sep 2025 – Jan 2026",
    icon: "briefcase",
    brand: "#0066CC",
    description: [
      "Mengembangkan sistem Human Resource Information System (HRIS) berbasis web dari tahap perancangan hingga implementasi menggunakan Laravel, Inertia.js, dan React.js",
      "Melakukan analisis kebutuhan sistem berdasarkan proses bisnis perusahaan",
      "Merancang struktur database dan arsitektur backend untuk mendukung sistem HRIS",
      "Mengimplementasikan fitur backend menggunakan Laravel serta mengintegrasikan frontend dengan React.js melalui Inertia.js",
      "Berkolaborasi dengan tim dalam proses pengembangan dan pengujian sistem untuk memastikan aplikasi berjalan dengan optimal",
    ],
  },
];

export const ORGANIZATION: Entry[] = [
  {
    company: "Keluarga Mahasiswa Teknologi Informasi (KMTI)",
    role: "Anggota",
    period: "Sep 2023 – Agustus 2024",
    icon: "organization",
    brand: "#FF6B35",
    description: [
      "Bertanggung jawab dalam perencanaan dan pelaksanaan seminar kewirausahaan dari tahap awal hingga selesai",
      "Mengelola keseluruhan rangkaian acara, termasuk penyusunan konsep dan koordinasi tim",
      "Menjalin komunikasi dan koordinasi dengan narasumber serta pihak terkait",
      "Memastikan pelaksanaan acara berjalan lancar sesuai dengan rencana dan tujuan kegiatan",
    ],
  },
  {
    company: "Panitia MATAF Teknik UMY",
    role: "Panitia",
    period: "Mar 2023 – Sep 2023",
    icon: "organization",
    brand: "#1DB954",
    description: [
      "Bertanggung jawab dalam pendampingan dan pengelolaan mahasiswa baru selama rangkaian kegiatan MATAF Teknik",
      "Mengawal mahasiswa baru mulai dari tahap orientasi hingga seluruh rangkaian kegiatan selesai",
      "Berperan dalam memastikan kelancaran kegiatan serta kedisiplinan peserta",
      "Berkoordinasi dengan panitia lain untuk menjaga jalannya kegiatan sesuai dengan rencana",
    ],
  },
];

export const CERTIFICATE: Entry[] = [
  {
    company: "Deployment Perangkat Lunak",
    period: "Completion Date : Juni 2025 – Juli 2025",
    icon: "certificate",
    pdfUrl: "/Deployment.pdf",
  },
  {
    company: "Web Developer",
    role: "BNSP",
    period: "2026 – 2029",
    icon: "certificate",
    pdfUrl: "/BNSP.pdf",
  },
  {
    company: "Software Development",
    role: "Certiport",
    period: "2026 – 2031",
    icon: "certificate",
    pdfUrl: "/SoftDev.pdf",
  },
];

export const ROW_HEIGHT = 64;
export const SMOOTH_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
