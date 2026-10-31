async function getDisplayInfo() {
    const displayInfo = await chrome.system.display.getInfo();
    return displayInfo;
}

async function toolbar() {
    const windowInfo = await chrome.windows.getCurrent();
    // console.log(windowInfo);
    const displayInfo = await getDisplayInfo();

    calculateOverlapArea(windowInfo, displayInfo[0]);
}

chrome.action.onClicked.addListener(toolbar);

// const monitorLeft = 0;
// const monitorRight = 2195;
// const windowLeft = 1800;
// const windowRight = 3000;

// const overlapStart = Math.max(monitorLeft, windowLeft);
// const overlapEnd = Math.min(monitorRight, windowRight);
// const overlapWidth = Math.max(overlapEnd - overlapStart, 0);

// // const monitorTop = 0;
// // const monitorBottom = 1235;
// // const windowTop = 800;
// // const windowBottom = 1500;

// const verticalOverlapStart = Math.max(monitorTop, windowTop);
// const verticalOverlapEnd = Math.min(monitorBottom, windowBottom);
// const overlapHeight = Math.max(verticalOverlapEnd - verticalOverlapStart, 0);

const overlapArea = overlapHeight * overlapWidth;

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