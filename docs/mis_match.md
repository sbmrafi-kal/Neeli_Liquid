Understood. Here is the **clean section-wise UI difference report only for the website/app UI**, excluding browser/macOS/screenshot-frame details.

---

# Section-wise UI differences: Figma vs Current Frontend

## 1. Header / Navigation

### Figma target

* Header is a compact dark-green bar.
* Kerala Ayurveda logo is clearly visible in white at the center.
* Left navigation items are aligned horizontally:

  * `SHOP ALL`
  * `CLINICS`
  * `RESORTS`
  * `HOSPITALS`
  * `ACADEMY`
* Separator lines between nav items are thin and subtle.
* Right-side icons are:

  * Search
  * Account
  * Cart
* Header height is controlled and balanced.

### Current frontend issue

* Header height appears taller than Figma.
* Center logo is barely visible / too dark.
* Logo does not match the white visible Figma logo.
* Nav spacing and vertical alignment differ from Figma.
* Right-side icons appear slightly oversized or more spaced out.

### Required fix

* Make logo white/visible.
* Reduce header height to match Figma.
* Align nav items and icons vertically center.
* Match icon size, spacing, and separator styling.

---

## 2. Breadcrumb

### Figma target

Breadcrumb should be:

`HOME > NEELIBRINGADI KERAM`

* `HOME` is lighter.
* Product name is darker green.
* Breadcrumb appears directly above the product hero section.
* Left aligned with main content container.

### Current frontend issue

* Breadcrumb only shows `HOME`.
* Product name part is missing.
* Missing separator `>`.
* Vertical spacing around breadcrumb differs.

### Required fix

* Add `> NEELIBRINGADI KERAM`.
* Match font size, color, spacing, and left alignment from Figma.

---

## 3. Main Product Hero Layout

### Figma target

* Two-column desktop layout.
* Left column: product image carousel.
* Right column: product information.
* Both columns start at the same vertical level.
* Hero section has balanced spacing between image and product details.

### Current frontend issue

* Overall two-column structure exists, but proportions are wrong.
* Left product media area is broken/cropped.
* Right product content is shifted and oversized.
* The vertical rhythm does not match Figma.
* Some elements that should be inside hero are missing or moved elsewhere.

### Required fix

* Restore Figma two-column proportions.
* Align left and right columns at top.
* Match max-width/container spacing.
* Fix hero section vertical padding.

---

## 4. Product Image Carousel

### Figma target

* Large product image is fully visible.
* Image contains:

  * Text: `One Oil, Complete Win`
  * Product bottle
  * Herbs
  * Amla
  * Coconut
* Image crop is clean and fills the frame.
* Left and right carousel arrows are centered vertically on the image.
* Thumbnail strip sits over the bottom of the image.
* Thumbnail strip has rounded white background and shadow.
* Main image has no vertical slicing/gaps.

### Current frontend issue

* Product image carousel is visibly broken.
* Image appears sliced into vertical strips.
* Large white gaps appear between image portions.
* Hero image text is partially cut off.
* Product bottle and ingredients are not fully visible.
* Thumbnail strip exists but is positioned over a broken/cropped image.
* Image aspect ratio and crop do not match Figma.

### Required fix

* Fix carousel image rendering/object-fit.
* Use correct image aspect ratio.
* Remove vertical white strip artifacts.
* Ensure full Figma hero image is visible.
* Match thumbnail size, position, radius, and shadow.
* Match arrow position, circle size, and opacity.

---

## 5. Product Image Stats Bar

### Figma target

Stats below product image should show:

1. `4.64★`
   `Ratings`

2. `1200+`
   `Reviews`

3. `30`
   `Uses/per bottle`

4. `40,000+`
   `Bought last year`

* Dark green background.
* Four equal columns.
* Thin dividers.
* Rectangular bar attached to bottom of image.
* Typography is compact and white/cream.

### Current frontend issue

Current stats show different content:

1. `1945`
   `Established`

2. `350+`
   `Products`

3. `Clinics & Academy`
   `Expert led`

4. `40,000+`
   `Bought last year`

Other issues:

* Wrong stats content.
* First three product-specific stats are missing.
* Bar has rounded lower corners, unlike Figma.
* Text size and alignment differ.
* Circular placeholder icons appear above the text, not in Figma.

### Required fix

