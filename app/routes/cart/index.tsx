import { getUser } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import { useLocalCart } from "~/utils";
import { json } from "@remix-run/server-runtime";
import CartProductCard from "~/components/CartProductCard";

import type { CartType } from "~/utils";
import type { LoaderArgs } from "@remix-run/server-runtime";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  // if (user) return JSON.parse(user.cart) as { [x: string]: number };
  // return null;
  return json(user?.cart || "");
}

export default function Cart() {
  const userCart = useLoaderData<typeof loader>();
  const { localCart } = useLocalCart();
  const cartToBeDisplayed = userCart
    ? (JSON.parse(userCart) as CartType)
    : localCart;
  Object.keys(cartToBeDisplayed).map((itemsWithThisKey) =>
    cartToBeDisplayed[itemsWithThisKey].map((items) => console.log(items))
  );

  return (
    <main className="min-h-screen bg-indigo-50 p-4">
      <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-8">
        {Object.keys(cartToBeDisplayed).map((itemKey) =>
          cartToBeDisplayed[itemKey].map((items) => (
            <CartProductCard
              key={itemKey + items.color + items.size}
              id={itemKey}
              itemDetails={{
                color: items.color,
                size: items.size,
                quantity: items.quantity,
              }}
            />
          ))
        )}
      </div>
    </main>
  );
}
