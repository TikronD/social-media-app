import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import CreateProfile from "@/components/CreateProfile";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// db from SUPABASE currently offline
// import { db } from "@/library/db";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Sora } from "next/font/google";

const inter = Sora({ subsets: ["latin"] });

export const metadata = {
  title: "Social Media App",
  description:
    "This app has a user sign up with follow, like and messaging applications",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();
  // change sql to db for SUPABASE: const profilesResults = await db.query(
  // Does the user has an account in the database? See 35-38 below - userId is from Clerk, profileResults is from Versel Postgress
  const profilesResults =
    await sql`SELECT * from profiles WHERE clerk_user_id = ${userId}`;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="h-screen">
            <UserButton afterSignOutUrl="/" />
          </div>
          <Theme>
            <Header />
            <main>
              {/* checks if user has a Clark profile in the database */}
              {profilesResults.rowCount !== 0 && children}
              {/* direct user to create a profile if not existing in Clark */}
              {profilesResults.rowCount === 0 && <CreateProfile />}
            </main>
            <Footer />
            <ThemePanel />
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
