import type { LoaderArgs } from "@remix-run/server-runtime";
import { addToCart } from "~/models/user.server";
import { getUserId } from "~/session.server";

export async function loader({ params, request }: LoaderArgs) {
  if (!params.productId) return;
  const userId = await getUserId(request);
  if (userId) addToCart(userId, params.productId);
  return "";
}
