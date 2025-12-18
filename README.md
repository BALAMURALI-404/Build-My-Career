# BuildMyCareer 🚀

BuildMyCareer is a Chrome extension that intelligently autofills job application forms by detecting field intent and handling dynamically loaded pages (ATS portals like Workday, Greenhouse, etc.).

If you’re tired of typing the same damn details into every application — this exists because of that pain.

---

## ✨ What It Does

- Automatically detects common job application fields
- Autofills personal, contact, and profile details
- Safely skips unknown or ambiguous fields
- Designed to work across multiple career portals

---

## 🧠 How It Works (High Level)

1. Injects a content script into job application pages
2. Waits asynchronously until form elements are available
3. Classifies fields based on attributes like:
   - name
   - id
   - placeholder
   - aria-label
4. Matches fields with user profile data
5. Autofills inputs and selects while triggering proper DOM events

---

## 🧱 Tech Stack

- JavaScript (ES6+)
- Chrome Extension (Manifest V3)

---

## 📁 Project Structure

    BuildMyCareer/
    ├── manifest.json
    ├── content.js
    ├── profile.example.js
    ├── .gitignore



---

## 🔐 Handling Personal Data (Important)

To use the extension:

1. Copy `profile.example.js`
2. Rename it to `profile.js`
3. Fill in your own details locally

---

## 🛠 Installation (Local Development)

1. Clone the repository
2. Create `profile.js` from `profile.example.js`
3. Open Chrome → `chrome://extensions`
4. Enable **Developer Mode**
5. Click **Load unpacked**
6. Select the project folder

Refresh the target job application page and check the console logs.

---

## ⚠️ Disclaimer

This project is for **educational and personal productivity purposes**.

- It does **not** bypass captchas
- It does **not** submit applications automatically
- It respects page security boundaries

Use responsibly.

---


## 👤 Author

Built by someone who got tired of retyping the same information and decided to solve the problem properly.

    Made with ❤️ by BALAMURALI-404
    📧 bbalamurali2004@gmail.com