import { client } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/urlForImage";

async function getData(id: string) {
  const query = `
    *[_type == "shopItem" && _id == "${id}"]{
      name,
      description,
      price,
      available,
       images[]{
        alt,
        image,
        "assetRef": image.asset._ref
      },
    }[0]
  `;

  return await client.fetch(query);
}

export default async function ShopItemPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params?.id);

  if (!data) {
    return <div className="mt-20 text-center">Item not found.</div>;
  }

  const firstImage = data?.images?.[0];
  const imageUrl = firstImage
    ? urlForImage(firstImage.image).width(600).url()
    : null;

  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center">{data.name}</h1>
      <p className="text-xl mt-4 text-center">{data.description}</p>

      {imageUrl && (
        <div className="mt-8 flex justify-center">
          <Image
            src={imageUrl}
            alt={firstImage.alt || data.name}
            width={400}
            height={400}
            className="object-contain rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="mt-6 text-center">
        <span className="text-2xl font-semibold">${data.price}.00</span>
      </div>

      <div className="mt-6 flex justify-center">
        <Button className="cursor-pointer" disabled={!data.available}>
          {data.available ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/shop">
          <Button className="cursor-pointer" variant="secondary">Back to Shop</Button>
        </Link>
      </div>
    </div>
  );
}
