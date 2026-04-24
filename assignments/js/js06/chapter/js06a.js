"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: jackson philips 
      Date:   3/17/2026

      Filename: js06a.js
 */



window.addEventListener("load", function () {
   // Get references to the form elements
   let orderForm = this.document.forms.orderForm;
   let model = orderForm.elements.model;
//    select model list
   model.focus();
   //adding event listeners to the form elements

   for (let i = 0; i < orderForm.elements.length; i++) {
      model.addEventListener("change", calcOrder);
      orderForm.elements[i].addEventListener("change", calcOrder);
   }

   calcOrder();

   
    function calcOrder() {
      let mIndex = model.selectedIndex;
      let mValue = model.options[mIndex].value;
// quantity selected

      let qIndex = orderForm.elements.qty.selectedIndex;
// quantity selected
      let quantityValue = orderForm.elements.qty.options[qIndex].value;
      let modelCost = mValue * quantityValue;
      orderForm.elements.modelCost.value = modelCost.toLocaleString("en-US", {style: "currency", currency: "USD"});
      
      let planValue = document.querySelector('input[name="plan"]:checked').value;
      let planCost = planValue * quantityValue;
      orderForm.elements.planCost.value = planCost.toLocaleString("en-US", {style: "currency", currency: "USD"});

      let subtotal = modelCost + planCost;
      orderForm.elements.subtotal.value = subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"});

      let salesTax = subtotal * 0.05;
      orderForm.elements.salesTax.value = salesTax.toLocaleString("en-US", {style: "currency", currency: "USD"});

      let total = subtotal + salesTax;
      orderForm.elements.totalCost.value = total.toLocaleString("en-US", {style: "currency", currency: "USD"});
// calculate total

      // hidden values
      orderForm.elements.modelCostHidden.value = model.options[mIndex].text;
      let selectedPlan = document.querySelector('input[name="plan"]:checked');
      orderForm.elements.planName.value = selectedPlan.labels[0].textContent;

      }
});

