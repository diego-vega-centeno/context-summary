import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Context Summary",
    default: "Context Summary",
  },
  description: "Get the a summary of status with context",
  keywords: ["Next.js", "React", "JavaScript"],
  openGraph: {
    title: "Context Summary",
    description: "Get the a summary of status",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} antialiased`}
    >
      <body className="flex flex-col">
        <ThemeProvider attribute="class">
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
