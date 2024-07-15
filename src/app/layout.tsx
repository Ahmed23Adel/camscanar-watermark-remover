import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camscanar Watermark Remover - Remove Watermarks Easily",
  description: "Effortlessly remove watermarks from your Camscanar images. Try our free online watermark remover tool today.",
  keywords: "Camscanar, watermark removal, remove watermarks, PDF watermark remover, free watermark remover",
  authors: [{ name: "Ahmed Adel", url: "https://github.com/Ahmed23Adel" }],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorsContent = Array.isArray(metadata.authors)
    ? metadata.authors.map(author => `${author.name} (${author.url})`).join(", ")
    : '';
  const keywordsContent = typeof metadata.keywords === 'string'
    ? metadata.keywords
    : metadata.keywords?.join(', ') || '';
  const titleContent = typeof metadata.title === 'string' ? metadata.title : '';

  return (
    <html lang="en">
      <head>
        <title>{titleContent}</title>
        <meta name="description" content={metadata.description ?? ''} />
        <meta name="keywords" content={keywordsContent} />
        <meta name="author" content={authorsContent} />
        <meta name="viewport" content={typeof metadata.viewport === 'string' ? metadata.viewport : ''} />
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
