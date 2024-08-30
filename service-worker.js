chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAuthToken') {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError || !token) {
          console.error('Failed to get token', chrome.runtime.lastError);
          sendResponse({ success: false });
          return;
        }
        sendResponse({ success: true, token: token });
      });
      return true; // Indicate that the response is asynchronous
    }
  });
  