import { useLoaderData } from "@remix-run/react";
import ProductCard from "~/components/ProductCard";
import { getFilters, getProductsOnSale } from "~/models/product.server";

export async function loader() {
  const filters = await getFilters();
  const products = await getProductsOnSale();
  return { products, filters };
}

export async function meta() {
  return {
    title: "3D Space - Product",
  };
}

export default function Products() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="mx-8 mt-8 flex max-w-7xl gap-4 lg:mx-auto">
      {/* Filters */}
      {/* <div className="w-80 self-start px-4 text-lg font-semibold text-indigo-50">
        <p className="text-center">Filters</p>
        <Form method="get" noValidate>
          {Object.keys(filters).map((key) => {
            return (
              <div key={key} className="my-2 text-base font-normal capitalize">
                <p className="mb-2 font-semibold">{key}</p>
                <ul>
                  {filters[key].map((e: string) => (
                    <li key={e} className="my-1">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-indigo-300 text-indigo-500 duration-150 hover:border-indigo-200 hover:bg-indigo-200 focus:ring-indigo-500"
                          name={`${key}_${e}`}
                          id={`${key}_${e}`}
                        />
                        {e}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Form>
      </div> */}

      {/* Product */}
      <div className="grid w-full grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
}
