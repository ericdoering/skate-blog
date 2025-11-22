import { client, urlFor } from "../lib/sanity";
import { simpleBlogCard } from "../../app/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function fetchContent() {
  const query =  `
  *[_type == 'blog'] | order(createdAt, desc) {
  title,
  smallDescription,
  "currentSlug": slug.current,
  titleImage
  }`

  const data = await client.fetch(query)
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await fetchContent();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
        {data.map((post, idx) => (
          <Card key={idx}>
            <Image 
              height={500} 
              width={500} 
              src={urlFor(post.titleImage).url()} 
              alt="image" 
              className="rounded-t-lg h-[200px] object-cover"
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="text-sm line-clamp-3 mt-4">{post.smallDescription}</p>
              <Button className="w-full mt-7" asChild>
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
