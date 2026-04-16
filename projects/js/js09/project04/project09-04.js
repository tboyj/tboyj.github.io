"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-04

      Project to store high scores from a game in a cookie
      Author: jackson philips
      Date:   04/16/2026

      Filename: project09-04.js
*/

/* Page Objects */
let bestText = document.getElementById("best");
let clockTimer = document.getElementById("timer");

// Custom event that runs when the puzzle is solved
window.addEventListener("puzzleSolved", updateRecord);

// Event listener that is run when the page loads
window.addEventListener("load", function() {
      if (this.document.cookie) {
            bestText.textContent = "Best Time: " + getBestTime() + " seconds";
      }
});

function getBestTime() {
   let cookies = document.cookie.split("; ");

   for (let cookie of cookies) {
      let [name, value] = cookie.split("=");

      if (name === "bestTime") {
         return parseInt(value);
      }
   }

   return 9999;
}

function updateRecord() {
   let solutionTimer = parseInt(clockTimer.textContent);

   let bestTime = getBestTime();

   if (solutionTimer < bestTime) {
      setBestTime(solutionTimer);
      bestText.textContent = "Best Time: " + solutionTimer + " seconds";
   } else {
      bestText.textContent = "Best Time: " + bestTime + " seconds";
   }
}

function setBestTime(time) {
   document.cookie = "bestTime=" + time + "; max-age=" + (60 * 60 * 24 * 90);
}
