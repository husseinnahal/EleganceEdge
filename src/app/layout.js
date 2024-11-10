import "./globals.css";
import { DynaPuff } from "next/font/google";
import Header from "@/Components/Header";
import Footer from "@/Components/footer";
import Signin from "@/Components/singIn";
import Login from "@/Components/login";
import Contextuser from "@/Context/UserContext"

const dyna = DynaPuff({ subsets: ["latin"] });

export const metadata = {
  title: "DevStyle",
  description: "All you are needs, in one stop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={dyna.className}>
          <Contextuser>
            <Header/>
            <Signin/>
            <Login/>
            {children}
          </Contextuser>
          <Footer/>
      </body>
    </html>
  );
}
