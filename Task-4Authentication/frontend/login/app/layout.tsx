import NavBar from "../components/NavBar";
import "./globals.css";
import Layout from "@/components/Layout";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Layout>
          <NavBar />
          <main>{children}</main>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
