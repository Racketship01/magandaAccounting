import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    //const prisma = usePrisma();

    const { email, password, username } = await readBody(event);

    console.log("Attempting to create user with email:", email);

    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    console.log("User created successfully:", user);

    return {
      user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create user",
      data: error,
    });
  }
});
