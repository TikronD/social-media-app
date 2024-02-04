import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <header>
        <h1>Movie Discussion</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/blogs">My blogs</Link>
          <Link href="/allblogs">All blogs</Link>
        </nav>
      </header>
    </div>
  );
}
