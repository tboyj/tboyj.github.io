"use strict";
/*    JavaScript 7th Edition
      Chapter 12
      Project 12-03

      Project to show a recipe with expanding/contracting content
      Author: Jackson Philips
      Date:   05/01/2026

      Filename: project12-03.js
*/


$( () => {
    
    //jquery selector for children of article h2 elements
    $("article > h2").click(e => {
        
        //declare variables
        let heading = $(e.target);
        let list = $(heading).next();
        let headingImage = $(heading).children("img");
        
        //jquery slidetoggle 
        $(list).slideToggle(500) 
       
       if($(headingImage).attr("src") === "plus.png") {
          $(headingImage).attr("src", "minus.png");
                } else {
                    $(headingImage).attr("src", "plus.png");
        }
    });
});