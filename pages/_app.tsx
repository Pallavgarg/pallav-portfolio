import type { AppProps } from "next/app";
import { Ubuntu } from "next/font/google";
import "../styles/globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ubuntu.variable}>
      <Component {...pageProps} />
    </main>
  );
}
