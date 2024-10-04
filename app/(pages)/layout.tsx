import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="px-4 xl:px-6">{children}</main>
      <Footer />
    </div>
  );
}
