chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addImageId") {
        let image_id_urls = request.id;

        chrome.storage.local.set({ image_id_urls });
        chrome.runtime.sendMessage({ action: "updateIDList", id: image_id_urls });
    }
});
        
    