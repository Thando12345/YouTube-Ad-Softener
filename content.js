chrome.storage.sync.get(['muteAds', 'skipAds'], (settings) => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            const video = document.querySelector('video');
            const adOverlay = document.querySelector('.ytp-ad-text'); // Detect ad overlay
            const skipButton = document.querySelector('.ytp-ad-skip-button'); // Detect skip button

            if (video) {
                // Mute video during ads if enabled
                if (adOverlay && settings.muteAds) {
                    console.log("Ad detected. Muting video...");
                    video.muted = true;
                }

                // Skip ads if enabled
                if (skipButton && settings.skipAds) {
                    console.log("Ad detected. Skipping ad...");
                    skipButton.click();
                    video.muted = false; // Unmute after skipping
                }

                // Restore volume once the ad ends
                if (!adOverlay && video.muted) {
                    console.log("Ad ended. Restoring volume...");
                    video.muted = false;
                }
            }
        });
    });

    // Start observing YouTube for changes
    observer.observe(document.body, { childList: true, subtree: true });
});
