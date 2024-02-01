import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Media App",
  description:
    "This app has a user sign up with follow, like and messaging applications",
};

export default function RootLayout({ children }) {
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
