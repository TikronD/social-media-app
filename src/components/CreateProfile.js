import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import "./createprofile.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

export default function CreateProfile() {
  const { userId } = auth();

  async function addNewProfile(formData) {
    // this function runs on the server
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");
    const location = formData.get("location");

    await sql`INSERT INTO profiles (clerk_user_id, username, bio, location) VALUES (${userId}, ${username}, ${bio}, ${location})`;
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>To see posts you need to create a User Profile</h2>
      <form action={addNewProfile}>
        <input name="username" placeholder="Username" />
        <textarea name="bio" placeholder="bio" />
        <input name="location" placeholder="Location" />
        <SubmitButton />
      </form>
    </div>
  );
}
