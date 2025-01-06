# Quillpad JSON Backup to Markdown

[![Netlify Status](https://api.netlify.com/api/v1/badges/512d7934-0b10-47e5-925f-582e6fa620ae/deploy-status)](https://app.netlify.com/sites/quillpad-backup-to-markdown/deploys)

Since Quillpad does not allow exporting in its native format and only offers the option to export a single zip archive containing a global JSON file, this tool allows you to convert the archive into a collection of `.md` files. This enables you to transfer your notes to other applications such as Obsidian, Typora, Logseq, and more.

## Features

- **Convert Notes:** Transforms each note into an individual `.md` file.
- **Handle Duplicate Titles:** Manages cases where multiple notes have similar or identical titles.
- **Automatic Filename Generation:** Generates a file name automatically if a note does not provide a title.
- **Maintain Notebook Organization:** Preserves the "notebook" structure by converting each notebook into a separate folder.

## Usage Options

You can use **Quillpad JSON Backup to Markdown** in two ways:

### 1. Use the Online Version

Easily convert your backups without installing anything by visiting our [online tool](https://quillpad-backup-to-markdown.visualartisan.fr).

### 2. Use Locally on Your Machine

#### Prerequisites

- **Node.js:** Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

#### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/quillpad-backup-to-markdown.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd quillpad-backup-to-markdown
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

#### Running the Application

1. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   This will start the application in development mode. Open [http://localhost:5173/](http://localhost:5173/) in your browser to view it.

2. **Build for Production:**

   ```bash
   npm run build
   ```

   This command compiles the application for production, optimizing the build for the best performance.

3. **Preview the Production Build:**

   ```bash
   npm run preview
   ```

   Locally preview the production build to ensure everything works as expected.

#### Using the Application

1. **Upload Your Quillpad Backup:**
   - Click on the upload area to select your Quillpad backup zip archive containing the single JSON file.

2. **Convert and Download:**
   - Click the **"Convert and Download"** button.
   - The archive will be processed automatically, and the download of the converted Markdown files will start immediately.

3. **Access Your Markdown Files:**
   - Once the download is complete, navigate to your designated download folder to find your notes organized as Markdown files in separate folders.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [AGPL-3.0 license](LICENSE).

## Contact

For any questions or suggestions, feel free to open an issue.

---

*Transform your Quillpad exports into a more flexible and accessible Markdown format with ease!*
