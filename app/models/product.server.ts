import type { Product } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getProductById(id: Product["id"]) {
  return await prisma.product.findUnique({ where: { id } });
}

export async function getProducts() {
  return await prisma.product.findMany({
    where: { archive: false },
    select: {
      id: true,
      name: true,
      currentPrice: true,
      originalPrice: true,
    },
  });
}

export async function getProductsOnSale() {
  return await prisma.product.findMany({
    where: { archive: false, currentPrice: {not: null} },
    select: {
      id: true,
      name: true,
      currentPrice: true,
      originalPrice: true,
    },
  });
}

export function getAllProduct() {
  return prisma.product.findMany();
}

export async function getFilters() {
  const products = await prisma.product.findMany({
    select: { categories: true },
  });
  let categories: string[] = [];
  (await products).map((product) => {
    return categories.push(...product.categories);
  });
  categories = [...new Set(categories)];
  return { categories };
}

export async function getEveryPossibleCategory() {
  // TODO this needs to be distinct
  // probably pass column name and filter received data
  // ! note that categories is an array item
  return await getFilters();
}

export async function addNewProduct(
  name: Product["name"],
  description: Product["description"],
  originalPrice: Product["originalPrice"],
  currentPrice: Product["currentPrice"],
  categories: Product["categories"],
  archive: Product["archive"]
) {
  return await prisma.product.create({
    data: {
      name,
      description,
      originalPrice,
      currentPrice,
      categories,
      archive,
    },
  });
}

export async function updateProduct(
  id: Product["id"],
  name: Product["name"],
  description: Product["description"],
  originalPrice: Product["originalPrice"],
  currentPrice: Product["currentPrice"],
  categories: Product["categories"],
  archive: Product["archive"]
) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      originalPrice,
      currentPrice,
      categories,
      archive,
    },
  });
}
