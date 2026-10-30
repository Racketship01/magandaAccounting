import { e as prisma, a as userSession, c as createError } from './nitro.mjs';
import { m as mapStatus } from './schemas2.mjs';

const createExpense = async (expense, event) => {
  const {
    amount,
    date,
    category,
    merchantName,
    description,
    receiptUrl,
    currency
  } = expense;
  const user = await userSession(event);
  let firstName = "";
  let adminId = "";
  let employeeId = "";
  let adminUserId = null;
  if (user.role === "admin") {
    const admin = await prisma.admin.findFirst({ where: { userId: user.id } });
    if (!admin)
      throw createError({
        statusCode: 404,
        statusMessage: "Admin profile not found"
      });
    adminId = admin.id;
    adminUserId = admin.userId;
    firstName = admin.firstName;
    const ownEmployee = await prisma.employee.findFirst({
      where: { userId: user.id }
    });
    if (ownEmployee) {
      employeeId = ownEmployee.id;
    } else {
      const fallbackEmployee = await prisma.employee.findFirst();
      employeeId = (fallbackEmployee == null ? void 0 : fallbackEmployee.id) || "";
    }
  } else {
    const employee = await prisma.employee.findFirst({
      where: { userId: user.id }
    });
    if (!employee)
      throw createError({
        statusCode: 404,
        statusMessage: "Employee profile not found"
      });
    employeeId = employee.id;
    firstName = employee.firstName;
    const defaultAdmin = await prisma.admin.findFirst({
      select: { id: true, userId: true }
    });
    adminId = (defaultAdmin == null ? void 0 : defaultAdmin.id) || "";
    adminUserId = (defaultAdmin == null ? void 0 : defaultAdmin.userId) || null;
  }
  const created = await prisma.expense.create({
    data: {
      amount,
      date,
      category,
      merchantName,
      description,
      receiptUrl,
      status: "pending",
      currency,
      employeeName: firstName,
      adminId,
      employeeId
    }
  });
  return { expense: created, adminUserId, employeeName: firstName };
};
async function getExpenses(event) {
  const user = await userSession(event);
  if (user.role === "admin") {
    return await prisma.expense.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        admin: { select: { id: true, firstName: true, lastName: true } },
        employee: { select: { id: true, firstName: true, lastName: true } }
      }
    });
  } else if (user.role === "employee") {
    const employee = await prisma.employee.findFirst({
      where: { userId: user.id }
    });
    if (!employee) {
      return [];
    }
    return await prisma.expense.findMany({
      where: { employeeId: employee.id },
      orderBy: { createdAt: "desc" },
      include: {
        employee: { select: { id: true, firstName: true, lastName: true } }
      }
    });
  } else {
    return [];
  }
}
async function updateExpenseStatus(id, status, event) {
  var _a;
  const user = await userSession(event);
  if (user.role === "employee") {
    throw createError({
      statusCode: 403,
      statusMessage: "Employee cannot update expense status"
    });
  }
  const admin = await prisma.admin.findFirst({
    where: { userId: user.id }
  });
  if (!admin) {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin profile not found"
    });
  }
  const existing = await prisma.expense.findUnique({
    where: { id },
    select: { status: true }
  });
  const mapped = mapStatus(status);
  const updated = await prisma.expense.update({
    where: { id },
    data: { status: mapped },
    include: {
      employee: { select: { userId: true } }
    }
  });
  return {
    expense: updated,
    employeeUserId: ((_a = updated.employee) == null ? void 0 : _a.userId) || null,
    previousStatus: (existing == null ? void 0 : existing.status) || null,
    newStatus: mapped
  };
}
async function deleteExpense(id) {
  return await prisma.expense.delete({
    where: { id }
  });
}

export { createExpense as c, deleteExpense as d, getExpenses as g, updateExpenseStatus as u };
//# sourceMappingURL=expenseRepository.mjs.map
