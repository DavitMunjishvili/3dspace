import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { getProductThumbnail } from "~/filesystem.server";

export async function loader({ params }: LoaderArgs) {
  if (!params?.productId) return;
  const response = await getProductThumbnail(Number(params.productId));
  if (response.error || !response.publicURL)
    return json(response.error, { status: 400 });
  return json(response.publicURL);
}
