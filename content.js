console.log("Hello from content.js");

const observer = new MutationObserver((mutations) => {
    console.log("Mutation observed");
});

const config = { childList: true, subtree: true };

observer.observe(document.body, config);