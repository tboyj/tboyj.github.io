/*    JavaScript 7th Edition
      Chapter 2
      Project 02-03

      Application to return the shape of a clicked object
      Author: Jackson Philips
      Date:  10/16/2025

      Filename: project02-03.js
 */
document.getElementById("square").addEventListener("mouseover", () => {
document.getElementById("feedback").innerHTML = "You're hovering over the square";
});
document.getElementById("square").addEventListener("mouseout", () => {
document.getElementById("feedback").innerHTML = "";
});

document.getElementById("triangle").addEventListener("mouseover", () => {
document.getElementById("feedback").innerHTML = "You're hovering over the triangle";
});
document.getElementById("triangle").addEventListener("mouseout", () => {
    document.getElementById("feedback").innerHTML = "";
});

document.getElementById("circle").addEventListener("mouseover", () => {
document.getElementById("feedback").innerHTML = "You're hovering over the circle";
});
document.getElementById("circle").addEventListener("mouseout", () => {
    document.getElementById("feedback").innerHTML = "";
});