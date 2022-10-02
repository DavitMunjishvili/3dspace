import { Dialog } from "@headlessui/react";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  getEveryPossibleCategory,
  getProductById,
  updateProduct,
} from "~/models/product.server";

export async function loader({ params }: LoaderArgs) {
  if (!params?.productId) return;
  const product = await getProductById(Number(params.productId));
  const categories = await getEveryPossibleCategory();
  return { categories, product };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description");
  const originalPrice = formData.get("originalPrice");
  const currentPrice = formData.get("currentPrice");
  const categories = formData.get("categories");
  const archive = formData.get("archive") === "on" ? true : false;

  if (!id || !name || !description || !originalPrice || !categories) return {};
  const response = await updateProduct(
    Number(id.toString()),
    name.toString(),
    description.toString(),
    originalPrice.toString(),
    currentPrice ? currentPrice.toString() : null,
    categories.toString().split("|"),
    archive
  );
  console.log(response);
  return redirect("/admin/products");
}

export default function EditProduct() {
  const navigate = useNavigate();
  const closeDestination = "/admin/products";
  const newCategoryRef = useRef<HTMLInputElement>(null);
  const { categories, product } = useLoaderData<typeof loader>();
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (product?.categories) {
      product?.categories.map((category) => {
        return setSelectedCategories((prev) => ({ ...prev, [category]: true }));
      });
    }
    // setSelectedCategories();
  }, [product?.categories]);

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
    if (
      newCategory &&
      !categories.categories.includes(newCategory.toLowerCase())
    ) {
      categories.categories.push(newCategory.toLowerCase());
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
        <Dialog.Panel className="relative w-full max-w-lg rounded-xl bg-indigo-50 py-4 px-6">
          <button
            onClick={() => navigate(closeDestination)}
            className="absolute top-4 left-4 rounded-md border-0 bg-red-300 p-0.5 text-white duration-150 hover:bg-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Dialog.Title className="text-center text-2xl">
            Edit Product
          </Dialog.Title>
          <Form method="post">
            <input type="hidden" name="id" value={product?.id} />
            <div>
              <label
                htmlFor="name"
                className="mt-4 block text-sm font-medium text-gray-700"
              >
                Archive
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={product?.archive}
                  id="archive"
                  name="archive"
                  className="h-4 w-4 rounded border-indigo-300 text-indigo-500 duration-150 hover:border-indigo-200 hover:bg-indigo-200 focus:ring-indigo-500"
                />
                <label
                  className=" font-light capitalize text-gray-700"
                  htmlFor="archive"
                >
                  Archive
                </label>
              </div>
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
                defaultValue={product?.name}
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
                defaultValue={product?.description || ""}
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
                  defaultValue={product?.originalPrice}
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
                  defaultValue={product?.currentPrice || ""}
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
                  .filter((value) => (selectedCategories[value] ? true : false))
                  .join("|")}
              />
              <div className="mt-1 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
                {categories.categories.map((category) => (
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
            <button
              type="submit"
              className="mt-4 block w-full rounded-md bg-indigo-500 py-2 text-indigo-50 duration-150 hover:bg-indigo-600"
            >
              Update
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
