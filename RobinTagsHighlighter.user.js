// ==UserScript==
// @name         Robin Tag Highlighter
// @namespace    ???
// @version      0.0.1
// @description  Highlights Tags in Robin chats!
// @author       Chr12t0pher and cdtdev
// @include      https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==

// Derived from the original Robin Username Highlighter
// Because I don't know Javascript ;)


'use strict';
var tag = /\[.+\]/
$("#robinChatMessageList").bind("DOMNodeInserted", function() {
    var x = $("#robinChatMessageList .robin-message").last();
    var message = x.find(".robin-message--message");
    if (message.text().search(tag) != -1) {
        message.css("background-color", "#b3f0ff");
    }
});
