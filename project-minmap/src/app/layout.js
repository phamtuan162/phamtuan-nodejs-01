import { getServerSession } from "next-auth";
import { Providers } from "./Providers.jsx";
import SessionProvider from "./SessionProviders.jsx";
import Header from "@/components/Header/Header.js";
import Footer from "@/components/Footer/Footer.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
export const metadata = {
  title: "Min map",
  description: "Min map",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Providers>
          <SessionProvider session={session}>
            <ToastContainer />
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
