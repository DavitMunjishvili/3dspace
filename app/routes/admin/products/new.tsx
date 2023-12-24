import { Dialog } from "@headlessui/react";
import {
  Form,
  useLoaderData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  addNewProduct,
  getEveryPossibleCategory,
} from "~/models/product.server";
import { uploadImage } from "~/filesystem.server";
import CloseButton from "~/components/common/CloseButton";
import Button from "~/components/common/Button";

export async function loader() {
  return getEveryPossibleCategory();
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const originalPrice = formData.get("originalPrice");
  const currentPrice = formData.get("currentPrice");
  const categories = formData.get("categories");
  const images = formData.getAll("images") as File[];

  if (
    !name ||
    !description ||
    !originalPrice ||
    !categories ||
    images.length === 0
  )
    return {
      error:
        "Display Name, Product Description, Original Price and at least one Category is required",
    };
  const { id } = await addNewProduct(
    name.toString(),
    description.toString(),
    originalPrice.toString(),
    currentPrice ? currentPrice.toString() : null,
    categories.toString().split("|")
  );
  const uploadPromises = images.map((image) =>
    uploadImage("product.images", `${id}/${image.name}`, image)
  );

  await Promise.allSettled(uploadPromises).then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value.data?.path) {
        console.log(`Image ${result.value.data} uploaded successfully`);
      } else if (result.status === "fulfilled" && result.value.error?.name) {
        console.error(
          `Failed to upload image, Error: ${result.value.error.message}`
        );
      } else {
        console.error("Promise rejected");
      }
    });
  });

  //
  // TODO response messages and/or toast
  return redirect("/admin/products");
}

export default function New() {
  const navigate = useNavigate();
  const transition = useTransition();
  const { categories } = useLoaderData<typeof loader>();

  const closeDestination = "/admin/products";
  const isProcessing = transition.state === "submitting";

  const newCategoryRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [productImages, setProductImages] = useState<File[]>([]);

  useEffect(() => {
    if (!isProcessing) {
      formRef.current?.reset();
      setProductImages([]);
    }
  }, [isProcessing]);

  const handleCategoryCheckbox = async (
    event: MouseEvent<HTMLInputElement>
  ) => {
    if (typeof event?.currentTarget?.id !== "string") return;
    const key = event.currentTarget.id;
    const value = event.currentTarget.checked;
    setSelectedCategories((prev) => ({ ...prev, [key]: value }));
  };

  const addNewCategory = () => {
    const newCategory = newCategoryRef.current?.value;
    if (newCategory && !categories.includes(newCategory.toLowerCase())) {
      categories.push(newCategory.toLowerCase());
      setSelectedCategories((prev) => ({
        ...prev,
        [newCategory.toLowerCase()]: true,
      }));
      newCategoryRef.current.value = "";
    }
  };

  return (
    <Dialog
      open={true}
      onClose={() => navigate(closeDestination)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-8 backdrop-blur-md backdrop-brightness-50">
        <Dialog.Panel className="relative w-full max-w-lg rounded-xl bg-indigo-50 px-6 py-4">
          <CloseButton
            className="absolute left-4 top-4"
            onClick={() => navigate(closeDestination)}
          />
          <Dialog.Title className="text-center text-2xl">
            New Product
          </Dialog.Title>
          <Form method="post" ref={formRef} encType="multipart/form-data">
            <div>
              {productImages.length > 0 ? (
                <div className="mt-4 flex h-32 w-full gap-2 overflow-x-auto rounded-md border border-gray-300 bg-white p-2">
                  {productImages.map((productImage, idx) => (
                    <img
                      key={idx}
                      className="block h-full rounded-sm border border-gray-200"
                      src={URL.createObjectURL(productImage)}
                      alt={productImage.name}
                    />
                  ))}
                  <label
                    htmlFor="images"
                    className="flex aspect-square h-full items-center justify-center rounded-sm border-2 border-dashed border-gray-300 bg-gray-100 text-center text-gray-300 duration-150 hover:bg-gray-200 hover:text-gray-400"
                  >
                    Change Images
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="images"
                  className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white p-4 text-sm font-medium duration-150 hover:bg-gray-100"
                >
                  Add Images
                </label>
              )}
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={(e) => {
                  if (!e.target.files) return;
                  setProductImages([...e.target.files]);
                }}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="mt-4 block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <input
                required
                autoFocus={true}
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mt-4 block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <input
                required
                type="text"
                name="description"
                id="description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex w-full gap-2">
              <div className="flex-1">
                <label
                  htmlFor="originalPrice"
                  className="mt-4 block text-sm font-medium text-gray-700"
                >
                  Original Price
                </label>
                <input
                  required
                  type="number"
                  name="originalPrice"
                  id="originalPrice"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="currentPrice"
                  className="mt-4 block text-sm font-medium text-gray-700"
                >
                  Current Price
                  <span className="ml-1 text-xs font-light">(Optional)</span>
                </label>
                <input
                  type="number"
                  name="currentPrice"
                  id="currentPrice"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="relative">
              <p className="mt-4 text-sm font-medium text-gray-700">
                Categories
              </p>
              <input
                type="hidden"
                name="categories"
                value={Object.keys(selectedCategories)
                  .filter((value) => selectedCategories[value])
                  .join("|")}
              />
              <div className="mt-1 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={selectedCategories[category]}
                      id={category}
                      onClick={handleCategoryCheckbox}
                      className="h-4 w-4 rounded border-indigo-300 text-indigo-500 duration-150 hover:border-indigo-200 hover:bg-indigo-200 focus:ring-indigo-500"
                    />
                    <label
                      className=" font-light capitalize text-gray-700"
                      htmlFor={category}
                    >
                      {category}
                    </label>
                  </div>
                ))}
                <input
                  type="text"
                  ref={newCategoryRef}
                  placeholder="Type New Category"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addNewCategory();
                    }
                  }}
                  onBlur={addNewCategory}
                />
              </div>
            </div>
            <Button fullWidth className="mt-4">Add</Button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
