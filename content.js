console.log("Hello from content.js");

let minDiscount = 0;
let maxDiscount = 100;

let is_image_url_checked = false;
let image_url_filter_type = "blacklist";
let image_urls = [];

let is_mv_checked = false;
let is_mv_blacklist_checked = false;
let blacklisted_mvs_list = [];
let is_mv_whitelist_checked = false;
let whitelisted_mvs_list = [];

let timeDelay = 700;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "applyFilter") {        
        minDiscount = message.min;
        maxDiscount = message.max;
        timeDelay = message.delay;

        is_image_url_checked = message.is_image_url_checked;
        image_url_filter_type = message.image_url_filter_type;
        image_urls = message.image_urls;

        is_mv_checked = message.is_mv_url_checked;
        is_mv_blacklist_checked = message.is_mv_blacklist_checked;
        blacklisted_mvs_list = message.blacklisted_mvs_list ? message.blacklisted_mvs_list.map(item => item.toUpperCase()) : [];
        is_mv_whitelist_checked = message.is_mv_whitelist_checked;
        whitelisted_mvs_list = message.whitelisted_mvs_list ? message.whitelisted_mvs_list.map(item => item.toUpperCase()) : [];
    }
});

function filterProducts() {
    let products = document.querySelectorAll(".InventorySearchResults_item__s9sB7");
    let counter = 0;
    products.forEach((product) => {
        if (!(minDiscount === 0 && maxDiscount === 100)) {
            const discountElement = product.querySelector(".Tag-module_green__5A03j .Tag-module_content__uLsTI");
            if (!discountElement) {
                if (minDiscount > 0) {
                    setTimeout(() => {
                        product.style.display = "none";
                    }, timeDelay);
                    counter++;
                    return;
                }
            } else {
                const discount = parseInt(discountElement.innerText.replace("%", "").replace("-", ""));
                if (discount < minDiscount || discount > maxDiscount) {
                    setTimeout(() => {
                        product.style.display = "none";
                    }, timeDelay);
                    counter++;
                    return;
                }
            }
        }
        if (is_image_url_checked) {
            const imageElementSrc = product.querySelector(".ImageZone_container__PLZCF").src;
            if (image_url_filter_type === "blacklist") {
                if (image_urls.includes(imageElementSrc)) {
                    setTimeout(() => {
                        product.style.display = "none";
                    }, timeDelay);
                    counter++;
                    return;
                }
            } else {
                if (!image_urls.includes(imageElementSrc)) {
                    setTimeout(() => {
                        product.style.display = "none";
                    }, timeDelay);
                    counter++;
                    return;
                }
            }
        }
        if (is_mv_checked) {
            const mvElements = product.querySelectorAll("span.CsgoDescriptionSmallZone_token___Y7iq");
            let is_filtered = false;
            mvElements.forEach((element) => {
                if (is_mv_blacklist_checked) {
                    if (blacklisted_mvs_list.includes(element.innerText.trim().toUpperCase())) {
                        is_filtered = true;
                        return;
                    }
                }
                if (is_mv_whitelist_checked) {
                    if (whitelisted_mvs_list.includes(element.innerText.trim().toUpperCase())) {
                        is_filtered = false;
                        return;
                    }
                }
            });
            if (is_filtered) {
                setTimeout(() => {
                    product.style.display = "none";
                }, timeDelay);
                counter++;
                return;
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