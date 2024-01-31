import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

Clerk;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "social Media App",
  description:
    "This app has a user sign up with follow, like and messaging applications",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {/* <div className="h-screen"> */}
      <UserButton afterSignOutUrl="/" />
      {/* </div> */}
      <html lang="en">
        <body className={inter.className}>
          <h1>Movie Discussions</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
