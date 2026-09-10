import { updateBill } from "../../repository/billRepository";
import { updateBillSchema } from "../../schemas";
import adminSession from "../../../../profile/server/utils/roleSession";
import { pushNotification } from "../../../../base/server/repository/notificationRepository";

export default defineEventHandler(async (event: any) => {
  await adminSession(event);
  const body = await readBody(event);
  const validationResult = updateBillSchema.safeParse(body);
  if (!validationResult.success) {
    return createError({
      statusCode: 400,
      statusMessage: "Validation failed",
      data: validationResult.error.flatten().fieldErrors,
    });
  }
  const id = event.context.params?.idBill as string;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bill ID is required",
    });
  }

  const result = await updateBill(id, validationResult.data);

  if (result.adminUserId && !result.wasPaid && result.isNowPaid) {
    await pushNotification({
      userId: result.adminUserId,
      type: "bill_paid",
      title: `Bill paid: ${result.bill.title}`,
      description: `${result.bill.amount} ${result.bill.currency || ""}`,
      icon: "i-lucide-bell",
      billId: result.bill.id,
    });
  }

  return { bill: result.bill };
});
