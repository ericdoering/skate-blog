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
      sku,
      available,
      images[]{
        alt,
        image,
        "assetRef": image.asset._ref
      }
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
    return <div className="mt-20 text-center text-muted-foreground">Item not found.</div>;
  }

  const firstImage = data?.images?.[0];
  const imageUrl = firstImage
    ? urlForImage(firstImage.image).width(600).height(600).url()
    : null;

  return (
    <div className="mx-auto mt-12 max-w-3xl px-4">
      <div className="relative mx-auto mb-10 aspect-square w-full max-w-xs overflow-hidden rounded-xl border">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={firstImage.alt || data.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        <p className="text-sm">SKU: {data.sku}</p>
        <p className="max-w-xl text-base leading-relaxed">
          {data.description}
        </p>
        <span className="mt-2 text-2xl font-medium">${data.price}.00</span>
        <div className="mt-2 w-full max-w-xs">
          <Button
            className={`w-full cursor-pointer ${data.available
                ? "bg-green-100 text-green-800 hover:bg-green-300"
                : "bg-red-100 text-red-800 hover:bg-red-300"
              }`}
            disabled={!data.available}
          >
            {data.available ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="/shop">
          <Button className="cursor-pointer hover:bg-orange-800">Back to Shop</Button>
        </Link>
      </div>
    </div>
  );
}
