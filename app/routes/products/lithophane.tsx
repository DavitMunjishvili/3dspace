import { Dialog, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { Form, Link, useActionData } from "@remix-run/react";
import { type ActionArgs, json, redirect } from "@remix-run/node";
import { uploadImage } from "~/filesystem.server";
import { addNewOrder } from "~/models/order.server";
import { getUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const formData = await request.formData();
  const color = formData.get("color")!;
  const orderRecord = await addNewOrder(
    "lithophane",
    JSON.stringify({ color }),
    userId
  );

  const top = formData.get("top") as File | "";
  const left = formData.get("left") as File | "";
  const front = formData.get("front") as File | "";
  const right = formData.get("right") as File | "";

  if (top)
    uploadImage(
      "lithophane",
      `${orderRecord.id}/top.${top.type.split("/")[1]}`,
      top
    );
  if (left)
    uploadImage(
      "lithophane",
      `${orderRecord.id}/left.${left.type.split("/")[1]}`,
      left
    );
  if (front)
    uploadImage(
      "lithophane",
      `${orderRecord.id}/front.${front.type.split("/")[1]}`,
      front
    );
  if (right)
    uploadImage(
      "lithophane",
      `${orderRecord.id}/right.${right.type.split("/")[1]}`,
      right
    );

  return json("successfully put an order", {
    status: 200,
    statusText: "successfully put an order",
  });
}

export default function Lithophane() {
  const formResponse = useActionData<typeof action>();
  const [light, setLight] = useState<"white" | "rgb">("white");
  const [top, setTop] = useState<File | null>(null);
  const [left, setLeft] = useState<File | null>(null);
  const [front, setFront] = useState<File | null>(null);
  const [right, setRight] = useState<File | null>(null);

  let price = 80 + (light === "rgb" ? 10 : 0);
  const isFormValid = top || left || right || front;

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-indigo-50">
      <Form
        method="post"
        encType="multipart/form-data"
        className="mx-auto grid max-w-7xl gap-8 px-6 pt-8 sm:grid-cols-2 sm:px-4"
      >
        <div className="grid grid-cols-3 gap-1 child:aspect-square child:border-2 child:border-dashed child:border-indigo-300 child:bg-indigo-100 child:duration-150 child-hover:bg-indigo-200">
          <div className="opacity-0"></div>
          <div>
            <label
              className={
                "flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden " +
                (top && "bg-green-300")
              }
            >
              {top ? (
                <p className="text-center">{top.name}</p>
              ) : (
                <>
                  <p className="text-center">ზემოთ</p>
                  <p className="text-sm text-gray-400">(ატვირთე ფოტო)</p>
                </>
              )}
              <input
                hidden
                name="top"
                type="file"
                accept="image/*"
                onInput={(e) => setTop(e.currentTarget.files?.[0] || null)}
              />
            </label>
          </div>
          <div className="opacity-0"></div>
          <div>
            <label
              className={
                "flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden " +
                (left && "bg-green-300")
              }
            >
              {left ? (
                <p className="text-center">{left.name}</p>
              ) : (
                <>
                  <p className="text-center">მარცხნივ</p>
                  <p className="text-sm text-gray-400">(ატვირთე ფოტო)</p>
                </>
              )}
              <input
                hidden
                name="left"
                type="file"
                accept="image/*"
                onInput={(e) => setLeft(e.currentTarget.files?.[0] || null)}
              />
            </label>
          </div>
          <div>
            <label
              className={
                "flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden " +
                (front && "bg-green-300")
              }
            >
              {front ? (
                <p className="text-center">{front.name}</p>
              ) : (
                <>
                  <p className="text-center">წინ</p>
                  <p className="text-sm text-gray-400">(ატვირთე ფოტო)</p>
                </>
              )}
              <input
                hidden
                name="front"
                type="file"
                accept="image/*"
                onInput={(e) => setFront(e.currentTarget.files?.[0] || null)}
              />
            </label>
          </div>
          <div>
            <label
              className={
                "flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden " +
                (right && "bg-green-300")
              }
            >
              {right ? (
                <p className="w-full text-center">{right.name}</p>
              ) : (
                <>
                  <p className="text-center">მარჯვნივ</p>
                  <p className="text-sm text-gray-400">(ატვირთე ფოტო)</p>
                </>
              )}
              <input
                hidden
                name="right"
                type="file"
                accept="image/*"
                onInput={(e) => setRight(e.currentTarget.files?.[0] || null)}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          {/* Name */}
          <p className="text-3xl">ლითოფეინი</p>

          {/* Price */}
          <p className="text-lg">ფასი: {price}₾</p>

          {/* Lighting */}
          <div>
            განათება: <span className="font-bold">{light}</span>
            <RadioGroup value={light} name="color" onChange={setLight}>
              <RadioGroup.Label className="sr-only">განათება</RadioGroup.Label>
              <div className="mt-2 flex gap-2">
                <RadioGroup.Option
                  value={"white"}
                  className={({ checked }) =>
                    `
                  ${checked ? "outline-none" : "outline-1 outline-offset-2 "}
                    flex cursor-pointer rounded-full border border-black/50 bg-white p-3 shadow-md outline-indigo-900`
                  }
                ></RadioGroup.Option>
                <RadioGroup.Option
                  value={"rgb"}
                  className={({ checked }) =>
                    `
                  ${checked ? "outline-none" : "outline-1 outline-offset-2 "}
                    flex cursor-pointer rounded-full border border-black/50 bg-gradient-to-r from-red-500 to-green-500
                    p-3 shadow-md outline-indigo-900`
                  }
                ></RadioGroup.Option>
              </div>
            </RadioGroup>
          </div>

          <div>
            <button
              disabled={!isFormValid}
              className="cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 text-indigo-50 shadow-md duration-150 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              title={isFormValid ? "" : "ატვირთე მინიმუმ 1 ფოტო"}
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
