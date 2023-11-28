import Packages from "@/components/Packages/Packages";
import Services from "@/components/Services/Services";
import { getData } from "@/utils/getData";
export default async function Home() {
  const pages = await getData();

  return (
    <main>
      <Packages pages={pages} />
      <Services />
    </main>
  );
}
