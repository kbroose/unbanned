# 🕶️ Unbanned

A simple Electron app to remove Ray-Ban Meta identifiers from your photos and videos before sharing them online.

## What it does

Unbanned helps you maintain privacy by stripping metadata that could identify your Ray-Ban Meta smart glasses from your media files. It removes:

- Camera make/model information
- Device-specific comments
- EXIF metadata that identifies the device
- QuickTime metadata in videos

## Features

- 🖱️ **Easy to use** - Simple drag-and-drop interface
- 📁 **Flexible input** - Select individual files, multiple files, or entire folders
- 📂 **Smart output** - Choose destination folder or create new ones
- 📊 **Progress tracking** - See real-time progress as files are processed
- 🎨 **Modern design** - Clean, professional interface
- 🔒 **Privacy focused** - Removes device identifiers while preserving image quality

## Supported File Types

- **Photos**: JPG, JPEG, HEIC
- **Videos**: MOV, MP4

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup

1. **Clone or download** this repository
   ```bash
   git clone https://github.com/kbroose/unbanned.git
   cd unbanned
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm start
   ```

## How to Use

1. **Launch the app** - Run `npm start` from the project directory
2. **Select source** - Click "Source files or folder" to choose what to process
   - You can select individual files, multiple files, or an entire folder
3. **Choose destination** - Click "Destination folder" to select where cleaned files will be saved
   - You can create a new folder during this step
4. **Clean files** - Click "Clean Files" to start the process
5. **Wait for completion** - The progress bar will show you the status

## Building for Distribution

To create a standalone app that others can download and run:

```bash
npm run build
```

This will create distributable versions for macOS, Windows, and Linux in the `dist` folder.

## How it Works

Unbanned uses [ExifTool](https://exiftool.org/) to remove specific metadata fields from your media files:

- `Make` and `Model` - Camera manufacturer and model info
- `EXIF:Make` and `EXIF:Model` - EXIF-specific device identifiers
- `Comment` and `QuickTime:Comment` - Device-specific comments

The app copies your original files to the destination folder and then strips the metadata, preserving your originals.

## Privacy & Security

- **No data sent online** - Everything happens locally on your computer
- **Original files preserved** - Your source files are never modified
- **Open source** - You can review the code to verify what it does

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This tool is provided as-is for educational and privacy purposes. Always backup your files before processing, and ensure you have the right to modify any files you process.

## Support

If you encounter any issues:

1. Check that you have the latest version
2. Ensure your files are in supported formats
3. Make sure you have write permissions for the destination folder
4. Open an issue on GitHub with details about the problem

---

Made with ❤️ for people who don't want to give Meta free advertising
