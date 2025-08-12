export default function SiteFooter() {
  // Dynamic About text (same logic as home)
  const currentYear = new Date().getFullYear();
  const exYears = Math.max(0, currentYear - 2018);
  const moYears = Math.max(0, currentYear - 2022);

  const aboutTemplate = 'Programmer with {ex} years of experience, focused on website and mobile application development for the last {mo} years. Interested in innovation and development of the latest technology in the IT world and programming.';
  const aboutText = aboutTemplate
    .replace(/\{ex\}/g, exYears.toString())
    .replace(/\{mo\}/g, moYears.toString());

  return (
    <footer className="bg-gray-900 py-16 px-6 lg:px-16 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-gray-400">{aboutText}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/" className="hover:text-yellow-400">Home</a></li>
            <li><a href="/#about" className="hover:text-yellow-400">About</a></li>
            <li><a href="/#resume" className="hover:text-yellow-400">Resume</a></li>
            <li><a href="/#projects" className="hover:text-yellow-400">Projects</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Web Development</a></li>
            <li><a href="#" className="hover:text-yellow-400">Mobile Development</a></li>
            <li><a href="#" className="hover:text-yellow-400">Database Management</a></li>
            <li><a href="#" className="hover:text-yellow-400">Server Optimization</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-gray-400">Email: gugusdarmayanto.id@gmail.com</p>
          <p className="text-gray-400">
            GitHub: <a href="https://github.com/webshunter" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors">webshunter</a>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 mb-4 md:mb-0">
          © 2025 All Rights Reserved | Gugus Darmayanto
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/webshunter"
            target="_blank"
            className="text-gray-400 hover:text-yellow-400"
          >
            <i className="fab fa-github" />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-linkedin" />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
} 