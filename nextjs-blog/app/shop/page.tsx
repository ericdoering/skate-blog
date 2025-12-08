import { Button } from "@/components/ui/button";
import { client } from "../../app/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImage";

export default async function Shop() {
  const items = await client.fetch(`
    *[_type == "shopItem"]{
      name,
      _id,
      images[]{
        alt,
        image,
        "assetRef": image.asset._ref
      }
    }
  `);

return (
  <div className="px-6 py-10">
    <h1 className="text-5xl font-bold text-center mb-12">Shop</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {items.map((item) => {
        const firstImage = item.images?.[0];
        const imageUrl = firstImage
          ? urlForImage(firstImage.image).width(600).url()
          : null;

        return (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-6"
          >
            <div className="w-full h-80 flex items-center justify-center bg-black rounded-lg">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={firstImage?.alt || item.name}
                  width={400}
                  height={400}
                  className="object-contain h-full w-full"
                />
              )}
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">
              {item.name}
            </h2>
            <Link href={`/shop/${item._id}`} className="w-full mt-6">
              <button className="w-full bg-primary hover:bg-black text-white font-semibold py-3 rounded-lg transition-all duration-200">
                View Item
              </button>
            </Link>
          </div>
        );
      })}
    </div>
    <div className="mt-16 flex justify-center">
      <Link href="/home">
        <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
          Return to Homepage
        </button>
      </Link>
    </div>
  </div>
);
};