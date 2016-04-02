// ==UserScript==
// @name         Robin Tag Highlighter
// @namespace    https://github.com/taylorcoreyd
// @version      0.0.1
// @description  Highlights Tags in Robin chats!
// @author       Chr12t0pher and cdtdev
// @include      https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==

// Derived from the original Robin Username Highlighter
// Because I don't know Javascript ;)


'use strict';
var tag = /.*\[.\].*/
$("#robinChatMessageList").bind("DOMNodeInserted", function() {
    var x = $("#robinChatMessageList .robin-message").last();
    var message = x.find(".robin-message--message");
    if (message.text().search(tag) != -1) {
        message.css("background-color", "#b3f0ff");
    }
});

var inputBox = $(document).find(".c-form-control.text-counter-input");
inputBox.on("input", function() {
    var re = /\,[A-z]/;
    var inVal = $( this ).val();
    var i = inVal.search(re) + 1;
    inVal = inVal.replace(re, "[" + inVal.charAt(i).toUpperCase() + "]");
    $( this ).val(inVal);
});