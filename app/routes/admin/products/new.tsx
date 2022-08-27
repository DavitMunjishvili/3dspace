import { Dialog, Listbox } from "@headlessui/react";
import { Form, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import { useState } from "react";

// export async function loader() {
//   const categories = getEveryPossibleCategory();
//   return categories;
// }

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const originalPrice = formData.get("originalPrice");
  const currentPrice = formData.get("currentPrice");
  // TODO: Not receiving categories CONTINUE HERE
  const categories = formData.get("categories[]");
  console.log({ name, description, originalPrice, currentPrice, categories });
  return json({});
}

export default function New() {
  const navigate = useNavigate();
  const categories = ["accessories", "decor", "lighting"];
  const [selectedCategories, setSelectedCategories] = useState([categories[0]]);

  return (
    <Dialog open={true} onClose={() => navigate(-1)} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-8 backdrop-blur-md backdrop-brightness-50">
        <Dialog.Panel className="w-full max-w-xl rounded-lg bg-indigo-50 py-4 px-6">
          <Dialog.Title className="text-center text-2xl">
            New Product
          </Dialog.Title>
          <Form method="post">
            <div>
              <label
                htmlFor="name"
                className="mt-4 block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <input
                required
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
                  Starting Price
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
              <label
                htmlFor="categories"
                className="mt-4 block text-sm font-medium text-gray-700"
              >
                Categories
              </label>
              {/* TODO this needs to be autocomplete with ability to add new category */}
              <Listbox
                value={selectedCategories}
                onChange={setSelectedCategories}
                name="categories"
                multiple
              >
                <Listbox.Button className="relative h-9 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500 sm:text-sm">
                  <span className="block truncate">
                    {selectedCategories.join(", ")}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    👇️
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((category) => (
                    <Listbox.Option
                      key={category}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-indigo-200 text-indigo-900"
                            : "text-gray-900"
                        }`
                      }
                      value={category}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium " : "font-normal"
                            }`}
                          >
                            {category}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              👍️
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
            <button
              type="submit"
              className="mt-4 block w-full rounded-md bg-indigo-500 py-2 text-indigo-50 duration-150 hover:bg-indigo-600"
            >
              Add
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
