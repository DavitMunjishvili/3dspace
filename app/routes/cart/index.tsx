import { getUser } from "~/session.server";
import { Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/server-runtime";

import CartProductCard from "~/components/CartProductCard";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { CartType } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) return redirect("/");
  return json(JSON.parse(user.cart) as CartType);
}

export default function Cart() {
  const userCart = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-indigo-50 p-4">
      <div className="mx-auto mt-8 flex w-full max-w-7xl justify-between gap-8 rounded-xl border border-indigo-900 ">
        <div className="flex w-2/3 flex-col gap-8">
          {userCart.map((item) => (
            <CartProductCard
              key={item.productId + item.color + item.size}
              id={item.productId}
              size={item.size}
              color={item.color}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="my-8 flex w-1/3 items-start justify-center border-l border-l-indigo-900/50 p-4">
          <div>
            {/* <CheckoutCard checkoutCardData={checkoutCardData} /> */}
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