* Replace current stats with Figma stats.
* Remove circular icon placeholders.
* Use Figma text:

  * `4.64★ Ratings`
  * `1200+ Reviews`
  * `30 Uses/per bottle`
  * `40,000+ Bought last year`
* Match bar height, dividers, typography, and border radius.

---

## 6. Product Claim Badge

### Figma target

Single-line pill:

`• MINIMIZES HAIR FALL • SUPPORTS HAIR GROWTH`

* Horizontally aligned.
* Compact height.
* Cream background.
* Thin muted border.
* Text is uppercase, dark green.
* Positioned above product title, aligned with product details column.

### Current frontend issue

* Badge is split into two lines:

  * `• MINIMIZES HAIR FALL`
  * `• SUPPORTS HAIR GROWTH`
* Pill is too tall.
* Pill is centered rather than aligned as in Figma.
* Width and padding do not match Figma.

### Required fix

* Make badge one line.
* Match Figma width, height, padding, border, background, and text spacing.
* Align to product info column start.

---

## 7. Product Title

### Figma target

Text:

`Neelibringadi Keram`

* Elegant serif font.
* Medium-large size.
* Dark green.
* Balanced line-height.
* Positioned close below claim badge.

### Current frontend issue

* Title is much larger than Figma.
* Vertical spacing from badge and subtitle differs.
* Font rendering/weight appears different.

### Required fix

* Reduce title font size.
* Match Figma font family, weight, color, and line-height.
* Match top/bottom spacing.

---

## 8. Product Subtitle

### Figma target

Text:

`One oil for complete hair recovery`

* Italic or softer serif style.
* Dark muted green.
* Sits closely below product title.

### Current frontend issue

* Subtitle is less italic/styled than Figma.
* Font size and spacing differ.
* It appears more separated from the title.

### Required fix

* Match italic styling.
* Match color, size, and line-height.
* Reduce spacing to match Figma.

---

## 9. Product Description

### Figma target

Text:

`Hair recovery needs two wins - reduce the fall and support new growth. Most oils address one. Neelibringadi works both sides.`

* Medium gray text.
* Compact paragraph width.
* Good line-height.
* Positioned under subtitle.

### Current frontend issue

* Text content mostly matches.
* Paragraph width and line breaks differ.
* Text appears smaller/lighter.
* Spacing from subtitle differs.

### Required fix

* Match width, font size, color, and line-height.
* Match spacing above and below paragraph.

---

## 10. Size / Variant Selector

### Figma target

Two selectable price cards are visible:

Card 1:

* `100 ml`
* `M.R.P. ₹215 ₹350`

Card 2:

* `200 ml`
* `M.R.P. ₹315 ₹350`

Design:

* Rounded rectangular border.
* Two cards side by side.
* Dark green border.
* Active/selected state should be clear.
* Price text is bold.
* Original price `₹350` is muted and struck-through.

### Current frontend issue

* Entire size selector is missing.
* No `100 ml` option visible.
* No `200 ml` option visible.
* Product detail area has no selectable pricing cards.

### Required fix

* Add both size selector cards.
* Match Figma text exactly.
* Match border radius, padding, gap, typography, active state, and strikethrough price.

---

## 11. Delivery Info Row

### Figma target

Text:

`Free delivery on orders over ₹299 | [truck icon] 2-4 days delivery`

* Proper small truck icon.
* Thin separator.
* Gray/muted text.
* Positioned below size selector.

### Current frontend issue

* Delivery row uses emoji-style icons.
* It appears in the wrong location because size selector is missing.
* Text size and icon style do not match Figma.

### Required fix

* Replace emoji with proper icon.
* Place below size selector.
* Match color, font size, icon size, and separator spacing.

---

## 12. Testimonial Quote Box

### Figma target

Quote:

`"Hair fall reduced noticeably, and I can already see tiny baby hairs coming"`

Name:

`- ANU R., CHENNAI`

* Pale cream/yellow background.
* Soft rounded rectangle.
* No heavy left accent bar.
* Compact height.
* Text is italic for quote.
* Name is uppercase/bold muted text.

### Current frontend issue

* Quote box has a strong yellow left vertical border.
* Background and padding differ.
* Text appears smaller/lighter.
* Width and vertical spacing do not match Figma.

### Required fix

* Remove or reduce left accent bar.
* Match Figma background, radius, padding, width, text style, and spacing.

---

## 13. “How Neelibringadi Keram works” Text Block

### Figma target

Heading:

