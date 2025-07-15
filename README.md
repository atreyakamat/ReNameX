# ReNameX - Bulk File Renaming Tool

ReNameX is your all-in-one, blazing-fast file renaming powerhouse — built entirely with React and designed to work right inside your browser. No server, no setup, no worries.

## 🚀 Features

- **100% Client-Side**: All processing happens in your browser - your files never leave your device
- **Bulk Renaming**: Select multiple files and rename them all at once
- **Custom Patterns**: Use `{index}` placeholder with custom naming patterns
- **Flexible Indexing**: Set custom start index and leading zeros
- **Live Preview**: See original vs renamed file names in real-time
- **ZIP Download**: Get all renamed files packaged in a convenient ZIP file
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **No Upload Required**: Files are processed locally without any server interaction

## 🛠️ Built With

- ⚛️ React 18
- 🎨 Tailwind CSS
- 📦 JSZip for ZIP file creation
- 💾 FileSaver.js for download functionality

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/atreyakamat/ReNameX.git
   cd ReNameX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 How to Use

1. **Select Files**: Click the upload area or drag & drop multiple files
2. **Set Pattern**: Define your naming pattern using `{index}` placeholder (e.g., `photo_{index}`)
3. **Configure Options**: Set start index and leading zeros as needed
4. **Preview**: Review the original vs renamed file names
5. **Download**: Click "Download ZIP" to get all renamed files

## 🎯 Pattern Examples

- `photo_{index}` → photo_1.jpg, photo_2.jpg, photo_3.jpg
- `document_{index}` → document_01.pdf, document_02.pdf (with leading zeros)
- `IMG_{index}_edited` → IMG_001_edited.png, IMG_002_edited.png

## 🔒 Privacy & Security

ReNameX operates entirely in your browser:
- No files are uploaded to any server
- No data is collected or stored
- All processing happens locally on your device
- Your files remain completely private

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.js          # App header with branding
│   ├── FileUpload.js      # File selection component
│   ├── PatternInput.js    # Pattern configuration
│   ├── FileList.js        # Live preview of renames
│   └── DownloadSection.js # Download and actions
├── App.js                 # Main application component
├── index.js              # React entry point
└── index.css             # Tailwind CSS styles
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build folder will contain the optimized production build ready for deployment.

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/ReNameX",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons from [Heroicons](https://heroicons.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**ReNameX** - Because renaming files should feel satisfying, not frustrating. ⚡X
ReNameX is your all-in-one, blazing-fast file renaming powerhouse — built entirely with React and designed to work right inside your browser. No server, no setup, no worries.

ReNameX gives you full control over how your files are named. Whether you’re dealing with hundreds of images, design assets, documents, or code files, just drop them in, define your pattern (like project_{index}), and boom — ReNameX renames everything on the fly. With smart features like custom starting index, leading zero support, and an instant ZIP export, it's the perfect tool for creators, developers, content managers, and anyone tired of renaming files one by one.

The best part? It’s fully client-side, meaning your files never leave your device. ⚡

Crafted with ⚛️ React, powered by 📦 JSZip and 💾 FileSaver.js, ReNameX is built for speed, simplicity, and total privacy — because renaming files should feel satisfying, not frustrating.
