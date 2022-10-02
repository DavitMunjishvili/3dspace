import fs from "fs";
import type { Product } from "@prisma/client";

export function addProductImages(id: string, images?: string[]) {
  const dir = `app/assets/productImages/${id}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getProductImages(id: string) {
  const dir = `app/assets/productImages/${id}`;
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const images = files.map((file) => {
      try {
        const image = fs.readFileSync(`${dir}/${file}`, {
          encoding: "base64",
        });
        return image;
      } catch {
        console.log("Caught");
        return "";
      }
    });
    return { images };
  } else {
    return { error: "Images don't exist for this item" };
  }
}

export function getProductThumbnail(id: Product["id"]) {
  const dir = `app/assets/productImages/${id}`;
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    try {
      const image = fs.readFileSync(`${dir}/${files[0]}`, {
        encoding: "base64",
      });
      return { image };
    } catch {
      return { error: "Unknown error ocurred while reading a file" };
    }
  } else {
    return { error: "Directory Not Found" };
  }
}
