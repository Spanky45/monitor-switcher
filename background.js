
// Retrieve information about all connected monitors from Chrome.
async function getDisplayInfo() {
    const displayInfo = await chrome.system.display.getInfo();
    return displayInfo;
}

// Main function that runs when the extension's toolbar icon is clicked.
async function toolbar() {
    try {
        // Get information about the current browser window and all connected monitors.
        const windowInfo = await chrome.windows.getCurrent();
        const displayInfo = await getDisplayInfo();

        //Exit the function if fewer than two monitors are connected.
        if (displayInfo.length < 2) {
            return;
        }

        // Track the largest overlap area and the index of the monitor containing the window.
        let largestOverlap = 0;
        let currentMonitorIndex = 0;

        // Loop through every connected monitor to find which one contains
        // the largest portion of the browser window.
        for (let i = 0; i < displayInfo.length; i++) {
            const overlapArea = calculateOverlapArea(windowInfo, displayInfo[i]);

            // If this monitor has a larger overlap, update the largest area
            // and remember this monitor's index.
            if (overlapArea > largestOverlap) {
                largestOverlap = overlapArea;
                currentMonitorIndex = i;
            }
        }

        // Select the next monitor in the array.
        let nextMonitorIndex = currentMonitorIndex + 1;

        // If the current monitor is the last one, cycle back to the first monitor.
        if (nextMonitorIndex > displayInfo.length - 1) {
            nextMonitorIndex = 0;
        }

        // Retrieve the monitor object for the destination monitor.
        const destinationMonitor = displayInfo[nextMonitorIndex];

        // Restore the window to its normal state if it is currently maximized.
        // Chrome requires the window to be in its normal state before repositioning it.
        if (windowInfo.state === "maximized") {
            await chrome.windows.update(windowInfo.id, { state: "normal" });
        }

        // Move the browser window to the destination monitor's coordinates.
        // Both left and top are needed to support different monitor arrangements.
        await chrome.windows.update(windowInfo.id, { 
            left: destinationMonitor.bounds.left,
            top: destinationMonitor.bounds.top
        });

        // Maximize the browser window after moving it to the destination monitor.
        await chrome.windows.update(windowInfo.id, { state: "maximized" });
    
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Listen for clicks on the extension's toolbar icon and execute toolbar().
chrome.action.onClicked.addListener(toolbar);

// Calculate how much of the browser window overlaps a specific monitor.
function calculateOverlapArea(windowInfo, monitorInfo) {
    // Calculate the right and bottom edges of both rectangles.
    // Chrome provides left, top, width, and height rather than right and bottom.
    const windowRight = windowInfo.left + windowInfo.width;
    const windowBottom = windowInfo.top + windowInfo.height;
    const monitorRight = monitorInfo.bounds.left + monitorInfo.bounds.width;
    const monitorBottom = monitorInfo.bounds.top + monitorInfo.bounds.height;

    // Calculate horizontal overlap.
    // The overlap starts at the larger left edge and ends at the smaller right edge.
    const overlapStart = Math.max(monitorInfo.bounds.left, windowInfo.left);
    const overlapEnd = Math.min(monitorRight, windowRight);

    // Prevent negative values when the window and monitor do not overlap.
    const overlapWidth = Math.max(overlapEnd - overlapStart, 0);

    // Calculate vertical overlap using the same logic with top and bottom edges.
    const verticalOverlapStart = Math.max(monitorInfo.bounds.top, windowInfo.top);
    const verticalOverlapEnd = Math.min(monitorBottom, windowBottom);
    const overlapHeight = Math.max(verticalOverlapEnd - verticalOverlapStart, 0);

    // Multiply the overlapping width and height to get the area in square pixels.
    const overlapArea = overlapHeight * overlapWidth;

    // Return the area so toolbar() can compare it against the other monitors.
    return overlapArea;
}