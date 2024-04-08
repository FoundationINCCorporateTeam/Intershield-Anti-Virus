// content_script.js

// Add event listener to detect downloads
chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    // Array of potentially harmful file extensions
    var harmfulExtensions = [".exe", ".bat", ".msi", ".zip"];

    // Object with known malicious file patterns
    var maliciousPatterns = [
        /(?:powershell|cmd|command)\.exe/i,  // Example: Detects common malicious file names
        /(?:rm|del|erase|format)\s*\/s/i     // Example: Detects commands for file deletion
    ];

    // Check if the file extension is in the list of harmful extensions
    var fileExtension = item.filename.substring(item.filename.lastIndexOf('.'));
    
    if (harmfulExtensions.includes(fileExtension)) {
        // Send message to show confirmation popup
        chrome.runtime.sendMessage({
            type: "showPopup",
            item: item
        });
    }

    // Check file name against known malicious patterns
    var fileName = item.filename.toLowerCase();

    for (var i = 0; i < maliciousPatterns.length; i++) {
        if (maliciousPatterns[i].test(fileName)) {
            // Send message to show confirmation popup
            chrome.runtime.sendMessage({
                type: "showPopup",
                item: item
            });
            return; // Stop further processing
        }
    }
});

// Add event listener to detect when a download starts
chrome.downloads.onCreated.addListener(function(item) {
    // Send message to popup to update the download item ID
    chrome.runtime.sendMessage({
        type: "updateDownloadItemId",
        itemId: item.id
    });
});
