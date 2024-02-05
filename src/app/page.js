import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";
// import * as Separator from "@radix-ui/react-separator";
// <Separator.Root className="SeparatorRoot" style={{ margin: '15px 0' }} />

export default async function Home() {
  const { userId } = auth();

  const user =
    await sql`SELECT * FROM profiles where clerk_user_id = ${userId}`;
  return (
    <>
      {userId && user.rowCount === 0 && (
        <div>
          <Link href="/profile">
            <p>Create Profile</p>
          </Link>
        </div>
      )}
      {userId && user.rowCount !== 0 && (
        <div>
          <Link href="/profile">My profile</Link>
        </div>
      )}
    </>
  );
}

// import { sql } from "@vercel/postgres";
// import Link from "next/link";

// export default async function Home({ searchParams }) {
//   let posts = await sql`SELECT * FROM posts`;
//   let profiles = await sql`SELECT * FROM profiles`;

//   if (searchParams.sort === "name") {
//     posts.rows.sort((a, b) => a.game.localeCompare(b.game));
//   }

//   if (searchParams.sort === "reverse") {
//     posts.rows.reverse();
//   }

//   return (
//     <div>
//       <h2>Movie Forum</h2>
//       <nav>
//         <Link href="/">Sort by newest</Link>
//         <Link href={`/?sort=reverse`}>Oldest First</Link>
//       </nav>
//       <hr />
//       {posts.rows.map((posts) => {
//         return (
//           <div key={posts.title} className="post">
//             <Link href={`/posts/${posts.id}`}>
//               <nav>
//                 <h2>{posts.title}</h2>
//               </nav>
//             </Link>
//             <div className="detail">
//               <h3>User: {profiles.Username}</h3>
//               <h3>Discussion: {posts.content}</h3>
//               <hr />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
