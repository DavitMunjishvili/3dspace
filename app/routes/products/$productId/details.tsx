import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { getProductById } from "~/models/product.server";

export async function loader({ params }: LoaderArgs) {
  if (!params?.productId) return;
  const response = await getProductById(params.productId);
  return json(response);
}
