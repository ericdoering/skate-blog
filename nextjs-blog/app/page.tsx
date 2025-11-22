import Link from "next/link";


export default async function Home() {

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
        <button>
        <Link href="/home">
          Enter Site
        </Link>
        </button>
      </div>
    </>
  );
}
