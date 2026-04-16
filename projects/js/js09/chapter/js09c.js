"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season Retrieving Data from Local Storage
      Author: 
      Date:   
      
      Filename: js09c.js
 */

let keys = ["name", "email", "phone", "address", "city", "state", "zip", "allergies", "frequency", "size"];

for (let key of keys) {
      let newRow = document.createElement("tr");
      let keyCell = document.createElement("td");
      keyCell.textContent = key;
      newRow.appendChild(keyCell);
      let fieldValue = document.createElement("td");
      fieldValue.textContent = localStorage.getItem(key);
      newRow.appendChild(fieldValue);

      document.getElementById("prefTable").appendChild(newRow);

}

document.getElementById("removePrefBtn").onclick = function() {
      for (let key of keys) {
            localStorage.removeItem(key);
      }
};