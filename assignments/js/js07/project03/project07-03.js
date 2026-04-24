"use strict";

/* Countdown to a specific time */

// jackson philips
// 03/25/2026

// Target time (change this to whatever you want)
let targetTime = new Date("May 28, 2026 00:00:00");

// Page elements
let currentTime = document.getElementById("currentTime");
let daysLeftBox = document.getElementById("days");
let hrsLeftBox = document.getElementById("hours");
let minsLeftBox = document.getElementById("minutes");
let secsLeftBox = document.getElementById("seconds");

// Function to update countdown
function updateCountdown() {
   let now = new Date();

   // Show current time
   currentTime.textContent = now.toLocaleString();

   // Time difference in milliseconds
   let timeDiff = targetTime - now;

   // If countdown is over
   if (timeDiff <= 0) {
      daysLeftBox.textContent = "0";
      hrsLeftBox.textContent = "0";
      minsLeftBox.textContent = "0";
      secsLeftBox.textContent = "0";
      return;
   }

   // Convert milliseconds to time units
   let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
   let hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
   let minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
   let seconds = Math.floor((timeDiff / 1000) % 60);

   // Display values
   daysLeftBox.textContent = days;
   hrsLeftBox.textContent = hours;
   minsLeftBox.textContent = minutes;
   secsLeftBox.textContent = seconds;
}

// Run every second
setInterval(updateCountdown, 1000);