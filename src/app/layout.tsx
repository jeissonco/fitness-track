import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { TabBar } from "@/components/tab-bar";
import { ThemeToggle, themeInitScript } from "@/components/theme-toggle";
import { Toaster } from "@/components/toast";
import { HowtoSheet } from "@/components/howto-sheet";
import { Icon } from "@/components/icons";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: { default: "Fitness Track", template: "%s · Fitness Track" },
  description: "Workout plans, lifting and cardio tracking, and how-to guides for every machine.",
  appleWebApp: { capable: true, title: "Fitness Track", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">
        <div className="mx-auto max-w-[480px] px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-[calc(96px+env(safe-area-inset-bottom))]">
          <header className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 font-display text-[1.375rem] font-extrabold uppercase tracking-wide">
              <span className="grid size-7 -skew-x-[8deg] place-items-center rounded-lg bg-primary text-primary-foreground">
                <Icon name="dumbbell" className="size-[18px]" />
              </span>
              Fitness Track
            </div>
            <ThemeToggle />
          </header>
          <main>{children}</main>
        </div>
        <TabBar />
        <Toaster />
        <HowtoSheet />
      </body>
    </html>
  );
}
