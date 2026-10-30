async function getDisplayInfo() {
    const displayInfo = await chrome.system.display.getInfo();
    console.log(displayInfo);
}

async function toolbar() {
    const windowInfo = await chrome.windows.getCurrent();
    console.log(windowInfo);
    await getDisplayInfo();
}

chrome.action.onClicked.addListener(toolbar);

const monitorLeft = 0;
const monitorRight = 2195;
const windowLeft = 1800;
const windowRight = 3000;

const overlapStart = Math.max(monitorLeft, windowLeft);
const overlapEnd = Math.min(monitorRight, windowRight);
const overlapWidth = Math.max(overlapEnd - overlapStart, 0);

const monitorTop = 0;
const monitorBottom = 1235;
const windowTop = 800;
const windowBottom = 1500;

const verticalOverlapStart = Math.max(monitorTop, windowTop);
const verticalOverlapEnd = Math.min(monitorBottom, windowBottom);
const overlapHeight = Math.max(verticleOverlapEnd - verticleOverlapStart, 0);

const overlapArea = overlapHeight * overlapWidth;

function calculateOverlapArea(windowInfo, monitorInfo) {
    
}