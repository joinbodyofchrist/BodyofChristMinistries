# Body of Christ Ministries — Website

A clean, modern, mobile-first static website for Body of Christ Ministries,
hosted for free on **GitHub Pages**.

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero, mission, service times, and Facebook CTA |
| Statement of Faith | `faith.html` | Core biblical beliefs |
| Events | `events.html` | Dynamic event list from `data/events.json` |
| Give / Donate | `give.html` | Giving page with multiple donation options |
| Prayer Request | `prayer.html` | Formspree-powered prayer request form |
| Contact | `contact.html` | Service times, addresses, Facebook, and email info |

---

## ⏰ Service Times

| Day | Time | What | Location |
|-----|------|------|----------|
| **Sunday** | 9:00 AM | Bible Study & Coffee | 16 Bennett Ave, Council Bluffs, IA 51503 |
| **Sunday** | 10:00 AM | Church Service | 16 Bennett Ave, Council Bluffs, IA 51503 |
| **Wednesday** | 6:00 – 7:00 PM | Night Bible Study | Sozo Coffee House, 1314 Jones Street, Omaha, NE 68102 |

---

## 🚀 How to Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Source**, select **Deploy from a branch**.
4. Choose the branch (e.g., `main`) and folder (`/ (root)`).
5. Click **Save**.
6. Your site will be live at:
   `https://joinbodyofchrist.github.io/BodyofChristMinistries/`

---

## ✏️ Updating Content

### Remaining Placeholders

The following items still use placeholder values and should be updated:

| Placeholder | Where to change | How to update |
|---|---|---|
| `PLACEHOLDER_GIVING_URL` | `give.html` | Replace with your online giving link, e.g. `https://cash.app/$YourCashTag` |
| `PLACEHOLDER_CASHTAG` | `give.html` | Replace with your Cash App $Cashtag |

> ✅ **Facebook URL** — `https://www.facebook.com/profile.php?id=61582607797300`
> ✅ **Service times & addresses** — already set (see above)
> ✅ **Formspree form** — `https://formspree.io/f/xbdpavwb`
> ✅ **Contact email** — `joinbodyofchrist@gmail.com`

### Update Events

Events are stored in **`data/events.json`** — edit this file to add, remove,
or change events. No build step required; the page reads the file automatically.

Each event has these fields:

```json
{
  "title": "Event Name",
  "date": "YYYY-MM-DD",
  "time": "10:00 AM",
  "location": "16 Bennett Ave, Council Bluffs, IA 51503",
  "description": "Optional description of the event."
}
```

- `title` and `date` are required.
- `time`, `location`, and `description` are optional.
- Past events appear grayed out below upcoming events.

### Set Up Formspree (Prayer Request Form)

1. Sign up for a free account at [https://formspree.io](https://formspree.io).
2. Create a new form.
3. Copy your **Form ID** (the part after `/f/` in the endpoint URL).
4. Open `prayer.html` and replace `XXXXXXX` in the `action` attribute:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Commit and push — the form will now deliver to your Formspree inbox.

---

## 📁 File Structure

```
/
├── index.html          ← Home
├── faith.html          ← Statement of Faith
├── events.html         ← Events
├── give.html           ← Give / Donate
├── prayer.html         ← Prayer Request (Formspree)
├── contact.html        ← Contact
├── css/
│   └── style.css       ← All styles (mobile-first)
├── js/
│   └── main.js         ← Nav toggle, form handling, events loader
├── data/
│   └── events.json     ← Event data (easy to edit)
├── logo.jpg            ← Ministry logo
├── _config.yml         ← GitHub Pages config
└── README.md           ← This file
```

---

## 🛠 Tech Stack

- Plain **HTML5 / CSS3 / Vanilla JavaScript** — no build tools, no dependencies.
- **GitHub Pages** — free static hosting directly from this repo.
- **Formspree** — serverless form submission for the Prayer Request page.

---

## ♿ Accessibility

- Skip-to-main-content link on every page.
- Semantic HTML5 landmarks (`header`, `main`, `nav`, `footer`).
- ARIA labels on interactive elements.
- Focus-visible indicators on all interactive elements.
- Mobile hamburger menu keyboard-accessible and screen-reader friendly.

---

*© Body of Christ Ministries. Built with faith and care.*
