import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import ".comment.css";
import AddCommentButton from "@/comment/AddCommentButton";

export default async function AddComment({ params }) {
  const collection =
    await sql`SELECT * FROM comments WHERE post_id = ${params.id}`;
  const commenttitle = await sql`SELECT * FROM posts WHERE id = ${params.id}`;

  async function handleComment(formData) {
    "user server";
    const content = formData.get("content");

    await sql`INSERT INTO comment (content) VALUES (${comment})`;

    revalidatePath("/");
    redirect("/");
  }
  return (
    // See Movie post title
    <div>
      <h2>{commenttitle.rows[0].posts}</h2>
      <hr />
      <form action={handleComment}>
        <label for="comment"></label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Enter your comment..."
          rows="4"
          cols="50"
        />
        <AddCommentButton />
      </form>
    </div>
  );
}
