const minRangeInput = document.getElementById("min-range");
const maxRangeInput = document.getElementById("max-range");
const delayInput = document.getElementById("delay");

const addNew = document.querySelectorAll(".add-new");
const uploadImageUrlsCsv = document.getElementById("upload-image-urls");
const deleteAllImageUrls = document.getElementById("delete-all-image-urls");

deleteAllImageUrls.addEventListener("click", () => {
    const imageList = document.querySelector("#image-filter .dropdown-content");
    const items = imageList.querySelectorAll(".list-item");
    items.forEach((item) => {
        if (!item.classList.contains("add-new")) {
            item.remove();
        }
    });
});

uploadImageUrlsCsv.addEventListener("change", (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const csv = e.target.result;
        const lines = csv.split("\n");
        const imageList = document.querySelector("#image-filter .dropdown-content");
        lines.forEach((line) => {
            const newItemElement = document.createElement("div");
            newItemElement.className = "list-item";
            
            const deleteButton = document.createElement("div");
            deleteButton.className = "delete-button";
            const deleteIcon = document.createElement("span");
            deleteIcon.className = "material-symbols-outlined";
            deleteIcon.textContent = "delete";
            deleteButton.appendChild(deleteIcon);
            deleteButton.addEventListener("click", () => {
                newItemElement.remove();
            });

            const text = document.createElement("p");
            text.textContent = line;

            newItemElement.appendChild(deleteButton);
            newItemElement.appendChild(text);
            imageList.appendChild(newItemElement);
        });
    };
    reader.readAsText(event.target.files[0]);
});

addNew.forEach((element) => {
    element.addEventListener("click", () => {
        const newItem = prompt("Enter new item:");
        if (newItem) {
            const newItemElement = document.createElement("div");
            newItemElement.className = "list-item";
            
            const deleteButton = document.createElement("div");
            deleteButton.className = "delete-button";
            const deleteIcon = document.createElement("span");
            deleteIcon.className = "material-symbols-outlined";
            deleteIcon.textContent = "delete";
            deleteButton.appendChild(deleteIcon);
            deleteButton.addEventListener("click", () => {
                newItemElement.remove();
            });

            const text = document.createElement("p");
            text.textContent = newItem;
            
            newItemElement.appendChild(deleteButton);
            newItemElement.appendChild(text);
            element.parentNode.insertBefore(newItemElement, element.nextSibling);
        }
    });
});

// get data from storage
chrome.storage.local.get(["min", "max", "delay", "is_image_url_checked", "image_url_filter_type", "image_urls"], (data) => {
    if (data.min !== undefined) minRangeInput.value = data.min;
    if (data.max !== undefined) maxRangeInput.value = data.max;
    if (data.delay !== undefined) delayInput.value = data.delay;

    if (data.is_image_url_checked !== undefined) document.getElementById("image-filter-checkbox").checked = data.is_image_url_checked;
    if (data.image_url_filter_type !== undefined) document.getElementById("image-filter-type").value = data.image_url_filter_type;
    if (data.image_urls !== undefined) {
        const imageList = document.querySelector(".dropdown-content");
        data.image_urls.forEach((url) => {
            const newItemElement = document.createElement("div");
            newItemElement.className = "list-item";
            
            const deleteButton = document.createElement("div");
            deleteButton.className = "delete-button";
            const deleteIcon = document.createElement("span");
            deleteIcon.className = "material-symbols-outlined";
            deleteIcon.textContent = "delete";
            deleteButton.appendChild(deleteIcon);
            deleteButton.addEventListener("click", () => {
                newItemElement.remove();
            });

            const text = document.createElement("p");
            text.textContent = url;

            newItemElement.appendChild(deleteButton);
            newItemElement.appendChild(text);
            imageList.appendChild(newItemElement);
        });
    }
});

// apply button
const applyButton = document.getElementById("apply-filter");
applyButton.addEventListener("click", () => {
    const min = parseInt(minRangeInput.value, 10);
    const max = parseInt(maxRangeInput.value, 10);

    const delay = parseInt(delayInput.value, 10);

    const is_image_url_checked = document.getElementById("image-filter-checkbox").checked;
    const image_url_filter_type = document.getElementById("image-filter-type").value;
    const image_url_list = document.querySelectorAll(".list-item p");
    let image_urls = [];
    image_url_list.forEach((element) => {
        image_urls.push(element.textContent);
    });

    if (min <= max) {
        chrome.storage.local.set({ min, max, delay, is_image_url_checked, image_url_filter_type, image_urls });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "applyFilter",
                min,
                max,
                delay,
                is_image_url_checked,
                image_url_filter_type,
                image_urls,
            });
        });
    } else {
        alert("Min range should be less or equal to max range");
    }
});

  