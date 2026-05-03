"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-03

      Project to retrieve date of last visit from web storage and mark new article
      Author: jackson philips
      Date:   04/16/2026

      Filename: project09-03.js
*/

/* Page Objects */

let lastVisitDate = document.getElementById("lastVisitDate");
let articleDates = document.getElementsByClassName("posttime");

if ( localStorage.sbloggerVisit) {
      // get date of last visit from local storage
      let lastVisit = new Date(localStorage.sbloggerVisit);
      lastVisitDate.textContent = "Your last visit was on " + lastVisit.toLocaleString();
      // mark new articles
      for (let articleDate of articleDates) {
            let postDate = new Date(articleDate.textContent);
            if (postDate > lastVisit) {
                  articleDate.parentElement.classList.add("newArticle");
            }
      }
} else {
      lastVisitDate.textContent = "Welcome to SBlogger!";
      for (let articleDate of articleDates) {
            let currentDate = new Date();
            localStorage.sbloggerVisit = currentDate;
      }
}

