'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    if (typeof document !== 'undefined') {
      const menuOverlay = document.getElementById("menu-overlay");
      if (menuOverlay) {
        if (!isMenuOpen) {
          menuOverlay.classList.add("active");
          document.body.style.overflow = 'hidden';
        } else {
          menuOverlay.classList.remove("active");
          document.body.style.overflow = 'auto';
        }
      }
    }
  }

  function closeMenu() {
    setIsMenuOpen(false);
    if (typeof document !== 'undefined') {
      const menuOverlay = document.getElementById("menu-overlay");
      if (menuOverlay) {
        menuOverlay.classList.remove("active");
        document.body.style.overflow = 'auto';
      }
    }
  }

  return (
    <>
      <header className="py-4 px-6 lg:px-16 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-yellow-400 transition-colors duration-200">
            Gugus Darmayanto
          </Link>
        </div>
        <nav id="nav-menu" className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-400 transition-colors duration-200">Home</Link>
          <Link href="/#about" className="hover:text-yellow-400 transition-colors duration-200">About</Link>
          <Link href="/#resume" className="hover:text-yellow-400 transition-colors duration-200">Resume</Link>
          <Link href="/#services" className="hover:text-yellow-400 transition-colors duration-200">Services</Link>
          <Link href="/#skills" className="hover:text-yellow-400 transition-colors duration-200">Skills</Link>
          <Link href="/project" className="hover:text-yellow-400 transition-colors duration-200">Projects</Link>
          <Link href="/blog" className="hover:text-yellow-400 transition-colors duration-200">Blog</Link>
          <Link href="/store" className="hover:text-yellow-400 transition-colors duration-200">App Store</Link>
          <Link href="/#contact" className="hover:text-yellow-400 transition-colors duration-200">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <a
            href="https://wa.me/6285800455338"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black rounded-full px-4 py-2 text-xs md:text-sm font-bold whitespace-nowrap hover:bg-yellow-300 transition-colors duration-200"
          >
            Hire Me
          </a>
          <button
            id="hamburger"
            className="md:hidden text-white hover:text-yellow-400 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      {/* Full-Screen Mobile Menu */}
      <div id="menu-overlay" className="menu-overlay">
        <button
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center space-y-6">
          <Link href="/" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            Home
          </Link>
          <Link href="/#about" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            About
          </Link>
          <Link href="/#resume" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            Resume
          </Link>
          <Link href="/#services" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            Services
          </Link>
          <Link href="/#skills" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            Skills
          </Link>
          <Link href="/project" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            Projects
          </Link>
          <Link href="/blog" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            Blog
          </Link>
          <Link href="/store" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            App Store
          </Link>
          <Link href="/#contact" onClick={closeMenu} className="text-2xl font-semibold hover:text-yellow-400 transition-colors duration-200">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
} 