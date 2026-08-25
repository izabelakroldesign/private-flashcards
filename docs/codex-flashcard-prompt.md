# Codex Flashcard Prompt

Create flashcards only from the supplied source material. Do not add outside information. Each card should test one clear fact, concept, comparison, calculation, or scenario. Prefer recall and understanding over multiple-choice recognition. Keep answers concise. Avoid duplicate cards.

Output strict JSON compatible with this app. Do not include Markdown fences, commentary, explanations, trailing commas, or fields outside this schema unless they are optional metadata that the mobile app can safely ignore.

Use this format:

```json
{
  "deck": {
    "name": "Deck Name"
  },
  "cards": [
    {
      "front": "Question or prompt",
      "back": "Concise answer",
      "type": "definition",
      "source": "source_filename.pdf"
    }
  ]
}
```

Allowed `type` values:

- `definition`
- `understanding`
- `comparison`
- `scenario`
- `calculation`

Rules:

- Use only the supplied material.
- Make each card atomic.
- Prefer short answers that can be reviewed quickly on a small phone screen.
- Avoid multiple-choice cards.
- Avoid duplicate cards and near duplicates.
- Preserve source names when available.
- If a concept needs several facts, create several small cards instead of one large card.
