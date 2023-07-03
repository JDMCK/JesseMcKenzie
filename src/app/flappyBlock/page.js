'use client'

import WaveBottom from "@/components/WaveBottom";
import WaveTop from "@/components/WaveTop";
import { useEffect } from "react";
import '../Game.css';
import Image from "next/image";
import Link from "next/link";
import arrow from '@/imgs/arrow.png';

const FlappyBlock = () => {

  useEffect(() => {

    const CANVASWIDTH = 700;
    const CANVASHEIGHT = 500;
    const CANVASCOLOR = 'lightblue';

    const BIRDSIZE = 15;
    const BIRDCOLOR = 'yellow';
    const BIRDX = CANVASWIDTH / 3;
    const JUMPPOWER = -4;
    const VELOCITYCAPDOWN = 3;
    const VELOCITYCAPUP = -2.5;

    const PIPEWIDTH = 90;
    const PIPECOLOR = 'limegreen';
    const PIPESPEED = -1;
    const PIPEGAP = 65;

    const GRAVITY = 0.04;

    let birdY = CANVASHEIGHT / 2;
    let velocityY = 0;

    let pipes = []; // [[x, y, scored], [x, y, scored]]

    // Gameplay
    let score = 0;
    let dead = false;
    let start = false;
    let board;
    let context;
    let gameInterval;
    let interval;

    const startGame = function () {
      board = document.getElementById('flappy-block-board');
      board.height = CANVASHEIGHT;
      board.width = CANVASWIDTH;
      context = board.getContext('2d');

      document.addEventListener('keydown', input);
      interval = setDelay();
      gameInterval = setInterval(update, 1 / 24);
    }

    function update() {
      if (!dead && start) {
        // Draw board
        context.fillStyle = CANVASCOLOR;
        context.fillRect(0, 0, board.width, board.height);

        // Move pipes
        if (pipes.length > 0 && pipes[0][0] + PIPEWIDTH < 0) {
          pipes.shift();
        }
        for (let i = 0; i < pipes.length; i++) {
          pipes[i][0] += PIPESPEED;
        }

        // Draw pipes
        context.fillStyle = PIPECOLOR;
        for (let i = 0; i < pipes.length; i++) {
          context.fillRect(pipes[i][0], pipes[i][1] + PIPEGAP, PIPEWIDTH, CANVASHEIGHT - pipes[i][1] + PIPEGAP);
          context.fillRect(pipes[i][0], pipes[i][1] - PIPEGAP, PIPEWIDTH, -(pipes[i][1] + PIPEGAP));
        }

        // Move bird
        moveBird();
        // Draw bird
        context.fillStyle = BIRDCOLOR;
        context.fillRect(BIRDX, birdY, BIRDSIZE, BIRDSIZE);

        // Draw score
        context.fillStyle = 'white';
        context.fillText(score, CANVASWIDTH / 16, CANVASHEIGHT * 7 / 8);
      }
      else if (!dead && !start) {
        // Draw board
        context.fillStyle = CANVASCOLOR;
        context.fillRect(0, 0, board.width, board.height);
        // Draw bird
        context.fillStyle = BIRDCOLOR;
        context.fillRect(BIRDX, birdY, BIRDSIZE, BIRDSIZE);
        // Draw instructions
        context.fillStyle = 'white';
        context.font = '20pt Helvetica';
        context.fillText('Press \'Space\' to play...', CANVASWIDTH / 2 - 110, CANVASHEIGHT * 3 / 4);
      }
      else {
        // Draw lose board
        context.fillStyle = 'red';
        context.fillRect(0, 0, board.width, board.height);
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, CANVASWIDTH / 2 - 50, CANVASHEIGHT / 2)
        context.fillText('Press \'Space\' to try again...', CANVASWIDTH / 2 - 145, CANVASHEIGHT / 2 + 50);
      }
    }

    function setDelay() {
      return setInterval(function () {
        if (start && !dead) {
          pipes.push([CANVASWIDTH + PIPEWIDTH, (Math.random() * CANVASHEIGHT * (2 / 3)) + CANVASHEIGHT / 6, false]);
        }
      }, 3 * -312 + 2312);
    }

    function moveBird() {
      // Floor collision
      if (birdY > CANVASHEIGHT) {
        dead = true;
        start = false;
      }

      velocityY += GRAVITY;

      // Speed cap
      if (velocityY > VELOCITYCAPDOWN) {
        velocityY = VELOCITYCAPDOWN;
      }
      if (velocityY < VELOCITYCAPUP) {
        velocityY = VELOCITYCAPUP;
      }
      birdY += velocityY;

      // Add score
      for (let i = 0; i < pipes.length; i++) {
        if (BIRDX > pipes[i][0] && !pipes[i][2]) {
          score++;
          pipes[i][2] = true;
        }
      }

      // Pipe collision
      for (let i = 0; i < pipes.length; i++) {
        if ((birdY + BIRDSIZE > pipes[i][1] + PIPEGAP ||
          birdY < pipes[i][1] - PIPEGAP) &&
          BIRDX + BIRDSIZE > pipes[i][0] &&
          BIRDX < pipes[i][0] + PIPEWIDTH) {
          dead = true;
          start = false;
        }
      }
    }

    function input(e) {
      if (e.code == 'Space' && !dead && start) {
        velocityY += JUMPPOWER;
      }
      if (e.code === 'Space' && !start && !dead) {
        start = true;
        clearInterval(interval);
        interval = setDelay();
        velocityY += JUMPPOWER;
      }
      if (e.code == 'Space' && dead) {
        dead = false;
        pipes = [];
        birdY = CANVASHEIGHT / 2;
        score = 0;
      }
    }
    startGame();

    return () => clearInterval(gameInterval);
  }, [])

  return (
    <>
      <div className='dark'>
        <Link href='/#games-title'><Image id='back-arrow' src={arrow} alt='arrow' /></Link>
      </div>
      <WaveTop />
      <h1>Flappy Block</h1>
      <div className='canvas'>
        <canvas id='flappy-block-board'></canvas>
      </div>
      <WaveBottom sticky={true} />
    </>
  );
}

export default FlappyBlock;