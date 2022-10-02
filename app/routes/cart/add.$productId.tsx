import { json } from "@remix-run/server-runtime";
import { addToCart } from "~/models/user.server";
import { getUserId } from "~/session.server";
import { getProductById } from "~/models/product.server";
import invariant from "tiny-invariant";
import type { LoaderArgs } from "@remix-run/server-runtime";

export async function loader({ params, request }: LoaderArgs) {
  invariant(params.productId, "Expected params.productId");

  // Check if user exists
  const userId = await getUserId(request);
  if (!userId)
    return json("user not logged in", {
      status: 403,
      statusText: "user not logged in",
    });

  // Check if product exists
  const product = await getProductById(Number(params.productId));
  if (!product)
    return json("couldn't find product with that id", {
      status: 404,
      statusText: "couldn't find product with that id",
    });

  //
  const url = new URL(request.url);
  const size = url.searchParams.get("size");
  const color = url.searchParams.get("color");
  if (!size || !color)
    return json("missing size and color params", {
      status: 404,
      statusText: "missing size and color params",
    });

  await addToCart(
    userId,
    product.id,
    product.name,
    product.originalPrice,
    product.currentPrice,
    color,
    size
  );
  return json("successfully added to cart", {
    status: 200,
    statusText: "successfully added to cart",
  });
}
