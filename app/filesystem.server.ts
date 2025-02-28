import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qyvxthkdapcghtixtsgw.supabase.co",
  process.env.SUPABASE_KEY!,
  { auth: { persistSession: false } }
);

export async function getProductImages(id: string) {
  const list = await supabase.storage.from("product.images").list(id);
  return (
    list?.data?.map(
      (image) =>
        supabase.storage
          .from("product.images")
          .getPublicUrl(`${id}/${image.name}`).data.publicUrl
    ) || []
  );
}

export async function getProductThumbnail(id: string) {
  const list = await supabase.storage.from("product.images").list(id);
  if (list.error || list.data.length === 0)
    return {
      error: "Couldn't fetch product list (probably folder doesn't exist)",
      publicURL: undefined,
    };

  const image = supabase.storage
    .from("product.images")
    .getPublicUrl(`${id}/${list.data[0]?.name}`);

  return { error: undefined, publicURL: image.data.publicUrl };
}

export async function uploadImage(bucket: string, name: string, image: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(name, image);
  console.error({ data, error });
  return { data, error };
}
