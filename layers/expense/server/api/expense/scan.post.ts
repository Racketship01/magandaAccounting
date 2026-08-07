import { defineEventHandler, readBody, createError } from "h3";
import { openAiService } from "../../services/ai-service";
import ReceiptResponseSchema from "../../schemas";
import { zodResponseFormat } from "openai/helpers/zod";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.image) {
    throw createError({
      statusCode: 400,
      statusMessage: "No receipt image provided",
    });
  }

  // Ensure we strip the data URL prefix (e.g. "data:image/jpeg;base64,") if present
  const base64Image = body.image.includes(",")
    ? body.image.split(",")[1]
    : body.image;

  try {
    const response = await openAiService.openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast, accurate, and cost-effective for vision tasks
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this receipt image and extract the merchant name, total transaction amount, and the purchase date.",
            },
            {
              type: "image_url",
              image_url: {
                // OpenAI accepts base64 images directly inside data URLs
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      // Use Structured Outputs to guarantee the shape of the result
      response_format: zodResponseFormat(ReceiptResponseSchema, "receipt"),
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No data returned from OpenAI");
    }
    // Since we used response_format, the content is guaranteed to match ReceiptResponseSchema
    return JSON.parse(content);
  } catch (error: any) {
    console.error("OpenAI OCR Scan Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to process receipt image.",
    });
  }
});
