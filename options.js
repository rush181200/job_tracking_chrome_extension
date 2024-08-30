document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('sheetUrl', function(data) {
      if (!data.sheetUrl) {
        alert('Please provide your Google Sheet URL.');
      } else {
        document.getElementById('sheet-url').value = data.sheetUrl;
      }
    });
  });
  
  document.getElementById('settings-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const sheetUrl = document.getElementById('sheet-url').value;
  
    chrome.storage.sync.set({ sheetUrl: sheetUrl }, function() {
      alert('Google Sheet URL saved.');
    });
  });
  