import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <h1>Hello from the Index Page</h1>
      </div>
    </>
  );
}
