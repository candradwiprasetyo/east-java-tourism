"use client";

import MainSearch from "@/components/MainSearch";
import Gallery from "@/components/Gallery";
import Maps from "@/components/Maps";
import Event from "@/components/Event";
import Footer from "@/components/Footer";
import PageDivider from "@/components/Divider";

export default function Home() {
  return (
    <>
      <MainSearch />
      <PageDivider />
      <Maps />
      <PageDivider direction="up" />
      <Gallery />
      <PageDivider />
      <Event />
      <Footer />
      <PageDivider direction="up" />
    </>
  );
}
