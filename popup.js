const minRangeInput = document.getElementById("min-range");
const maxRangeInput = document.getElementById("max-range");
const delayInput = document.getElementById("delay");


// get data from storage
chrome.storage.local.get(["min", "max", "delay"], (data) => {
    if (data.min !== undefined) minRangeInput.value = data.min;
    if (data.max !== undefined) maxRangeInput.value = data.max;
    if (data.delay !== undefined) delayInput.value = data.delay;
});

// apply button
const applyButton = document.getElementById("apply-filter");
applyButton.addEventListener("click", () => {
    const min = parseInt(minRangeInput.value, 10);
    const max = parseInt(maxRangeInput.value, 10);

    const delay = parseInt(delayInput.value, 10);

    if (min <= max) {
        chrome.storage.local.set({ min, max, delay });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "applyFilter",
                min,
                max,
                delay,
            });
        });
    } else {
        alert("Min range should be less or equal to max range");
    }
});

  