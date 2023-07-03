'use client'

import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><button onClick={() => { document.getElementById('technologies-title').scrollIntoView() }}>Technologies</button></li>
        <li><button onClick={() => { document.getElementById('projects-title').scrollIntoView() }}>Projects</button></li>
        <li><button onClick={() => { document.getElementById('games-title').scrollIntoView() }}>Games</button></li>
        <li><button onClick={() => { document.getElementById('work-experience-title').scrollIntoView() }}>Work Experience</button></li>
        <li><button onClick={() => { document.getElementById('about-me-title').scrollIntoView() }}>About Me</button></li>
      </ul>
    </nav>);
}

export default Navbar;