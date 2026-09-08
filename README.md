# letterfly

A scrapbooky, decorate-it-yourself letter-writing app. Pick a pastel paper color and handwriting
font, write a message, drag on paper stars, flowers, bouquets, bows, and washi tape, then seal it
and share a link.

## Running locally

```bash
npm install
npm run dev
```

## How it works

- The letter (text, paper color, font, and sticker placement) is encoded into the share link itself
  — there's no backend or database.
- Opening a share link shows a sealed envelope that animates open to reveal the letter.

## Stack

React + Vite, react-router-dom (hash-based routing so it works on any static host).
