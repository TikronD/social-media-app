"use client";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>404 Error</h2>
      <p>{error.message}</p>
      <Link href="/">Back to my seat</Link>;<button onClick href="/"></button>
    </div>
  );
}
