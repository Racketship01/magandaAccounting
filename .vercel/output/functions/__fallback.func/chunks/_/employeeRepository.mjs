import { e as prisma, v as verifyPassword, z as hashPassword } from './nitro.mjs';
import { a as mapStatus } from './schemas3.mjs';

async function createEmployee(employeeInfo) {
  return await prisma.$transaction(async (emp) => {
    var _a;
    const profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeInfo.firstName)}+${encodeURIComponent(employeeInfo.lastName)}&background=random&color=fff`;
    const user = await emp.user.create({
      data: {
        username: employeeInfo.credentials.username,
        email: employeeInfo.credentials.email,
        password: employeeInfo.credentials.password
      }
    });
    const employee = await emp.employee.create({
      data: {
        userId: user.id,
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        phone: employeeInfo.phone,
        nationality: employeeInfo.nationality,
        jobTitle: employeeInfo.jobTitle,
        department: employeeInfo.department,
        startDate: employeeInfo.startDate,
        salary: employeeInfo.salary,
        currency: employeeInfo.currency,
        role: "employee",
        status: mapStatus(employeeInfo.status),
        profileImage,
        street: employeeInfo.address.street,
        city: employeeInfo.address.city,
        state: employeeInfo.address.state,
        zipCode: employeeInfo.address.zipCode
      }
    });
    return {
      user,
      employee: {
        ...employee,
        profileImage: (_a = employee.profileImage) != null ? _a : profileImage
      }
    };
  });
}
async function getAllEmployee() {
  const employees = await prisma.employee.findMany({
    include: {
      user: true
    }
  });
  return employees.map((employee) => ({
    ...employee,
    profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.firstName)}+${encodeURIComponent(employee.lastName)}&background=random&color=fff`
  }));
}
async function updateEmployee(id, employeeInfo) {
  return await prisma.$transaction(async (emp) => {
    const employee = await emp.employee.update({
      where: {
        id
      },
      data: {
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        phone: employeeInfo.phone,
        nationality: employeeInfo.nationality,
        jobTitle: employeeInfo.jobTitle,
        department: employeeInfo.department,
        startDate: employeeInfo.startDate,
        salary: employeeInfo.salary,
        currency: employeeInfo.currency,
        status: mapStatus(employeeInfo.status),
        street: employeeInfo.address.street,
        city: employeeInfo.address.city,
        state: employeeInfo.address.state,
        zipCode: employeeInfo.address.zipCode
      }
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    const userRecord = await emp.user.findUnique({
      where: { id: employee.userId }
    });
    if (!userRecord) {
      throw new Error("User not found");
    }
    const userUpdateData = {
      username: employeeInfo.credentials.username,
      email: employeeInfo.credentials.email
    };
    const hasNewPassword = employeeInfo.credentials.newPassword && employeeInfo.credentials.newPassword.trim() !== "";
    const hasOldPassword = employeeInfo.credentials.password && employeeInfo.credentials.password.trim() !== "";
    if (hasNewPassword) {
      if (!hasOldPassword) {
        throw new Error("Current password is required to set a new password");
      }
      const isPasswordValid = await verifyPassword(
        userRecord.password,
        employeeInfo.credentials.password
      );
      if (!isPasswordValid) {
        throw new Error("Current password is not valid");
      }
      userUpdateData.password = await hashPassword(
        employeeInfo.credentials.newPassword
      );
    }
    const user = await emp.user.update({
      where: {
        id: employee.userId
      },
      data: userUpdateData
    });
    return { employee, user };
  });
}
async function deleteEmployee(id) {
  return await prisma.$transaction(async (emp) => {
    const employee = await emp.employee.delete({
      where: {
        id
      }
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    const user = await emp.user.delete({
      where: {
        id: employee.userId
      }
    });
    return { employee, user };
  });
}

export { createEmployee as c, deleteEmployee as d, getAllEmployee as g, updateEmployee as u };
//# sourceMappingURL=employeeRepository.mjs.map
