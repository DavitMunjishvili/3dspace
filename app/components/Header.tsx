import { Transition } from "@headlessui/react";
import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import { useOptionalUser } from "~/utils";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useOptionalUser();

  return (
    <>
      <header className="fixed top-0 z-50 h-16 w-full bg-indigo-50 shadow-md shadow-indigo-200">
        <div className="mx-2 flex h-full max-w-7xl items-center justify-between p-2 xl:mx-auto">
          {/* Logo and home page link */}
          <Link
            to="/"
            className="rounded-sm px-2 py-1 text-2xl font-bold duration-150 hover:bg-indigo-100"
          >
            3D Space
          </Link>

          {/* product dropdown and search */}
          <div className="hidden items-center gap-x-2 sm:flex">
            <div className="group">
              {user?.role === "dev" && (
                <>
                  <Link
                    to="/admin"
                    className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
                  >
                    Admin
                  </Link>
                </>
              )}
              <Link
                className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
                to="/products"
              >
                Products
              </Link>
            </div>
            <div className="flex items-center gap-x-2 rounded-xl border border-black px-2 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Form method="get" action="/products">
                <label htmlFor="search" className="sr-only">
                  Search for product
                </label>
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search for products..."
                  className="border-none bg-transparent p-0 focus:border-none focus:outline-none focus:ring-0 lg:w-96"
                />
              </Form>
            </div>
          </div>

          {/* user things */}
          <div className="hidden items-center gap-x-2 sm:flex">
            {user ? (
              <>
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
                  >
                    {user.name}, Logout
                  </button>
                </Form>
                <Link
                  to="/cart"
                  className="relative rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {/* {cartQuantity ? (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-red-50">
                      {cartQuantity}
                    </span>
                  ) : null} */}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
                >
                  Log In
                </Link>
                <Link
                  to="/join"
                  className="rounded-sm px-2 py-1 duration-150 hover:bg-indigo-100"
                >
                  Join
                </Link>
              </>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 sm:hidden">
            <button className="rounded-lg bg-indigo-200 p-2 duration-75 hover:bg-indigo-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-indigo-900 stroke-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            {/* <Link to="/products"> */}
            <button
              onClick={() => setShowMenu((state) => !state)}
              className="rounded-lg bg-indigo-200 p-2 duration-75 hover:bg-indigo-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-indigo-900 stroke-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <Transition
              show={showMenu}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="fixed left-0 top-0 h-screen w-full bg-indigo-50"
            >
              <div className="mx-4 flex flex-col border-t p-4 pt-20">
                <button
                  onClick={() => setShowMenu((state) => !state)}
                  className="absolute top-3 right-4 rounded-lg bg-indigo-200 p-2 duration-75 hover:bg-indigo-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-indigo-900 stroke-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Link
                  onClick={() => setShowMenu(false)}
                  to="/products"
                  className="m-2 rounded-lg bg-indigo-200 px-4 py-2 text-center text-lg hover:bg-indigo-300"
                >
                  Products
                </Link>
                <hr className="my-6" />
                {user ? (
                  <Link
                    onClick={() => setShowMenu(false)}
                    className="m-2 rounded-lg bg-indigo-200 px-4 py-2 text-center text-lg hover:bg-indigo-300"
                    to="/logout"
                  >
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link
                      onClick={() => setShowMenu(false)}
                      className="m-2 rounded-lg bg-indigo-200 px-4 py-2 text-center text-lg hover:bg-indigo-300"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={() => setShowMenu(false)}
                      className="m-2 rounded-lg bg-indigo-200 px-4 py-2 text-center text-lg hover:bg-indigo-300"
                      to="/join"
                    >
                      Join
                    </Link>
                  </>
                )}
              </div>
            </Transition>
            {/* </Link> */}
          </div>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  );
}
