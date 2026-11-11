import { defineEventHandler, createError } from "h3";
import { getMyProfile, mapCurrentUser } from "../repository/profileRepository";

export default defineEventHandler(async (event) => {
  const currentUser = await getMyProfile(event);

  if (!currentUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  return { currentUser: mapCurrentUser(currentUser) };
});
