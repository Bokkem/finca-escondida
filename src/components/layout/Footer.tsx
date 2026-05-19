export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-cream/40 py-12 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-heading text-lg text-cream/70 tracking-widest">Finca Escondida</p>
        <p className="text-xs tracking-widest uppercase">San Carlos, Ibiza, Spain</p>
        <p className="text-xs">&copy; {year} Finca Escondida. All rights reserved.</p>
      </div>
    </footer>
  );
}
