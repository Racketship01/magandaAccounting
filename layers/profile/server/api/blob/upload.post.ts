import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { defineEventHandler, readBody, createError, toWebRequest } from "h3";
import userSession from "../../../../auth/server/utils/userSession";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default defineEventHandler(async (event) => {
  const user = await userSession(event);
  if (!user) throw createError({ statusCode: 401 });

  const body = (await readBody(event)) as HandleUploadBody;

  return await handleUpload({
    body,
    request: toWebRequest(event),
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: IMAGE_TYPES,
      maximumSizeInBytes: 5 * 1024 * 1024,
      addRandomSuffix: true,
    }),
  });
});
