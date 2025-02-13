const minRangeInput = document.getElementById("min-range");
const maxRangeInput = document.getElementById("max-range");

// settings
delayInput = document.getElementById("delay");

const applyButton = document.getElementById("apply-filter");
applyButton.addEventListener("click", () => {
    const min = parseInt(minRangeInput.value, 10);
    const max = parseInt(maxRangeInput.value, 10);

    const delay = parseInt(delayInput.value, 10);

    if (min <= max)
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "applyFilter",
                min,
                max,
                delay,
            });
        });
    else
        alert("Min range should be less or equal to max range");
});

  