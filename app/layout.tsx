import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twitfiend Saga",
  description:
    "Enter the world of Twitfiend Saga—where obsession never ends. Read for free with unlimited access and lose yourself in the endless cycle of tweets and madness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
