import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="navigation">
        <Link href="/">Home</Link>
        <Link href="/form">Form</Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
