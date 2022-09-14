import { useEffect, useState } from "react";
import { fetchProductDetails } from "~/utils";
import type { Product } from "@prisma/client";

export default function CheckoutCard({
  checkoutCardData,
}: {
  checkoutCardData: { [key: string]: number };
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    Object.keys(checkoutCardData).map(async (productId) => {
      const product = await fetchProductDetails(productId);
      setSubtotal(
        (prev) =>
          prev +
          Number(product.currentPrice || product.originalPrice) *
            checkoutCardData[product.id]
      );
      return setProducts((prev) => [...prev, product]);
    });
  }, [checkoutCardData]);

  return (
    <div>
      <div className="border-b border-b-neutral-500 p-2">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between">
            <p>
              {product.name}
              <span className="text-sm font-light text-neutral-500">
                (x{checkoutCardData[product.id]})
              </span>
            </p>
            <p>
              {Number(
                product.currentPrice
                  ? product.currentPrice
                  : product.originalPrice
              ) * checkoutCardData[product.id]}
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
