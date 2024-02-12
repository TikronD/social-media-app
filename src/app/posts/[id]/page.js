import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import "./addpost.css";
import { redirect } from "next/navigation";
import AddBlogButton from "@/app/components/AddBlogButton";

export default async function AddComment({ params }) {
  const collection =
    await sql`SELECT * FROM comments WHERE post_id = ${params.id}`;
  const title = await sql`SELECT * FROM posts WHERE id = ${params.id}`;

  async function handleComment(formData) {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");

    await sql`INSERT INTO posts (title, content) VALUES (${title}, ${content})`;

    revalidatePath(`/posts/${params.id}`);
    redirect("/");
  }
  return (
    <div>
      <h2>{title.rows[0].game}</h2>
      <form action={handleComment}>
        <lable htmlFor="title">Movie Title:</lable>
        <input name="title" id="title" placeholder="Title of movie" />
        <label htmlFor="content">Your Message:</label>
        <textarea name="content" placeholder="content" />
        <AddBlogButton />
      </form>
    </div>
  );
}

// export default async function AddMessage() {
//   async function handleAddMessage(formData) {
//     "use server";
//     const title = formData.get("title");
//     const content = formData.get("content");

//     console.log(title, content);

//     await sql`INSERT INTO posts (title, content) VALUES (${title}, ${content})`;

//     revalidatePath("/");
//     redirect("/");
//   }
//   return (
//     <div>
//       <h2>Your Message</h2>
//       <form action={handleAddMessage}>
//         <lable htmlFor="title">Movie Title:</lable>
//         <input name="title" id="title" placeholder="Title of movie" />
//         <label htmlFor="content">Your Message:</label>
//         <textarea name="content" placeholder="content" />
//         <AddPostButton />
//       </form>
//     </div>
//   );
// }
