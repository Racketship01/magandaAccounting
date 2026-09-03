import { prisma } from "../../../../prisma/utils/prisma";
import type {
  User,
  Employee,
  Admin,
} from "../../../../prisma/generated/prisma/client";
import userSession from "../../../auth/server/utils/userSession";
import { type UpdateProfileSchema, mapStatus } from "../schemas";

export async function getMyProfile(
  event: any,
): Promise<Partial<Employee> | (Partial<Admin> & { user: User })> {
  const user = await userSession(event);

  const profile = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      employees: true,
      admin: true,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const buildProfileImage = (
    firstName: string,
    lastName: string,
    existing?: string | null,
  ) => {
    if (existing && existing.trim() !== "") return existing;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}+${encodeURIComponent(lastName)}&background=random&color=fff`;
  };

  if (profile.admin && profile.admin.length > 0) {
    const admin = profile.admin[0];
    return {
      ...admin,
      profileImage: buildProfileImage(
        admin?.firstName || "",
        admin?.lastName || "",
        admin?.profileImage || "",
      ),
      user: profile,
    };
  } else if (profile.employees && profile.employees.length > 0) {
    const employee = profile.employees[0];
    return {
      ...employee,
      profileImage: buildProfileImage(
        employee?.firstName || "",
        employee?.lastName || "",
        employee?.profileImage || "",
      ),
      user: profile,
    };
  }

  return profile;
}

export async function updateMyProfile(
  event: any,
  profileInput: UpdateProfileSchema,
): Promise<Partial<Employee> | (Partial<Admin> & { user: User })> {
  const userSessionData = await userSession(event);

  const profile = await prisma.user.findFirst({
    where: {
      id: userSessionData.id,
    },
    include: {
      employees: true,
      admin: true,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const userUpdateData: {
    username: string;
    email?: string;
    password?: string;
  } = {
    username: profileInput.credentials.username,
  };

  if (
    profileInput.credentials.email &&
    profileInput.credentials.email.trim() !== ""
  ) {
    userUpdateData.email = profileInput.credentials.email;
  }

  const hasNewPassword =
    profileInput.credentials.newPassword &&
    profileInput.credentials.newPassword.trim() !== "";
  const hasOldPassword =
    profileInput.credentials.password &&
    profileInput.credentials.password.trim() !== "";

  if (hasNewPassword) {
    if (!hasOldPassword) {
      throw new Error("Current password is required to set a new password");
    }

    const isPasswordValid = await verifyPassword(
      profile.password,
      profileInput.credentials.password!,
    );

    if (!isPasswordValid) {
      throw new Error("Current password is not valid");
    }

    const newHashedPassword = await hashPassword(
      profileInput.credentials.newPassword!,
    );
    userUpdateData.password = newHashedPassword;
  }

  if (profile.admin && profile.admin.length > 0) {
    const adminRecord = profile.admin[0];
    const admin = await prisma.admin.update({
      where: {
        id: adminRecord?.id,
      },
      data: {
        firstName: profileInput.firstName,
        lastName: profileInput.lastName,
        phone: profileInput.phone,
        jobTitle: profileInput.jobTitle,
        department: profileInput.department,
        startDate: profileInput.startDate,
        salary: profileInput.salary,
        currency: profileInput.currency,
        status: mapStatus(profileInput.status),
        profileImage: profileInput.profileImage ?? undefined,
        street: profileInput.address.street,
        city: profileInput.address.city,
        state: profileInput.address.state,
        zipCode: profileInput.address.zipCode,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: profile.id,
      },
      data: userUpdateData,
    });

    return {
      ...admin,
      user: updatedUser,
    };
  } else if (profile.employees && profile.employees.length > 0) {
    const employeeRecord = profile.employees[0];
    const employee = await prisma.employee.update({
      where: {
        id: employeeRecord?.id,
      },
      data: {
        firstName: profileInput.firstName,
        lastName: profileInput.lastName,
        phone: profileInput.phone,
        jobTitle: profileInput.jobTitle,
        department: profileInput.department,
        startDate: profileInput.startDate,
        salary: profileInput.salary,
        currency: profileInput.currency,
        status: mapStatus(profileInput.status),
        profileImage: profileInput.profileImage ?? undefined,
        street: profileInput.address.street,
        city: profileInput.address.city,
        state: profileInput.address.state,
        zipCode: profileInput.address.zipCode,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: profile.id,
      },
      data: userUpdateData,
    });

    return {
      ...employee,
      user: updatedUser,
    };
  }

  throw new Error("Profile not found");
}
