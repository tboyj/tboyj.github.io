"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-03

      Script to complete a form containing billing and shipping address information
      Author: jackson p
      Date:   03/19/26

      Filename: project06-03.js
*/
let useShip = document.getElementById("useShip");
useShip.addEventListener("click", copyShippingToBilling);

function copyShippingToBilling() {
      if (useShip.checked) {
            // a. set the value of firstnameBill field to the value of the firstnameShip field
            document.getElementById("firstnameBill").value = document.getElementById("firstnameShip").value;
            // b. repeat previous step to set the value of lastnameBill, address1Bill, address2Bill, cityBill, countryBill, codeBill fields
            document.getElementById("lastnameBill").value = document.getElementById("lastnameShip").value;
            document.getElementById("address1Bill").value = document.getElementById("address1Ship").value;
            document.getElementById("address2Bill").value = document.getElementById("address2Ship").value;
            document.getElementById("cityBill").value = document.getElementById("cityShip").value;
            document.getElementById("countryBill").value = document.getElementById("countryShip").value;
            document.getElementById("codeBill").value = document.getElementById("codeShip").value;
            // c. set selectedIndex property of stateBill field to the value of the selectedIndex property of the stateShip field.
            document.getElementById("stateBill").selectedIndex = document.getElementById("stateShip").selectedIndex;
      }
}

let formElements = document.querySelectorAll("input[type='text']");
let fieldCount = formElements.length;
let errorBox = document.getElementById("errorBox");
for (let i = 0; i < formElements.length; i++) {
      formElements[i].addEventListener("invalid", function(evt) {
            evt.preventDefault();
            showValidationError(evt);
      });
}

function showValidationError(evt) {
      errorBox.textContent = "Complete all highlighted fields";
}