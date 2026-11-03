# Monitor Switcher

Monitor Switcher is a simple browser extension that allows you to quickly move your browser window from one monitor to the next without using keyboard shortcuts or dragging, dropping, and re-maximizing your window like a complete Neanderthal.

With just one click of the extension icon in your browser's toolbar, your current window moves to the next monitor and automatically maximizes.

## Features

- **One-click switching** — Move your browser window between monitors instantly.
- **Multiple monitor support** — Works with setups containing two or more monitors.
- **Flexible monitor arrangements** — Supports monitors positioned horizontally or vertically.
- **Automatic maximizing** — Automatically maximizes the window after moving it.
- **No configuration required** — Install the extension and start using it.

## Installation

*Monitor Switcher is not yet available on the Chrome Web Store.*

To install it manually:

1. Download or clone this GitHub repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked**.
5. Select the folder containing the extension files.
6. Pin Monitor Switcher to your browser's toolbar for easy access.

## How It Works

When you click the extension icon, Monitor Switcher identifies which monitor currently contains the largest portion of your browser window.

It then determines the next available monitor, moves your browser window to that monitor, and automatically maximizes it.

When the last monitor is reached, the extension cycles back to the first monitor.

## Technologies Used

- Vanilla JavaScript
- Chrome Extensions API
- Manifest V3