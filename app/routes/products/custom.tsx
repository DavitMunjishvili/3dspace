import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Form, Link, useActionData } from "@remix-run/react";
import { type ActionArgs, json, redirect } from "@remix-run/node";
import { uploadImage } from "~/filesystem.server";
import { addNewOrder } from "~/models/order.server";
import { getUserId } from "~/session.server";
import ProductColorPicker, {
  type ColorOptionType,
} from "~/components/ProductPage/ColorPicker";
import ProductScalePicker from "~/components/ProductPage/ScalePicker";

export async function action({ request }: ActionArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const formData = await request.formData();
  const color = formData.get("color");
  const scale = formData.get("scale");

  const orderRecord = await addNewOrder(
    "custom-product",
    JSON.stringify({ color, scale }),
    userId
  );

  const stl = formData.get("stl")! as File;

  const { error } = await uploadImage(
    "product.custom",
    `${orderRecord.id}/${stl.name}`,
    stl
  );

  if (error) console.error(error);

  return json("successfully put an order", {
    status: 200,
    statusText: "successfully put an order",
  });
}

export default function CustomProduct() {
  const formResponse = useActionData<typeof action>();

  const [stl, setStl] = useState<File | null>(null);
  const [color, setColor] = useState<ColorOptionType | null>(null);
  const [scale, setScale] = useState<"default" | number>("default");

  const isFormValid = !!stl && !!color && !!scale;

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-indigo-50">
      <Form
        method="post"
        encType="multipart/form-data"
        className="mx-auto grid max-w-7xl gap-8 px-6 pt-8 sm:grid-cols-2 sm:px-4"
      >
        <label
          className={
            "flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed border-indigo-300 duration-150 " +
            (stl
              ? "bg-green-300 hover:bg-green-400"
              : "bg-indigo-100 hover:bg-indigo-200")
          }
        >
          {stl ? (
            <p className="text-center">{stl.name}</p>
          ) : (
            <p className="text-center">ატვირთე stl ფაილი</p>
          )}
          <input
            hidden
            name="stl"
            type="file"
            accept=".stl"
            onInput={(e) => setStl(e.currentTarget.files?.[0] || null)}
          />
        </label>
        <div className="flex flex-col space-y-8">
          {/* Name */}
          <p className="text-3xl">მომხმარებლის პროდუქტი</p>
          <ProductColorPicker value={color} onChange={setColor} />
          <ProductScalePicker value={scale} onChange={setScale} />
          <div>
            <button
              disabled={!isFormValid}
              className="cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 text-indigo-50 shadow-md duration-150 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              შეუკვეთე
            </button>
          </div>
        </div>
      </Form>
      <Dialog
        open={!!formResponse}
        onClose={() => {}}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-8 backdrop-blur-md backdrop-brightness-50">
          <Dialog.Panel className="relative w-full max-w-lg rounded-xl bg-indigo-50 px-6 py-4">
            <Dialog.Title className="mb-4 text-center text-2xl">
              შეკვეთა წარმატებით დაიდო
            </Dialog.Title>
            <Dialog.Description className="mb-4">
              ჩვენი გუნდის წევრი უმოკლეს დროში დაგიკავშირდებათ
            </Dialog.Description>
            <Link
              to="/"
              className="block rounded-md bg-green-400 p-0.5 py-2 text-center text-green-900 duration-150 hover:bg-green-500"
            >
              მთავარ გვერდზე დაბრუნება
            </Link>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
