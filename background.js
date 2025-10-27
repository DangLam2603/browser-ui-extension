// Function to check if URL is injectable
function isValidUrl(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

// Listen for extension icon clicks
chrome.action.onClicked.addListener(async (tab) => {
  if (!isValidUrl(tab.url)) {
    console.warn("Cannot inject sidebar into this page:", tab.url);
    return;
  }

  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => Boolean(document.getElementById("extension-sidebar")),
    });

    if (!result) {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["sidebar/sidebar.css"],
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["scripts/content.js"],
      });
    }

    await chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" });
  } catch (error) {
    console.error("Error injecting sidebar:", error);
  }
});
