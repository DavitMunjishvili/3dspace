import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { getProductById } from "~/models/product.server";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderArgs) {
  invariant(params.productId, "ProductID is required");
  const response = await getProductById(Number(params.productId));

  if (response) return json(response);
  return json("couldn't find product with this id", {
    status: 404,
    statusText: "couldn't find product with this id",
  });
}
