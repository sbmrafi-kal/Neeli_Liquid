# Neeli Frontend Visual Discrepancy & Developer Prompts Report (Image-by-Image)

This document provides a systematic, image-by-image visual comparison of the current Shopify Liquid frontend vs. the original Next.js design, using the screenshot files in `ref/` and styling specs in `Neeli_nxt copy`. For each section, we detail the visual discrepancies, reference Tailwind CSS classes from the Next.js copy, and provide actionable developer prompts for Shopify Liquid and CSS stylesheets.

---

## Global Configuration & Theme Tokens
**Affected Files:**
* [`assets/section-theme-product-page.css`](file:///Users/rafi/Documents/Neeli_Shopify_Liquid/assets/section-theme-product-page.css)
* [`assets/base.css`](file:///Users/rafi/Documents/Neeli_Shopify_Liquid/assets/base.css)

### Discrepancy Overview
* **Fonts:** The Next.js original uses custom fonts **Amstir** (serif for headings) and **Avenir** (sans-serif for body). The current theme falls back to system fonts, making headings look default-serif and body text look standard-sans.
* **Color Scheme:** HSL-based palette variables are missing or misconfigured in the Shopify stylesheet.
* **Layout Width:** Original container uses `max-width: 1392px` with progressive padding.

### Developer Implementation Prompt
```css
/* Add these variables to your :root in base.css or section-theme-product-page.css */
:root {
  --background: 42 30% 97%;          /* #FAF6F0 - Light cream background */
  --foreground: 160 43% 21%;         /* #1C3F33 - Deep forest green */
  --brand-forest: 160 43% 21%;       /* HSL Forest Green */
  --brand-forest-light: 160 28% 35%; /* Muted Green */
  --brand-cream: 42 30% 97%;         /* Cream */
  --brand-cream-deep: 44 24% 93%;    /* Deep Cream (#EFEBE3) */
  --brand-gold: 39 65% 56%;          /* Amber Gold (#DCA145) */
  --brand-cta: 19 44% 39%;           /* Terracotta Brown (#8F4F36) */
  
  --font-serif: "Amstir", "Avenir", serif;
  --font-sans: "Avenir", sans-serif;
}

/* Ensure global container matches original container-narrow: */
.container-narrow {
  max-width: 1392px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
@media (min-width: 640px) {
  .container-narrow {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .container-narrow {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}
```

---

## 1. Image Pair 00 (`current_00.png` vs `org_00.png`)
**Sections Covered:** Top Header Bar, Sub-Header Navigation Bar, Breadcrumbs, Search Input, Product Hero Image Carousel (Left), and Product Hero Upper Content (Right - Badges, Title, Subtitle, Testimonial Quote).

### Visual Discrepancy Analysis
* **Top Header Green Bar & Logo:**
  - *Original Next.js:* Logo centered, high contrast, white (`brightness-0 invert`).
  - *Current Shopify:* Logo is offset, incorrect logo colors, and background green color lacks correct HSL tint.
* **Subnav Breadcrumbs:**
  - *Original Next.js:* Uppercase, letter-spaced, muted green: `HOME › NEELIBHRINGADI KERAM` (`tracking-[0.08em] text-[13px] text-brand-forest/48`).
  - *Current Shopify:* Standard casing, wrong dynamic placeholder outputting `HOME › ARISE-JIN`.
* **Search Input Field:**
  - *Original Next.js:* Width is fixed (`lg:w-[284px]`), search icon is positioned inside the input container.
  - *Current Shopify:* Input stretches full width and input is misaligned.
* **Hero Image Gallery (Active Slide):**
  - *Original Next.js:* Image 1 displays the bottle with avocado/coconut hero image. Thumbnails below it with active border indicator.
  - *Current Shopify:* Carousel starts on slide 1 with the triple-milk infographic collage, cropped vertically.
* **Badges:**
  - *Original Next.js:* Gold pill-shaped border with light-gold background: `bg-[#f8f0d6] border-[#d8cba1] text-brand-forest`.
  - *Current Shopify:* Plain green badge.
* **Testimonial Quote Box:**
  - *Original Next.js:* Left-hand yellow-gold border (`border-l-[4px] border-[#f3b324]`), warm light-yellow background (`bg-[#f8f1df]`), Avenir/sans font, author meta `- ANU R., CHENNAI` in `tracking-[0.08em] text-brand-forest/58`.
  - *Current Shopify:* Missing yellow border, plain container.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- In sections/header.liquid, replace the breadcrumbs block with this: -->
<div class="theme-site-header__breadcrumb uppercase tracking-[0.08em] text-[11px] lg:text-[13px] text-brand-forest/48">
  <a href="{{ routes.root_url }}" class="hover:text-brand-forest">Home</a> 
  <span class="mx-2 text-brand-forest/28">›</span>
  <span class="text-brand-forest font-medium">Neelibhringadi Keram</span>
</div>

<!-- Style the search input to match: -->
<input 
  class="h-[30px] w-full rounded-full border border-brand-forest/60 bg-transparent pl-10 pr-4 text-[12px] text-brand-forest placeholder:text-brand-forest/35 focus:border-brand-forest lg:w-[284px]"
  placeholder=""
  type="text" 
  aria-label="Search"
/>
```

---

## 2. Image Pair 01 (`current_01.png` vs `org_01.png`)
**Sections Covered:** Product Hero Lower Content (Right - Certificates Grid, Heritage Stats, Reorder Now CTA Card, Delivery Info Grid, Upsell Row Banner) and the yellow Ritual Guide.

### Visual Discrepancy Analysis
* **Doctor-Made Certificate Statement:**
  - *Original Next.js:* Simple line: "Made by BAMS doctors in our GMP & ISO - certified facility. FDA compliant and AYUSH licensed."
  - *Current Shopify:* Mixed up order.
* **GMP Stamps & Stats:**
  - *Original Next.js:* Stamps grid sits side-by-side with the heritage stats inside a white container: `border border-brand-forest/10 bg-white px-3 py-1 shadow-[0_8px_20px_rgba(17,48,39,0.04)]`.
  - *Current Shopify:* Box borders, alignment, and scale are broken; spacing is cluttered.
* **Reorder Now CTA Card:**
  - *Original Next.js:* Brown Terracotta card (`bg-[#8f4f36]`) with white icon, large uppercase "REORDER NOW" text, strikethrough price (`₹350` at `text-white/40`) and final price (`₹315` at `text-[30px] font-bold`).
  - *Current Shopify:* The entire brown Reorder card block is missing.
* **Delivery Rows Grid:**
  - *Original Next.js:* Structured table-like row `bg-[#f6f2e8]` with borders: `2-4 day delivery | COD available | 7-day returns`.
  - *Current Shopify:* Unstyled columns.
* **Upsell Box Banner:**
  - *Original Next.js:* Deep Terracotta banner (`bg-[#8f4f36]`) with product thumbnail on the left (`rounded-[10px]`), middle description, and yellow button `+ ₹225` on the right.
  - *Current Shopify:* Banner styling is incomplete or uses incorrect colors.
* **The Ritual Guide:**
  - *Original Next.js:* Light-yellow banner (`bg-[#fbf2da] border-[#f0d084]`) with a sun icon, uppercase "THE RITUAL GUIDE" heading, and descriptive text.
  - *Current Shopify:* Small margins, poor spacing, incorrect colors.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- Reorder Now CTA Card replacement code in sections/product-hero.liquid: -->
<div class="cta-sheen hover-rise mt-4 overflow-hidden rounded-[14px] bg-[#8f4f36] text-white shadow-sm">
  <button type="submit" name="add" class="flex w-full flex-col items-stretch text-left sm:flex-row border-0 bg-transparent cursor-pointer p-0">
    <div class="flex flex-1 items-center gap-4 px-5 py-3">
      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
      </svg>
      <div>
        <div class="text-[18px] font-bold uppercase leading-none tracking-[0.03em]">Reorder now</div>
        <div class="mt-1 text-[12px] text-white/72">Last ordered 28 Mar</div>
      </div>
    </div>
    <div class="flex items-center justify-end gap-3 border-t border-white/12 px-5 py-3 sm:min-w-[188px] sm:border-l sm:border-t-0">
      <span class="text-[16px] text-white/40 line-through">₹350</span>
      <span class="text-[30px] font-bold leading-none lg:text-[32px]">₹315</span>
    </div>
  </button>
</div>
```

---

## 3. Image Pair 02 (`current_02.png` vs `org_02.png`)
**Section Covered:** The Honest Sequence (Timeline of results).

### Visual Discrepancy Analysis
* **Column Dividing Borders (Desktop):**
  - *Original Next.js:* The 3 phase columns ("FIRST TIME", "WEEK 2-3", "MONTH 3+") are divided by thin vertical borders: `border-r border-brand-forest/6`.
  - *Current Shopify:* Columns flow together without separating border lines.
* **Phase Badges & Cards Background:**
  - *Original Next.js:* Light cream card background (`bg-[#f5f1e9]`) inside each column for phase label and images, with golden borders for phase image thumbnails: `border border-[#e9b443] rounded-[18px]`.
  - *Current Shopify:* Background is dark green or full-bleed default color, losing card contrast.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- In sections/what-to-expect.liquid, add the column dividers for desktop rendering: -->
<div class="hidden bg-white lg:grid lg:grid-cols-3">
  {%- for block in section.blocks -%}
    <div class="text-center {% unless forloop.last %}border-r border-brand-forest/6{% endunless %}">
      <div class="grid grid-cols-1 gap-4 bg-[#f5f1e9] px-4 py-4 sm:grid-cols-[122px_1fr] sm:items-center sm:gap-5 sm:px-5 lg:grid-cols-[116px_1fr]">
        <div class="text-left text-[18px] font-medium uppercase tracking-tight text-brand-forest/38">
          {{ block.settings.phase_number }}
        </div>
        <div class="overflow-hidden rounded-[18px] border border-[#e9b443]">
          <img src="{{ block.settings.phase_image | image_url: width: 300 }}" class="h-[94px] w-full object-cover">
        </div>
      </div>
      <!-- Phase label, title, body details -->
    </div>
  {%- endfor -%}
</div>
```

---

## 4. Image Pair 03 (`current_03.png` vs `org_03.png`)
**Section Covered:** "What's in it. What is not." ingredients list comparison.

### Visual Discrepancy Analysis
* **Checkmarks vs Exclusion Crosses:**
  - *Original Next.js:* 
    * "What's in it" lists use a solid green check icon: white check inside a green circle (`bg-[#ecf8ee] text-[#38a55b]`).
    * "What is not" lists use a solid red X icon: red X inside a white circle (`bg-white text-[#f44336]`).
  - *Current Shopify:* Uses default HTML text symbols or checkmarks, making the list hard to read and visually plain.
* **Exclude Card Background:**
  - *Original Next.js:* Right-hand exclusion card uses the Terracotta brown background: `bg-[#8f4f36] text-white shadow-[0_10px_35px_rgba(102,57,39,0.12)]`.
  - *Current Shopify:* Incorrect card colors.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- Update the icon containers in sections/ingredient-story.liquid to match the original designs: -->
<!-- Checkmark Container: -->
<div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ecf8ee] text-[#38a55b]">
  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" stroke-width="2.6" />
  </svg>
</div>

<!-- Exclusion Cross Container: -->
<div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#f44336]">
  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" stroke-width="2.6" />
  </svg>
</div>
```

---

## 5. Image Pair 04 (`current_04.png` vs `org_04.png`)
**Sections Covered:** Kerala Ayurveda Difference (Accordions) & Story Reviews.

### Visual Discrepancy Analysis
* **Difference Accordion Card Layout:**
  - *Original Next.js:* The dark-green accordion sits in a card block with margins: `mx-auto max-w-[980px] rounded-[18px] bg-brand-forest px-6 py-5 text-white shadow-sm`.
  - *Current Shopify:* Accordion expands full-width with a background color that fills the screen width, which ruins the centered card design.
* **Story Reviews Alignment:**
  - *Original Next.js:* Review cards are stacked vertically in a single column layout with wide spacing.
  - *Current Shopify:* Review cards are forced side-by-side in a 2-column grid.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- Update sections/brand-trust.liquid to constrain accordion width and stack story reviews vertically: -->
<div class="container-narrow py-10">
  <h2 class="text-center font-serif text-[30px] lg:text-[42px] text-brand-forest mb-7">
    Kerala Ayurveda Difference
  </h2>
  
  <div class="mx-auto max-w-[980px] rounded-[18px] bg-brand-forest px-6 py-5 lg:px-9 text-white shadow-sm">
    <!-- Accordion items here -->
  </div>
</div>

<!-- Story reviews stacking: -->
<div class="bg-brand-forest py-10 text-brand-cream mt-10">
  <div class="container-narrow max-w-[1180px] space-y-14">
    <!-- Loop and render reviews vertically (no grid-cols-2) -->
  </div>
</div>
```

---

## 6. Image Pair 05 (`current_05.png` vs `org_05.png`)
**Section Covered:** Key Ingredients Grid.

### Visual Discrepancy Analysis
* **Cards Spacing & Shadows:**
  - *Original Next.js:* Card items use subtle shadow: `shadow-[0_6px_22px_rgba(17,48,39,0.05)]` and border radius `rounded-[4px]`. Spacing is well-proportioned.
  - *Current Shopify:* Spacing is compressed, margins are too small, and shadows are absent or heavy.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```css
/* Add to assets/section-theme-product-page.css */
.ingredient-card {
  border-radius: 4px;
  border: 1px solid rgba(28, 63, 51, 0.08);
  background-color: #ffffff;
  box-shadow: 0 6px 22px rgba(17, 48, 39, 0.05);
  overflow: hidden;
  transition: transform 0.34s ease, box-shadow 0.34s ease;
}
.ingredient-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(17, 48, 39, 0.08);
}
```

---

## 7. Image Pair 06 (`current_06.png` vs `org_07.png`)
**Section Covered:** "Three milks. One complete formula." & Safety Warning Badge.

### Visual Discrepancy Analysis
* **Milk Thumbnails Shape:**
  - *Original Next.js:* Rounded circular image thumbnails wrapped in a dark-green border: `rounded-full border border-[#17372d] bg-[#17372d] p-[2px]`.
  - *Current Shopify:* Images are standard squares or circles without borders.
* **Warning Card:**
  - *Original Next.js:* Muted golden badge with warning text: `border border-[#e8cf81] bg-[#f9f1cf] text-[#a3704c] rounded-full`.
  - *Current Shopify:* Simple text block or missing styling.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- Milk Image Thumbnail: -->
<div class="mx-auto w-fit rounded-full border border-[#17372d] bg-[#17372d] p-[2px]">
  <img src="{{ block.settings.image | image_url: width: 150 }}" class="h-[82px] w-[82px] sm:h-[94px] sm:w-[94px] rounded-full object-cover">
</div>

<!-- Warning Badge: -->
<div class="mx-auto mt-8 hidden max-w-[900px] items-center justify-center gap-3 rounded-full border border-[#e8cf81] bg-[#f9f1cf] px-6 py-2.5 text-[15px] font-medium uppercase tracking-[0.08em] text-[#a3704c] lg:flex">
  <span>Always patch test first</span>
</div>
```

---

## 8. Image Pair 07 (`current_07.png` vs `org_08.png`)
**Section Covered:** Massage Ritual block (Step-by-step).

### Visual Discrepancy Analysis
* **Step Cards Grid Spacing:**
  - *Original Next.js:* Desktop has three columns divided by clean lines: `border-r border-brand-forest/10`. Inside padding is `px-6 py-7 sm:px-8 sm:py-8`.
  - *Current Shopify:* Lacks line separators and correct column sizes.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- In the massage steps loops, ensure correct spacing and border separating classes: -->
<div class="hidden border-x border-b border-brand-forest/10 bg-white md:grid md:grid-cols-3">
  {%- for step in section.blocks -%}
    <div class="min-h-[170px] px-6 py-7 sm:min-h-[184px] sm:px-8 sm:py-8 {% unless forloop.last %}border-r border-brand-forest/10{% endunless %}">
      <div class="text-[22px] font-medium leading-none text-brand-forest">{{ step.settings.number }}</div>
      <div class="mt-2 text-[15px] font-medium leading-none text-brand-forest/38">{{ step.settings.title }}</div>
      <p class="mx-auto mt-7 max-w-[270px] text-[14px] leading-[1.35] text-brand-forest/76">{{ step.settings.body }}</p>
    </div>
  {%- endfor -%}
</div>
```

---

## 9. Image Pair 08 (`current_08.png` vs `org_09.png`)
**Section Covered:** "Go deeper" (Information Accordions).

### Visual Discrepancy Analysis
* **Accordion Container Card:**
  - *Original Next.js:* Accordion components are enclosed inside a clean standalone card: `rounded-[16px] bg-white p-2 shadow-[0_8px_28px_rgba(17,48,39,0.05)]`.
  - *Current Shopify:* Accordion items break full-width across the page screen.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- Wrap the accordions inside a card frame in sections/information.liquid: -->
<div class="mx-auto mt-8 max-w-[1460px]">
  <div class="rounded-[16px] bg-white p-2 shadow-[0_8px_28px_rgba(17,48,39,0.05)]">
    <!-- Accordion elements -->
  </div>
</div>
```

---

## 10. Image Pair 09 (`current_09.png` vs `org_10.png`)
**Section Covered:** Full Spectrum / Patented Formulations.

### Visual Discrepancy Analysis
* **US & Japan Patent Badges:**
  - *Original Next.js:* Rectangular green outline cards (`border border-[#6f8e43] rounded-[12px]`) with flag images and gold patent label (`text-[#d2a13f]`).
  - *Current Shopify:* Badges are misaligned, missing borders, or missing flags.
* **Vertical Writing Mode Text:**
  - *Original Next.js:* The text "Rooted in Authentic Ayurveda" is oriented vertically (`[writing-mode:vertical-rl]`) on desktop, separated by a thin white line: `border-l border-white px-2`.
  - *Current Shopify:* Renders as horizontal text, breaking layout.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```liquid
<!-- Use writing-mode in css/tailwind: -->
<div class="flex items-center justify-center border-l border-white px-2">
  <p class="text-center text-[14px] leading-[1.45] text-brand-cream/88 [writing-mode:vertical-rl]">
    Rooted in<br>Authentic Ayurveda.
  </p>
</div>
```

---

## 11. Image Pair 10 (`current_10.png` vs `org_11.png`)
**Sections Covered:** Customer Reviews (Feedback List) & Footer Alignment.

### Visual Discrepancy Analysis
* **Reviews Header Alignment:**
  - *Original Next.js:* Rating numbers and stars are placed on the right side of the review title block on desktop.
  - *Current Shopify:* Reviews header is misaligned.
* **Footer Grid Columns Width:**
  - *Original Next.js:* Grid sizes are explicitly ratio-controlled to look elegant: `lg:grid-cols-[0.74fr_0.98fr_0.9fr_1.06fr]`.
  - *Current Shopify:* Standard equal-width columns that compress the links.
* **Social Follow Us Section:**
  - *Original Next.js:* Social icon buttons (`footer-social`) have smooth hover transitions: `transition hover:opacity-70 hover:translate-y-[-2px]`.
  - *Current Shopify:* Plain static elements.

### Developer Implementation Prompt (Shopify Liquid & CSS)
```css
/* Update sections/footer.liquid grid layout: */
.site-footer__navigation {
  display: grid;
  gap: 2rem;
}
@media (min-width: 1024px) {
  .site-footer__navigation {
    grid-template-columns: 0.74fr 0.98fr 0.9fr 1.06fr;
  }
}
```
