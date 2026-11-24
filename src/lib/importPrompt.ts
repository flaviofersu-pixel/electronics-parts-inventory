// Prompt to paste into an AI chat together with a photo of a part.
// Its JSON answer can be pasted into "Import from AI" on the add part page.
export const IMPORT_PROMPT = `I'm sending you a photo of an electronic part from my inventory.
Identify it, then search Dutch webshops (for example bitsandparts.nl, tinytronics.nl,
kiwi-electronics.com, elektronicavoorjou.nl) for the same part.
Reply with only this JSON, no other text:

{
  "name": "exact model plus a short type, e.g. SSD1306 OLED display 0.96\\"",
  "description": "one or two sentences on what it is and what it's used for",
  "labels": ["2 to 4 short labels, e.g. screen, sensor, cable, I2C"],
  "cost": 4.95,
  "quantity": 1,
  "image_url": "https://direct-link-to-the-product-photo.jpg"
}

Rules:
- If you can't read the exact model, give the general type and say so in the description.
- "cost" is the price per piece in euro including VAT from a Dutch webshop, as a number.
  Use null if you can't find the same part in a Dutch shop.
- "image_url" is a direct link to that shop's product photo (ending in .jpg, .png or .webp).
  Use "" if you can't find one. Never make up a link.
- Name the shop you used at the end of the description, e.g. "Price from Bits & Parts."`;
