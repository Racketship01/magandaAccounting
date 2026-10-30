import { d as defineEventHandler, r as readBody, c as createError } from '../../../_/nitro.mjs';
import OpenAI from 'openai';
import { R as ReceiptResponseSchema } from '../../../_/schemas2.mjs';
import { zodResponseFormat } from 'openai/helpers/zod';
import '@adonisjs/hash';
import '@adonisjs/hash/drivers/scrypt';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'node:events';
import 'ioredis';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:fs';
import 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const openAiService = {
  openai
};

const scan_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.image)) {
    throw createError({
      statusCode: 400,
      statusMessage: "No receipt image provided"
    });
  }
  const base64Image = body.image.includes(",") ? body.image.split(",")[1] : body.image;
  try {
    const response = await openAiService.openai.chat.completions.create({
      model: "gpt-4o-mini",
      // Fast, accurate, and cost-effective for vision tasks
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this receipt image and extract the merchant name, total transaction amount, and the purchase date."
            },
            {
              type: "image_url",
              image_url: {
                // OpenAI accepts base64 images directly inside data URLs
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      // Use Structured Outputs to guarantee the shape of the result
      response_format: zodResponseFormat(ReceiptResponseSchema, "receipt")
    });
    const content = (_b = (_a = response.choices[0]) == null ? void 0 : _a.message) == null ? void 0 : _b.content;
    if (!content) {
      throw new Error("No data returned from OpenAI");
    }
    return JSON.parse(content);
  } catch (error) {
    console.error("OpenAI OCR Scan Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to process receipt image."
    });
  }
});

export { scan_post as default };
//# sourceMappingURL=scan.post.mjs.map
