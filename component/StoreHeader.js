import Link from 'next/link';

export default function StoreHeader() {
  return (
    <header className="py-4 px-6 lg:px-16 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">
        GStore
      </div>
      <nav id="nav-menu" className="hidden md:flex space-x-6">
        <Link href="/" className="text-gray-600 hover:text-yellow-400 transition-colors">Home</Link>
        <Link href="/#about" className="text-gray-600 hover:text-yellow-400 transition-colors">About</Link>
        <Link href="/#resume" className="text-gray-600 hover:text-yellow-400 transition-colors">Resume</Link>
        <Link href="/#services" className="text-gray-600 hover:text-yellow-400 transition-colors">Services</Link>
        <Link href="/#skills" className="text-gray-600 hover:text-yellow-400 transition-colors">Skills</Link>
        <Link href="/project" className="text-gray-600 hover:text-yellow-400 transition-colors">Projects</Link>
        <Link href="/blog" className="text-gray-600 hover:text-yellow-400 transition-colors">Blog</Link>
        <Link href="/store" className="text-gray-600 hover:text-yellow-400 transition-colors">App Store</Link>
        <Link href="/#contact" className="text-gray-600 hover:text-yellow-400 transition-colors">Contact</Link>
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