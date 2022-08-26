import type { Password, User as DefaultUser } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

type User = DefaultUser & {
  name: string;
  lastName: string;
  phone: string;
  role: string;
};

export type { User };

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
