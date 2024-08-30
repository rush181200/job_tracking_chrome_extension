# Job Application Tracker Chrome Extension

## Overview

The Job Application Tracker is a Chrome extension designed to help users manage their job applications. It allows users to track job applications by saving details such as the company name, position, website link, date, time, and additional notes into a Google Sheet. The extension can also automatically fetch some details from the current tab, such as the company name and job position.

## Features

- **Automatic Data Extraction**: Attempts to fetch the company name and position from the current webpage.
- **Customizable Form**: Users can manually input company name, position, website link, date, time, and notes.
- **Google Sheets Integration**: Saves the application details to a personal Google Sheet specified in the extension's settings.
- **Header Management**: Automatically creates and manages headers in the Google Sheet.
- **User Interface**: Includes a popup for data entry and an options page for configuration.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/your-repo.git
    ```

2. **Navigate to the Extension Directory**:
    ```bash
    cd your-repo
    ```

3. **Load the Extension into Chrome**:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" using the toggle switch.
    - Click on "Load unpacked" and select the directory where your extension files are located.

## Directory Structure

```
your-extension/
├── logo.png
├── background.js
├── manifest.json
├── options.html
├── options.js
├── popup.html
└── popup.js
```

## Configuration

1. **Google Sheets URL**: Set the URL of your personal Google Sheet in the extension's options page. The sheet will be used to store application details.
2. **Google Sheets API Authorization**: The extension requires authorization to access Google Sheets. Follow the setup instructions provided in the options page to authenticate.

## Usage

1. **Open the Extension Popup**:
   - Click on the extension icon in the Chrome toolbar to open the popup.
   - The popup will automatically populate the website link of the current tab.

2. **Fill Out the Form**:
   - Enter or verify the company name and position.
   - Provide the website link, date, time, and any additional notes.
   - Click "Save" to store the information in your Google Sheet.

3. **Configure Settings**:
   - Access the options page by clicking "Settings" in the popup.
   - Enter the Google Sheet URL and complete the authorization process.

## Notes

- The extension will attempt to fetch job details automatically from the current webpage if available. However, results may vary depending on the webpage structure.
- Ensure that the Google Sheet specified in the options page is accessible and has the necessary permissions.

## Contributing

If you have suggestions or improvements, please open an issue or submit a pull request on GitHub.

