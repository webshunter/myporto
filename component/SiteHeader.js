import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="py-4 px-6 lg:px-16 flex justify-between items-center">
      <div className="text-xl font-bold">
        Gugus Darmayanto
      </div>
      <nav id="nav-menu" className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-yellow-400">Home</Link>
        <Link href="/#about" className="hover:text-yellow-400">About</Link>
        <Link href="/#resume" className="hover:text-yellow-400">Resume</Link>
        <Link href="/#services" className="hover:text-yellow-400">Services</Link>
        <Link href="/#skills" className="hover:text-yellow-400">Skills</Link>
        <Link href="/project" className="hover:text-yellow-400">Projects</Link>
        <Link href="/blog" className="hover:text-yellow-400">Blog</Link>
        <Link href="/#contact" className="hover:text-yellow-400">Contact</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <a
          href="https://wa.me/6285800455338"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-black rounded-full px-4 py-2 text-xs md:text-sm font-bold whitespace-nowrap"
        >
          Hire Me
        </a>
      </div>
    </header>
  );
} 