import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { db } from "@/library/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Media App",
  description:
    "This app has a user sign up with follow, like and messaging applications",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();
  const profilesResults = await db.query(
    `SELECT * from profiles WHERE clerk_user_id = ${userId}`
  );
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="h-screen">
            <UserButton afterSignOutUrl="/" />
          </div>
          <h1>Movie Discussions</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
