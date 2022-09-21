import type { Password, Product, User } from "@prisma/client";
import { json } from "@remix-run/server-runtime";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import type { CartType } from "~/utils";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  name: User["name"],
  lastName: User["lastName"],
  phone: User["phone"],
  email: User["email"],
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      lastName,
      phone,
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function updateUserRole(id: User["id"], role: string) {
  const user = await prisma.user.update({
    data: {
      role,
    },
    where: {
      id,
    },
  });
  return user;
}

export async function addToCart(
  userId: User["id"],
  productId: Product["id"],
  name: Product["name"],
  originalPrice: Product["originalPrice"],
  currentPrice: Product["currentPrice"],
  color: string,
  size: string
) {
  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return json("user not found", {
      status: 403,
      statusText: "user not found",
    });
  }

  if (!user.cart) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        cart: JSON.stringify([
          {
            productId,
            name,
            originalPrice,
            currentPrice,
            size,
            color,
            quantity: 1,
          } as CartType[0],
        ]),
      },
    });
  } else {
    const cart = JSON.parse(user.cart) as CartType;
    let found = false;
    cart.map((item) => {
      if (
        item.productId === productId &&
        item.color === color &&
        item.size === size
      ) {
        found = true;
        item.quantity += 1;
      }
      return item;
    });
    if (!found)
      cart.push({
        productId,
        name,
        originalPrice,
        currentPrice,
        size,
        color,
        quantity: 1,
      });
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        cart: JSON.stringify(cart),
      },
    });
  }
}
