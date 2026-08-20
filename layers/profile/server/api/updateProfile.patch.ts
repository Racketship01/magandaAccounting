import { defineEventHandler, readBody, createError, H3Error } from "h3";
import { updateMyProfile } from "../repository/profileRepository";
import { updateProfileSchema } from "../schemas";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing employee information",
    });
  }

  const result = updateProfileSchema.safeParse(body);

  if (!result.success) {
    console.error("Profile update validation failed:", result.error.flatten());
    throw createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: result.error.flatten().fieldErrors,
    });
  }

  const profileInput = result.data;

  try {
    const profile = await updateMyProfile(event, profileInput);

    if (!profile) {
      throw createError({
        statusCode: 404,
        statusMessage: "Profile not found",
      });
    }
    return { profile };
  } catch (error: any) {
    console.error("Profile update error:", error);
    if (error instanceof H3Error) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: error?.message || "Internal Server Error",
    });
  }
});
