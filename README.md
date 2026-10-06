# Private Flashcards

Static personal flashcard web app designed around an iPhone 13 mini-sized interface. It runs fully in the browser and stores data locally with `localStorage`.

The app does not import PDFs, call AI APIs, use accounts, or require a backend.

## Local Preview

```bash
python3 -m http.server 4173 -d docs
```

Open:

```text
http://localhost:4173
```

## GitHub Pages

This repo includes `.github/workflows/pages.yml`, which deploys the `docs/` folder to GitHub Pages on every push to `main`.

After pushing to GitHub:

1. Open the repo on GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The app will be available at the GitHub Pages URL for that repository.

## iPhone Use

Open the GitHub Pages URL in Safari on the iPhone. For a more app-like experience:

1. Tap Share.
2. Tap **Add to Home Screen**.
3. Open it from the home screen.

Data stays in that browser/app storage. Export backups before clearing Safari data.

## Import Format

```json
{
  "deck": {
    "name": "Networking Basics"
  },
  "cards": [
    {
      "front": "What does DNS do?",
      "back": "It translates domain names into IP addresses.",
      "type": "definition",
      "source": "networking_basics.pdf"
    }
  ]
}
```

Supported card types:

- `definition`
- `understanding`
- `comparison`
- `scenario`
- `calculation`

Unknown optional fields are ignored.

## Codex Workflow

1. Add a PDF or notes to Codex on desktop.
2. Ask Codex to generate cards using `docs/codex-flashcard-prompt.md`.
3. Save the output as a JSON file.
4. Open the GitHub Pages app.
5. Import the JSON file.
6. Study on desktop or iPhone.

## Built-In Decks

The app ships with built-in study data loaded once into browser storage:

- `Networking Basics`
- `IP, DHCP, NAT, ARP i routing`
- `Linux`

The Decks screen also shows topic filters:

- `Sieci` - non-Linux cards
- `Linux` - cards whose deck, source, front, or back mentions Linux/Linuks
