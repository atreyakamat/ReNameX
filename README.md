# ReNameX - Bulk File Renaming Tool

[![CI](https://github.com/atreyakamat/ReNameX/actions/workflows/ci.yml/badge.svg)](https://github.com/atreyakamat/ReNameX/actions/workflows/ci.yml)
[![Docker](https://github.com/atreyakamat/ReNameX/actions/workflows/docker.yml/badge.svg)](https://github.com/atreyakamat/ReNameX/actions/workflows/docker.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)

ReNameX is your all-in-one, blazing-fast file renaming powerhouse — built entirely with React and designed to work right inside your browser. No server, no setup, no worries.

## 🚀 Features

- **100% Client-Side**: All processing happens in your browser - your files never leave your device
- **Bulk Renaming**: Select multiple files and rename them all at once
- **Custom Patterns**: Use the `{index}` placeholder (as many times as you like) in your naming pattern
- **No Silent Overwrites**: Files that would end up with the same name get a ` (2)`, ` (3)`… suffix
- **Flexible Indexing**: Set custom start index and leading zeros
- **Live Preview**: See original vs renamed file names (and sizes) in real-time
- **Drag & Drop**: Add files in several batches; duplicates of the same file are ignored
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

## 🐳 Run with Docker

The image is a multi-stage build: Node builds the app, then an unprivileged
nginx serves the static files on port **8080** (gzip, long-term caching for
hashed assets, security headers, and a `/healthz` endpoint).

**Docker Compose (easiest)**

```bash
docker compose up -d --build
```

Then open `http://localhost:3000`. Stop it with `docker compose down`.

**Plain Docker**

```bash
docker build -t renamex .
docker run -d --name renamex -p 3000:8080 renamex
```

**Prebuilt image from GitHub Container Registry**

Every push to `main` (and every `v*.*.*` tag) publishes a multi-arch
(`amd64`/`arm64`) image:

```bash
docker run -d -p 3000:8080 ghcr.io/atreyakamat/renamex:latest
```

## 📖 How to Use

1. **Select Files**: Click the upload area or drag & drop multiple files
2. **Set Pattern**: Define your naming pattern using the `{index}` placeholder (e.g., `photo_{index}`) — the **+ {index}** button inserts it at the cursor
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
.github/
├── workflows/ci.yml       # Tests + production build on every push / PR
├── workflows/docker.yml   # Builds, smoke-tests and publishes the image to GHCR
└── dependabot.yml         # Weekly npm / Docker / Actions updates
src/
├── components/
│   ├── Header.js          # App header with branding
│   ├── FileUpload.js      # Drag & drop / file picker
│   ├── PatternInput.js    # Pattern configuration + live example
│   ├── FileList.js        # Live preview of renames
│   ├── DownloadSection.js # Download and actions
│   ├── Footer.js          # Footer with repo link
│   └── WarpBackground.js  # Animated background
├── lib/
│   ├── rename.js          # Pure renaming logic (tested)
│   └── rename.test.js     # Unit tests
├── App.js                 # Main application component
├── index.js               # React entry point
└── index.css              # Tailwind CSS styles
Dockerfile                 # Multi-stage build -> nginx
nginx.conf                 # SPA routing, caching, security headers
docker-compose.yml         # One-command local run
```

## 🧪 Tests

```bash
npm test
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

**ReNameX** - Because renaming files should feel satisfying, not frustrating. ⚡
