async function getDisplayInfo() {
    const displayInfo = await chrome.system.display.getInfo();
    return displayInfo;
}

async function toolbar() {
    const windowInfo = await chrome.windows.getCurrent();
    const displayInfo = await getDisplayInfo();

    let largestOverlap = 0;
    let currentMonitorIndex = 0;

    for (let i = 0; i < displayInfo.length; i++) {
        const overlapArea = calculateOverlapArea(windowInfo, displayInfo[i]);

        if (overlapArea > largestOverlap) {
            largestOverlap = overlapArea;
            currentMonitorIndex = i;
        }
    }
    console.log(currentMonitorIndex);

    let nextMonitorIndex = currentMonitorIndex + 1;

    if (nextMonitorIndex > displayInfo.length - 1) {
        nextMonitorIndex = 0;
    }

    const destinationMonitor = displayInfo[nextMonitorIndex];
}

chrome.action.onClicked.addListener(toolbar);

function calculateOverlapArea(windowInfo, monitorInfo) {
    const windowRight = windowInfo.left + windowInfo.width;
    const windowBottom = windowInfo.top + windowInfo.height;
    const monitorRight = monitorInfo.bounds.left + monitorInfo.bounds.width;
    const monitorBottom = monitorInfo.bounds.top + monitorInfo.bounds.height;

    const overlapStart = Math.max(monitorInfo.bounds.left, windowInfo.left);
    const overlapEnd = Math.min(monitorRight, windowRight);
    const overlapWidth = Math.max(overlapEnd - overlapStart, 0);

    const verticalOverlapStart = Math.max(monitorInfo.bounds.top, windowInfo.top);
    const verticalOverlapEnd = Math.min(monitorBottom, windowBottom);
    const overlapHeight = Math.max(verticalOverlapEnd - verticalOverlapStart, 0);

    const overlapArea = overlapHeight * overlapWidth;

    return overlapArea;
}