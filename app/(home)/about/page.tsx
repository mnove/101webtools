import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About - 101webtools",
  description:
    "About 101webtools - A growing collection of free online tools for developers and designers",
};

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 tracking-tight">
        About 101webtools
      </h1>
      <Separator className="mb-12" />
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
        <p className="text-muted-foreground mb-6">Why we created 101webtools</p>
        <div className="space-y-4">
          <p>
            101webtools was created to collect various tools I&apos;ve built
            over time that I frequently use for both work and personal projects.
            By sharing these tools and making the project open source, I hope to
            help others who may need similar utilities in their development
            workflow.
          </p>
          <p>
            Having all these tools in one place makes them easily accessible
            whenever needed, without having to search for different solutions
            across the web. Instead of bookmarking multiple websites or creating
            various small apps, 101webtools brings everything together into a
            cohesive collection.
          </p>
          <p>
            This is a growing collection that will expand over time as new tools
            are developed or existing ones are improved. The goal is to create a
            comprehensive toolkit that developers and designers can rely on for
            their day-to-day needs.
          </p>
        </div>
      </section>
      <Separator className="mb-12" />
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Features</h2>
        <p className="text-muted-foreground mb-6">
          What makes 101webtools special
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Free and Open Source</span> - All
            tools are completely free to use, with no hidden fees or premium
            features
          </li>
          <li>
            <span className="font-medium">No Ads</span> - Clean,
            distraction-free interface without annoying advertisements
          </li>
          <li>
            <span className="font-medium">Privacy Focused</span> - Your data
            stays on your device; we don&apos;t collect or store your
            information
          </li>
          <li>
            <span className="font-medium">Offline Support</span> - Many tools
            can work offline once loaded
          </li>
          <li>
            <span className="font-medium">Modern & Clean Interface</span> -
            Built with Next.js and Tailwind CSS for a responsive design
          </li>
          <li>
            <span className="font-medium">Constantly Evolving</span> - New tools
            are regularly added based on community needs
          </li>
        </ul>
      </section>
      <Separator className="mb-12" />
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Tool Categories</h2>
        <p className="text-muted-foreground mb-6">
          Browse our collection by category
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-sm">
            Encryption Tools
          </Badge>
          <Badge variant="outline" className="text-sm">
            Code Utilities
          </Badge>
          <Badge variant="outline" className="text-sm">
            Generator Tools
          </Badge>
          <Badge variant="outline" className="text-sm">
            Productivity Tools
          </Badge>
        </div>

        <p className="mt-6">
          Check out our{" "}
          <Link href="/tools" className="text-primary hover:underline">
            tools page
          </Link>{" "}
          to explore the full collection.
        </p>
      </section>
      <Separator className="mb-12" />
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Contribute</h2>
        <p className="text-muted-foreground mb-6">Help improve 101webtools</p>
        <div className="space-y-4">
          <p>
            Since 101webtools is an open source project, contributions from the
            community are welcome! Whether you want to suggest new tools,
            improve existing ones, or help enhance the user interface, your
            input can make this project even better.
          </p>
          <p>
            Visit our{" "}
            <Link
              href="https://github.com/mnove/101webtools"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </Link>{" "}
            to learn more about how you can contribute.
          </p>
        </div>
      </section>
    </div>
  );
}
