import Image from "next/image";
import Link from "next/link";
import breakout from '../imgs/breakout.gif';
import snake from '../imgs/snake.gif';
import flappyBlock from '../imgs/flappy_block.gif';
import '../styles/Games.css';

const Games = () => {
  return (
    <>
      <h1 id='games-title'>Games</h1>
      <section id='games'>
        <div className='game'>
          <Link href='/breakout'>
            <Image src={breakout} alt='breakout' />
            <h3>Breakout</h3>
          </Link>
        </div>
        <div className='game'>
          <Link href='/snake'>
            <Image src={snake} alt='snake' />
            <h3>Snake</h3>
          </Link>
        </div>
        <div className='game'>
          <Link href='/flappyBlock'>
            <Image src={flappyBlock} alt='flappy-block' />
            <h3>Flappy Block</h3>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Games;