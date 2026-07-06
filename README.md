# Soul Reset Program — Course Website

Private course page for paid members. Lessons show as thumbnail cards — tapping one opens the video directly on YouTube (the YouTube app on phones).

## Files in this repo

| File | What it is |
|------|-----------|
| **`config.js`** | ⭐ **The only file you edit** — videos, access code, your links |
| `index.html` | Page structure (don't touch) |
| `styles.css` | Theme & design (don't touch) |
| `app.js` | The engine that builds the page (don't touch) |

## Add a new video (30 seconds)

Open `config.js` and copy-paste one line inside a module's `lessons` list:

```js
{ title: "Your video name", link: "https://www.youtube.com/watch?v=XXXX" },
```

Both link styles work — `youtube.com/watch?v=XXXX` and `youtu.be/XXXX`.
No link yet? Use `link: ""` and it shows as **Coming soon**.

To add a practice/meditation under a lesson, put it inside that lesson's `exercises` list (see Lesson 3 in `config.js` for the pattern).

## Change the access code

In `config.js`:

```js
passcode: "SOUL2026",   // change to anything you like
```

Set it to `""` to remove the lock completely. The code is not case-sensitive.

## Put it live on GitHub Pages

1. Go to **github.com → New repository** → name it (e.g. `soul-reset`) → **Public** → Create
2. Click **Add file → Upload files** → drag in all the files from this folder → **Commit changes**
3. Go to **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main** → Save
4. Wait ~1 minute. Your site is live at `https://YOURUSERNAME.github.io/soul-reset/`
5. Send that link + the access code to your paid clients ✅

## Update videos after it's live (no laptop needed)

1. Open your repo on GitHub → click `config.js` → click the ✏️ pencil icon
2. Add your new video line → **Commit changes**
3. The website updates itself in about a minute

## Preview on your computer

Just double-click `index.html` — it opens in your browser and works fully, since videos open on YouTube itself.

## Important — YouTube settings

Keep your course videos set to **Unlisted** (not Private) in YouTube Studio. Unlisted = hidden from search, but anyone with the link can watch. Private videos will not open for your clients.

---

Made with stillness 🕯️ · [@Mokia_praga](https://www.youtube.com/@Mokia_praga)
