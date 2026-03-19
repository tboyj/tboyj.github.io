"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-02

      Project to turn a selection list into a selection of hypertext links
      Author: jackson p
      Date:   03/19/2026

      Filename: project06-02.js
*/

window.addEventListener("load", function() {
      // within anonymous function, add statement that uses the queryselectorall() method to create a node list matching the css selector 'form#govLinks select'. store in allSelect variable.
      const allSelect = document.querySelectorAll("form#govLinks select");
      for (let i = 0; i < allSelect.length; i++) {
            allSelect[i].addEventListener("change", function(evt) {
                  // Code to handle selection change goes here
                  let linkURL = evt.target.value;
                  let newWin = window.open(linkURL);
            });
      }
});