import { client } from "./lib/sanity"

async function fetchContent() {
  const query =  `
  *[_type == 'blog'] | order(createdAt, desc) {
  title,
  smallDescription,
  "currentSlug": slug.current,
  }`

  const data = await client.fetch(query)

  return data;
}

export default async function Home() {
  const data = await fetchContent();

  console.log("DATA =>", data)
  return (
    <>
      <div>
        <h1>Hello from the Index Page</h1>
      </div>
    </>
  );
}
