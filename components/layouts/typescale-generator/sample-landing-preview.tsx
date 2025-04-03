import * as React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SampleLandingPreviewProps {
  fontFamily: string;
  baseSize: number;
  scale: number;
  sampleText?: string;
}

export function SampleLandingPreview({
  fontFamily,
  baseSize,
  scale,
  sampleText = "Typescale preview",
}: SampleLandingPreviewProps) {
  // Function to calculate font size based on scale
  const calculateSize = (
    baseSize: number,
    ratio: number,
    step: number
  ): number => {
    return parseFloat((baseSize * Math.pow(ratio, step)).toFixed(2));
  };

  // Create CSS variables for different text sizes
  React.useEffect(() => {
    const root = document.documentElement;

    // Set CSS variables for the preview
    root.style.setProperty("--preview-font-family", fontFamily);
    root.style.setProperty(
      "--preview-font-small",
      `${calculateSize(baseSize, scale, -2)}px`
    );
    root.style.setProperty("--preview-font-base", `${baseSize}px`);
    root.style.setProperty(
      "--preview-font-h5",
      `${calculateSize(baseSize, scale, 1)}px`
    );
    root.style.setProperty(
      "--preview-font-h4",
      `${calculateSize(baseSize, scale, 2)}px`
    );
    root.style.setProperty(
      "--preview-font-h3",
      `${calculateSize(baseSize, scale, 3)}px`
    );
    root.style.setProperty(
      "--preview-font-h2",
      `${calculateSize(baseSize, scale, 4)}px`
    );
    root.style.setProperty(
      "--preview-font-h1",
      `${calculateSize(baseSize, scale, 5)}px`
    );

    // Cleanup on unmount
    return () => {
      root.style.removeProperty("--preview-font-family");
      root.style.removeProperty("--preview-font-small");
      root.style.removeProperty("--preview-font-base");
      root.style.removeProperty("--preview-font-h5");
      root.style.removeProperty("--preview-font-h4");
      root.style.removeProperty("--preview-font-h3");
      root.style.removeProperty("--preview-font-h2");
      root.style.removeProperty("--preview-font-h1");
    };
  }, [fontFamily, baseSize, scale]);

  // Inline styles for preview container only
  const containerStyle = {
    width: "680px",
    margin: "0 auto",
    fontFamily: "var(--preview-font-family)",
    fontSize: "var(--preview-font-base)",
  };

  return (
    <div className="text-gray-900 dark:text-gray-100" style={containerStyle}>
      {/* Header */}
      <header className="py-6 border-b border-gray-200 dark:border-gray-800">
        <nav className="flex justify-between items-center">
          <div
            style={{ fontSize: "var(--preview-font-h5)" }}
            className="font-bold"
          >
            {sampleText || "Brand"}
          </div>
          <div className="flex gap-6">
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1
            className="font-extrabold mb-4 leading-tight"
            style={{ fontSize: "var(--preview-font-h1)" }}
          >
            {sampleText || "Build better products with typography"}
          </h1>
          <p
            className="max-w-xl mx-auto mb-8 text-gray-600 dark:text-gray-300"
            style={{ fontSize: "var(--preview-font-h5)" }}
          >
            Consistent type scales create visual harmony that guides users
            through your content. Choose the perfect scale for your design.
          </p>
          <Button variant="brand" size="lg">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        {/* Features Section */}
        <section className="py-12 border-b border-gray-200 dark:border-gray-800">
          <h2
            className="font-bold mb-6"
            style={{ fontSize: "var(--preview-font-h3)" }}
          >
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3
                className="font-semibold mb-3"
                style={{ fontSize: "var(--preview-font-h4)" }}
              >
                Modular Type Scales
              </h3>
              <p>
                Create harmonious visual relationships based on mathematical
                ratios like the Golden Ratio or Perfect Fourth.
              </p>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3
                className="font-semibold mb-3"
                style={{ fontSize: "var(--preview-font-h4)" }}
              >
                Responsive Typography
              </h3>
              <p>
                Ensure your typography scales beautifully across all devices and
                screen sizes with responsive type scales.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-12 border-b border-gray-200 dark:border-gray-800">
          <h2
            className="font-bold mb-6"
            style={{ fontSize: "var(--preview-font-h3)" }}
          >
            What our customers say
          </h2>
          <div className="flex flex-col gap-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current text-yellow-400"
                />
              ))}
            </div>
            <p className="italic">
              &quot;The typography system transformed our design process. We now
              have a consistent visual hierarchy that communicates effectively
              across all our platforms.&quot;
            </p>
            <div>
              <div className="font-semibold">Sarah Johnson</div>
              <div
                style={{ fontSize: "var(--preview-font-small)" }}
                className="text-gray-500 dark:text-gray-400"
              >
                Design Director, Acme Inc.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-gray-500 dark:text-gray-400"
        style={{ fontSize: "var(--preview-font-small)" }}
      >
        <div className="flex justify-between">
          <div>© 2023 {sampleText || "Brand"}. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
