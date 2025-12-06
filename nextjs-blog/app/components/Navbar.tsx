import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../ModeToggle";
import insanityLogo from "../../public/insanityLogo.png";

export default function Navbar() {
  return (
    <>
      <nav className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-2 py-5">
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
                    src={insanityLogo}
                    alt="title-image"
                />
            </Link>
        <ModeToggle />
      </nav>
    </>
  );
}
