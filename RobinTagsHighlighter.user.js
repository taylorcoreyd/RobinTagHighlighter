// ==UserScript==
// @name         Robin Tag Highlighter
// @namespace    https://github.com/taylorcoreyd
// @version      0.0.1
// @description  Highlights Tags in Robin chats!
// @author       cdtdev
// @include      https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==


'use strict';
var messageList = $("#robinChatMessageList");
messageList.bind("DOMNodeInserted", function() {
    var tag = /.*\[.\].*/
    var spam = /\[Robin Autovoter.*\]/
    var x = $("#robinChatMessageList .robin-message").last();
    var message = x.find(".robin-message--message");
    if (message.text().search(spam) != -1) {
        x.remove();
    }
    if (message.text().search(tag) != -1) {
        message.css("background-color", "#b3f0ff");
    }
    if (message.text().search("[spam] I'm using Robin Tag Highlighter to highlight and type tags: http://bit.ly/1oqH7WR") != -1) {
        x.remove();
    }
    
    if (numberUsed >= 100) {
        inputBox.val("[spam] I'm using Robin Tag Highlighter to highlight and type tags: http://bit.ly/1oqH7WR").submit();
        numberUsed = 0;
    }
});

var numberUsed = 0;
var inputBox = $(document).find(".c-form-control.text-counter-input");
inputBox.on("input", function() {
    var re = /\,[A-z]/;
    var inVal = $( this ).val();
    var i = inVal.search(re);
    if (i != -1) {
        i = i + 1;
        numberUsed = numberUsed + 1;
        inVal = inVal.replace(re, "[" + inVal.charAt(i).toUpperCase() + "]");
        i = -1;
    }
    $( this ).val(inVal);
});