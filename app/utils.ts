import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { Product, User } from "@prisma/client";

const DEFAULT_REDIRECT = "/";

export function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function validatePhone(phone: unknown): phone is string {
  return (
    typeof phone === "string" &&
    phone.length === 9 &&
    isNumeric(phone) &&
    phone[0] === "5" &&
    !phone.includes("+995")
  );
}

export type CartType = {
  productId: Product["id"];
  size: string;
  color: string;
  quantity: number;
  name: Product["name"];
  image?: string;
  originalPrice: Product["originalPrice"];
  currentPrice: Product["currentPrice"];
}[];
// export function useLocalCart() {
//   const [cart, setCart] = useState<CartType>({});

//   const handleCartUpdate = (
//     key: string,
//     size: string,
//     color: string,
//     quantity = 1
//   ) => {
//     if (quantity <= 0) return;
//     const localCart = JSON.parse(
//       localStorage.getItem("localCart") || "{}"
//     ) as CartType;

//     if (Object.keys(localCart).includes(key)) {
//       const itemsWithThisKey = localCart[key];
//       let exists = false;
//       itemsWithThisKey.forEach((item) => {
//         if (item.color === color && item.size === size) {
//           exists = true;
//           item.quantity += quantity;
//         }
//       });
//       if (!exists) {
//         localCart[key].push({ size, color, quantity });
//       }
//     } else {
//       localCart[key] = [];
//       localCart[key].push({ size, color, quantity });
//     }
//     localStorage.setItem("localCart", JSON.stringify(localCart));
//   };

//   useEffect(() => {
//     const localCart = JSON.parse(
//       localStorage.getItem("localCart") || "{}"
//     ) as CartType;
//     setCart(localCart);
//   }, []);

//   return { localCart: cart, setLocalCart: handleCartUpdate };
// }

export function generateProductColor(color: string) {
  switch (color) {
    case "Yellow":
      return "bg-yellow-500";
    case "Red":
      return "bg-red-500";
    case "Green":
      return "bg-green-500";
    case "Black":
      return "bg-black";
  }
}
