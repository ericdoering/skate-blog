import { client } from "../app/lib/sanity";
import VideoPlayer from "../app/components/VideoPlayer";
import { fileUrl } from "@/lib/urlForFile";

export default async function Home() {
  const data = await client.fetch(`
    *[_type == "landingPage"][0]{
      heroVideo
    }
  `);

  const videoUrl = fileUrl(data?.heroVideo);

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="bg-primary w-full h-4 mb-4 rounded-xl shadow-lg"></div>
      <VideoPlayer videoUrl={videoUrl} />
      <div className="bg-primary w-full h-4 mt-4 rounded-xl shadow-lg"></div>
    </div>
  );
}