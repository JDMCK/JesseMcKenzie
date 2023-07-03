'use client'

import WaveBottom from "@/components/WaveBottom";
import WaveTop from "@/components/WaveTop";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import arrow from '@/imgs/arrow.png';
import '../Game.css';

const Breakout = () => {

  useEffect(() => {
    const CANVASWIDTH = 700;
    const CANVASHEIGHT = 500;

    const BRICKROWS = 5;
    const BRICKCOLS = 12;
    const MARGIN = 4;
    const BRICKWIDTH = CANVASWIDTH / BRICKCOLS - (MARGIN / BRICKCOLS);
    const BRICKHEIGHT = CANVASHEIGHT / BRICKROWS / 3;
    const BRICKCOLORS = ['white', 'green', 'lime', 'cyan', 'yellow', 'red', 'orange', 'lightblue', 'blue', 'purple', 'pink'];

    const PADDLEWIDTH = 90;
    const PADDLEHEIGHT = 10;
    const PADDLEY = CANVASHEIGHT * (9 / 10);
    const PADDLESPEED = 3;

    const BALLRADIUS = 10;
    const BALLSPEED = 2;

    let ballX = 0;
    let ballY = 0;
    let velocityX = 0;
    let velocityY = 0;

    let paddleX = CANVASWIDTH / 2 - PADDLEWIDTH / 2;
    let paddleVel = 0;

    let bricks = [];
    initBricks();
    function initBricks() {
      // Populate bricks with [xpos, ypox, color]
      for (let i = 0; i < BRICKROWS; i++) {
        let row = [];
        for (let j = 0; j < BRICKCOLS; j++) {
          row.push([j * BRICKWIDTH, i * BRICKHEIGHT, BRICKCOLORS[Math.floor(Math.random() * BRICKCOLORS.length)]]);
        }
        bricks.push(row);
      }
    }

    //Gameplay
    let score = 0;
    let launched = false;
    let extraBalls = 2;
    let win = false;
    let context;
    let board;
    let interval;

    const start = function () {
      board = document.getElementById('breakout-board');
      board.height = CANVASHEIGHT;
      board.width = CANVASWIDTH;
      context = board.getContext('2d');

      document.addEventListener('keydown', move);
      document.addEventListener('keyup', stop);
      interval = setInterval(update, 1 / 24);
    }

    function update() {

      if (extraBalls >= 0) {
        // Draw board
        context.fillStyle = 'black';
        context.fillRect(0, 0, board.width, board.height);

        // Draw paddle
        paddleX += paddleVel;
        // Stop at wall
        if (paddleX < 0) paddleX = 0;
        if (paddleX + PADDLEWIDTH > CANVASWIDTH) paddleX = CANVASWIDTH - PADDLEWIDTH;
        context.fillStyle = 'white';
        context.fillRect(paddleX, PADDLEY, PADDLEWIDTH, PADDLEHEIGHT);

        // Draw bricks
        // adjusts for margin
        for (let i = 0; i < bricks.length; i++) {
          for (let j = 0; j < bricks[i].length; j++) {
            context.fillStyle = bricks[i][j][2];
            context.fillRect(bricks[i][j][0] + MARGIN, bricks[i][j][1] + MARGIN, BRICKWIDTH - MARGIN, BRICKHEIGHT - MARGIN);
          }
        }

        // Draw ball
        ballMove();
        context.fillStyle = 'white';
        context.beginPath();
        if (!launched) {
          ballX = paddleX + PADDLEWIDTH / 2;
          ballY = PADDLEY - BALLRADIUS - 1;
        }
        context.arc(ballX, ballY, BALLRADIUS, 0, 2 * Math.PI);
        context.fill();

        // Draw score
        context.font = '20pt Helvetica';
        context.fillText('Score: ' + score, 20, PADDLEY + PADDLEHEIGHT * 4);

        // Draw balls remaining
        context.font = '20pt Helvetica';
        context.fillText('Balls: ' + extraBalls, CANVASWIDTH - 100, PADDLEY + PADDLEHEIGHT * 4);

        // Detect win
        if (score == BRICKROWS * BRICKCOLS) {
          win = true;
          extraBalls = -1;
        }
      }
      else if (!win) {
        context.fillStyle = 'red';
        context.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
        context.fillStyle = 'white';
        context.fillText('Final Score: ' + score, CANVASWIDTH / 2 - 70, CANVASHEIGHT / 2);
        context.fillText('Press \'Space\' to play again...', CANVASWIDTH / 2 - 150, CANVASHEIGHT / 2 + 70);
      }
      else {
        context.fillStyle = 'limegreen';
        context.fillRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
        context.fillStyle = 'white';
        context.fillText('YOU WIN!!!', CANVASWIDTH / 2 - 50, CANVASHEIGHT / 2 - 70);
        context.fillText('Final Score: ' + score, CANVASWIDTH / 2 - 70, CANVASHEIGHT / 2);
        context.fillText('Press \'Space\' to play again...', CANVASWIDTH / 2 - 150, CANVASHEIGHT / 2 + 70);
      }
    }

    function ballMove() {
      // Brick collision
      for (let i = 0; i < bricks.length; i++) {
        for (let j = 0; j < bricks[i].length; j++) {
          let brickX = bricks[i][j][0];
          let brickY = bricks[i][j][1];

          // Coming from the left
          if (ballX + BALLRADIUS > brickX &&
            ballX < brickX &&
            ballY > brickY &&
            ballY < brickY + BRICKHEIGHT) {
            hitBrick(i, j, 'x');
            break;
          }
          // Coming from the right
          if (ballX - BALLRADIUS < brickX + BRICKWIDTH &&
            ballX > brickX &&
            ballY > brickY &&
            ballY < brickY + BRICKHEIGHT) {
            hitBrick(i, j, 'x');
            break;
          }
          // Coming from the top
          if (ballY + BALLRADIUS > brickY &&
            ballY < brickY &&
            ballX > brickX &&
            ballX < brickX + BRICKWIDTH) {
            hitBrick(i, j, 'y');
            break;
          }
          // Coming from the bottom
          if (ballY - BALLRADIUS < brickY + BRICKHEIGHT &&
            ballY > brickY + BRICKHEIGHT &&
            ballX < brickX + BRICKWIDTH &&
            ballX > brickX) {
            hitBrick(i, j, 'y');
            break;
          }
        }
      }
      function hitBrick(i, j, dimension) {
        bricks[i][j] = [];
        score++;
        if (dimension == 'x')
          velocityX *= -1;
        if (dimension == 'y')
          velocityY *= -1;
      }
      // Wall collision
      if (ballX - BALLRADIUS < 0 ||
        ballX + BALLRADIUS > CANVASWIDTH) velocityX *= -1;

      // Floor collision
      if (ballY - BALLRADIUS > CANVASHEIGHT) {
        launched = false;
        extraBalls--;
        velocityX = 0;
        velocityY = 0;
      }

      // Ceiling collision
      if (ballY + BALLRADIUS < 0) velocityY *= -1;

      // Paddle collision
      if (ballY + BALLRADIUS > PADDLEY &&
        ballY < PADDLEY &&
        ballX > paddleX &&
        ballX < paddleX + PADDLEWIDTH) {
        velocityY *= -1;
        velocityX = (ballX - paddleX - PADDLEWIDTH / 2) /
          (PADDLEWIDTH / 2) * BALLSPEED;
      }

      // Add velocity
      ballX += velocityX;
      ballY += velocityY;
    }

    function move(e) {
      if (e.code == 'ArrowLeft') {
        paddleVel = -PADDLESPEED;
      }
      if (e.code == 'ArrowRight') {
        paddleVel = PADDLESPEED;
      }
      if (e.code == 'Space' && !launched && extraBalls >= 0) {
        launched = true;
        velocityY = -BALLSPEED;
        velocityX = (Math.random() - 0.5) * BALLSPEED;
      }
      if (e.code == 'Space' && extraBalls < 0) {
        location.reload();
      }
    }

    // function resetBall() {
    //     velocityX = 0;
    //     velocityY = 0;
    //     ballX = paddleX + PADDLEWIDTH/2;
    //     ballY = PADDLEY - BALLRADIUS - 1;
    // }

    function stop(e) {
      if (e.code == 'ArrowLeft' && paddleVel > 0) {
        return;
      }
      else if (e.code == 'ArrowRight' && paddleVel < 0) {
        return;
      }
      else if (e.code == 'ArrowLeft' || e.code == 'ArrowRight') {
        paddleVel = 0;
      }
    }
    start();

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <div className='dark'>
        <Link href='/#games-title'><Image id='back-arrow' src={arrow} alt='arrow' /></Link>
      </div>
      <WaveTop />
      <h1>Breakout</h1>
      {/* <button id='back-button'><Image src={arrow} alt='back-arrow' /></button> */}
      <div className='canvas'>
        <canvas id='breakout-board'></canvas>
      </div>
      <WaveBottom sticky={true} />
    </>
  );
}

export default Breakout;