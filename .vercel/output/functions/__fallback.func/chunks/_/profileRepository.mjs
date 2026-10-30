import { a as userSession, e as prisma, v as verifyPassword, z as hashPassword } from './nitro.mjs';
import { a as mapStatus } from './schemas3.mjs';

async function getMyProfile(event) {
  const user = await userSession(event);
  const profile = await prisma.user.findFirst({
    where: {
      id: user.id
    },
    include: {
      employees: true,
      admin: true
    }
  });
  if (!profile) {
    throw new Error("Profile not found");
  }
  const buildProfileImage = (firstName, lastName, existing) => {
    if (existing && existing.trim() !== "") return existing;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}+${encodeURIComponent(lastName)}&background=random&color=fff`;
  };
  if (profile.admin && profile.admin.length > 0) {
    const admin = profile.admin[0];
    return {
      ...admin,
      profileImage: buildProfileImage(
        (admin == null ? void 0 : admin.firstName) || "",
        (admin == null ? void 0 : admin.lastName) || "",
        (admin == null ? void 0 : admin.profileImage) || ""
      ),
      user: profile
    };
  } else if (profile.employees && profile.employees.length > 0) {
    const employee = profile.employees[0];
    return {
      ...employee,
      profileImage: buildProfileImage(
        (employee == null ? void 0 : employee.firstName) || "",
        (employee == null ? void 0 : employee.lastName) || "",
        (employee == null ? void 0 : employee.profileImage) || ""
      ),
      user: profile
    };
  }
  return profile;
}
async function updateMyProfile(event, profileInput) {
  var _a, _b;
  const userSessionData = await userSession(event);
  const profile = await prisma.user.findFirst({
    where: {
      id: userSessionData.id
    },
    include: {
      employees: true,
      admin: true
    }
  });
  if (!profile) {
    throw new Error("Profile not found");
  }
  const userUpdateData = {
    username: profileInput.credentials.username
  };
  if (profileInput.credentials.email && profileInput.credentials.email.trim() !== "") {
    userUpdateData.email = profileInput.credentials.email;
  }
  const hasNewPassword = profileInput.credentials.newPassword && profileInput.credentials.newPassword.trim() !== "";
  const hasOldPassword = profileInput.credentials.password && profileInput.credentials.password.trim() !== "";
  if (hasNewPassword) {
    if (!hasOldPassword) {
      throw new Error("Current password is required to set a new password");
    }
    const isPasswordValid = await verifyPassword(
      profile.password,
      profileInput.credentials.password
    );
    if (!isPasswordValid) {
      throw new Error("Current password is not valid");
    }
    const newHashedPassword = await hashPassword(
      profileInput.credentials.newPassword
    );
    userUpdateData.password = newHashedPassword;
  }
  if (profile.admin && profile.admin.length > 0) {
    const adminRecord = profile.admin[0];
    const admin = await prisma.admin.update({
      where: {
        id: adminRecord == null ? void 0 : adminRecord.id
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
        profileImage: (_a = profileInput.profileImage) != null ? _a : void 0,
        street: profileInput.address.street,
        city: profileInput.address.city,
        state: profileInput.address.state,
        zipCode: profileInput.address.zipCode
      }
    });
    const updatedUser = await prisma.user.update({
      where: {
        id: profile.id
      },
      data: userUpdateData
    });
    return {
      ...admin,
      user: updatedUser
    };
  } else if (profile.employees && profile.employees.length > 0) {
    const employeeRecord = profile.employees[0];
    const employee = await prisma.employee.update({
      where: {
        id: employeeRecord == null ? void 0 : employeeRecord.id
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
        profileImage: (_b = profileInput.profileImage) != null ? _b : void 0,
        street: profileInput.address.street,
        city: profileInput.address.city,
        state: profileInput.address.state,
        zipCode: profileInput.address.zipCode
      }
    });
    const updatedUser = await prisma.user.update({
      where: {
        id: profile.id
      },
      data: userUpdateData
    });
    return {
      ...employee,
      user: updatedUser
    };
  }
  throw new Error("Profile not found");
}

export { getMyProfile as g, updateMyProfile as u };
//# sourceMappingURL=profileRepository.mjs.map
