// Prompt to paste into an AI chat together with a photo of a part.
// Its JSON answer can be pasted into "Import from AI" on the add part page.
export const IMPORT_PROMPT = `I'm sending you a photo of an electronic part from my inventory.
Identify it and reply with only this JSON, no other text:

{
  "name": "exact model plus a short type, e.g. SSD1306 OLED display 0.96\\"",
  "description": "one or two sentences on what it is and what it's used for",
  "labels": ["2 to 4 short labels, e.g. screen, sensor, cable, I2C"],
  "cost": null,
  "quantity": 1,
  "image_url": ""
}

Rules:
- If you can't read the exact model, give the general type and say so in the description.
- Leave "image_url" empty unless you are sure the link is a working, direct image link.
- Use null for "cost" unless the price is visible in the photo.`;
