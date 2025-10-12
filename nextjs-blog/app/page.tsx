import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "../app/lib/interface";
import { Card } from "@/components/ui/card";
import Image from "next/image";

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
      <div className="grid grid-cols-1 lg:grid-cols-4 mt-5">
        {data.map((post, idx) => (
          <Card key={idx}>
            <Image 
              height={500} 
              width={500} 
              src={urlFor(post.titleImage).url()} 
              alt="image" 
            />
          </Card>
        ))}
      </div>
    </>
  );
}
