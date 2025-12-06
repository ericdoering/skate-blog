import { client, urlFor } from "../lib/sanity";
import { simpleBlogCard } from "../../app/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import shopImage from "../../public/shopImage.png";
import shopImage2 from "../../public/shopImage2.png";
import shopImage3 from "../../public/shopImage3.png";

async function fetchContent() {
  const query = `
  *[_type == 'blog'] | order(createdAt, desc) {
  title,
  smallDescription,
  "currentSlug": slug.current,
  titleImage
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await fetchContent();

  return (
    <>
      <div className="mt-5 space-y-5 flex flex-col items-center">
        <Card className="w-full max-w-2xl flex flex-col overflow-hidden shadow-md">
          <CardContent className="flex flex-row items-center justify-between">
            <Image
              height={90}
              width={90}
              src={shopImage}
              alt="shop image 1"
              className="rounded levitateOne"
            />
            <Image
              height={90}
              width={90}
              src={shopImage2}
              alt="shop image 2"
              className="rounded levitateTwo"
            />
            <Image
              height={90}
              width={90}
              src={shopImage3}
              alt="shop image 3"
              className="rounded levitateOne"
            />
            <Link href="/shop">
              <Button>Visit Store</Button>
            </Link>
          </CardContent>
        </Card>

        {data.map((post, idx) => (
          <Card
            key={idx}
            className="w-full max-w-2xl flex flex-col overflow-hidden shadow-md"
          >
            <div className="w-full flex justify-center">
              <Image
                height={500}
                width={500}
                src={urlFor(post.titleImage).url()}
                alt={post.title}
                className="h-[200px] mt-4 w-6/7 object-cover rounded-lg"
              />
            </div>
            <CardContent className="p-5 flex flex-col">
              <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
              <p className="text-sm mt-3 line-clamp-3">
                {post.smallDescription}
              </p>
              <Button className="w-full mt-5" asChild>
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
