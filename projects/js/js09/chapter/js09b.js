"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season 
      Author: 
      Date:   
      
      Filename: js09b.js
 */

      // get text string from address bar 
      let queryString = location.search.slice(1);

      queryString = queryString.replace(/\+/g, " ");
      queryString = decodeURIComponent(queryString);
      
      let formData = queryString.split(/&/g);
      console.log(formData);

      for (let i = 0; i < formData.length; i++) {
            let fieldValuePair = formData[i].split(/=/);
            let fieldName = fieldValuePair[0];
            let fieldValue = fieldValuePair[1];
            // make label for each field name
            let fieldLabel = document.createElement("label");
            fieldLabel.textContent = fieldName;
            document.getElementById("contactInfo").appendChild(fieldLabel);
            // make input for each field value
            let inputBox = document.createElement("input");
            inputBox.id = fieldName;
            inputBox.name = fieldName;
            inputBox.value = fieldValue;
            inputBox.disabled = true;
            document.getElementById("contactInfo").appendChild(inputBox);
      }



      


      // store data to local storage after user clicks submit button
      document.getElementById("signupBtn").addEventListener("click", function() {
            let formFields = document.querySelectorAll("#contactInfo input, input[type='radio'], textarea");
            for (let fields of formFields) {
                  localStorage.setItem(fields.name, fields.value);
            }
      });

      console.log(localStorage);