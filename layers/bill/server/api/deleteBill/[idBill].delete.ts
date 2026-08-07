import { deleteBill } from "../../repository/billRepository";
import { createError, getRouterParam } from "h3";
import adminSession from "../../../../profile/server/utils/roleSession";

export default defineEventHandler(async (event) => {
  await adminSession(event);

  const id = getRouterParam(event, "idBill");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bill not found",
    });
  }
  const removeBill = await deleteBill(id);
  return { removeBill };
});
