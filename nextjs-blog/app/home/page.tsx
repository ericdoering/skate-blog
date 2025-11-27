import { client, urlFor } from "../lib/sanity";
import { simpleBlogCard } from "../../app/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
        {data.map((post, idx) => (
          <Card
            key={idx}
            className="w-full max-w-xl flex flex-col overflow-hidden shadow-md"
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
