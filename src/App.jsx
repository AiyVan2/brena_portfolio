import { useState, useEffect, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import  ProgressBar from './components/ProgressBar.jsx';
import GameWindow from './components/GameWindow.jsx';
import SkillBar from './components/SkillBar.jsx';
import PixelButton from './components/PixelButton.jsx';
import mypicture from './images/brenapic.jpg';
import Eirapic from './images/Eira Pic.png';
import ASproutsJounrneypic from './images/A Sprouts Journey Pic.png';
import AKnightShiftpic from './images/A Knight Shift Pic.png';
import ClinicStudentSystempic from './images/Clinic Student System Pic.jpg';
import LibrarySystempic from './images/Library System Pic.jpg';
import EventSystempic from './images/Event System Pic.jpg';
import PrintITpic from './images/Print IT System Pic.jpg';
import ToDoListpic from './images/To Do List Pic.jpg';
import { div, image, title } from 'framer-motion/client';

const ProjectCard = ({ title, description, image, tags, link }) => (
  <motion.div 
    className="min-w-[300px] max-w-[400px] bg-gray-900 rounded-lg overflow-hidden border-2 border-yellow-400 shadow-lg"
    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(250, 204, 21, 0.2)" }}
  >
    <div className="h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="text-6xl text-yellow-400">🎮</div>
      )}
    </div>
    <div className="p-4">
      <h3 className="text-2xl font-bold text-yellow-400 mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags && tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-800 text-yellow-300 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      {link && (
        <PixelButton onClick={() => window.open(link, '_blank')} className="w-full text-center text-sm">
          PLAY NOW
        </PixelButton>
      )}
    </div>
  </motion.div>
);

// Loading Screen
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-yellow-400 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">LOADING AIYVAN'S WORLD...</h2>
        <div className="w-full bg-gray-800 rounded-full h-4 mb-2">
          <div 
            className="bg-yellow-400 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">{Math.round(progress)}%</div>
        <div className="mt-8 text-sm text-gray-500 text-center italic">
          "Assembling pixels and loading awesome..."
        </div>
      </motion.div>
    </div>
  );
}



// Start Screen
function StartScreen({ onStart }) {
  const [showInstructions, setShowInstructions] = useState(false);
  
  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen flex flex-col justify-center items-center bg-black text-yellow-400 text-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.5 
          }}
          className="mb-6"
        >
          <div className="text-6xl mb-2">🕹️</div>
        </motion.div>
        
        <motion.h1
          className="text-5xl font-bold mb-6 pixel-font"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          AIYVAN'S PORTFOLIO
        </motion.h1>
        
        <motion.p
          className="max-w-md text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to my interactive portfolio. Explore my projects, skills, and connect with me.
        </motion.p>

        <div className="space-y-4">
          <PixelButton onClick={onStart}>
            ► PRESS START
          </PixelButton>
          
          <motion.button
            onClick={() => setShowInstructions(!showInstructions)}
            className="block text-sm underline text-gray-500 hover:text-yellow-400 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {showInstructions ? "HIDE INSTRUCTIONS" : "HOW TO PLAY"}
          </motion.button>
        </div>
        
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              className="mt-8 p-4 border border-yellow-400 rounded max-w-md text-left"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="font-bold text-center mb-2">CONTROLS</h3>
              <ul className="text-sm space-y-2">
                <li>• <span className="text-white">SCROLL</span> - Navigate through sections</li>
                <li>• <span className="text-white">CLICK</span> - Interact with elements</li>
                <li>• <span className="text-white">NAV MENU</span> - Quick travel to sections</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}


