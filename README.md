# Khait-Kalyaan

**Chota Kisan aur Mobile Gujjar**

Agriculture and rural farm businesses.

Khait-Kalyaan is a field clinic for crops and livestock. You read a sick field or a sick animal from signs you can see, keep a herd book, speak a weight or a dose, check the weather, and run the farm arithmetic. The case notes stay on the phone.

The app writes its own name in Urdu as **کھیت و کلیان**.

**Use it in the browser:** https://tajoor621.github.io/Khait-Kalyaan/

That page is the helper itself, in Urdu and English. It opens in Urdu. Switch with the **اردو** and **English** buttons. On that page you can search the disease shelf, tick signs, keep a herd book and case notes on the phone, type a weight line, run the fertilizer, drench, tape, and spray cards, read the month and the field library, and fetch weather when the network is there. After the first visit it keeps a copy for offline use. It is guidance for when a vet or crop specialist is hard to reach. If one is near, ask them.

The same repository also runs the fuller app (`npm run dev`): on-phone speech models, a map for paddocks, and a PDF health sheet. Both keep the name Khait-Kalyaan and the line Chota Kisan aur Mobile Gujjar.

## The name

These are the same project, not four products.

| Writing | Where it comes from |
| --- | --- |
| Khait-Kalyaan | The repository and the public name |
| Khait Khalyaan | The first README, the same words with a space |
| Khet o Kalyan | The English reading of the Urdu name |
| کھیت و کلیان | The name inside the app |
| Chota Kisan aur Mobile Gujjar | The line the project keeps |
| چھوٹا کسان اور موبائل گجر | That line in Urdu |
| छोटा किसान और मोबाइल गुज्जर | That line in Hindi |

The app screens are Urdu and English. Urdu is the language it opens in. Hindi on the project guide is the identity line in Devanagari. The app does not have a Hindi interface.

## What the app does

Everything below is in the source under `src/`.

- **Home.** Search the disease shelf, open crops or animals, read this month’s field notes, and jump to an emergency card.
- **Read a case.** Pick a species and tick only the signs you can see. The page ranks a field match.
- **Disease index.** 38 crop entries and 30 animal entries. Each one has signs, how to be more sure, what to do, medicines named in the note, prevention, when to stop and call, and what it is easy to confuse with. Severity is watch, treat, urgent, or report.
- **Herd book.** Animals on this phone: tag, species, sex, name, weights, medicines, and feed and milk. Download a CSV.
- **Voice log.** Record or type a line such as a weight. A speech model can run in the browser after you accept the download. Nothing is saved until you confirm. The app says the audio is not uploaded unless you export it.
- **Weather.** A seven-day forecast from Open-Meteo, and climate normals from NASA POWER, for ten Pakistani cities or the phone’s location. The copy is cached on the phone. Live satellite greenness is not loaded. The paddock page asks you to score greenness by eye.
- **Paddocks.** Drop corners on a map. Three points make an area. The boundary stays on the phone.
- **Calculators.** Fertilizer bags, drench millilitres, a dairy ration, weight from a tape, a spray tank, usual seed rates, normal vital ranges, and a prescribed milligram-per-kilogram converter. The bottle label overrides the card. The converter is not an antibiotic dose.
- **The year.** Month notes for crops and stock.
- **Emergency.** Short “do this now” cards.
- **Cases.** Notes saved from a field match, with a status.
- **Health sheet.** An Urdu print sheet and an English and Roman Urdu PDF.
- **Field library.** Nine of the project’s own notes, from reading a field to voice privacy. Copyrighted textbooks are named, not copied.

### Crops and animals on the shelf

Crops: wheat, rice, cotton, maize, sugarcane, tomato, potato, chilli, mango, citrus, chickpea, mustard, onion.

Animals: cattle, buffalo, goat, sheep, poultry, camel, horse.

### Where records live

Herd animals, weights, medicines, feed, paddocks, case notes, and cached weather are stored in this browser with IndexedDB. They are not a marketplace listing and they are not a farm-finance ledger. The app does not include those.

The app’s own notice, kept on the screens:

> Field guidance, not a licence to prescribe. The bottle label and the livestock office win. Sudden death with blood from the nose, foot and mouth, and a shed of dead birds: report them. Do not open the carcass.

## Run it

GitHub Pages serves the project guide. The app is a Vite and Node project and runs on your machine.

```bash
git clone https://github.com/Tajoor621/Khait-Kalyaan.git
cd Khait-Kalyaan
npm install
npm run dev
```

Then open http://localhost:8080/

`npm run dev` starts Vite on port 8080. `npm test` runs the repository’s node tests. `npm run typecheck` runs the TypeScript check.

## GitHub Pages

The helper published at https://tajoor621.github.io/Khait-Kalyaan/ is the `index.html` at the repository root, with `app.js`, `app.css`, and `data.json`. `data.json` is exported from the app’s own shelf:

```bash
node --experimental-strip-types scripts/export-pages-data.mjs
```

GitHub Pages for this repository publishes the root of `main`. `.nojekyll` keeps that folder as plain files. `vite.config.ts` sets `appType: "custom"` so that root `index.html` is not the Vite entry. `npm run dev` still starts the full app.
