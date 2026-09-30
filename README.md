# 🌙 Lunéa

**A softer place for restless nights.**

Lunéa is a static, privacy-first sleep-wellness web app designed to help people navigate restless nights with gentle soundscapes, a breathing exercise, brain-dump journaling, and a lightweight sleep journal.

> **Important:** Lunéa is a wellness tool, not a medical device and not a replacement for professional care. It does not diagnose, treat, or cure insomnia.

## ✨ Version 1 features

- 🌙 Soft, low-stimulation nighttime interface
- 🎧 Browser-generated soundscapes: rain, ocean, forest, deep space, room ambience, wind, soft tone, fireplace texture
- ⏱️ Optional 10/20/30/60-minute sound timer
- 🫧 Gentle paced-breathing exercise
- 💭 Private brain-dump journal with supportive reframes
- 📓 Sleep journal with recent-night visualization
- 🌸 Local-only storage using `localStorage`
- 🔒 JSON data export and local-data deletion
- ☀️ Light/dark visual mode
- 📱 Responsive mobile-first layout
- ♿ Reduced-motion support and semantic controls
- 🚫 No account, server, analytics, or third-party API required

## 🧠 Science-informed scope

The product deliberately stays within a **sleep-wellness** scope. Its feature set is inspired by established sleep-health principles such as relaxation, sleep tracking/diaries, consistent routines, and reducing pressure around sleep. For persistent or clinically significant insomnia, evidence-based care such as CBT-I should be discussed with a qualified healthcare professional.

Useful public-health references:

- NHLBI — Insomnia treatment: https://www.nhlbi.nih.gov/es/salud/insomnio/tratamiento
- NHLBI — Living with insomnia / sleep diary: https://www.nhlbi.nih.gov/es/salud/insomnio/vivir-con-insomnio
- American Academy of Sleep Medicine — CBT-I guideline resources: https://learn.aasm.org/AssetListing/Guidelines-at-a-Glance-2291/Guidelines-at-a-Glance-3212

## 🚀 Run locally

No build step is required.

```bash
git clone https://github.com/YOUR-USERNAME/lunea.git
cd lunea
```

Open `index.html` in a modern browser, or use a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 🌐 Publish with GitHub Pages

1. Create a GitHub repository, e.g. `lunea`.
2. Upload `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, and `README.md`.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your default branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish the site.

Because the app is static, there is no backend deployment step.

## 🔐 Privacy architecture

Version 1 stores journal entries, thoughts, preferences, and sound settings in the browser's local storage. No personal data is sent to a Lunéa server because there is no server in this version.

The export function creates a local JSON backup. The clear-data control deletes the Lunéa storage key from the current browser.

## 🛠️ Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Web Audio API
- localStorage
- Progressive Web App manifest
- No framework or build system

## 📌 Product boundary

Do not market Version 1 as a cure for insomnia. Avoid claims such as “guaranteed sleep,” “treats insomnia,” or “clinically proven.” If future versions add clinical protocols, health-data integrations, or AI health guidance, obtain appropriate clinical, privacy, and regulatory review first.

## License

Choose a license appropriate for your repository before publishing. MIT is a common option for open-source projects, but you should select the license that matches your intended use.
