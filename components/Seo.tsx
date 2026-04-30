import Head from "next/head";
import { profile } from "../data/profile";

export function Seo() {
  return (
    <Head>
      <title>{`${profile.name} | ${profile.role}`}</title>
      <meta name="description" content={profile.summary} />
      <meta property="og:title" content={`${profile.name} | ${profile.role}`} />
      <meta property="og:description" content={profile.summary} />
    </Head>
  );
}
