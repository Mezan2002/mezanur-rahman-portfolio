import AIChatbot from "@/components/AIChatbot";
import ClientLayout from "@/components/ClientLayout";
import CustomCursor from "@/components/cursor/CustomCursor";
import { Montserrat, Syne } from "next/font/google"; // Import Syne
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata = {
  title: "MEZANUR | Creative Developer",
  description: "Portfolio of Mezanur Rahman - Creative Developer & Designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${syne.variable}`}>
      <body className={montserrat.className}>
        <CustomCursor />
        <ClientLayout>{children}</ClientLayout>
        <AIChatbot />
      </body>
    </html>
  );
}
