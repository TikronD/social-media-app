import { revalidatePath } from "next/cache";

export default async function LikeButton(post_id) {
  const user_id = auth();
  const likes = await sql`SELECT * posts_likes = ${post_id}`;
  async function HandleLike() {
    "use server";
    console.log(id);
    await sql`INSERT INTO posts_likes (profile_id, post_id) VALUES (${user_id}, ${post_id})`;
    // await sql`INSERT INTO posts_likes (profile_id, post_id) VALUES (${profile_id}, ${post_id})`;
    revalidatePath("/");
  }
  return (
    <form action={HandleLike}>
      <p>{likes.rows.length}</p>
      {/* this button in the form adds a query parameter */}
      <button>Like this post</button>
    </form>
  );
}
