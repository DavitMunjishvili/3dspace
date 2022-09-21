import { useMemo, useState } from "react";

import type { CartType } from "~/utils";

export default function CheckoutCard({ cart }: { cart: CartType }) {
  const [subtotal, setSubtotal] = useState(0);

  useMemo(() => {
    const total = cart.reduce(
      (accumulator, product) =>
        accumulator +
        Number(product.currentPrice || product.originalPrice) *
          product.quantity,
      0
    );
    setSubtotal(total);
  }, [cart]);

  return (
    <div>
      <div className="border-b border-b-neutral-500 p-2">
        {cart.map((product) => (
          <div
            key={product.productId + product.size + product.color}
            className="flex justify-between"
          >
            <p>
              {product.name}
              <span className="text-sm font-light text-neutral-500">
                (x{product.quantity})
              </span>
            </p>
            <p>
              {Number(product.currentPrice || product.originalPrice) *
                product.quantity}
            </p>
          </div>
        ))}
      </div>
      <p className="flex justify-between p-2">
        <span className="font-light text-neutral-500">Subtotal:</span>
        {subtotal}₾
      </p>
    </div>
  );
}
