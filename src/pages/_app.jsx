import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { WebsiteDataProvider } from "@/context/WebsiteDataContext";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <WebsiteDataProvider>
      <div className={`${manrope.variable} ${manrope.className} font-sans`}>
        <Layout
          title={pageProps.title}
          description={pageProps.description}
          canonical={pageProps.canonical}
        >
          <Component {...pageProps} />
        </Layout>
      </div>
    </WebsiteDataProvider>
  );
}
