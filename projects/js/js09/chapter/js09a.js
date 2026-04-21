"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season 
      Filename: js09a.js
*/

window.addEventListener("load", function () {

   let form = document.querySelector("form");

   form.addEventListener("submit", function (e) {

      let isValid = true;
      let errorMsg = "";

      // get field values
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let address = document.getElementById("address").value.trim();
      let city = document.getElementById("city").value.trim();
      let state = document.getElementById("state").value.trim();
      let zip = document.getElementById("zip").value.trim();

      // simple validation
      if (name === "") {
         isValid = false;
         errorMsg += "Name is required.\n";
      }

      if (email === "") {
         isValid = false;
         errorMsg += "Email is required.\n";
      }

      if (phone === "") {
         isValid = false;
         errorMsg += "Phone is required.\n";
      }

      if (address === "") {
         isValid = false;
         errorMsg += "Address is required.\n";
      }

      if (city === "") {
         isValid = false;
         errorMsg += "City is required.\n";
      }

      if (state === "") {
         isValid = false;
         errorMsg += "State is required.\n";
      }

      if (zip === "") {
         isValid = false;
         errorMsg += "Zip is required.\n";
      }

      // stop submission if invalid
      if (!isValid) {
         alert(errorMsg);
         e.preventDefault();
      }

   });

});

