import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import {
  defineEventHandler,
  readBody,
  createError,
  toWebRequest,
} from "h3";
import userSession from "../../../../auth/server/utils/userSession";

const ALLOWED_PATH_PREFIXES = ["avatars/"];
const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export default defineEventHandler(async (event) => {
  const user = await userSession(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const body = (await readBody(event)) as HandleUploadBody;

  return await handleUpload({
    body,
    request: toWebRequest(event),
    onBeforeGenerateToken: async (pathname) => {
      if (!ALLOWED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
        throw new Error("Invalid upload path");
      }

      return {
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
        maximumSizeInBytes: MAX_UPLOAD_BYTES,
        addRandomSuffix: true,
      };
    },
  });
});
