import Image from 'next/image';
import mazeSolver from '../imgs/maze_solver.gif';
import barterBetter1 from '../imgs/barter_better1.png';
import barterBetter2 from '../imgs/barter_better2.png';
import pokegame from '../imgs/pokegame.gif'
import '../styles/Projects.css';
import Link from 'next/link';

const Projects = () => {
  return (
    <div className='dark'>
      <h1 id='projects-title'>Projects</h1>
      <section id='projects'>
        <div className='python-maze-solver project'>
          <h2>Python Maze Solver</h2>
          <p>Using the Turtle library to render the maze, and the breadth-first search algorithm to solve it,
            I made a maze solver that can solve any given maze if the solution exists in Python. The GIF to the
            right is the actual visualization the program produces. I document my thought process in an ongoing
            tutorial-style series on my YouTube
            channel <Link href='https://www.youtube.com/channel/UC2xVQGhaFF4TKB8mh6WrqlQ' target='_blank'>here</Link>.</p>
          <Image src={mazeSolver} alt='maze-solver' />
        </div>
        <div className='barter-better project'>
          <h2>Barter Better</h2>
          <p>Barter Better is a cashless trading app developed using the agile methodology and built using React.
            Myself and three others from BCIT built this web-app entirly within a five week mini semester meant
            to mimic the real software development process in industry.
            You can try it yourself at <Link href='https://barterbetter.ca' target='_blank'>barterbetter.ca</Link>.</p>
          <Link href='https://barterbetter.ca' target='_blank'>
            <div className='barter-better-imgs'>
              <Image src={barterBetter1} alt='screenshot1' />
              <Image src={barterBetter2} alt='screenshot2' />
            </div>
          </Link>
        </div>
        <div className='pokegame project'>
          <h2>Pokégame</h2>
          <p>{`Pokégame is a memory game based on the popular Pokémon franchise. It features various difficulty modes and can
            provide a real challenge. I spent a lot of effort making sure the game felt "juicy" and fun to play, this is also
            why I made it graphically resemble old retro game systems. I built Pokégame in vanilla Javascript with help
            from the pokeapi for the assets. You can play it
            yourself `}<Link href='https://jdmck-pokegame.netlify.app/' target='_blank' >here.</Link></p>
          <Link href='https://jdmck-pokegame.netlify.app/' target='_blank' ><Image src={pokegame} alt='pokegame' /></Link>
        </div>
      </section>
    </div>
  );
}

export default Projects;