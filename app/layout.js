import Navbar from "@/components/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Provider from "@/components/Provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "MovieFlix: Discover, Collect, and Explore the World of Movies",
  description:
    "Welcome to MovieFlix, the ultimate web application for movie enthusiasts. With MovieFlix, you can easily search for your favorite movies, explore new releases, and curate personalized collections to suit your unique tastes. Seamlessly organize and manage your movie library, create watchlists, and track your viewing history. Our powerful search engine and intuitive interface make finding the perfect movie a breeze. Enhance your movie-watching experience and optimize your SEO with MovieFlix, the go-to platform for all your movie needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Provider>
          <NextTopLoader color="#c91d25" showSpinner={false} />
          <Navbar />
          <Sidebar />
          <main>{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
