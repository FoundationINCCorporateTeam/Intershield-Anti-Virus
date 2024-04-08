// popup.js

// Initialize variable to store download item ID
var downloadItemId;

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "updateDownloadItemId") {
        // Update download item ID
        downloadItemId = message.itemId;
    }
});

// Get the OK and cancel buttons
var okButton = document.getElementById("okButton");
var cancelButton = document.getElementById("cancelButton");

// Listen for click events on the buttons
okButton.addEventListener("click", function() {
    // Close the popup
    window.close();
});

cancelButton.addEventListener("click", function() {
    // Send message to content script to cancel the download
    chrome.runtime.sendMessage({
        type: "cancelDownload",
        itemId: downloadItemId
    });

    // Close the popup
    window.close();
});
