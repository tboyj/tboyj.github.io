"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-04

      Retrieve Staff Data from a JSON File
      Author: jackson philips
      Date:   04/16/2026

      Filename: project08-04.js
*/


let getFileButton = document.getElementById("getFile");
let containerBox = document.getElementById("container");

getFileButton.onchange = function() {
   // Retrieve information about the selected file
   let JSONfile = this.files[0];
   
   // Read the contents of the selected file
   let fr = new FileReader();
   fr.readAsText(JSONfile); 

   // Once the file has finished loading, parse the JSON file
   fr.onload=function(){ 
      // add a command to convert the JSON data into a JavaScript object named staff
      let staff = JSON.parse(fr.result);
      // Call the makeStaffTable() function to create a table of staff data and append the table to the container box
      containerBox.appendChild(makeStaffTable(staff));

   }
   
};

function makeStaffTable(staff) {
   let staffTable = document.createElement("table");
   let headerRow = document.createElement("tr");
   //create table row containing propertynames stored in json file using props from first dir entry. create a for in loop for the object stored in staff.directory[0] to create the header row of the table
   for (let prop in staff.directory[0]) {
      let headerCell = document.createElement("th");
      headerCell.textContent = prop;
      headerRow.appendChild(headerCell);
   }
   staffTable.appendChild(headerRow);
   // next create table rows containing prop values for each entry in directory array. add for loop that loops through items of staff.directory array and creates a table row for each entry. within the loop, create a for in loop that loops through the properties of each entry and creates a table cell for each property value
   for (let i = 0; i < staff.directory.length; i++) {
      let dataRow = document.createElement("tr");
      for (let prop in staff.directory[i]) {
         let dataCell = document.createElement("td");
         dataCell.textContent = staff.directory[i][prop];
         dataRow.appendChild(dataCell);
      }
      staffTable.appendChild(dataRow);
   }
   containerBox.appendChild(staffTable);
   return staffTable;
}