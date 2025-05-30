# My Chrome Extension

## Structure

- `manifest.json`: Extension manifest file (v3)
- `popup.html`: Popup UI
- `popup.js`: Popup logic
- `icons/`: Folder for extension icons (replace placeholders with your own PNG images)

## How to Build and Run

1. **Prepare the icons**
   - Replace the files in the `icons/` folder with your own PNG images (16x16, 32x32, 48x48, 128x128).

2. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`.
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the folder containing this extension (where `manifest.json` is located).

3. **Use the extension**
   - The extension icon will appear in the Chrome toolbar.
   - Click the icon to open the popup and interact with it.

No build step is required for this basic extension. For advanced features, you may add more files or use build tools as needed. 