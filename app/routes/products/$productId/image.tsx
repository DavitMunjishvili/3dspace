import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { getProductThumbnail } from "~/filesystem.server";

export async function loader({ params }: LoaderArgs) {
  if (!params?.productId) return;
  const response = getProductThumbnail(params.productId);
  if (response?.error) {
    return json(response.error, { status: 400 });
  }
  return json(response.image);
}