`How Neelibringadi Keram works`

Paragraph:

`Neeli cools scalp inflammation that weakens follicles. Bhringaraja activates dormant roots. Amla fortifies the shaft from within. The triple-milk base carries all three deeper than a standard oil carrier - processed over eleven days to bind the herbal essence to the oil.`

* Heading is dark green, semi-bold.
* Paragraph is gray, readable.
* Simple text block only.
* No large certification card inside this section.

### Current frontend issue

* Heading and paragraph exist.
* Typography is smaller/tighter than Figma.
* A large certification/icon container appears below this text inside the hero area.
* Certification strip is in the wrong place.

### Required fix

* Match heading and paragraph typography.
* Remove certification card from hero details area.
* Move certification strip to correct location below sticky cart.

---

## 14. Sticky Add-to-Cart Bar

### Figma target

* Full-width brown sticky bar.
* Left side:

  * Large white rounded button.
  * Cart icon.
  * Text: `ADD TO CART`
* Right side:

  * `M.R.P. ₹315 ₹350`
  * `Inclusive of all taxes`
* Price is clearly visible.
* Text aligns to right.
* Button and price are vertically centered.

### Current frontend issue

* Sticky bar exists.
* Add to cart button is similar but not exact.
* Right side shows:

  * `M.R.P.`
  * `Inclusive of all taxes`
* Actual price `₹315 ₹350` is missing or not visible.
* Button size/radius differs.
* Sticky bar overlaps or appears too close to next content.

### Required fix

* Add visible `₹315 ₹350`.
* Match button width, height, icon size, border radius, and typography.
* Match sticky bar height and right price alignment.
* Ensure next section starts with proper spacing below sticky bar.

---

## 15. Sticky Cart Alternate States

### Figma target includes four cart-state designs:

1. No product in cart:

   * `ADD TO CART`
   * Price on right.

2. Only other products in cart:

   * Small cart icon button.
   * `Add to cart` button.
   * Price on right.

3. Only same PDP product in cart:

   * Quantity stepper `- 1 +`
   * Cart button with count.
   * `View cart`
   * Price on right.

4. Both other products and same product in cart:

   * Quantity stepper.
   * Cart count.
   * `View cart`
   * Price on right.

### Current frontend issue

* Only the basic add-to-cart state is visible.
* Other cart states are not shown in implementation screenshots.
* Quantity stepper is missing.
* View cart button state is missing.
* Cart count state is missing.

### Required fix

* Implement all four sticky cart states.
* Match Figma layout, spacing, button sizes, icons, count badge, and price alignment.

---

## 16. Certification / Trust Strip

### Figma target

Position:

* Immediately below sticky cart bar.

Design:

* Centered white rounded rectangular strip.
* Contains:

  * AYUSH icon
  * ISO icon
  * GMP icon
  * FDA icon
  * `1945 ESTABLISHED`
  * `350+ PRODUCTS`
  * `Clinics & Academy EXPERT LED`
* Thin vertical dividers.
* Icons and text have balanced sizing.

### Current frontend issue

* Certification appears inside the hero section instead of below sticky cart.
* It appears as a large empty white card with small circular icons.
* Text labels are missing.
* Certification facts are incorrectly mixed into the product image stats bar.
* Layout does not match Figma strip.

### Required fix

* Move certification strip below sticky cart.
* Restore all certification icons and text.
* Use one compact horizontal white card.
* Add dividers and correct typography.
* Remove these values from product image stats.

---

## 17. Ritual Guide Strip

### Figma target

Position:

* Below certification strip.

Content:

* Sun icon.
* Heading:

  * `THE RITUAL GUIDE`
* Instruction:

  * `Warm slightly. Massage into roots. Leave for 30 - 60mins. Use two to three times a week.`

Design:

* Pale cream background.
* Thin yellow/gold border.
* Center aligned.
* Compact vertical height.

### Current frontend issue

* This compact Ritual Guide strip is missing.
* Instruction text is not shown in this location.
* Current page jumps to other sections instead.

### Required fix

* Add Ritual Guide strip after certification strip.
* Match background, border, icon, heading, text, alignment, and spacing.

---

## 18. Section Order

### Figma target order after hero/sticky cart

Correct order should be:

