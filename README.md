# 🌙 Lunéa

**A softer place for restless nights.**

Lunéa is a static, privacy-first sleep-wellness web app designed to help people navigate restless nights with gentle soundscapes, a breathing exercise, brain-dump journaling, and a lightweight sleep journal.

> **Important:** Lunéa is a wellness tool, not a medical device and not a replacement for professional care. It does not diagnose, treat, or cure insomnia.

## ✨ Version 1 features

- 🌙 Soft, low-stimulation nighttime interface
- 🎧 Browser-generated soundscapes: rain, ocean, forest, deep space, room ambience, wind, soft tone, and fireplace texture
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

The product deliberately stays within a **sleep-wellness** scope. Its features are inspired by established sleep-health principles such as relaxation, sleep tracking and diaries, consistent routines, and reducing pressure around sleep.

For persistent or clinically significant insomnia, evidence-based care such as cognitive behavioral therapy for insomnia (CBT-I) should be discussed with a qualified healthcare professional.

Useful public-health references:

- [NHLBI — Insomnia treatment](https://www.nhlbi.nih.gov/es/salud/insomnio/tratamiento)
- [NHLBI — Living with insomnia / sleep diary](https://www.nhlbi.nih.gov/es/salud/insomnio/vivir-con-insomnio)
- [American Academy of Sleep Medicine — CBT-I guideline resources](https://learn.aasm.org/AssetListing/Guidelines-at-a-Glance-2291/Guidelines-at-a-Glance-3212)

## 🚀 Run locally

No build step is required.

```bash
git clone https://github.com/li-future-builder/lunea.git
cd lunea
```

Open `index.html` in a modern browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 🔐 Privacy architecture

Version 1 stores journal entries, thoughts, preferences, and sound settings in the browser's local storage. No personal data is sent to a Lunéa server because this version has no server.

The export function creates a local JSON backup. The clear-data control deletes Lunéa's storage key from the current browser.

**Privacy note:** local storage is not encrypted by default. Anyone with access to the same browser profile may be able to access locally stored data. Exported JSON files may also contain private information, so store them securely.

## 🛠️ Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Web Audio API
- `localStorage`
- Progressive Web App manifest
- No framework or build system

## 📌 Product boundary

Lunéa Version 1 is a wellness tool, not a medical device.

Do not market it as a cure for insomnia. Avoid claims such as “guaranteed sleep,” “treats insomnia,” or “clinically proven” unless supported by appropriate evidence and review.

If future versions add clinical protocols, health-data integrations, or AI health guidance, obtain appropriate clinical, privacy, and regulatory review first.

## 📄 License

Lunéa is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for the full license text.

Copyright (c) li-future-builder

## 🤍 Disclaimer

Lunéa is provided “as is,” without warranties or guarantees of any kind. Use it at your own discretion. It is not a substitute for professional medical advice, diagnosis, or treatment.
