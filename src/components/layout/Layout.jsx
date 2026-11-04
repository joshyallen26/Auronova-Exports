import { useRouter } from "next/router";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { MessageCircle } from "lucide-react";

export default function Layout({
  children,
  title: propTitle = "Auronova Exports — Premium Kerala Spices Delivered to the World",
  description: propDescription = "Kerala's premier international spice exporter. Supplying premium quality Malabar black pepper, Idukki green cardamom, Alleppey turmeric, cloves, cinnamon, and ginger directly from Cochin Port.",
  canonical: propCanonical,
}) {
  const router = useRouter();
  const { seo, integrations } = useWebsiteData();

  // Admin routes handle their own dedicated layout
  if (router.pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // Look for CMS SEO overrides for the current route
  const pageSeo = seo?.find((s) => s.page === router.pathname);

  const title = pageSeo?.metaTitle || propTitle;
  const description = pageSeo?.metaDescription || propDescription;
  const canonicalUrl = pageSeo?.canonicalUrl || (propCanonical ? `https://auronovaexports.com${propCanonical}` : "https://auronovaexports.com");
  const ogTitle = pageSeo?.ogTitle || title;
  const ogDescription = pageSeo?.ogDescription || description;
  const ogImage = pageSeo?.ogImage || "https://auronovaexports.com/images/hero-spices.jpg";

  // WhatsApp floating button config
  const waNumber = (integrations?.whatsappNumber || "+91 94000 00000").replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    integrations?.whatsappPrefilledMessage ||
      "Hello Auronova Exports, I am interested in sourcing Indian spices from your export catalogue."
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {pageSeo?.keywords && <meta name="keywords" content={pageSeo.keywords} />}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#24251F] relative">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Global Floating WhatsApp Contact Button */}
        {waNumber && (
          <aside
            aria-label="Contact options"
            className="fixed bottom-6 right-6 z-40 group flex items-center"
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
              aria-label="Chat with export desk on WhatsApp"
            >
              <MessageCircle size={22} className="fill-white text-transparent flex-shrink-0" />
              <span className="hidden md:inline text-xs font-bold tracking-wide pr-1">
                Chat on WhatsApp
              </span>
            </a>
          </aside>
        )}
      </div>
    </>
  );
}
