import MainSearch from "@/components/MainSearch";
import Gallery from "@/components/Gallery";
import Maps from "@/components/Maps";
import Event from "@/components/Event";
import Footer from "@/components/Footer";
import PageDivider from "@/components/Divider";
import Holiday from "@/components/Holiday";
import Sea from "@/components/Sea";

export default function Home() {
  return (
    <>
      <MainSearch />
      <Maps />
      <Gallery />
      <Sea />
      <Holiday />
      <PageDivider />
      <Event />
      <Footer />
      <PageDivider direction="up" background="transparent" />
    </>
  );
}
