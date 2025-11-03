/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
      Author: Jackson Philips 
      Date: 11/3/2025 

     Filename: js03.js
 */

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];

function addWeekDays() {
    let i = 0; 
    let headingCells = document.getElementsByTagName("th");
    while (i < 7) {
        headingCells[0].innerHTML = weekDays[i];
        i++;
    }
}

function showGames() {
    for (let i = 0; i < gameDates.length; i++) {
        let gameInfo;
        switch (gameResults[i]) {
            case "W":
                gameInfo = "<p class='win'>";
                break;
            case "L":
                gameInfo = "<p class='lose'>";
                break;
            case "P":
                gameInfo = "<p class='postponed'>";
                break;
            case "S":
                gameInfo = "<p class='suspended'>";
                break;
        }
        if (gameLocations[i] === "h") {
            gameInfo += "vs. ";
        } else if (gameLocations[i] === "a") {
            gameInfo += "@ ";
        }
        gameInfo += gameOpponents[i] + "<br>";
        gameResults[i] + ": (" +
            runsScored[i] +" - "+runsAllowed[i]+")";

        if (gameInnings[i] < 5) {
            gameInfo += "["+gameInnings[i]+"]***";
        } else if (gameInnings[i] < 9) {
            gameInfo += "["+gameInnings[i]+"]*";
        } else {
            gameInfo +="["+gameInnings[i]+"]";
        }
        gameInfo += "</p>";

        let tableCell = document.getElementById(gameDates[i]);
        tableCell.insertAdjacentHTML("beforeEnd", gameInfo);
    }
}
window.addEventListener("load", addWeekDays);
window.addEventListener("load", showGames);