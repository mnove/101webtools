import { toolsData } from "@/lib/tools-data";
import { cn } from "@/lib/utils";
import { ArrowRight, Gift, Star } from "lucide-react";
import Link from "next/link";
import { Hero } from "./hero";

function ToolCard({
  tool,
  isComingSoon,
}: {
  tool: (typeof toolsData)[string];
  isComingSoon: boolean;
}) {
  return (
    <Link
      href={tool.url}
      className={cn(
        "group block p-6 border rounded-lg transition-all hover:border-primary hover:shadow-md bg-card trasition-all",
        isComingSoon
          ? "opacity-100 border-dashed cursor-auto bg-card-muted"
          : "hover:bg-secondary"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
          {tool.icon && <tool.icon className="h-6 w-6 text-primary" />}
        </div>
        {isComingSoon && (
          <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-800 rounded">
            Coming Soon
          </span>
        )}

        <ArrowRight
          className={cn(
            "h-5 w-5 opacity-1 group-hover:opacity-100 transition-opacity",
            isComingSoon && "hidden"
          )}
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{tool.label}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {tool.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.badges?.map((badge) => (
          <span
            key={badge}
            className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded"
          >
            {badge}
          </span>
        ))}
      </div>
    </Link>
  );
}

const RequestATool = () => (
  <Link
    href="https://tally.so/r/3jzroJ"
    target="_blank"
    className={cn(
      "group block p-6 border border-primary rounded-lg transition-all hover:border-primary hover:shadow-md trasition-all hover:bg-secondar bg-primary/10"
    )}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
        <Gift className="h-6 w-6 text-primary" />
      </div>
      <ArrowRight
        className={cn(
          "h-5 w-5 opacity-1 group-hover:opacity-100 transition-opacity"
        )}
      />
    </div>
    <h3 className="font-semibold text-lg mb-2">
      Cannot see the tool you need?
    </h3>

    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Request a new tool to be added to our collection.
    </p>
  </Link>
);

const comingSoonTools: (typeof toolsData)[string][] = [
  {
    label: "Lorem Ipsum Generator",
    category: "Text Manipulation",
    description: "Create placeholder text for your projects.",
    url: "#",
    badges: ["Text Manipulation", "Placeholder Text"],
    icon: () => <Star className="h-6 w-6 text-yellow-500" />,
  },
  {
    label: "CSS Gradient Generator",
    category: "Code Generators",
    description: "Create beautiful CSS gradients with ease.",
    url: "#",
    badges: ["Code Generators", "CSS"],
    icon: () => <Star className="h-6 w-6 text-yellow-500" />,
  },
];

export default function Homepage() {
  return (
    <div className="container px-4 py-8 mx-auto s">
      {/* Hero Section */}
      <Hero />

      {/* Tools Grid Section */}
      <section id="tools-section" className="py-12">
        <h2 className="text-3xl font-bold mb-8">Available Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Coming Soon Tools */}
          {comingSoonTools.map((tool, index) => (
            <ToolCard key={index} tool={tool} isComingSoon={true} />
          ))}

          {/* Regular Tools */}
          {Object.entries(toolsData).map(([key, tool]) => (
            <ToolCard key={key} tool={tool} isComingSoon={false} />
          ))}
          {/* Request a Tool Card */}
          <RequestATool />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8">Why Use Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border  rounded-lg">
            <h3 className="font-semibold text-xl mb-4">
              Free & always available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All tools are completely free to use and available online
            </p>
          </div>
          <div className="p-6 border  rounded-lg">
            <h3 className="font-semibold text-xl mb-4">Privacy Focused</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All processing happens in your browser - no data is sent to
              servers
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold text-xl mb-4">Developer First</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built by developers, for developers, with the features you need
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