// Main Portfolio Content
function MainPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const gamedevprojects = [
    {
      title: "🌱 A Sprout's Journey",
      description: "A cozy 2D platformer where you guide a growing sprout through lush terrain, collecting sunlight and water drops to unlock new stages of growth.",
      image: ASproutsJounrneypic,
      tags: ["Unity", "C#", "2D", "Pixel Art","Growth Mechanic","Game Jam"],
      link: "https://aiyvan.itch.io/a-sprouts-journey"
    },
    {
      title: "🗡 Eira",
      description: "A mobile 2D metroidvania-style capstone project featuring boss fights, puzzle sequences, and precision parkour with tight jumping and dashing mechanics.",
      image: Eirapic,
      tags: ["Unity", "C#", "Mobile Game", "2D Metroidvania", "Boss Fights", "Puzzle Platformer", "Precision Movement"],
      link: "https://aiyvan.itch.io/eira"
    },
    {
      title: "⚔️ The Knight Shift",
      description: "A fast-paced, side-scrolling strategy game inspired by Cartoon Wars and Battle Cats, where knights clash with orcs in this one-week game jam challenge.",
      image: AKnightShiftpic,
      tags: ["Unity", "C#", "Strategy", "2D", "Mobile Game", "Side-Scrolling", "Game Jam"],
      link: "https://aiyvan.itch.io/the-knight-shift"
    },
    {
      title: "Halo Hallo: The Sago Saga [IN-PROGRESS 🛠]",
      description: "A Hollow Knight-inspired metroidvania rooted in Filipino culture. Dive into the layers of the Halo Hallo Region and uncover its sweet, forgotten secrets.",
      tags: ["Unity", "C#", "2D Metroidvania", "Pixel Art", "Filipino Culture", "Boss Fights", "Exploration", "Platformer"],
    }
  ];

  const webdevprojects = [
    {
      title: "Student Clinic Management System",
      image: ClinicStudentSystempic,
      description: "A system for managing student health records, check-up bookings (10 slots/hour), and medical alerts, with email reminders for health-related announcements.",
      tags: ["PHP", "MySQL", "HTML", "Tailwind", "JavaScript", "Email Integration"],
    },
    {
      title: "Digital Library Management Platform",
      image: LibrarySystempic,
      description: "An admin-student system for managing book inventories, genres and authors",
      tags: ["PHP", "MySQL", "Tailwind", "JavaScript"],
    },
    {
      title: "Event Registration System",
      image: EventSystempic,
      description: "A system where admins post events and Users can browse and register, streamlining event organization and attendance.",
      tags: ["PHP", "MySQL", "HTML", "Tailwind", "JavaScript"],
    },
    {
      title: "Student Printing Service Portal",
      image: PrintITpic,
      description: "A request system where students place print orders with custom options (size, color, special instructions); student partners handle fulfillment and earn extra income.",
      tags: ["PHP", "MySQL", "HTML", "Tailwind", "File Upload"],
    },
    {
      title: "To Do List",
      image: ToDoListpic,
      description: "A Simple To Do List",
      tags: ["PHP", "MySQL", "HTML", "AzureDatabase"],
    }
  ];


  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Header/Navbar */}
      <header className="fixed w-full bg-black bg-opacity-90 text-yellow-400 px-6 py-4 flex justify-between items-center shadow-lg z-50">
        <div className="text-2xl font-bold tracking-widest">
          <span className="text-white">AIY</span>VAN
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-yellow-400 focus:outline-none"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? "✕" : "☰"}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="space-x-6 text-lg hidden md:flex">
          {['home', 'about', 'projects', 'skills', 'contact'].map(section => (
            <a 
              key={section}
              href={`#${section}`} 
              className={`transition-colors ${
                activeSection === section ? 'text-white border-b-2 border-yellow-400' : 'hover:text-white'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            className="fixed top-16 right-0 left-0 bg-black bg-opacity-95 z-40 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col p-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map(section => (
                <a 
                  key={section}
                  href={`#${section}`} 
                  className={`py-3 px-4 border-l-4 ${
                    activeSection === section ? 'border-yellow-400 text-white' : 'border-transparent text-gray-400'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 pt-20 
        bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 bg-yellow-400 text-black text-sm font-bold mb-6 rounded-full">
              PLAYER 1 READY
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-yellow-400">AIY</span>VAN
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-gray-300">
              DEV CLASS: <span className="text-yellow-400">CREATOR</span>
            </h2>
            
            <p className="text-xl text-gray-400">
              Game Dev + Web Dev + QA Automation//
            </p>
            <p className="text-xl text-gray-400 mb-8">
              Games. Websites. Automation. All crafted with care.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <PixelButton href="#projects">
                VIEW PROJECTS
              </PixelButton>
              <PixelButton href="#contact"className="bg-gray-800 hover:bg-gray-700">
                CONTACT ME
              </PixelButton>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-yellow-400 rounded-full opacity-50 blur-lg animate-pulse"></div>
              <img 
                src={mypicture} 
                alt="Aiyvan Avatar" 
                className="w-64 h-64 object-cover rounded-full border-4 border-yellow-400 shadow-2xl relative z-10" 
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black px-2 py-1 rounded-lg font-bold text-sm z-20">
                LVL 28
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="min-h-screen py-24 px-8 bg-gray-800 flex items-center"
      >
        <div className="max-w-6xl mx-auto">
          <GameWindow title="ABOUT ME">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400">
                  Character Profile
                </h2>
                
                <div className="prose prose-lg text-gray-300">
                  <p>
                    Hey there! I'm <span className="text-yellow-400 font-bold">Aiyvan</span>, a passionate 
                    game, web developer and QA Automation
                  </p>
                  
                  <p className="mt-4">
                    My journey in the digital realm began as a hobby, experimenting with simple games and websites. 
                    Today, I've transformed that passion into a skillset that brings ideas to life across code, creativity, and quality.
                  </p>
                  
                  <p className="mt-4">
                    Whether I’m building pixel-art platformers in Unity, developing sleek and responsive websites, or automating tests with Karate Cucumber, 
                    I’m always striving to create experiences that are both engaging and reliable.
                  </p>
                  
                  <div className="mt-8 p-4 bg-gray-900 border-l-4 border-yellow-400 italic">
                    "Every dev starts as a noob, The key is to keep respawning."
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Character Stats</h3>
                
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-gray-400 text-sm">CLASS</div>
                      <div className="font-bold"> <span className='text-yellow-400'>Digital Craftsman</span></div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">SPECIALTY</div>
                      <div className="font-bold">Unity / Web Dev / Karate Automation</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">EDUCATION</div>
                      <div className="font-bold">Bachelor's in Information Technology - <span className='text-yellow-400'>National University Laguna</span></div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">LOCATION</div>
                      <div className="font-bold">Philippines</div>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-4 text-yellow-400">Main Quests</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span> Create immersive game experiences
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span> Build responsive web applications
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-400 mr-2">...</span> Publish indie game on Steam
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </GameWindow>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="min-h-screen py-24 px-8 bg-gray-900 flex items-center"
      >
        {/* Game Dev Projects*/}
        <div className="max-w-6xl mx-auto w-full">
          <GameWindow title="GAME DEVELOPMENT PROJECTS">
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">My Quests & Adventures</h2>
            
            <div className="mb-6 text-gray-300">
              Check out some of my latest projects and game development work.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {gamedevprojects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </GameWindow>
        </div>
        </section>
        <section   id="projects" 
        className="min-h-screen py-24 px-8 bg-gray-900 flex items-center"
        >
        {/* Web Dev Projects*/}
        <div className="max-w-6xl mx-auto w-full">
          <GameWindow title="WEB DEVELOPMENT PROJECTS">
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">My Quests & Adventures</h2>
            
            <div className="mb-6 text-gray-300">
              Check out some of my latest projects and web development work.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {webdevprojects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </GameWindow>
        </div>
      </section>



      {/* Skills Section */}
      <section 
        id="skills" 
        className="min-h-screen py-24 px-8 bg-gray-800 flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          <GameWindow title="SKILLS & ABILITIES">
            <div className="grid md:grid-cols-2 gap-8">

              {/* Game Dev tools*/}
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400 text-center">Game Dev Equipment & Tools</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg" },
                    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"}
                  ].map((tool, index) => (
                    <motion.div 
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <img src={tool.icon} alt={tool.name} className="w-16 h-16 mb-2" />
                      <div className="text-sm text-center">{tool.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Web Dev tools*/}
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400 text-center">Web Dev Equipment & Tools</h2>
                
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
                    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-plain.svg" },
                    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
                    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                    { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg" },
                    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"},
                  ].map((tool, index) => (
                    <motion.div 
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <img src={tool.icon} alt={tool.name} className="w-16 h-16 mb-2" />
                      <div className="text-sm text-center">{tool.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

                  {/* Management Tool*/}
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400 text-center">Productivity & Version Control</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: "GitHub Desktop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
                    { name: "Visual Studio Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-plain.svg" },
                    { name: "Visual Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg" },
                    { name: "Milanote", icon: "" }
                  ].map((tool, index) => (
                    <motion.div 
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <img src={tool.icon} alt={tool.name} className="w-16 h-16 mb-2" />
                      <div className="text-sm text-center">{tool.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Design Protoyping*/}
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400 text-center">Design & Prototyping</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
                    { name: "Piskel", icon: "" },
                    { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" }
                  ].map((tool, index) => (
                    <motion.div 
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      <img src={tool.icon} alt={tool.name} className="w-16 h-16 mb-2" />
                      <div className="text-sm text-center font-medium">{tool.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GameWindow>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="min-h-screen py-24 px-8 bg-gray-900 flex items-center"
      >
        <div className="max-w-4xl mx-auto w-full">
          <GameWindow title="CONTACT">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-yellow-400">Send A Message</h2>
              <p className="text-gray-300">Ready to start a new quest together? Reach out!</p>
            </div>
            
            <div className="gap-12">
              <div>
                <div className="p-6 bg-gray-800 border border-gray-700 rounded mb-6 text-center">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">Quick Contact</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm">EMAIL</div>
                      <a href="mailto:charlesivanbrena@gmail.com" className="text-yellow-400 hover:underline">
                        charlesivanbrena@gmail.com
                      </a>
                    </div>
                    
                    <div>
                      <div className="text-gray-400 text-sm">BASED IN</div>
                      <div>Philippines</div>
                    </div>
                  </div>
                </div>
                
                <div className='mx-auto text-center'>
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">Join My Quest</h3>
                  
                  <div className="flex flex-wrap gap-4 text-center justify-center">
                    <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                      <motion.div 
                        className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full"
                        whileHover={{ y: -3, backgroundColor: "#333" }}
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6" />
                      </motion.div>
                    </a>
                    
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                      <motion.div 
                        className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full"
                        whileHover={{ y: -3, backgroundColor: "#0077b5" }}
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-6 h-6" />
                      </motion.div>
                    </a>
                    
                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                      <motion.div 
                        className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full"
                        whileHover={{ y: -3, backgroundColor: "#1da1f2" }}
                      >
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="Twitter" className="w-6 h-6" />
                      </motion.div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </GameWindow>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black py-8 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-yellow-400 font-bold text-2xl mb-4">AIYVAN</div>
          
          <p className="text-gray-500 mb-6">
            Game Developer & Web Developer
          </p>
          
          <div className="text-gray-600 text-sm">
            © 2025 Aiyvan. All Rights Reserved.
          </div>
          
          <div className="mt-4 text-xs text-gray-700">
            PRESS START TO CONTINUE
          </div>
        </div>
      </footer>
    </div>
  );
}


// Main App Component
export default function App() {
  const [gameState, setGameState] = useState('loading');
  
  useEffect(() => {
    // Simulating loading screen
    setTimeout(() => {
      setGameState('start');
    }, 2500);
  }, []);
  
  const handleStart = () => {
    setGameState('playing');
  };
  
  if (gameState === 'loading') {
    return <LoadingScreen onComplete={() => setGameState('start')} />;
  }
  
  if (gameState === 'start') {
    return <StartScreen onStart={handleStart} />;
  }
  
  return <MainPortfolio />;
}