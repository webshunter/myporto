'use client'
import Link from 'next/link'

export default function BlogHeader() {
  return (
    <header className="py-4 px-6 lg:px-16 flex justify-between items-center border-b border-gray-800 font-sans">
      <div className="text-xl font-bold">
        <span style={{color:'yellow'}}>Gugus</span> Darmayanto
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <Link href="/#about" className="hover:text-yellow-400 transition-colors">
          About
        </Link>
        <Link href="/#resume" className="hover:text-yellow-400 transition-colors">
          Resume
        </Link>
        <Link href="/#services" className="hover:text-yellow-400 transition-colors">
          Services
        </Link>
        <Link href="/#skills" className="hover:text-yellow-400 transition-colors">
          Skills
        </Link>
        <Link href="/#projects" className="hover:text-yellow-400 transition-colors">
          Projects
        </Link>
        <Link href="/blog" className="text-yellow-400 font-bold">
          Blog
        </Link>
        <Link href="/#contact" className="hover:text-yellow-400 transition-colors">
          Contact
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => window.open('https://wa.me/6285800455338', '_blank')}
          className="bg-yellow-400 text-black rounded-full px-4 py-2 text-xs md:text-sm font-bold whitespace-nowrap hover:bg-yellow-300 transition-colors"
        >
          Hire Me
        </button>
      </div>
    </header>
  )
} 