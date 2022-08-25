import { validateEmail, validatePhone } from "./utils";

test("validateEmail returns false for non-emails", () => {
  expect(validateEmail(undefined)).toBe(false);
  expect(validateEmail(null)).toBe(false);
  expect(validateEmail("")).toBe(false);
  expect(validateEmail("not-an-email")).toBe(false);
  expect(validateEmail("n@")).toBe(false);
});

test("validateEmail returns true for emails", () => {
  expect(validateEmail("kody@example.com")).toBe(true);
});

test("validatePhone returns false for non-phones", () => {
  expect(validatePhone(undefined)).toBe(false);
  expect(validatePhone(null)).toBe(false);
  expect(validatePhone("")).toBe(false);
  expect(validatePhone("555abcdef")).toBe(false);
  expect(validatePhone("155112233")).toBe(false);
  expect(validatePhone("+995555112233")).toBe(false);
});

test("validatePhone returns true for phones", () => {
  expect(validatePhone("555112233")).toBe(true);
});
