document.addEventListener('DOMContentLoaded', () => {
    const muteAdsCheckbox = document.getElementById('muteAds');
    const skipAdsCheckbox = document.getElementById('skipAds');
    const saveSettingsButton = document.getElementById('saveSettings');

    // Retrieve saved settings
    chrome.storage.sync.get(['muteAds', 'skipAds'], (settings) => {
        muteAdsCheckbox.checked = settings.muteAds;
        skipAdsCheckbox.checked = settings.skipAds;
    });

    // Event listener for saving settings
    saveSettingsButton.addEventListener('click', () => {
        chrome.storage.sync.set({
            muteAds: muteAdsCheckbox.checked,
            skipAds: skipAdsCheckbox.checked
        }, () => {
            console.log('Settings saved.');

            // Add a fade-out effect by adding a class
            document.body.classList.add('fade-out');

            // Close the popup after the transition (500ms)
            setTimeout(() => {
                window.close();
            }, 500); 
        });
    });
});
