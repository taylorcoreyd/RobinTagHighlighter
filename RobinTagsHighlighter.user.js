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


// The list of all messages.
var messageList = $("#robinChatMessageList");

messageList.bind("DOMNodeInserted", function() {
    
    var lastMessage = $("#robinChatMessageList .robin-message").last();
    
    // First let's highlight messages with tags
    
    // Regex of {anything}[{char}]{anything}
    var tag = /.*\[.\].*/
    var messageText = lastMessage.find(".robin-message--message");
    if (messageText.text().search(tag) != -1) {
        messageText.css("background-color", "#b3f0ff");
    }
    
    // Deal with some spam. Remove it.
    
    // Regex of all known spam
    // Generally in form of [{script name}{gibberish}]|
    var spam = new RegExp('' // When modifying this, be sure to add a | to the last regex
                          + /\[Robin Autovoter.*\]|/.source
                          // + /\[spam.*\]|/.source // Commented out because this script's spam is broken anyway.
                          + /\[Robin-Grow.*\]/.source
                         );
    if (messageText.text().search(spam) != -1) {
        lastMessage.remove();
    }
    
    /*
    // Do a little spamming of our own. Feel free to delete the marked lines if you want to remove spam // mark
    // It shouldn't spam aggressively, only once every 100 messages of which you tagged.
    if (numberUsed >= 100) {    // mark
        inputBox.val("[spam] I'm using Robin Tag Highlighter to highlight and type tags: http://bit.ly/1oqH7WR").submit(); // mark
        numberUsed = 0;          // mark            ^ this one is marked too
    }     // mark
    // Commented out because I just realized its broken. Will fix in future at some point?
    // Low priority. Spamming doesn't really matter.
    */
});
var numberUsed = 0; // For keeping track of spamming purposes. Will be reset occasionally.

// The input element in which user types
var inputBox = $(document).find(".c-form-control.text-counter-input");
// on input = whenever user types in or makes some change.
inputBox.on("input", function() {
    // Looking for ,{char}
    var re = /\,[A-z]/;
    
    // Get the value from the inputBox
    var inVal = $( this ).val();
    // Check it for ,{char}, mark index of it
    var i = inVal.search(re);
    // If ,{char} is found
    if (i != -1) {
        // increment to account for position of comma
        i = i + 1;
        // Increment number used for spamming purposes
        numberUsed = numberUsed + 1;
        // replaces text with tagged version
        inVal = inVal.replace(re, "[" + inVal.charAt(i).toUpperCase() + "]");
        // Reset the i back so we don't keep incrementing.
        i = -1;
    }
    // put the tagged version into the input box.
    $( this ).val(inVal);
});