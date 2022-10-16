import fs from "fs";
import type { Product } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qyvxthkdapcghtixtsgw.supabase.co",
  process.env.SUPABASE_KEY!
);

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

export async function getProductThumbnail(id: Product["id"]) {
  const list = await supabase.storage
    .from("product.images")
    .list(id.toString());
  if (list.error || !list.data)
    return {
      error: "Couldn't fetch product list (probably folder doesn't exist)",
      publicURL: undefined,
    };

  const image = supabase.storage
    .from("product.images")
    .getPublicUrl(`${id}/${list.data[0].name}`);

  if (image.error || !image.publicURL)
    return { error: "Couldn't get image publicURL", publicURL: undefined };

  return { error: undefined, publicURL: image.publicURL };
}
