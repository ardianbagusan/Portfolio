# iOS-style portfolio 

A portfolio built like a phone: unlock it, swipe up, and open apps for photos,
competitions, work, contact, projects and a scripted chat.

Built with React + Vite. Hosted free on GitHub Pages.

## 1. Run it on your computer

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## 2. Put it on GitHub Pages

1. Create a new repository on GitHub and push this folder to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "First version of iOS portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-user>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub, open the repo's **Settings > Pages**, and under **Build and deployment** set **Source** to **GitHub Actions**.
3. Open the **Actions** tab. The "Deploy to GitHub Pages" workflow runs on every push to `main`; the first run may need a manual re-run after step 2.
4. Your site is live at `https://<your-user>.github.io/<your-repo>/`.

The workflow is in `.github/workflows/deploy.yml`. You never upload the `dist` folder yourself.

## 3. Add your content

All content lives in `src/data/`. You only edit JSON there, never the components.

| File | What it controls |
| --- | --- |
| `profile.json` | Name, intro, lock-screen message, email, phone, LinkedIn, Instagram, resume |
| `home.json` | Which apps appear on the home screen and dock, and their icons |
| `photos.json` | Photos app; the one with `"featured": true` is the home-screen hero |
| `competitions.json` | Competition app: title, meta, result, key points, proof photos and links |
| `work.json` | Work app, same shape as competitions |
| `projects.json` | Browser app: your live projects |
| `chat.json` | Messages app: Ardian's lines and the reply buttons |

Images go in `public/images/...` and are referenced without a leading slash,
for example `"thumb": "images/photos/p001-thumb.webp"`. While a field is `null`,
a soft placeholder is shown.

Put your CV at `public/resume.pdf` (the Resume icon links there).

### Images

- Convert photos to WebP before committing (Squoosh in the browser works). Large files stay in git history forever.
- Make two sizes per photo: a small `thumb` (about 600 px wide) and a `full` one (about 1600 px wide).

### Chat

Each node in `chat.json` has `messages` (Ardian's bubbles), `replies` (the buttons;
each points to the `next` node) and an optional `openApp` that adds an
"Open ..." link under the answer. Keep at least three replies on the first node.

## Project layout

```
public/icons/        app icon images
public/images/       your photos (add files here)
src/App.jsx          screen state: lock / home / which app is open
src/components/      phone frame, lock screen, home screen, app window
src/apps/            Photos, Competition/Work (ListApp + DetailView), Phone, Browser, Messages
src/data/            all your content
src/styles.css       all styling
```

## Note on icons

`public/icons/` contains Apple, LinkedIn and Instagram icon artwork. These are
trademarks of their owners. They are fine for a personal learning project, but
for a public portfolio consider swapping them for your own icons or emoji
(set `"emoji"` instead of `"image"` in `home.json`).
