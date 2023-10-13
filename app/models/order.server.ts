import type { Order } from "@prisma/client";
import { prisma } from "~/db.server";

export async function addNewOrder(
  type: Order["type"],
  orderDetails: Order["orderDetails"],
  userId: Order["userId"]
) {
  return prisma.order.create({
    data: {
      type,
      orderDetails,
      userId,
    },
  });
}
