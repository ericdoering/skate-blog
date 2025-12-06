import { Button } from "@/components/ui/button";
import { client } from "../../app/lib/sanity";
import Link from "next/link";

export default async function Shop() {
  const items = await client.fetch(`
    *[_type == "shopItem"]{
      name,
      _id
    }
  `);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-5">
      {items.map((item) => (
        <Link key={item._id} href={`/shop/${item._id}`}>
          <Button className="bg-secondary rounded-xl shadow-lg p-4 w-full flex items-center justify-center text-white text-center">
            <h1>{item.name}</h1>
          </Button>
        </Link>
      ))}
    </div>
  );
}