1. Certification strip
2. Ritual Guide strip
3. What to Expect / Honest Sequence
4. Add Internal Support upsell
5. What’s in it. What is not.
6. Key Ingredients
7. Secret Base
8. Massage Ritual
9. Patch Test popup/interaction
10. Information / Go deeper
11. Feedback / Customer Reviews
12. Credentials / Footer

### Current frontend order

Current visible order is closer to:

1. Sticky cart
2. Key Ingredients
3. Secret Base
4. What’s in it. What is not.
5. What to Expect
6. Massage Ritual
7. Information / Go deeper
8. Reviews
9. Credentials / Footer

### Required fix

Reorder sections to match Figma exactly.

---

## 19. What to Expect / Honest Sequence Banner

### Figma target

* Dark green full-width banner.
* Top label:

  * `WHAT TO EXPECT`
* Main heading:

  * `The honest sequence.`
* Subtitle:

  * `Root strength comes before visible density.`
* Banner is compact and centered.

### Current frontend issue

* Section appears too late.
* Banner height and spacing differ.
* Text scale differs.
* It appears after “What’s in it” instead of before it.

### Required fix

* Move section to correct position after Ritual Guide.
* Match banner height, typography, spacing, and background color.

---

## 20. What to Expect Timeline

### Figma target

Three compact columns:

Column 1:

* Top label: `FIRST TIME`
* Image: oil on hair
* Eyebrow: `FIRST APPLICATION`
* Heading: `Scalp cools immediately`
* Body: `The Neeli acts immediately. Oil absorbs without heaviness.`

Column 2:

* Top label: `WEEK 2-3`
* Image: hair fall in hand
* Eyebrow: `~ 8 USES`
* Heading: `Less in the shower`
* Body: `Fall reduction is the first signal. The follicle is strengthening.`

Column 3:

* Top label: `MONTH 3+`
* Image: scalp before/after
* Eyebrow: `~ 36 USES`
* Heading: `Visible change`
* Body: `Three months completes a cycle. Visible density increase at the crown.*`

Footer notes:

* `*Based on consistent use as directed. Individual results may vary.`
* `In cooler weather the coconut oil base may solidify - warm the oil before use.`

### Current frontend issue

* Timeline section is much larger/taller.
* Top labels are oversized.
* Images are larger and crop differently.
* Column headings are much larger.
* Column 3 heading differs:

  * Current: `Continued improvement - visible change`
  * Figma: `Visible change`
* Current body text misses the `*` after crown.
* Section has too much vertical spacing.
* Column dividers and layout scale do not match Figma.

### Required fix

* Reduce section scale.
* Match Figma column width and image height.
* Change third heading to `Visible change`.
* Add `*` at end of crown sentence.
* Match notes placement, font size, and spacing.

---

## 21. Add Internal Support Upsell

### Figma target

Position:

* Immediately after What to Expect timeline.

Content:

* Heading:

  * `Add internal support`
* Brown horizontal product bar.
* Product image on left.
* Product name:

  * `Bhringarajasava- 450ml`
* Product description:

  * `Fermented herbal brew for hair growth from within.`
* Right button:

  * `+ ₹225`

### Current frontend issue

* Entire section is missing.
* No upsell card/bar appears after the timeline.
* No product image or price button.

### Required fix

* Add this section in correct position.
* Match Figma background, brown bar, image size, text, price button, padding, and radius.

---

## 22. “What’s in it. What is not.” Section

### Figma target

Position:

* After Add Internal Support.
* Before Key Ingredients.

Heading:
`What’s in it. What is not.`

Left positive card:

* Pale green background.
* Border.
* Three positive items:

  1. `100% NATURAL INGREDIENTS`
  2. `TRIPLE-MILK BASE`
  3. `TRADITIONAL FORMULATION`
* Uses circular illustrated icons with green check marks.

Right negative card:

* Pale pink/cream background.
* Border.
* Four negative items:

  1. `NO PARABENS`
  2. `NO ARTIFICIAL FRAGRANCE`
  3. `NO SYNTHETIC COLORS`
  4. `NO MINERAL OIL`
* Uses red X icons.

### Current frontend issue

* Section is in wrong order.
* Left card is white instead of pale green.
* Right card is solid brown instead of pale pink/cream.
* Left card only has 2 items.
* Missing positive item:

  * `TRADITIONAL FORMULATION`
* Current second positive item text differs:

  * Current: `TRIPLE-MILK AND SESAME OIL BASE`
  * Figma: `TRIPLE-MILK BASE`
