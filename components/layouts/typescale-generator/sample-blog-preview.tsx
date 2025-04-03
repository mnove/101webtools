import * as React from "react";
import {
  Calendar,
  Clock,
  User,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-react";

interface SampleBlogPreviewProps {
  fontFamily: string;
  baseSize: number;
  scale: number;
  sampleText?: string;
}

export function SampleBlogPreview({
  fontFamily,
  baseSize,
  scale,
  sampleText = "Typography in Design",
}: SampleBlogPreviewProps) {
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
    root.style.setProperty("--blog-font-family", fontFamily);
    root.style.setProperty(
      "--blog-font-small",
      `${calculateSize(baseSize, scale, -2)}px`
    );
    root.style.setProperty("--blog-font-base", `${baseSize}px`);
    root.style.setProperty(
      "--blog-font-h5",
      `${calculateSize(baseSize, scale, 1)}px`
    );
    root.style.setProperty(
      "--blog-font-h4",
      `${calculateSize(baseSize, scale, 2)}px`
    );
    root.style.setProperty(
      "--blog-font-h3",
      `${calculateSize(baseSize, scale, 3)}px`
    );
    root.style.setProperty(
      "--blog-font-h2",
      `${calculateSize(baseSize, scale, 4)}px`
    );
    root.style.setProperty(
      "--blog-font-h1",
      `${calculateSize(baseSize, scale, 5)}px`
    );

    // Cleanup on unmount
    return () => {
      root.style.removeProperty("--blog-font-family");
      root.style.removeProperty("--blog-font-small");
      root.style.removeProperty("--blog-font-base");
      root.style.removeProperty("--blog-font-h5");
      root.style.removeProperty("--blog-font-h4");
      root.style.removeProperty("--blog-font-h3");
      root.style.removeProperty("--blog-font-h2");
      root.style.removeProperty("--blog-font-h1");
    };
  }, [fontFamily, baseSize, scale]);

  // Inline styles for preview container only
  const containerStyle = {
    width: "680px",
    margin: "0 auto",
    fontFamily: "var(--blog-font-family)",
    fontSize: "var(--blog-font-base)",
  };

  return (
    <div className="text-gray-900 dark:text-gray-100" style={containerStyle}>
      {/* Blog Header */}
      <header className="mb-8">
        <h1
          className="font-bold mb-4 leading-tight"
          style={{ fontSize: "var(--blog-font-h1)" }}
        >
          {sampleText || "The Art of Typography in Digital Design"}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span style={{ fontSize: "var(--blog-font-small)" }}>
              By Sarah Johnson
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span style={{ fontSize: "var(--blog-font-small)" }}>
              May 15, 2023
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span style={{ fontSize: "var(--blog-font-small)" }}>
              5 min read
            </span>
          </div>
        </div>

        <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 flex items-center justify-center">
          <span className="text-gray-400">Featured image</span>
        </div>
      </header>

      <main className="blog-content">
        <p className="mb-6 leading-relaxed">
          Typography is the art and technique of arranging type to make written
          language legible, readable, and appealing when displayed. Good
          typography establishes a strong visual hierarchy, provides a graphic
          balance to the page, and sets the product's overall tone.
        </p>

        <h2
          className="font-bold mb-4 mt-8"
          style={{ fontSize: "var(--blog-font-h2)" }}
        >
          The Importance of Type Scale
        </h2>
        <p className="mb-6 leading-relaxed">
          A type scale is a systematic approach to using font sizes. It creates
          harmony and consistency throughout your design while establishing a
          clear hierarchy. When text sizes relate to each other in a meaningful
          way, users can easily scan content and understand its structure.
        </p>

        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg mb-8">
          <blockquote
            className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic"
            style={{ fontSize: "var(--blog-font-h5)" }}
          >
            "Typography is what language looks like."
            <footer
              className="mt-2 font-normal not-italic text-gray-600 dark:text-gray-400"
              style={{ fontSize: "var(--blog-font-small)" }}
            >
              — Ellen Lupton
            </footer>
          </blockquote>
        </div>

        <h3
          className="font-semibold mb-4 mt-8"
          style={{ fontSize: "var(--blog-font-h3)" }}
        >
          Key Principles of Effective Typography
        </h3>

        <h4
          className="font-semibold mb-3 mt-6"
          style={{ fontSize: "var(--blog-font-h4)" }}
        >
          1. Establish a Clear Hierarchy
        </h4>
        <p className="mb-4 leading-relaxed">
          Visual hierarchy guides readers through content by emphasizing
          important elements. Use size, weight, and spacing to create distinct
          levels of importance.
        </p>

        <h4
          className="font-semibold mb-3 mt-6"
          style={{ fontSize: "var(--blog-font-h4)" }}
        >
          2. Maintain Readability
        </h4>
        <p className="mb-4 leading-relaxed">
          Readability refers to how easily readers can comprehend text. Factors
          like font choice, size, line height, and line length all contribute to
          overall readability.
        </p>

        <h4
          className="font-semibold mb-3 mt-6"
          style={{ fontSize: "var(--blog-font-h4)" }}
        >
          3. Choose Complementary Fonts
        </h4>
        <p className="mb-6 leading-relaxed">
          When using multiple typefaces, ensure they complement each other.
          Generally, pair a serif with a sans-serif font, and limit your
          selection to 2-3 typefaces for a cohesive look.
        </p>

        <h5
          className="font-semibold mb-3 mt-6"
          style={{ fontSize: "var(--blog-font-h5)" }}
        >
          Popular Type Scales
        </h5>
        <p className="mb-4 leading-relaxed">
          Many designers rely on classic type scales derived from music theory,
          such as the Perfect Fourth (1.333) or Golden Ratio (1.618). These
          create natural, harmonious progressions that feel intuitively "right"
          to readers.
        </p>

        <div className="mb-8">
          <p
            className="text-gray-600 dark:text-gray-400 mb-1"
            style={{ fontSize: "var(--blog-font-small)" }}
          >
            Caption: Various type scales demonstrated in a design system
          </p>
        </div>
      </main>

      {/* Article footer */}
      <footer className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <ThumbsUp className="h-4 w-4" />
              <span style={{ fontSize: "var(--blog-font-small)" }}>128</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MessageSquare className="h-4 w-4" />
              <span style={{ fontSize: "var(--blog-font-small)" }}>
                24 Comments
              </span>
            </button>
          </div>
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Share2 className="h-4 w-4" />
            <span style={{ fontSize: "var(--blog-font-small)" }}>Share</span>
          </button>
        </div>

        {/* Related articles */}
        <div className="mt-10">
          <h4
            className="font-semibold mb-4"
            style={{ fontSize: "var(--blog-font-h4)" }}
          >
            Related Articles
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h5
                className="font-semibold mb-2"
                style={{ fontSize: "var(--blog-font-h5)" }}
              >
                Color Theory in Digital Design
              </h5>
              <p
                className="text-gray-600 dark:text-gray-400"
                style={{ fontSize: "var(--blog-font-small)" }}
              >
                How to create effective color palettes for your digital products
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
