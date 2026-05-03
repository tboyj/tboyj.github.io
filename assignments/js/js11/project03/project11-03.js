// //    <!--
//       JavaScript 7th Edition
//       Chapter 11
//       Hands-on Project 11-3

//       Author: jackson philips 
//       Date: 05/01/2026   

//       Filename: project11-03.js

"use strict";
console.log("JS LOADED");

let orderResult = document.getElementById("orderResult");
let userIDBox = document.getElementById("userID");
let pwdBox = document.getElementById("pwd");
let viewOrders = document.getElementById("viewOrders");

console.log("BUTTON:", viewOrders);

// Retrieve order history when button is clicked
viewOrders.onclick = function () {

   let user = userIDBox.value;
   let pwd = pwdBox.value;

   console.log(user);
   console.log(pwd);

   fetch(`wworders.pl?id=${user}&pwd=${pwd}`)
      .then(response => {
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         return response.json();
      })
      .then(data => {
         console.log("button press");
         console.log(data);

         buildOrderTable(data);
      })
      .catch(error => {
         console.error("Fetch error:", error);
      });

};

// Build output tables
function buildOrderTable(obj) {

   if (obj.status === "Orders Found") {

      let tableHTML = `
         <table id="summary">
            <tr><th>Name</th><td>${obj.username}</td></tr>
            <tr><th>Total Charges</th><td>${obj.totalCharges}</td></tr>
         </table>
      `;

      obj.orderHistory.forEach(order => {
         tableHTML += `
            <table class="orderList"><tr><th colspan="2">${order.orderDate}</th>
            <th colspan="2"${order.orderCost}</th></tr><tr><th><Description</th>
            <th>Qty</th><th>Price</th><th>Total</th></tr>`;
            order.products.forEach(products => {
               tableHTML += `
                  <tr><td>${products.description}</td><td>${products.qty}</td><td>${products.price}</td>
                  <td>${products.total}</td></tr>
               `;
            });
      

      tableHTML += `</table>`;
      });
      console.log(tableHTML);
      orderResult.innerHTML = tableHTML;

   } else if (obj.status === "Orders Not Found") {
      orderResult.innerHTML = "No orders found for this user id and password";
   } else {
      orderResult.innerHTML = "Error retrieving orders.";
   }
}