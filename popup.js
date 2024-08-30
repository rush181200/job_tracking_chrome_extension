document.addEventListener('DOMContentLoaded', function() {
    // Automatically get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTab = tabs[0];
      document.getElementById('website-link').value = currentTab.url;
    });
  
    // Automatically populate date and time fields
    const now = new Date();
    document.getElementById('apply-date').value = now.toISOString().split('T')[0];
    document.getElementById('apply-time').value = now.toTimeString().split(' ')[0];
  });
  
  document.getElementById('application-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const companyName = document.getElementById('company-name').value;
    const position = document.getElementById('position').value;
    const websiteLink = document.getElementById('website-link').value;
    const applyDate = document.getElementById('apply-date').value;
    const applyTime = document.getElementById('apply-time').value;
    const notes = document.getElementById('notes').value;
  
    chrome.runtime.sendMessage({ action: 'getAuthToken' }, function(response) {
      if (response.success) {
        chrome.storage.sync.get('sheetUrl', function(data) {
          const sheetUrl = data.sheetUrl;
  
          if (sheetUrl) {
            ensureHeaders(response.token, sheetUrl, () => {
              uploadToGoogleSheets(response.token, companyName, position, websiteLink, applyDate, applyTime, notes, sheetUrl);
            });
          } else {
            alert('Please set the Google Sheet URL in the extension settings.');
          }
        });
      } else {
        console.error('Failed to get auth token');
      }
    });
  });
  
  function ensureHeaders(token, sheetUrl, callback) {
    const sheetId = sheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)[1];
  
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(result => {
      const headers = ["Company Name", "Position", "Website Link", "Date", "Time", "Notes"];
      const existingHeaders = result.values ? result.values[0] : [];
  
      if (!existingHeaders.length || existingHeaders.join(',') !== headers.join(',')) {
        const request = {
          spreadsheetId: sheetId,
          range: "Sheet1!A1:F1",
          valueInputOption: "RAW",
          resource: {
            values: [headers]
          }
        };
  
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:F1?valueInputOption=RAW`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request.resource),
        })
        .then(response => response.json())
        .then(() => callback())
        .catch(error => {
          console.error('Error creating headers:', error);
        });
      } else {
        callback();
      }
    })
    .catch(error => {
      console.error('Error checking headers:', error);
    });
  }
  
  function uploadToGoogleSheets(token, companyName, position, websiteLink, applyDate, applyTime, notes, sheetUrl) {
    const sheetId = sheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)[1];
  
    const data = [
      [companyName, position, websiteLink, applyDate, applyTime, notes]
    ];
  
    const request = {
      spreadsheetId: sheetId,
      range: "Sheet1!A2",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: data
      }
    };
  
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A2:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.resource),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Data saved successfully:', result);
      alert('Application saved successfully!');
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  }
  
  document.getElementById('settings-button').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
  