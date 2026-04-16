"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-02

      Project to add balls bouncing within a container
      Author: jackson philips
      Date:   04/16/2026

      Filename: project08-02.js
*/

/*---------------- CONSTANTS ---------------------*/
const BALL_RADIUS = 60; // radius of the ball in pixels
const BOX_HEIGHT = 400; // height of the container in pixels
const BOX_WIDTH = 800;  // width of the container in pixels

/*--------------- Object Code --------------------*/


let box = {
   width: BOX_WIDTH,
   height: BOX_HEIGHT,
   xPos: 0,
   yPos: 0
};
class Ball {
   constructor(element) {
      this.element = element;

      // Starting position (center of box)
      this.x = (BOX_WIDTH - BALL_RADIUS) / 2;
      this.y = (BOX_HEIGHT - BALL_RADIUS) / 2;

      // Random speed and direction
      this.dx = rand(-5, 5);
      this.dy = rand(-5, 5);
   }

   // moveWithin() method of the ball objec class prototype
   // must be anonymous function expression to be used with setInterval()
   moveWithin = (container) => {
   this.x += this.dx;
   this.y += this.dy;

   // Bounce vertically
   if (this.y <= 0 || this.y + BALL_RADIUS >= container.height) {
      this.dy = -this.dy;
   }

   // Bounce horizontally
   if (this.x <= 0 || this.x + BALL_RADIUS >= container.width) {
      this.dx = -this.dx;
   }

   // Update position on screen
   this.element.style.top = this.y + "px";
   this.element.style.left = this.x + "px";
}
}




/*---------------Interface Code -----------------*/

// Reference to the container box
let boxImage = document.getElementById("box");
boxImage.style.width = BOX_WIDTH + "px";
boxImage.style.height = BOX_HEIGHT + "px";
boxImage.style.top = "0px";
boxImage.style.left = "0px"

// Reference to the Add Ball button
let addBall = document.getElementById("addBall");

addBall.onclick = function() {

   // Create the ball element FIRST
   let ballImage = document.createElement("div");
   ballImage.className = "ball";
   ballImage.style.width = BALL_RADIUS + "px";
   ballImage.style.height = BALL_RADIUS + "px";
   ballImage.style.position = "absolute";

   // Add it to the box
   boxImage.appendChild(ballImage);

   // Now create Ball object USING that element
   let newBall = new Ball(ballImage);

   // Animate using anonymous function (this is what your assignment wants)
   setInterval(function(container) {
      newBall.moveWithin(container);
   }, 20, box);
};


/* Function to return a random value between minVal and maxValue */
function rand(minVal, maxVal) {
   let size = maxVal - minVal + 1;
   return minVal + size*Math.random();
}