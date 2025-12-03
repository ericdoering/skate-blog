import { client } from "../../app/lib/sanity";
import { fileUrl } from "@/lib/urlForFile";

export default async function Shop() {
  const data = await client.fetch(`
    *[_type == "landingPage"][0]{
      heroVideo
    }
  `);

  const videoUrl = fileUrl(data?.heroVideo);

  return (
    <div className="grid grid-cols-1 mt-5 gap-5">
      <div className="bg-primary w-full h-15 rounded-xl shadow-lg"></div>
      <div className="bg-primary w-full h-15 rounded-xl shadow-lg"></div>
    </div>
  );
}