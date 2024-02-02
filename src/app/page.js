// // import { db } from "@/library/db.js";
// // import { Flex, Text, Button } from "@radix-ui/themes";

// export default async function Home() {
//   // const results = await db.query("SELECT * FROM profiles");
//   // console.log(results);
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function Home({ searchParams }) {
  let posts = await sql`SELECT * FROM posts`;

  let profiles = await sql`SELECT * FROM profiles`;

  if (searchParams.sort === "name") {
    posts.rows.sort((a, b) => a.game.localeCompare(b.game));
  }

  if (searchParams.sort === "reverse") {
    posts.rows.reverse();
  }

  return (
    <div>
      <h2>Movie Forum</h2>
      <nav>
        <Link href="/">Sort by newest</Link>
        <Link href={`/?sort=reverse`}>Oldest First</Link>
      </nav>
      <hr />
      {posts.rows.map((posts) => {
        return (
          <div key={posts.title} className="post">
            <Link href={`/posts/${posts.id}`}>
              <nav>
                <h2>{posts.title}</h2>
              </nav>
            </Link>
            <div className="detail">
              <h3>User: {profiles.Username}</h3>
              <h3>Discussion: {posts.content}</h3>
              <hr />
            </div>
          </div>
        );
      })}
    </div>
  );
}
