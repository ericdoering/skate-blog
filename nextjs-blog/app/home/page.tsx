import { client, urlFor } from "../lib/sanity";
import { simpleBlogCard } from "../../app/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function fetchContent() {
  const blogQuery = `
    *[_type == 'blog'] {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
    }`;

  const shopItemImageQuery = `
    *[_type == "globalAssets"][0]{
      shopItems
    }
  `;

  const blogData = await client.fetch(blogQuery);
  const shopItemImageData = await client.fetch(shopItemImageQuery);

  return { blogData, shopItemImageData };
}

export default async function Home() {
  const { blogData, shopItemImageData } = await fetchContent();

  return (
    <div className="mt-5 space-y-5 flex flex-col items-center">
      <Card className="w-full max-w-2xl flex flex-col overflow-hidden shadow-md">
        <CardContent className="flex flex-row items-center justify-between">
          {shopItemImageData?.shopItems?.map((image: any, index: number) => (
            <Image
              key={image._key}
              height={90}
              width={90}
              src={urlFor(image.asset).url()}
              alt={`shop image ${index + 1}`}
              className={`rounded ${index % 2 === 0 ? "levitateOne" : "levitateTwo"}`}
            />
          ))}

          <Link href="/shop">
            <Button className="cursor-pointer hover:bg-orange-800">Visit Store</Button>
          </Link>
        </CardContent>
      </Card>

      {blogData.map((post, idx) => (
        <Card key={idx} className="w-full max-w-2xl flex flex-col overflow-hidden shadow-md">
          <div className="w-full flex justify-center">
            <Image
              height={500}
              width={500}
              src={post.titleImage ? urlFor(post.titleImage).url() : "/placeholder.jpg"}
              alt={post.title}
              className="h-[200px] mt-4 w-11/12 object-cover rounded-lg"
            />
          </div>
          <CardContent className="p-5 flex flex-col">
            <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
            <p className="text-sm mt-3 line-clamp-3">{post.smallDescription}</p>
            <Button className="w-full mt-5 hover:bg-orange-800" asChild>
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
