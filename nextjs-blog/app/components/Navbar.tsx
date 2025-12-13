import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import insanityLogo from "../../public/insanityLogo.png";
import { client } from "../../app/lib/sanity";
import { fileUrl } from "@/lib/urlForFile";

export default async function Navbar() {
  const data = await client.fetch(`
    *[_type == "globalAssets"][0]{
      navbarLogo
    }
  `);

  const navbarLogo = fileUrl(data?.navbarLogo);

  return (
    <>
      <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-2 pt-5">
            <Link
            href="/home"
            className="flex items-center gap-2 font-bold text-3xl"
            >
            <span className="text-4xl">Insanity</span>
            <span className="text-primary text-4xl">Skateboards</span>
                <Image
                    className="rounded-lg border"
                    height={65}
                    width={65}
                    src={navbarLogo || ""}
                    alt="title-image"
                />
            </Link>
        <ModeToggle />
      </nav>
    </>
  );
}
