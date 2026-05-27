# Editor Instructions — What to add and where

Open the Shopify theme editor (Online Store → Themes → Customize) and edit the pages shown below (Index / Product as appropriate). For each section, open the named section in the editor and paste the suggested content into the fields. The links below point to the source section files in the repo for reference.

---

**Header**: header section — [sections/header.liquid](sections/header.liquid)

- Where: Theme editor → Header section
- Fields to set:
  - Logo image: upload your brand SVG/PNG in the **Logo image** setting.
  - Logo alt text: `Kerala Ayurveda` (set in **Logo alt text**)
  - Logo fallback text: leave blank (we removed hardcoded fallback)
  - Breadcrumb current item: leave blank to auto-populate, or set a value per page in **Breadcrumb current item** if you want an override.
- Notes: Centering and spacing are CSS-driven in `assets/section-header.css` so keep logo image reasonably sized (max width ~220px).

---

**The honest sequence** (Timeline section) — [sections/what-to-expect.liquid](sections/what-to-expect.liquid)

- Where: Theme editor → "What to expect" / timeline section
- Fields to set:
  - Kicker: `What to expect`
  - Heading: `The honest sequence.`
  - Text (richtext): `<p>Root strength comes before visible density.</p>`
  - Footnote (optional): `*Based on consistent use as directed. Individual results may vary.`
  - Padding top / bottom: set as desired (we used 80 / 60 in the templates)
- Blocks (Stages): create three `Stage` blocks; for each block set:
  - Image: upload stage image via **Image**
  - Phase: e.g. `FIRST TIME`
  - Mobile phase: e.g. `First Time`
  - Label: e.g. `FIRST APPLICATION`
  - Title: e.g. `Scalp cools immediately`
  - Body: e.g. `The Neeli acts immediately. Oil absorbs without heaviness.`

Suggested block examples (paste into block fields):

- Stage 1:
  - Phase: `FIRST TIME`
  - Mobile phase: `First Time`
  - Label: `FIRST APPLICATION`
  - Title: `Scalp cools immediately`
  - Body: `The Neeli acts immediately. Oil absorbs without heaviness.`
- Stage 2 & 3: copy pattern with different titles / bodies.

---

**Go deeper** (Information / Accordion) — [sections/information.liquid](sections/information.liquid)

- Where: Theme editor → "Information" / information section
- Fields to set:
  - Kicker: `Information`
  - Heading: `Go deeper.`
  - Text (richtext): `Clear answers for the most common questions.`
  - Info blocks: add `Info` blocks for the ingredient list items
  - FAQ blocks: add `FAQ` blocks for questions
- Example FAQ entries (add as `FAQ` blocks):
  - Question: `When will I see results?`
    - Answer: `Reduced hair fall is typically noticed within 2 to 3 weeks.`
  - Question: `Does it help with greying?`
    - Answer: `Neeli and Bhringaraja are traditionally used to support natural hair colour.`
- Notes: We removed the green container background so the accordion uses a white background — pick text/colors that read on white.

---

**Full Spectrum / Brand trust** — [sections/brand-trust.liquid](sections/brand-trust.liquid)

- Where: Theme editor → "Brand trust" / brand-trust section
- Fields to set (examples to paste):
  - Desktop image: upload the large illustration for desktop
  - Mobile image: upload optimized mobile image
  - Desktop title / Mobile title: `Full Spectrum` (or leave blank to rely on `heading` below)
  - Heading: set the main heading (if you want it visible on index) — e.g. `Full Spectrum`
  - Text (richtext):

```html
<p>Classical and Proprietary Ayurvedic Products (350+ SKUs) | Therapies and Ayurvedic Retreats | Academy and Education Initiatives | Pioneering Ayurvedic R&amp;D</p>
```

  - Patents kicker: `Internationally Recognized`
  - Patents heading: `Patented Formulations`
  - Patents text (richtext):

```html
<p>Kerala Ayurveda has carried forward classical Ayurvedic wisdom for modern wellness rituals.</p>
```

  - Patent 1 title / text and Patent 2 title / text: fill as needed (or upload patent images)
  - Seal image / seal text: optional trust seal
- Notes: We removed hardcoded template values so set any content you want here via the editor.

---

**Footer** — [sections/footer.liquid](sections/footer.liquid)

- Where: Theme editor → Footer section
- Blocks & settings to configure:
  - `Brand` block: Upload the footer logo (Brand → Logo)
  - `Link column` blocks (links_1, links_2, links_3): set the heading and assign a Menu (select existing menu or create one in Shopify Admin → Navigation)
  - `Social` block: open and enter each social URL; set the label (e.g. `Follow Us`)
  - `Tagline` block: set the tagline text, e.g. `The Proprietary Kerala Ayurveda Formulation.`
- Notes: Footer CSS resides in `assets/section-footer.css`. If spacing or sizes look off, I can adjust them next.

---

Quick steps (copy/paste friendly):

1. In Shopify Admin → Online Store → Themes → Customize, open the Index (or Product) template used for preview.
2. Click each section listed above and paste the provided field values.
3. Save and Preview. If any content is missing on the live preview, confirm the correct template (Index vs Product) is being edited.

---

If you want, I can also seed these exact values into the `templates/index.json` and `templates/product.json` so the section defaults appear automatically — tell me which template to update and I'll commit it.

Files referenced in this guide:
- [sections/header.liquid](sections/header.liquid)
- [sections/what-to-expect.liquid](sections/what-to-expect.liquid)
- [sections/information.liquid](sections/information.liquid)
- [sections/brand-trust.liquid](sections/brand-trust.liquid)
- [sections/footer.liquid](sections/footer.liquid)

