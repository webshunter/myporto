'use client';

import Link from 'next/link';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const exYears = Math.max(0, currentYear - 2018);
  const moYears = Math.max(0, currentYear - 2022);

  const aboutText = `Programmer with ${exYears} years of experience, focused on website and mobile application development for the last ${moYears} years.`;

  function openWA() {
    if (typeof window !== 'undefined') {
      window.open('https://wa.me/6285800455338', '_blank');
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#resume', label: 'Resume' },
    { href: '/#services', label: 'Services' },
    { href: '/project', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/store', label: 'App Store' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-navy-light border-t border-gray-800/50 mt-16">
      <div className="px-6 lg:px-16 py-12 border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-2">Let&apos;s Work Together</h3>
            <p className="text-gray-400 max-w-md">
              Available for freelance projects. Fast delivery, clean code, and clear communication.
            </p>
          </div>
          <button type="button" onClick={openWA} className="btn-primary shrink-0">
            Start a Conversation
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <p className="text-xl font-bold mb-1">Gugus Darmayanto</p>
            <p className="text-blue-400 text-sm font-medium mb-4">Fullstack Developer</p>
            <p className="text-gray-400 text-sm leading-relaxed">{aboutText}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Navigate</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:gugusdarmayanto.id@gmail.com" className="footer-link">
                  <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  gugusdarmayanto.id@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/webshunter" target="_blank" rel="noopener noreferrer" className="footer-link">
                  <svg className="w-4 h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.205 8.205 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                  github.com/webshunter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800/50 px-6 lg:px-16 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Gugus Darmayanto. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/webshunter" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.205 8.205 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            </a>
            <button type="button" onClick={openWA} className="footer-social-btn" aria-label="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
