"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-03

      Project to create a table of headings from an article
      Author: Jackson Philips
      Date:   03/12/2026

      Filename: project05-03.js
*/
let sourceDoc = document.getElementById("source_doc");
let toc = document.getElementById("toc");
let headingCount = 1;
const heading = "h2";

//Create a for loop using the code structure described above going from the first chld element of the source doc variable through the last child element where the next sibling elemnt would be null.
for (let n = sourceDoc.firstElementChild; n !== null; n = n.nextElementSibling) {
      //Use an if statement to check if the current element n is a heading element by comparing the tag name of n to the heading variable.
      if (n.tagName.toLowerCase() === heading) {
            //If the current element is a heading element, create a new list item element and store it in a variable named tocEntry.
            let tocEntry = document.createElement("li");
            //Set the text content of the new list item to the text content of the current heading element.
            //Append the new list item to the table of contents variable.
            toc.appendChild(tocEntry);
            //Set the id attribute of the current heading element to "heading" followed by the current value of the heading count variable.
            n.setAttribute("id", "doclink" + headingCount);
            //Create a new anchor element and store it in a variable.
            let newLink = document.createElement("a");
            //Set the href attribute of the new anchor element to "#doclink" followed by the current value of the heading count variable.
            newLink.setAttribute("href", "#doclink" + headingCount);
            //Set the text content of the new anchor element to the text content of the current heading element.
            newLink.textContent = n.textContent;
            //Append the new anchor element to the new list item element.
            tocEntry.appendChild(newLink);
            //Increment the heading count variable by 1.
            headingCount++;
      }
}