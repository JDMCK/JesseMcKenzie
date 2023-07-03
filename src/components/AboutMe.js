'use client'

import Image from 'next/image';
import guitar from '../imgs/guitar.png';
import '../styles/AboutMe.css';
import { useState } from 'react';
import arrow from '../imgs/arrow.png'
import longboard from '../imgs/longboard.png';

const AboutMe = () => {

  const slides = [
    <div id='guitar' className='hobby-slide' key={0}>
      <h2>Guitar</h2>
      <Image src={guitar} alt='guitar' />
      <div className='hobby-audio'>
        <audio controls src='/black_bird.mp3'>
          Your browser does not support the audio element.
        </audio>
        <p>Me playing <i>Blackbird</i> by <b>The Beatles</b></p>
      </div>
      <p>For the past 5 years I have been casually been playing guitar. I have always loved music, but this is my
        favorite way to express it! My favourite artists who inspire me right now are <b>Noah Kahan</b>, <b>Lizzy McAlpine</b>,
        and of course, <b>The Beatles</b>.</p>
    </div>,
    <div id='coding' className='hobby-slide' key={1}>
      <h2>Coding</h2>
      <p>{`Believe it or not, I don't actually code just so other people think I'm cool! I legitimately love coding.
        Breaking all these huge problems into tiny pieces and then obsessing over each one until every piece falls into
        place is incredibly satisfying. With coding, there is a never-ending supply of things to learn, and things
        to build. I started this journey back in 2020 using c++ with my first hello world and I haven't looked back since.`}</p>
      <div id='hello-world'>
        <p className='typed'>{'std::cout << "Hello World";'}</p>
      </div>
    </div>,
    <div id='longboarding' className='hobby-slide' key={2}>
      <h2>Longboarding</h2>
      <Image src={longboard} alt='longboard' />
      <p>{`There is nothing quite like the feeling of carving back and forth on one of these bad boys. It genuinely
        feels like I am flying. I'm no adrenaline junkie, but the call to bomb a hill on a longboard is sometimes
        worryingly strong...`}</p>
    </div>
  ]

  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <>
      <h1 id='about-me-title'>About Me</h1>
      <section id='about-me'>
        <div className='button-center'>
          <button onClick={() => setSlideIndex(prev => prev === 0 ? slides.length - 1 : prev - 1)}>
            <Image src={arrow} alt='arrow' />
          </button>
        </div>
        {slides[slideIndex]}
        <div className='button-center'>
          <button onClick={() => setSlideIndex(prev => prev === slides.length - 1 ? 0 : prev + 1)} className='right'>
            <Image src={arrow} alt='arrow' />
          </button>
        </div>
      </section>
    </>
  );
}

export default AboutMe;