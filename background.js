// const windowInfo = chrome.windows.getCurrent();

function toolbar() {
    const windowInfo = chrome.windows.getCurrent();
    console.log(windowInfo);
}

chrome.action.onClicked.addListener(toolbar)
