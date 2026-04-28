"use strict";

/*  JavaScript 7th Edition
    Chapter 12
    Chapter case

    Bonsai Expressions FAQ 
    Author: jackson philips
    Date:   4/28/2026

    Filename: js12.js
*/
$( () => {

    // animate h1
    $("section > h1").css({
        fontSize: 0,
        opacity: 0
    }).animate({
        fontSize: "2.3em",
        opacity: 1
    }, 600);

    // show FAQ
    $("#faq")
        .hide()
        .slideDown(600); // or use .effect if you add jQuery UI

    // click handler
    $("#faq dt").click(e => {
        let question = $(e.target);
        let answer = question.next();

        question.toggleClass("hiddenAnswer");

        if (question.hasClass("hiddenAnswer")) {
            answer.slideUp(600);
        } else {
            answer.slideDown(600);
        }
    });
});