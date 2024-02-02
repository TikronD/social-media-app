import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <header>
        <h1>Movie Discussion</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Make a Post</Link>
        </nav>
      </header>
    </div>
  );
}
