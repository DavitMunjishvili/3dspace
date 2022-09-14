import { useEffect, useState } from "react";
import type { Product } from "@prisma/client";
import type { CartItemType } from "~/utils";

export default function CartProductCard({
  id,
  itemDetails,
}: {
  id: Product["id"];
  itemDetails: CartItemType;
}) {
  // TODO finish displaying itemDetails
  const [image, setImage] = useState<File>();
  useEffect(() => {
    fetch(`/products/${id}/image`)
      .then((response) => {
        if (response.ok) return response.json();
        throw response.statusText;
      })
      .then((data) => setImage(data))
      .catch((error) => console.error("ERROR", error));
  }, [id]);

  return (
    <div className="flex rounded-xl border border-indigo-900 p-4">
      <img
        src={`data:image/jpeg;base64,${image}`}
        className="w-64 rounded-lg"
        alt={id}
      />
      <div className="flex flex-1 justify-between px-4">
        <div>
          <p>Name</p>
          <div className="flex gap-2">
            <p>Quantity:</p>
            <p>Color:</p>
            <p>Size:</p>
          </div>
        </div>
        <div>$price</div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <button>Go To Checkout</button>
      </div>
    </div>
  );
}
