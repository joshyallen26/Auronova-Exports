import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts preconnect and Manrope weights 400, 500, 600, 700 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#4A2C20" />
        <meta name="author" content="Auronova Exports" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Auronova Exports" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body className="antialiased bg-[#FAF7F0] text-[#34332E]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
