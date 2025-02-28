import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUserSession, getUserId } from "~/session.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { safeRedirect, validateEmail, validatePhone } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const lastName = formData.get("lastName");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  function generateErrorMessage(
    name: null | string = null,
    lastName: null | string = null,
    phone: null | string = null,
    email: null | string = null,
    password: null | string = null,
    confirmPassword: null | string = null
  ) {
    return { name, lastName, phone, email, password, confirmPassword };
  }

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: generateErrorMessage("Name is required") },
      { status: 400 }
    );
  }

  if (typeof lastName !== "string" || lastName.length === 0) {
    return json(
      {
        errors: generateErrorMessage(null, "Last name is required"),
      },
      { status: 400 }
    );
  }

  if (typeof phone !== "string" || phone.length === 0) {
    return json(
      {
        errors: generateErrorMessage(null, null, "Phone is required"),
      },
      { status: 400 }
    );
  }

  if (!validatePhone(phone)) {
    return json(
      {
        errors: generateErrorMessage(null, null, "Phone is invalid"),
      },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return json(
      {
        errors: generateErrorMessage(null, null, null, "Email is invalid"),
      },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      {
        errors: generateErrorMessage(
          null,
          null,
          null,
          null,
          "Password is required"
        ),
      },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      {
        errors: generateErrorMessage(
          null,
          null,
          null,
          null,
          "Password is too short"
        ),
      },
      { status: 400 }
    );
  }

  if (typeof confirmPassword !== "string" || confirmPassword.length === 0) {
    return json(
      {
        errors: generateErrorMessage(
          null,
          null,
          null,
          null,
          null,
          "Confirm password is required"
        ),
      },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return json(
      {
        errors: generateErrorMessage(
          null,
          null,
          null,
          null,
          null,
          "Passwords don't match"
        ),
      },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: generateErrorMessage(
          null,
          null,
          null,
          "A user already exists with this email"
        ),
      },
      { status: 400 }
    );
  }

  const user = await createUser(name, lastName, phone, email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();

  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.lastName) {
      lastNameRef.current?.focus();
    } else if (actionData?.errors?.phone) {
      phoneRef.current?.focus();
    } else if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    } else if (actionData?.errors?.confirmPassword) {
      confirmPasswordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="mx-auto mt-8 w-full max-w-md rounded-xl bg-indigo-50 p-8">
      <h1 className="mb-4 text-center text-xl font-bold">Join</h1>
      <Form method="post" className="space-y-6" noValidate>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              ref={nameRef}
              id="name"
              required
              autoFocus={true}
              name="name"
              type="text"
              autoComplete="name"
              aria-invalid={actionData?.errors?.name ? true : undefined}
              aria-describedby="name-error"
              className="w-full rounded-xl border border-indigo-900 bg-white px-2 py-1 focus:border-indigo-600 focus:ring-indigo-600"
            />
            {actionData?.errors?.name && (
              <div className="pt-1 text-red-700" id="name-error">
                {actionData.errors.name}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <div className="mt-1">
            <input
              ref={lastNameRef}
              id="lastName"
              required
              name="lastName"
              type="text"
              autoComplete="lastName"
              aria-invalid={actionData?.errors?.lastName ? true : undefined}
              aria-describedby="lastName-error"
              className="w-full rounded-xl border border-indigo-900 bg-white px-2 py-1 focus:border-indigo-600 focus:ring-indigo-600"
            />
            {actionData?.errors?.lastName && (
              <div className="pt-1 text-red-700" id="name-error">
                {actionData.errors.lastName}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <div className="mt-1">
            <input
              ref={phoneRef}
              id="phone"
              required
              name="phone"
              type="tel"
              autoComplete="phone"
              aria-invalid={actionData?.errors?.phone ? true : undefined}
              aria-describedby="phone-error"
              className="w-full rounded-xl border border-indigo-900 bg-white px-2 py-1 focus:border-indigo-600 focus:ring-indigo-600"
            />
            {actionData?.errors?.phone && (
              <div className="pt-1 text-red-700" id="name-error">
                {actionData.errors.phone}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              ref={emailRef}
              id="email"
              required
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              className="w-full rounded-xl border border-indigo-900 bg-white px-2 py-1 focus:border-indigo-600 focus:ring-indigo-600"
            />
            {actionData?.errors?.email && (
              <div className="pt-1 text-red-700" id="email-error">
                {actionData.errors.email}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              ref={passwordRef}
              name="password"
              type="password"
              autoComplete="password"
              aria-invalid={actionData?.errors?.password ? true : undefined}
              aria-describedby="password-error"
              className="w-full rounded-xl border border-indigo-900 bg-white px-2 py-1 focus:border-indigo-600 focus:ring-indigo-600"
            />
            {actionData?.errors?.password && (
              <div className="pt-1 text-red-700" id="password-error">
                {actionData.errors.password}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              ref={confirmPasswordRef}
              name="confirmPassword"
              type="password"
              autoComplete="confirmPassword"
              aria-invalid={
                actionData?.errors?.confirmPassword ? true : undefined
              }
              aria-describedby="confirmPassword-error"
              className="w-full rounded-xl border border-indigo-900 bg-white px-2 py-1 focus:border-indigo-600 focus:ring-indigo-600"
            />
            {actionData?.errors?.confirmPassword && (
              <div className="pt-1 text-red-700" id="confirmPassword-error">
                {actionData.errors.confirmPassword}
              </div>
            )}
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={redirectTo} />
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-500 px-4 py-2 text-white duration-150 hover:bg-indigo-600 focus:bg-indigo-400"
        >
          Create Account
        </button>
        <div className="flex items-center justify-center">
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              className="text-indigo-500 underline duration-150 hover:text-indigo-600"
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}
