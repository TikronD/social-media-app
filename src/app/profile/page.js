import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import SubmitButton from "../components/SubmitButton";

export default async function Profile() {
  const { userId } = auth();

  const user =
    await sql`SELECT * FROM profiles where clerk_user_id = ${userId}`;

  async function handleCreateUser(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");
    const location = formData.get("location");

    await sql`INSERT INTO profiles (clerk_user_id, username, bio, location) VALUES (${userId}, ${username}, ${bio}, ${location}) `;
    revalidatePath("/profile");
  }
  return (
    <div>
      {user.rowCount === 0 && (
        <form action={handleCreateUser}>
          <h2>Create Profile</h2>
          <input name="username" placeholder="Enter a Username" />
          <textarea name="bio" placeholder="Enter a bio"></textarea>
          <input name="location" placeholder="Location" />
          <SubmitButton />
        </form>
      )}
      {user.rowCount !== 0 && (
        <div>
          <div className="username-bio">
            <h4>{`Username: ${user.rows[0].username}`}</h4>
            <h4>{`Bio: ${user.rows[0].bio}`}</h4>
            <h4>{`Location: ${user.rows[0].location}`}</h4>
          </div>
          <Link href="/blogs">
            <p>My Blogs</p>
          </Link>
          <Link href="/allblogs">
            <p>All Blogs</p>
          </Link>
        </div>
      )}
    </div>
  );
}
