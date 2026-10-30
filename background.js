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