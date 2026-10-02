export function BioSummary() {
  return (
    <div className="border-foreground/5 rounded-3xl border bg-[#fbfbfb] p-5 min-[360px]:p-6 sm:rounded-4xl sm:p-12 dark:bg-[#111111]">
      <h2 className="text-foreground font-serif text-[1.6rem] font-medium tracking-tight min-[360px]:text-[1.75rem] sm:text-[2rem]">
        Hello! I&rsquo;m{" "}
        <span className="border-foreground/30 border-b pb-0.5">
          Muhamad Hilal Fakhri
        </span>
        .
      </h2>
      <p className="text-foreground/75 mt-6 text-[16px] leading-[1.7] tracking-tight sm:mt-8 sm:text-[18px]">
        Lulusan S1 Teknologi Informasi Universitas Muhammadiyah Yogyakarta
        dengan fokus pada pengembangan web frontend dan backend. Saya membangun
        aplikasi yang terstruktur dan responsif, dari perancangan antarmuka
        hingga integrasi API dan database, serta terus mengeksplorasi penerapan
        AI dalam aplikasi.
      </p>
    </div>
  );
}
