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
      if (document.cookie) {
            bestText.textContent = getBestTime() + " seconds";
      }
});

function getBestTime() {
   if (document.cookie) {
      let cookieArray = document.cookie.split("=");
      return parseInt(cookieArray[1]);
   } else {
      return 9999; // Return a very high time if no cookie is set
   }
   
}

function updateRecord() {
   // store a the value of the document element with the id timer within it 
   let solutionTime = id("timer").textContent;
   // convert the value to an integer 
   solutionTime = parseInt(solutionTime);
   // get the best time from the cookie
   let bestTime = getBestTime();
   // if the solution time is less than the best time, update the cookie and the page text
   if (solutionTime < bestTime) {
      document.cookie = "bestTime=" + solutionTime;
      bestText.textContent = solutionTime + " seconds";
   }
   document.cookie = "puzzle8Best=" + solutionTime + "; max-age=31536000"; // Set cookie to expire in 1 year
   console.log("cookie set: " + document.cookie);
}

