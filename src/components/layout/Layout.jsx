import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({
  children,
  title = "Auronova Exports — Premium Kerala Spices Delivered to the World",
  description = "Kerala's premier international spice exporter. Supplying premium quality Malabar black pepper, Idukki green cardamom, Alleppey turmeric, cloves, cinnamon, and ginger directly from Cochin Port.",
  canonical,
}) {
  const url = canonical
    ? `https://auronovaexports.com${canonical}`
    : "https://auronovaexports.com";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#24251F]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
