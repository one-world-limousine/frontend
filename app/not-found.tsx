import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main id="main" className="nf">
        <div className="ow-wrap">
          <SectionHeading
            as="h1"
            eyebrow="Error 404"
            title="This page has taken a different route."
            lead="The address may have changed. Your chauffeur, however, is still ready."
          >
            <div className="ow-row" style={{ marginTop: 16 }}>
              <Button href="/book" size="lg">
                Book your ride
              </Button>
              <Button href="/" size="lg" variant="secondary" icon={null}>
                Back to home
              </Button>
            </div>
          </SectionHeading>
        </div>
      </main>
      <Footer />
    </>
  );
}