* Right card only has 2 items.
* Missing negative items:

  * `NO SYNTHETIC COLORS`
  * `NO MINERAL OIL`
* Icons are simplified and do not match Figma illustrated icon style.
* Card proportions, padding, and colors differ.

### Required fix

* Move section to correct position.
* Restore all 3 positive items.
* Restore all 4 negative items.
* Use exact Figma copy.
* Match card colors, borders, radius, icon style, spacing, and layout.

---

## 23. Key Ingredients Section

### Figma target

Position:

* After “What’s in it. What is not.”

Heading:
`Key Ingredients`

Four cards:

1. `Bringaraj`

   * Subtitle: `False Daisy`
   * Description: `Supports hair growth. Activates follicles and increases scalp circulation.`

2. `Amla`

   * Subtitle: `False Daisy`
   * Description: `Minimizes hair fall. Strengthens the hair shaft with natural Vitamin C.`

3. `Neeli`

   * Subtitle: `False Daisy`
   * Description: `Cools and recovers. Reduces scalp inflammation and promotes regrowth.`

4. `Keram`

   * Subtitle: `False Daisy`
   * Description: `Deep nourishment. Traditional carrier that mimics natural scalp lipids.`

Design:

* Four compact cards.
* Image on top.
* White text area below.
* Consistent image heights.
* Moderate border radius.
* Equal gutters.

### Current frontend issue

* Section appears too early.
* Cards are too large.
* Card spacing differs.
* Card 4 title is wrong:

  * Current: `Coconut oil`
  * Figma: `Keram`
* All subtitles are wrong:

  * Current: `For scalp health`
  * Figma: `False Daisy`
* Card descriptions are similar but not exact in some places.
* Image crop and card height differ.
* Heading spacing differs.

### Required fix

* Move section after “What’s in it.”
* Change card 4 title to `Keram`.
* Change all subtitles to `False Daisy`.
* Match Figma card dimensions, image crop, radius, typography, and spacing.

---

## 24. Secret Base Section

### Figma target

Position:

* After Key Ingredients.

Heading:

* `THE SECRET BASE`
* `Three milks. One complete formula.`
* `Three nourishing milks work together for a healthier scalp and stronger, smoother hair.`

Cards in this order:

1. `Coconut milk`

   * `Nourishes and moisturizes the scalp.`

2. `Goat milk`

   * `Addresses dandruff and improves hair texture.`

3. `Cow milk`

   * `Controls hair fall and promotes hair growth.`

Design:

* Three compact cream cards.
* Circular illustrated icon at top.
* Equal spacing.
* No excessive shadows.
* Section height is compact.

### Current frontend issue

* Section appears before “What’s in it”, wrong order.
* Card order is wrong:

  * Current: Coconut, Cow, Goat
  * Figma: Coconut, Goat, Cow
* Card descriptions differ:

  * Current Coconut: `Rich in lauric acid, nourishes and moisturizes the scalp.`
  * Figma Coconut: `Nourishes and moisturizes the scalp.`
  * Current Cow: `Carries the herbal extract deep into the follicles.`
  * Figma Cow: `Controls hair fall and promotes hair growth.`
  * Current Goat: `The most easily absorbed milk, addresses dandruff.`
  * Figma Goat: `Addresses dandruff and improves hair texture.`
* Cards are larger with more spacing/shadow.
* Patch test button appears under this section, but Figma shows patch-test popup separately.

### Required fix

* Move section after Key Ingredients.
* Reorder cards to Coconut, Goat, Cow.
* Replace descriptions with Figma text.
* Match card size, shadow, background, icon size, spacing, and section height.
* Remove patch-test button from this location unless it belongs to the designed interaction.

---

## 25. Massage Ritual Hero Section

### Figma target

Position:

* Immediately after Secret Base.

Layout:

* Large horizontal split hero.
* Left side:

  * Text: `Your Easy Massage Ritual`
* Right side:

  * Image of massage ritual with product.
* Image and text form one continuous banner.
* Below image are 3 steps.

### Current frontend issue

* Massage Ritual appears after What to Expect instead of after Secret Base.
* The hero banner exists and is visually close but section order is wrong.
* The crop/position of image differs.
* Left text size and placement differ.
* Banner width and margins differ from Figma.

### Required fix

* Move Massage Ritual directly after Secret Base.
* Match image crop, banner width, left text placement, and section spacing.

---

## 26. Massage Ritual Steps

### Figma target

