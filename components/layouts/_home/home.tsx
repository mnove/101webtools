import { Button } from "@/components/ui/button";
import { toolsData } from "@/lib/tools-data";
import { ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl text-balance tracking-tight  md:text-5xl lg:text-7xl font-extrabold mb-6">
          All your favorite tools. <br />
          One place
        </h1>
        <p className="tracking-tight text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          A collection of essential tools to streamline your development
          workflow
        </p>

        <div className="flex flex-row gap-4 items-center w-full justify-center">
          <Button size="lg" asChild variant="outline">
            <Link href="#tools-section">
              Get the App <Smartphone className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="#tools-section">
              Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section id="tools-section" className="py-12">
        <h2 className="text-3xl font-bold mb-8">Available Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(toolsData).map(([key, tool]) => (
            <Link
              key={key}
              href={`${tool.url}`}
              className="group block p-6 border border-gray-200 dark:border-gray-800 rounded-lg transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                  {tool.icon && <tool.icon className="h-6 w-6 text-primary" />}
                </div>
                <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
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
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8">Why Use Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="font-semibold text-xl mb-4">
              Free & always available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All tools are completely free to use and available online
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="font-semibold text-xl mb-4">Privacy Focused</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All processing happens in your browser - no data is sent to
              servers
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
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
