import { getUser } from "~/session.server";
import { Link, useLoaderData } from "@remix-run/react";
import { useLocalCart } from "~/utils";
import { json } from "@remix-run/server-runtime";
import CartProductCard from "~/components/CartProductCard";

import type { CartType } from "~/utils";
import type { LoaderArgs } from "@remix-run/server-runtime";
import CheckoutCard from "~/components/CheckoutCard";

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

  const checkoutCardData: { [x: string]: number } = {};
  Object.keys(cartToBeDisplayed).map((id) => {
    const quantity = cartToBeDisplayed[id].reduce((accumulator, items) => {
      return accumulator + items.quantity;
    }, 0);
    return (checkoutCardData[id] = quantity);
  });

  return (
    <main className="min-h-screen bg-indigo-50 p-4">
      <div className="mx-auto mt-8 flex w-full max-w-7xl justify-between gap-8 rounded-xl border border-indigo-900 ">
        <div className="flex w-2/3 flex-col gap-8">
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
        <div className="my-8 flex w-1/3 items-start justify-center border-l border-l-indigo-900/50 p-4">
          <div>
            <CheckoutCard checkoutCardData={checkoutCardData} />
            <Link
              to="/checkout"
              className="block w-full cursor-pointer rounded-lg bg-indigo-500 py-2 text-center text-indigo-50 shadow-md duration-150 hover:bg-indigo-600"
            >
              Go To Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
