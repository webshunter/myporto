'use client';
import Image from "next/image";
import { createClient } from 'next-sanity';
const BlockContent = require('@sanity/block-content-to-react')
import Moment from 'react-moment';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import ServiceIcon from '@/component/ServiceIcon';

export default function HomeComponent({data, blogPosts, projectList}) {

    const [porto, setPorto] = useState(data || {});
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(()=>{
      async function openAction(){
        const postsGet = await fetch('/api/post?v=' + Date.now());
        const posts = await postsGet.json();
        if (posts && !posts.error) {
          setPorto(posts);
        }
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
          console.log(document)
          window.onscroll = function () { scrollFunction() };
          scrollFunction();

          function scrollFunction() {
            const scrollUpButton = document.getElementById("scrollUpButton");
            if (!scrollUpButton) return;
            if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
              scrollUpButton.classList.add("visible");
            } else {
              scrollUpButton.classList.remove("visible");
            }
          }

          function scrollToTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }

          scrollFunction()
        }
      }
      openAction();
    },[setPorto])

    const serializers = {
        types: {},
    }    

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

    function openWA() {
            console.log('open whatsapp');
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
            window.open('https://wa.me/6285800455338', '_blank');
        }
            
    }
  

    function openResume() {
      if (typeof document !== 'undefined' && typeof window !== 'undefined') {
          window.open(porto.linkcv, '_blank')      }
    }

    function handleSubmit(e) {
      e.preventDefault();
    }

    function scrollToTop() {
      if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }

  // Dynamic years for description placeholders
  const currentYear = new Date().getFullYear();
  const exYears = Math.max(0, currentYear - 2018);
  const moYears = Math.max(0, currentYear - 2022);
  const descriptionProcessed = (porto.description || '')
    .replace(/\{ex\}/g, exYears.toString())
    .replace(/\{mo\}/g, moYears.toString());

  return (
    <div className="min-h-screen bg-navy text-gray-50">
  <header className="site-header">
      <div className="text-xl font-bold tracking-tight">
        {porto.name}
      </div>
    <nav id="nav-menu" className="hidden md:flex space-x-6 text-gray-300">
      <a href="#home" className="hover:text-blue-400">
        Home
      </a>
      <a href="#about" className="hover:text-blue-400">
        About
      </a>
      <a href="#resume" className="hover:text-blue-400">
        Resume
      </a>
      <a href="#services" className="hover:text-blue-400">
        Services
      </a>
      <a href="#skills" className="hover:text-blue-400">
        Skills
      </a>
      <a href="#projects" className="hover:text-blue-400">
        Projects
      </a>
      <a href="#blog" className="hover:text-blue-400">
        Blog
      </a>
      <Link href="/store" className="hover:text-blue-400">
        App Store
      </Link>
      <a href="#contact" className="hover:text-blue-400">
        Contact
      </a>
    </nav>
    <div className="flex items-center space-x-4">
      <button
        onClick={openWA}        
        className="btn-primary-sm"
      >
        <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        Hire Me
      </button>
      <button
        id="hamburger"
        className="md:hidden text-white hover:text-blue-400 transition-colors duration-200"
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
      className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors duration-200"
      onClick={toggleMenu}
      aria-label="Close menu"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div className="flex flex-col items-center space-y-6">
      <a href="#home" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        Home
      </a>
      <a href="#about" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        About
      </a>
      <a href="#resume" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        Resume
      </a>
      <a href="#services" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        Services
      </a>
      <a href="#skills" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        Skills
      </a>
      <a href="#projects" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        Projects
      </a>
      <a href="#blog" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        Blog
      </a>
      <Link href="/store" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        App Store
      </Link>
      <a href="#contact" onClick={closeMenu} className="text-2xl font-semibold hover:text-blue-400 transition-colors duration-200">
        Contact
      </a>
    </div>
  </div>
  {/* Hero Section */}
  <section
    id="home"
    className="hero-section relative py-16 lg:py-20 px-6 lg:px-12 xl:px-16 overflow-hidden min-h-[85vh] md:min-h-[88vh] flex items-center"
  >
    <div className="hero-bg-grid" aria-hidden="true" />
    <div className="hero-orb hero-orb-1" aria-hidden="true" />
    <div className="hero-orb hero-orb-2" aria-hidden="true" />
    <div className="hero-orb hero-orb-3" aria-hidden="true" />

    <div className="hero-inner">
      <div className="hero-content">
        <p className="text-blue-400 font-medium mb-3 tracking-wide uppercase text-sm hero-fade-in">Fullstack Developer</p>
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold mb-6 leading-tight hero-fade-in hero-fade-in-delay-1">
          {porto.headtitle.split(' ').map((word, index) => (
              <span className={word.toLowerCase() === 'programmer' ? 'text-blue-400' : ''} key={index}>{word} </span>
          ))}
        </h1>
        <p className="text-gray-400 mb-8 text-base md:text-lg leading-relaxed hero-fade-in hero-fade-in-delay-2">
          {descriptionProcessed}
        </p>
        <div className="flex flex-wrap gap-4 hero-fade-in hero-fade-in-delay-3">
          <button onClick={openWA} className="btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Hire Me on Fiverr
          </button>
          <button onClick={openResume} className="btn-outline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download CV
          </button>
        </div>
      </div>

      <div className="hero-photo-wrap">
        <div className="hero-photo-ring" aria-hidden="true" />
        <div className="hero-photo-ring hero-photo-ring-2" aria-hidden="true" />
        <div className="hero-photo-glow" aria-hidden="true" />
        <div className="hero-photo-platform" aria-hidden="true" />
        <div className="hero-photo-frame">
          <img
            src={porto.foto}
            alt={porto.name}
            className="hero-photo-img"
          />
        </div>
        <div className="hero-status-badge">
          <span className="hero-status-dot" />
          Available for projects
        </div>
      </div>
    </div>
  </section>
  {/* About Me Section */}
  <section id="about" className="about-section py-16 px-6 lg:px-16 bg-navy-surface/50 border-y border-gray-800/50">
    <div className="max-w-6xl mx-auto">
      <p className="text-blue-400 font-medium mb-3 tracking-wide uppercase text-sm">Get to Know Me</p>
      <h2 className="section-heading">About Me</h2>
      <p className="text-gray-400 -mt-4 mb-12 max-w-2xl leading-relaxed">
        A quick overview of who I am, where I&apos;m based, and how to connect with me.
      </p>

      <div className="about-grid">
        <div className="about-visual">
          <div className="about-photo-wrap">
            <div className="about-photo-ring" aria-hidden="true" />
            <div className="about-photo-glow" aria-hidden="true" />
            <img
              src={porto.foto}
              alt={porto.name}
              className="about-photo-img"
            />
            <div className="about-photo-badge">
              {porto.headtitle || 'Fullstack Developer'}
            </div>
          </div>

          <div className="about-stats">
            <div className="about-stat-card">
              <span className="about-stat-value">{exYears}+</span>
              <span className="about-stat-label">Years Experience</span>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-value">{porto.skills?.length || 0}</span>
              <span className="about-stat-label">Core Skills</span>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-value">{porto.services?.length || 0}</span>
              <span className="about-stat-label">Services</span>
            </div>
          </div>
        </div>

        <div className="about-content">
          <p className="about-intro">{descriptionProcessed}</p>

          <div className="about-info-grid">
            <div className="about-info-card">
              <div className="about-info-icon">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="about-info-label">Full Name</p>
                <p className="about-info-value">{porto.name}</p>
              </div>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="about-info-label">Location</p>
                <p className="about-info-value">{porto.location}</p>
              </div>
            </div>

            <div className="about-info-card">
              <div className="about-info-icon">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <p className="about-info-label">Languages</p>
                <p className="about-info-value">{porto.language}</p>
              </div>
            </div>

            {porto.github && (
              <a
                href={porto.github.startsWith('http') ? porto.github : `https://github.com/${porto.github.replace(/^@/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="about-info-card about-info-card-link group"
              >
                <div className="about-info-icon">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="about-info-label">GitHub</p>
                  <p className="about-info-value group-hover:text-blue-400 transition-colors truncate">{porto.github}</p>
                </div>
              </a>
            )}
          </div>

          <div className="about-actions">
            <button onClick={openResume} className="btn-outline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download CV
            </button>
            <a href="#contact" className="btn-secondary">
              Get in Touch
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Resume Section */}
  <section id="resume" className="py-16 px-6 lg:px-16 bg-navy-surface/50 border-y border-gray-800/50">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading">Resume</h2>
      <p className="text-gray-400 -mt-4 mb-10 max-w-2xl">
        Professional background and academic journey that shaped my expertise as a developer.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-dark p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">Work Experience</h3>
              <p className="text-gray-500 text-sm">{porto.experience.length} positions</p>
            </div>
          </div>
          <div className="resume-timeline">
            {porto.experience.map((resume, i) => (
              <div key={i} className="resume-timeline-item">
                <span className="resume-timeline-dot" />
                <span className="resume-date-badge">
                  {new Date(resume.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' — '}
                  {!resume.endDate ? 'Present' : new Date(resume.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <h4 className="text-lg font-bold text-white mb-1">{resume.name}</h4>
                <p className="text-blue-400 text-sm font-medium mb-3">
                  {resume.position || 'Fullstack Programmer'}
                </p>
                <div className="block-content text-gray-400 text-sm leading-relaxed">
                  <BlockContent blocks={resume.details} serializers={serializers} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-dark p-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">Education</h3>
              <p className="text-gray-500 text-sm">{porto.education.length} qualifications</p>
            </div>
          </div>
          <div className="space-y-4">
            {porto.education.map((resume, i) => (
              <div key={i} className="education-card">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400 font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0">
                  <span className="resume-date-badge mb-2">
                    {new Date(resume.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' — '}
                    {!resume.endDate ? 'Present' : new Date(resume.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <h4 className="text-lg font-bold text-white">{resume.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">{resume.education}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <button onClick={openResume} className="btn-outline">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Download Full CV
        </button>
        <button onClick={openWA} className="btn-primary">
          Hire Me for Your Project
        </button>
      </div>
    </div>
  </section>
  {/* Services Section */}
  <section id="services" className="py-16 px-6 lg:px-16 bg-navy-surface/50 border-y border-gray-800/50">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading">Services</h2>
      <p className="text-gray-400 -mt-4 mb-10 max-w-2xl">Professional development services tailored to your business needs.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {porto.services.map((service, i) => (
          <div key={i} className="service-card group">
            <div className="service-card-icon">
              <span className="service-card-number">{String(i + 1).padStart(2, '0')}</span>
              <ServiceIcon icon={service.icon} name={service.name} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-200">
              {service.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">
              {service.skill}
            </p>
            <button
              type="button"
              onClick={openWA}
              className="btn-ghost mt-auto self-start text-sm"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button type="button" onClick={openWA} className="btn-primary">
          Discuss Your Project
        </button>
      </div>
    </div>
  </section>
  {/* Skills Section */}
  <section id="skills" className="py-16 px-6 lg:px-16">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading">My Skills</h2>
      <p className="text-gray-400 -mt-4 mb-8 max-w-2xl">
        Technologies and tools I use to build reliable, scalable applications for clients worldwide.
      </p>
      {porto.skills.filter((s) => s.prosentase >= 80).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {porto.skills
            .filter((s) => s.prosentase >= 80)
            .map((skill, i) => (
              <span key={i} className="badge-accent text-sm py-1.5 px-4">
                {skill.name}
              </span>
            ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {porto.skills.map((skill, i) => (
          <div key={i} className="skill-card group">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                {skill.name}
              </span>
              <span className="skill-percent-badge">{skill.prosentase}%</span>
            </div>
            <div className="progress-bar rounded-full overflow-hidden h-2">
              <div
                className="progress-fill rounded-full"
                style={{ width: `${skill.prosentase}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {skill.prosentase >= 90 ? 'Expert' : skill.prosentase >= 75 ? 'Advanced' : skill.prosentase >= 60 ? 'Intermediate' : 'Proficient'}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  {/* Projects Section */}
  <section id="projects" className="py-16 px-6 lg:px-16 bg-navy-surface/50 border-y border-gray-800/50">
    <h2 className="section-heading">My Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projectList && projectList.length > 0 ? (
        projectList.map((project, i) => (
          <Link key={project._id} href={`/project/${project.slug.current}`}
            className="card-dark-hover p-6 hover:scale-[1.02] block group">
            {project.icon && (
              <img className="w-full mb-2 rounded" src={urlFor(project.icon).width(400).height(200).url()} alt={project.name} />
            )}
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-400 line-clamp-2">{project.description}</p>
            <span className="inline-block mt-2 link-accent group-hover:translate-x-1 transition-transform">View Details →</span>
          </Link>
        ))
      ) : (
        <div className="col-span-2 text-center py-8 text-gray-400">No projects yet.</div>
      )}
    </div>
    {projectList && projectList.length > 0 && (
      <div className="text-center mt-8">
        <Link href="/project" className="btn-secondary">
          View More Projects
          <span className="ml-2">→</span>
        </Link>
      </div>
    )}
  </section>
  {/* Blog Section */}
  <section id="blog" className="py-16 px-6 lg:px-16">
    <h2 className="section-heading">Blog</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogPosts && blogPosts.length > 0 ? (
        blogPosts.map((post, i) => (
          <div key={i} className="card-dark-hover overflow-hidden hover:scale-[1.02]">
            {post.mainImage && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(400).height(200).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <time className="flex items-center">
                  <span className="mr-2">📅</span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                {post.author && (
                  <span className="flex items-center">
                    <span className="mr-2">👤</span>
                    {post.author}
                  </span>
                )}
              </div>
              
              <Link href={`/blog/${post.slug.current}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {post.categories.map((category, index) => (
                    <span key={index} className="badge-accent">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
              
              <Link
                href={`/blog/${post.slug.current}`}
                className="inline-flex items-center link-accent group"
              >
                Read more 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-4">No Blog Posts Yet</h3>
          <p className="text-gray-400">Blog posts will appear here soon!</p>
        </div>
      )}
    </div>
    {blogPosts && blogPosts.length > 0 && (
      <div className="text-center mt-8">
        <Link href="/blog" className="btn-secondary">
          View All Posts
          <span className="ml-2">→</span>
        </Link>
      </div>
    )}
  </section>
  {/* Freelancing Section */}
  <section className="py-16 px-6 lg:px-16">
    <div className="max-w-3xl mx-auto text-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-8 py-12">
      <span className="inline-block bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-sm font-semibold px-4 py-1 rounded-full mb-4">
        Open for Projects
      </span>
      <h2 className="text-3xl font-bold mb-4">
        I&apos;m <span className="text-emerald-400">Available</span> for Freelancing
      </h2>
      <p className="text-gray-400 mb-6 max-w-lg mx-auto">
        Need a reliable developer for your next project? Let&apos;s discuss your requirements and get started.
      </p>
      <button className="btn-primary" onClick={openWA}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        Hire Me Now
      </button>
    </div>
  </section>
  {/* Contact Section */}
  <section id="contact" className="py-16 px-6 lg:px-16 bg-navy-surface/50 border-t border-gray-800/50">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-heading">Contact Me</h2>
      <p className="text-gray-400 -mt-4 mb-10 max-w-2xl">
        Have a project in mind? Send a message or reach out directly — I typically respond within 24 hours.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <a href={`mailto:${porto.email}`} className="contact-info-card group">
          <div className="contact-info-icon">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate">{porto.email}</p>
          </div>
        </a>
        <button type="button" onClick={openWA} className="contact-info-card group">
          <div className="contact-info-icon">
            <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">WhatsApp</p>
            <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Chat on WhatsApp</p>
          </div>
        </button>
        <div className="contact-info-card cursor-default">
          <div className="contact-info-icon">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Location</p>
            <p className="text-sm font-medium text-white">{porto.location}</p>
          </div>
        </div>
        <a
          href={`https://github.com/${porto.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-info-card group"
        >
          <div className="contact-info-icon">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.205 8.205 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">GitHub</p>
            <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate">{porto.github}</p>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 card-dark p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-white">Available for Hire</p>
              <p className="text-emerald-400 text-sm">Open to new projects</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Whether you need a full web app, mobile solution, or help with an existing project — I&apos;m ready to collaborate and deliver quality results on time.
          </p>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-sm">
              <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-gray-300">Response within <span className="text-white font-medium">24 hours</span></span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h5M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
              <span className="text-gray-300">Languages: <span className="text-white font-medium">{porto.language}</span></span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-gray-300">{exYears}+ years of development experience</span>
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={openWA} className="btn-primary flex-1 justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              WhatsApp
            </button>
            <button type="button" onClick={openResume} className="btn-outline flex-1 justify-center">
              Download CV
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 card-dark p-8">
          <h3 className="text-xl font-bold mb-1">Send a Message</h3>
          <p className="text-gray-500 text-sm mb-6">Fill out the form and I&apos;ll get back to you as soon as possible.</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="contact-form-label">Your Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" className="input-dark" required />
              </div>
              <div>
                <label htmlFor="email" className="contact-form-label">Your Email</label>
                <input type="email" id="email" name="email" placeholder="john@example.com" className="input-dark" required />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="contact-form-label">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Project inquiry / Collaboration" className="input-dark" required />
            </div>
            <div>
              <label htmlFor="message" className="contact-form-label">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project, timeline, and budget..."
                rows={5}
                className="input-dark resize-none"
                required
                defaultValue=""
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                Send Message
              </button>
              <p className="text-xs text-gray-500">Or email directly at <a href={`mailto:${porto.email}`} className="text-blue-400 hover:text-blue-300">{porto.email}</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="bg-navy-light border-t border-gray-800/50">
    <div className="px-6 lg:px-16 py-12 border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-bold mb-2">Let&apos;s Work Together</h3>
          <p className="text-gray-400 max-w-md">
            Available for freelance projects on Fiverr. Fast delivery, clean code, and clear communication.
          </p>
        </div>
        <button type="button" onClick={openWA} className="btn-primary shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Start a Conversation
        </button>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-6 lg:px-16 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-xl font-bold mb-1">{porto.name}</p>
          <p className="text-blue-400 text-sm font-medium mb-4">{porto.headtitle}</p>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
            {descriptionProcessed}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Navigate</h4>
          <ul className="space-y-3">
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#resume', label: 'Resume' },
              { href: '#services', label: 'Services' },
              { href: '#skills', label: 'Skills' },
              { href: '#projects', label: 'Projects' },
              { href: '#blog', label: 'Blog' },
              { href: '#contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="footer-link">
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Services</h4>
          <ul className="space-y-3">
            {porto.services.map((service, i) => (
              <li key={i}>
                <a href="#services" className="footer-link">
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${porto.email}`} className="footer-link">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {porto.email}
              </a>
            </li>
            <li>
              <a href="https://github.com/webshunter" target="_blank" rel="noopener noreferrer" className="footer-link">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.205 8.205 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                github.com/{porto.github}
              </a>
            </li>
            <li className="footer-link">
              <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {porto.location}
            </li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-5">
            {porto.skills.slice(0, 6).map((skill, i) => (
              <span key={i} className="text-xs text-gray-500 bg-gray-800/60 px-2 py-1 rounded-md border border-gray-700/50">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800/50 px-6 lg:px-16 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm text-center sm:text-left">
          © {currentYear} {porto.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <a href="https://github.com/webshunter" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.205 8.205 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
          <button type="button" onClick={openWA} className="footer-social-btn" aria-label="WhatsApp">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </button>
          <Link href="/store" className="footer-social-btn" aria-label="App Store">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </Link>
        </div>
      </div>
    </div>
  </footer>
  <button
    id="scrollUpButton"
    type="button"
    className="scroll-up-btn"
    onClick={scrollToTop}
    aria-label="Scroll to top"
  >
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
    </svg>
  </button>
</div>
  );
}


