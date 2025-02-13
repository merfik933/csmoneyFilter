console.log("Hello from content.js");

let isFilterByDiscount = false;
let minDiscount = 0;
let maxDiscount = 100;

let timeDelay = 700;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "applyFilter") {        
        isFilterByDiscount = message.isChecked;
        minDiscount = message.min;
        maxDiscount = message.max;
        timeDelay = message.delay;
    }

});

function filterProducts() {
    let products = document.querySelectorAll(".InventorySearchResults_item__s9sB7");
    let counter = 0;
    products.forEach((product) => {
        if (isFilterByDiscount) {
            const discountElement = product.querySelector(".Tag-module_green__5A03j .Tag-module_content__uLsTI");
            if (!discountElement) {
                if (minDiscount > 0) {
                    setTimeout(() => {
                        product.style.display = "none";
                    }, timeDelay);
                    counter++;
                }
            } else {
                const discount = parseInt(discountElement.innerText.replace("%", "").replace("-", ""));
                if (discount < minDiscount || discount > maxDiscount) {
                    setTimeout(() => {
                        product.style.display = "none";
                    }, timeDelay);
                    counter++;
                }
            }
        }
    });
    console.log(`Filtered ${counter} products. Time: ${new Date().toLocaleTimeString()}`);
    counter = 0;
}

const observer = new MutationObserver((mutations) => {
    console.log("Mutation observed");
    filterProducts();
});

const config = { childList: true, subtree: true };
observer.observe(document.body, config);