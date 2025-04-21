'use client';
import Image from "next/image";
import { createClient } from 'next-sanity';
const BlockContent = require('@sanity/block-content-to-react')
import Moment from 'react-moment';
import { useEffect, useState } from "react";


export default function HomeComponent({ data, baseurl }) {

    let [[porto], setPorto] = useState(data);


    useEffect(()=>{
      async function openAction(){
        const postsGet = await fetch(baseurl + '/api/post?v=' + Date.now());
        const posts = await postsGet.json();
        setPorto(posts);
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
          console.log(document)
          window.onscroll = function () { scrollFunction() };

          function scrollFunction() {
            const scrollUpButton = document.getElementById("scrollUpButton");
            if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
              scrollUpButton.style.display = "block";
            } else {
              scrollUpButton.style.display = "none";
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
    },[])

    const serializers = {
        types: {},
    }    
    function scrollFunction() {
      const scrollUpButton = document.getElementById("scrollUpButton");
      if (scrollUpButton) {
        if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
          scrollUpButton.style.display = "block";
        } else {
          scrollUpButton.style.display = "none";
        }
      }
    }

    function toggleMenu() {
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
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
      // Add form submission logic here
    }

    function scrollToTop() {
      if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }

  return (
    <>
  <header className="py-4 px-6 lg:px-16 flex justify-between items-center">
      <div className="text-xl font-bold">
        {
            porto.name.split(' ').map((word, index) => (
                <span style={word =='programmer'?{color:'yellow'}:{}} key={index}>{word} </span>
            ))
        }
      </div>
    <nav id="nav-menu" className="hidden md:flex space-x-6">
      <a href="#home" className="hover:text-yellow-400">
        Home
      </a>
      <a href="#about" className="hover:text-yellow-400">
        About
      </a>
      <a href="#resume" className="hover:text-yellow-400">
        Resume
      </a>
      <a href="#services" className="hover:text-yellow-400">
        Services
      </a>
      <a href="#skills" className="hover:text-yellow-400">
        Skills
      </a>
      <a href="#projects" className="hover:text-yellow-400">
        Projects
      </a>
      <a href="#blog" className="hover:text-yellow-400">
        Blog
      </a>
      <a href="#contact" className="hover:text-yellow-400">
        Contact
      </a>
    </nav>
    <div className="flex items-center space-x-4">
      <button
        onClick={openWA}        
        className="bg-yellow-400 text-black rounded-full px-4 py-2 text-xs md:text-sm font-bold whitespace-nowrap"
      >
        Hire Me
      </button>
      <button
        id="hamburger"
        className="md:hidden text-gray-400 hover:text-white"
        onClick={toggleMenu}
      >
        <i className="fas fa-bars" />
      </button>
    </div>
  </header>
  {/* Full-Screen Mobile Menu */}
  <div id="menu-overlay" className="menu-overlay">
    <button
      className="absolute top-4 right-4 text-white"
      onClick={toggleMenu}
    >
      <i className="fas fa-times fa-2x" />
    </button>
    <a href="#home" onClick={toggleMenu}>
      Home
    </a>
    <a href="#about" onClick={toggleMenu}>
      About
    </a>
    <a href="#resume" onClick={toggleMenu}>
      Resume
    </a>
    <a href="#services" onClick={toggleMenu}>
      Services
    </a>
    <a href="#skills" onClick={toggleMenu}>
      Skills
    </a>
    <a href="#projects" onClick={toggleMenu}>
      Projects
    </a>
    <a href="#blog" onClick={toggleMenu}>
      Blog
    </a>
    <a href="#contact" onClick={toggleMenu}>
      Contact
    </a>
  </div>
  {/* Hero Section */}
  <section
    id="home"
    className="py-16 px-6 lg:px-16 flex flex-col md:flex-row items-center"
  >
    <div className="md:w-1/2 md:pr-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {porto.headtitle.split(' ').map((word, index) => (
            <span style={word == 'programmer' ? { color: 'yellow' } : {}} key={index}>{word} </span>
        ))}
      </h1>
      <p className="text-gray-400 mb-4">
        {porto.description}
      </p>
      <button
        onClick={openWA}
        className="bg-yellow-400 text-black rounded-full px-6 py-3 font-bold mt-4"
      >
        Hire Me
      </button>
    </div>
    <div className="md:w-1/2 mt-8 md:mt-0">
      <div
        className="w-full h-64 md:h-96 bg-gray-800 rounded-lg bg-top bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("'+porto.foto+'")' }}
      />
    </div>
  </section>
  {/* About Me Section */}
  <section id="about" className="py-16 px-6 lg:px-16 bg-gray-900">
    <h2 className="text-3xl font-bold mb-8">About Me</h2>
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <div
          className="w-full h-64 md:h-80 rounded-lg bg-cover bg-top bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("'+porto.foto+'")' }}
        />
      </div>
      <div className="md:w-2/3 md:pl-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 mb-2">Name:</p>
            <p className="font-medium">{porto.name}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-2">GitHub:</p>
            <p className="font-medium">{porto.github}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Location:</p>
            <p className="font-medium">
              {porto.location}
            </p>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Languages:</p>
            <p className="font-medium">
                {porto.language}
            </p>
          </div>
        </div>
        <button
          onClick={openResume}
          className="bg-yellow-400 text-black rounded-full px-6 py-3 font-bold mt-8"
        >
          Download CV
        </button>
      </div>
    </div>
  </section>
  {/* Resume Section */}
  <section id="resume" className="py-16 px-6 lg:px-16">
    <h2 className="text-3xl font-bold mb-8">Resume</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Work Experience</h3>
        {porto.experience.map((resume, i)=>{
            return <div key={i} className="mb-6">
            <p className="text-yellow-400 font-bold">
                {new Date(resume.startDate).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})} - {!resume.endDate? 'Present' :new Date(resume.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <h3 className="text-xl font-bold">
                {resume.name}
            </h3>
            <p className="text-gray-400 mt-2">Fullstack Programmer</p>
            <div className="block-content">
                <BlockContent blocks={resume.details} serializers={serializers} />
            </div>
            </div>
        })}
      </div>
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Education</h3>
        {porto.education.map((resume, i)=>{
            return <div key={i} className="mb-6">
            <p className="text-yellow-400 font-bold">
                {new Date(resume.startDate).toLocaleDateString('en-US', {month: 'long', year: 'numeric'})} - {!resume.endDate? 'Present' :new Date(resume.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <h3 className="text-xl font-bold">
                {resume.name}
            </h3>
            <p className="text-gray-400 mt-2">
                {resume.education}
            </p>
            </div>
        })}
      </div>
    </div>
    <div className="flex justify-center mt-10">
      <button
        onClick={openResume}
        className="bg-yellow-400 text-black rounded-full px-6 py-3 font-bold"
      >
        Download CV
      </button>
    </div>
  </section>
  {/* Services Section */}
  <section id="services" className="py-16 px-6 lg:px-16 bg-gray-900">
    <h2 className="text-3xl font-bold mb-8">Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {porto.services.map((service, i)=>{
            return <div key={i} className="bg-black p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image alt={service.name} src={service.icon} width={40} height={40} className="text-yellow-400 fill-yellow-400"></Image>
            </div>            
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p className="text-gray-400">{service.skil}</p>
          </div>
        })}
    </div>
  </section>
  {/* Skills Section */}
  <section id="skills" className="py-16 px-6 lg:px-16">
    <h2 className="text-3xl font-bold mb-8">My Skills</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        {porto.skills.slice(0, Math.ceil(porto.skills.length / 2)).map((skill, i) => {
          return <div key={i} className="mb-6">
            <div className="flex justify-between mb-2">
              <span>{skill.name}</span>
              <span>{skill.prosentase}%</span>
            </div>
            <div className="progress-bar rounded-full overflow-hidden">
              <div className="progress-fill" style={{ width: `${skill.prosentase}%` }} />
            </div>
          </div>
        })}
      </div>
      <div>
          {porto.skills.slice(Math.ceil(porto.skills.length / 2)).map((skill, i)=>{
            return <div key={i} className="mb-6">
            <div className="flex justify-between mb-2">
              <span>{skill.name}</span>
              <span>{skill.prosentase}%</span>
            </div>
            <div className="progress-bar rounded-full overflow-hidden">
              <div className="progress-fill" style={{ width: `${skill.prosentase}%` }} />
            </div>
          </div>
          })}
      </div>    </div>
  </section>
  {/* Projects Section */}
  <section id="projects" className="py-16 px-6 lg:px-16 bg-gray-900">
    <h2 className="text-3xl font-bold mb-8">My Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {porto.project.map((project, i)=>{
        return <div key={i} className="bg-black p-6 rounded-lg">
          <img className="w-full mb-2" src={project.icon} alt={project.name} />
          <h3 className="text-xl font-bold mb-2">{project.name}</h3>
          <p className="text-gray-400">{project.description}</p>
          <div className="block-content">
            <BlockContent blocks={project.details} serializers={serializers} />
          </div>
      </div>
      })}
    </div>
  </section>
  {/* Blog Section */}
  <section id="blog" className="py-16 px-6 lg:px-16">
    <h2 className="text-3xl font-bold mb-8">Blog</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="bg-gray-800 h-48 w-full" />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">
            Building Mobile Apps with Flutter
          </h3>
          <p className="text-gray-400 mb-4">
            Exploring Flutter for cross-platform mobile development...
          </p>
          <a href="#" className="text-yellow-400">
            Read More
          </a>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="bg-gray-800 h-48 w-full" />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">
            Laravel vs CodeIgniter: Choosing the Right Framework
          </h3>
          <p className="text-gray-400 mb-4">
            Comparing PHP frameworks for your next project...
          </p>
          <a href="#" className="text-yellow-400">
            Read More
          </a>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="bg-gray-800 h-48 w-full" />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">
            Database Optimization Techniques
          </h3>
          <p className="text-gray-400 mb-4">
            Improving performance and efficiency of your database systems...
          </p>
          <a href="#" className="text-yellow-400">
            Read More
          </a>
        </div>
      </div>
    </div>
  </section>
  {/* Freelancing Section */}
  <section className="py-16 px-6 lg:px-16 bg-gray-800 bg-opacity-50 relative text-center">
    <div className="relative z-10">
      <h2 className="text-3xl font-bold mb-4">
        I'm <span className="text-yellow-400">Available</span> for Freelancing
      </h2>
      <button
        className="bg-yellow-400 text-black rounded-full px-6 py-3 font-bold mt-4"
        onClick={openWA}
      >
        Hire Me
      </button>
    </div>
  </section>
  {/* Contact Section */}
  <section id="contact" className="py-16 px-6 lg:px-16">
    <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-gray-900 p-6 rounded-lg text-center">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>        
        </div>
        <p className="text-gray-400">Email</p>
        <p>{porto.email}</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg text-center">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>        </div>
        <p className="text-gray-400">Location</p>
        <p>{porto.location}</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg text-center">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.002c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>        </div>
        <p className="text-gray-400">GitHub</p>
        <p>{porto.github}</p>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <div className="w-full h-64 md:h-full bg-gray-800 rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(this)}
        >
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-4"
            required=""
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-4"
            required=""
          />
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-4"
            required=""
          />
          <textarea
            id="message"
            placeholder="Message"
            rows={4}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-4"
            required=""
            defaultValue={""}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black rounded-full px-6 py-3 font-bold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="bg-gray-900 py-16 px-6 lg:px-16">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <h3 className="text-xl font-bold mb-4">About</h3>
        <p className="text-gray-400">
          {porto.description}
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Links</h3>
        <ul className="text-gray-400 space-y-2">
          <li>
            <a href="#home" className="hover:text-yellow-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-yellow-400">
              About
            </a>
          </li>
          <li>
            <a href="#resume" className="hover:text-yellow-400">
              Resume
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-yellow-400">
              Projects
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Services</h3>
        <ul className="text-gray-400 space-y-2">
          <li>
            <a href="#" className="hover:text-yellow-400">
              Web Development
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400">
              Mobile Development
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400">
              Database Management
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400">
              Server Optimization
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Skills</h3>
        <div className="grid" style={{gridTemplateColumns:'auto auto'}}>{porto.skills.map((r, i)=>{
          return <span key={i} className="pr-[5px] text-gray-400">- {r.name}</span>
        })}</div>
      </div>
    </div>
    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 mb-4 md:mb-0">
        © 2025 All Rights Reserved | {porto.name}
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
  <button
    id="scrollUpButton"
    className="fixed bottom-4 right-4 bg-yellow-400 text-gray-900 p-2 rounded-full shadow-lg hidden"
    onClick={scrollToTop}
  >
    ↑
  </button>
</>
  );
}


