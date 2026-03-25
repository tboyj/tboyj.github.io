"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Project 07-04

      Project to create a customer queue
      Author: jackson philips
      Date:   03/25/2026

      Filename: project07-04.js
*/

let customers = ["Alisha Jordan","Kurt Cunningham", "Ricardo Lopez", "Chanda Rao",
                 "Kevin Grant", "Thomas Bey", "Elizabeth Anderson", "Shirley Falk",
                 "David Babin", "Arthur Blanding", "Brian Vick", "Jaime Aguilar",
                 "Eileen Rios", "Gail Watts", "Margaret Wolfe", "Kathleen Newman",
                 "Jason Searl", "Stephen Gross", "Robin Steinfeldt", "Jacob Bricker",
                 "Gene Bearden", "Charles Sorensen", "John Hilton", "David Johnson",
                 "Wesley Cho"];

let customerName = document.getElementById("customerName");
let customerList = document.getElementById("customerList");

let addButton = document.getElementById("addButton");
let searchButton = document.getElementById("searchButton");
let removeButton = document.getElementById("removeButton");
let topButton = document.getElementById("topButton");

let status = document.getElementById("status");

generateCustomerList();

// Function to generate the ordered list based on the contents of the customers array
function generateCustomerList() {
   customerList.innerHTML = "";
   for (let i = 0; i < customers.length; i++) {
      let customerItem = document.createElement("li");      
      customerItem.textContent = customers[i];     
      customerList.appendChild(customerItem);
   }
}

addButton.onclick = function() {
   let name = customerName.value.trim();

   // Make sure input isn't empty
   if (name !== "") {
      customers.push(name); // add to end of array

      generateCustomerList(); // refresh list

      status.textContent = name + " added to the end of the queue";

      customerName.value = ""; // clear input box
   }
};

searchButton.onclick = function() {
   let name = customerName.value.trim();

   let index = customers.indexOf(name);
   let place = index + 1;

   if (place === 0) {
      status.textContent = name + " not found in queue";
   } else {
      status.textContent = name + " found in position " + place + " of queue";
   }
};

removeButton.onclick = function() {
   let name = customerName.value.trim();

   let index = customers.indexOf(name);

   if (index !== -1) {
      customers.splice(index, 1); // remove 1 item at that index

      status.textContent = name + " removed from the queue";

      generateCustomerList(); // refresh list
   } else {
      status.textContent = name + " not found in the queue";
   }
};

topButton.onclick = function() {
   if (customers.length > 0) {
      let topCustomer = customers.shift(); // remove first customer

      status.textContent = topCustomer + " removed from the top of the queue";

      generateCustomerList(); // refresh list
   } else {
      status.textContent = "The queue is empty";
   }
};


