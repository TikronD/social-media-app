import AddPostButton from "@/components/AddPostButton";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import "./addpost.css";
import { redirect } from "next/navigation";
// import Link from "next/link";

export default function AddMessage() {
  async function handleAddMessage(formData) {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");

    console.log(title, content);

    await sql`INSERT INTO posts (title, content) VALUES (${title}, ${content})`;

    revalidatePath("/");
    redirect("/");
  }
  return (
    <div>
      <h2>Your Message</h2>
      <form action={handleAddMessage}>
        <lable htmlFor="title">Movie Title:</lable>
        <input name="title" id="title" placeholder="Title of movie" />
        <label htmlFor="content">Your Message:</label>
        <textarea name="content" placeholder="content" />
        <AddPostButton />
      </form>
    </div>
  );
}
