# csmoneyFilter

A Chrome extension that adds advanced filtering capabilities to the [cs.money](https://cs.money/) website. This extension allows users to filter items by discount range, image URLs, and item IDs, providing a more customizable browsing experience.

## Features

- **Discount Range Filter:** Filter items by minimum and maximum discount percentages.
- **Image URL Filter:** Blacklist or whitelist items based on their image URLs and optional "mw" (minimal wear) tags.
- **ID Filter:** Blacklist items by their unique IDs.
- **Bulk Import:** Import lists of image URLs or IDs from CSV files.
- **Quick Add/Delete:** Add or remove URLs and IDs directly from the popup interface.
- **Persistent Settings:** All filters and lists are saved using Chrome's local storage.
- **Customizable Delay:** Set a delay for filtering actions to improve performance or avoid UI glitches.

## Installation

1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the project directory.

## Usage

1. Click the extension icon to open the popup.
2. Set your desired discount range.
3. Enable and configure the image URL and/or ID filters as needed:
   - Use the "Add new" button to add individual URLs or IDs.
   - Use the "Clear" button to remove all entries from a list.
   - Upload a `.csv` file to bulk import URLs or IDs.
   - Choose between blacklist and whitelist modes for image URLs.
4. Adjust the filtering delay if necessary.
5. Click "Apply Filter" to activate your settings on the current cs.money tab.

## File Structure

- `manifest.json` — Chrome extension manifest (v3).
- `background.js` — Handles background messaging and storage updates.
- `content.js` — Injected into cs.money pages, applies filters to items.
- `popup.html` — Extension popup UI.
- `popup.js` — Logic for the popup UI, manages user input and storage.
- `styles.css` — Styling for the popup UI.
- `default_icon.png` — Extension icon.

## How It Works

- The extension injects a content script into cs.money pages.
- When you apply filters, your settings are saved and sent to the content script.
- The content script observes changes on the page and hides items that do not match your filters.
- You can add or remove image URLs and IDs at any time; changes are reflected immediately.

## License

This project is provided as-is for personal use.

**Author:** Merfik933
