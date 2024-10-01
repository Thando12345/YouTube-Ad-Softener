chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ muteAds: true, skipAds: true }, () => {
        console.log("Default settings saved.");
    });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});