Three steps below ritual hero:

Step 1:

* `1`
* `WARM`
* `Warm oil penetrates - cold oil sits on the surface.`

Step 2:

* `2`
* `APPLY`
* `Apply adequate amount gently onto the scalp and hair`

Step 3:

* `3`
* `MASSAGE`
* `Circular motion, 5 minutes. Fingertips, not nails.`

Design:

* Three equal columns.
* Thin vertical dividers.
* Step numbers in green.
* Step labels uppercase.
* Body text black/dark gray.
* Compact height.

### Current frontend issue

* Steps are present.
* Spacing is taller than Figma.
* Text positioning differs.
* Step body text appears lighter/greenish compared to Figma.
* Column dividers and vertical rhythm differ.

### Required fix

* Match Figma column height, text colors, typography, and divider positions.
* Ensure exact body copy and line breaks.

---

## 27. Patch Test Interaction / Popup

### Figma target

There is a separate popup/state:

Heading:
`Always patch test- pop up`

Brown box text:
`Apply a small amount behind the ear or on the inner elbow. Wait 24-48 hours. If no redness or irritation appears, proceed with regular use`

Design:

* Brown rounded rectangle.
* White text.
* Popup/card appears as a designed interaction.

### Current frontend issue

* Only a small `Always patch test first` button appears.
* Popup state is not visible.
* Popup copy does not appear.
* Button location differs from expected interaction.
* Popup styling is missing.

### Required fix

* Implement popup/tooltip state.
* On clicking `Always patch test first`, show the brown popup/card.
* Use exact Figma text.
* Match popup width, background, radius, padding, and typography.

---

## 28. Information / Go Deeper Section

### Figma target

Position:

* After Massage Ritual and patch-test section.

Heading:

* Eyebrow: `INFORMATION`
* Main: `Go deeper.`

Accordion rows:

1. `Full ingredient list`
2. `Preparation - 7 days`
3. `Safety & Interactions`
4. `Frequently asked`

Design:

* Light cream section background.
* White accordion card.
* Moderate width.
* Rounded corners.
* Thin row dividers.
* Arrow icon at right.
* Typography is refined serif.

### Current frontend issue

* Section exists and is close.
* Width and spacing differ.
* Accordion rows appear taller/larger.
* Section background and vertical padding differ.
* Text style may be larger/darker than Figma.
* Position depends on wrong section order above.

### Required fix

* Keep content, but match Figma width, row height, radius, padding, arrow placement, typography, and section spacing.
* Ensure position follows Massage Ritual section.

---

## 29. Customer Reviews Section

### Figma target

Position:

* After Information section.

Heading:

* Eyebrow: `FEEDBACK`
* Main: `Customer Reviews`

Right rating:

* Star icons
* `4.64 / 5.0`

Reviews:

1. `ANJALI K.`

   * 5 stars
   * `Verified Purchase`
   * Quote:
     `"Excellent for postpartum hair fall. Within a month, the amount of hair on my brush was noticeably less. The routine is easy to keep up."`

2. `ROHAN S.`

   * 5 stars
   * `Verified Purchase`
   * Quote:
     `"Started using it for early greying. Two months in, the texture has improved and the earthy smell has grown on me. No heaviness."`

Button:
`READ ALL 86 REVIEWS`

### Current frontend issue

* Reviews section partially appears.
* It is positioned after current Information section, but upstream order is wrong.
* Some content appears clipped in screenshots.
* Rating is visible but may not align like Figma.
* Need verification that both review cards, quotes, stars, and CTA match exactly.

### Required fix

* Match Figma layout:

  * centered heading
  * rating block on right
  * two review columns
  * verified purchase alignment
  * review button centered
* Ensure exact quote text and names.
* Match star color, font sizes, spacing, and button style.

---

## 30. Credentials / Footer Top Section

### Figma target

Large credentials block:

* Left: rectangular image of plant held in hand.
* Middle dark-green block with two stacked text sections:

  1. `FULL SPECTRUM`

     * `Classical and Proprietary Ayurvedic Products (350+ SKUs) | Therapies and Ayurvedic Retreats | Academy and Education Initiatives | Pioneering Ayurvedic R&D`
  2. `Globally Recognized`

     * `PATENTED FORMULATIONS`
     * `Kerala Ayurveda has carried forward classical Ayurvedic wisdom for modern wellness rituals.`
