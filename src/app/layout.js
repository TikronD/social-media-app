import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import CreateProfile from "@/components/CreateProfile";
// db from SUPABASE currently offline
// import { db } from "@/library/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Media App",
  description:
    "This app has a user sign up with follow, like and messaging applications",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();
  // change sql to db for SUPABASE: const profilesResults = await db.query(
  const profilesResults =
    await sql`SELECT * from profiles WHERE clerk_user_id = ${userId}`;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="h-screen">
            <UserButton afterSignOutUrl="/" />
          </div>
          <h1>Movie Discussions</h1>
          {/* checks if user has a Clark profile in the database */}
          {profilesResults.rowCount !== 0 && children}
          {/* direct user to create a profile if not existing in Clark */}
          {profilesResults.rowCount === 0 && <CreateProfile />}
        </body>
      </html>
    </ClerkProvider>
  );
}
