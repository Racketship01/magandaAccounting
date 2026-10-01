import { defineEventHandler, createError } from "h3";
import { getMyProfile } from "../repository/profileRepository";
import { mapPrismaStatus } from "../schemas";

export default defineEventHandler(async (event) => {
  const currentUser = await getMyProfile(event);

  if (!currentUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  const mappedUser = {
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    role: currentUser.role,
    phone: currentUser.phone,
    jobTitle: currentUser.jobTitle,
    nationality: currentUser.nationality,
    department: currentUser.department,
    startDate: currentUser.startDate,
    salary: currentUser.salary,
    currency: currentUser.currency,
    status: mapPrismaStatus(currentUser.status as any),
    address: {
      street: currentUser.street,
      city: currentUser.city,
      state: currentUser.state,
      zipCode: currentUser.zipCode,
    },
    credentials: {
      username: currentUser.user?.username,
      email: currentUser.user?.email,
    },
    profileImage: currentUser.profileImage,
  };

  return { currentUser: mappedUser };
});