* Right dark-green block:

  * `ka` logo
  * `Rooted in Authentic Ayurveda.`

Design:

* Three-column layout.
* Middle has horizontal divider.
* Right block has centered logo and text.
* Image occupies left column only.

### Current frontend issue

* Footer credentials section is significantly different.
* Current design uses the plant image as a large background-like image.
* Text overlays directly on the image:

  * `Our credentials`
  * `PATENTED FORMULATIONS`
* Figma does not have this overlay style.
* `FULL SPECTRUM` section is missing.
* Middle stacked dark-green text block is missing.
* Right `ka` logo area exists but content differs:

  * Current: `CERTIFIED Quality seal`
  * Figma: `Rooted in Authentic Ayurveda.`
* Layout proportions differ greatly.
* Image crop differs; current image is huge and extends differently.

### Required fix

* Replace current credentials layout with Figma three-column layout.
* Add missing `FULL SPECTRUM` block.
* Remove overlay text from image.
* Restore middle dark-green text block and divider.
* Change right block copy to `Rooted in Authentic Ayurveda.`
* Match `ka` logo size, position, and color.
* Match image crop and column proportions.

---

## 31. Main Footer Links

### Figma target

Footer columns:

Left:

* Kerala Ayurveda logo.

Column 1 heading:
`Quick Links`

* About Kerala Ayurveda
* Clinics
* Ayurveda Academy
* Investors
* Research & Development
* Careers
* Blogs
* Our Editorial Team
* Contact Us

Column 2 heading:
`Policies`

* Terms Of Use
* Privacy Policy
* Shipping And Delivery Policy
* Return/Cancellation Policy
* FAQs

Column 3 heading:
`Our Network`

* Ayurvedagram Bengaluru
* Ayurvedagram Bali
* The Health Village
* Kerala Ayurveda India - Academy
* Kerala Ayurveda USA - Store
* Kerala Ayurveda USA - Wellness
* Kerala Ayurveda USA - Academy

Social row:

* `Follow Us`
* Facebook
* X
* Instagram
* YouTube
* LinkedIn

Bottom text:

* `The Proprietary Kerala Ayurveda Formulation.`
* `This Is One Of Them.`

Bottom botanical border pattern.

### Current frontend issue

* Footer columns exist but content differs.
* Current `Policies` column includes extra items that belong to Quick Links:

  * Careers
  * Blogs
  * Our Editorial Team
* `Contact Us` appears missing from Quick Links.
* Social row is missing.
* Horizontal divider above social row is missing.
* Bottom botanical pattern is different:

  * Current uses a sparse grass-like line pattern.
  * Figma uses detailed botanical leaf pattern.
* Footer spacing is much larger/emptier.
* Logo position and size differ.

### Required fix

* Match footer links exactly to Figma.
* Remove extra duplicated links from Policies.
* Add missing `Contact Us`.
* Add social row with icons.
* Add horizontal divider lines.
* Replace bottom pattern with Figma botanical leaf border.
* Match footer spacing, logo size, columns, typography, and alignment.

---

# High-priority implementation checklist

## Critical missing elements

1. Product size selector cards.
2. Ritual Guide strip.
3. Add Internal Support upsell.
4. Full positive/negative ingredient claims.
5. Patch-test popup.
6. Correct credentials footer layout.
7. Social links row.
8. Correct cart state variants.

## Critical wrong content

1. Product image stats are wrong.
2. Key Ingredients card 4 should be `Keram`, not `Coconut oil`.
3. Ingredient subtitles should be `False Daisy`, not `For scalp health`.
4. Secret Base order should be Coconut, Goat, Cow.
5. Secret Base descriptions do not match.
6. What’s In / What Is Not cards are missing multiple items.
7. Timeline third heading should be `Visible change`.
8. Footer right credentials copy should be `Rooted in Authentic Ayurveda.`

## Critical wrong layout/order

1. Sections are in wrong order.
2. Certification strip is in wrong place.
3. Key Ingredients appears too early.
4. Secret Base appears too early.
5. What to Expect appears too late.
6. Credentials/footer layout is completely different from Figma.

## Critical visual mismatches

1. Broken product carousel image.
2. Header logo visibility.
3. Claim badge wrapping into two lines.
4. Product title too large.
5. Timeline section too oversized.
6. “What’s in it” card colors and icons are wrong.
7. Credentials section structure is wrong.
8. Footer pattern and social row are wrong.
