import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  RefreshCw,
  Shield,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { PWAHero } from "./page.client";

export const metadata: Metadata = {
  title: "Progressive Web App - 101webtools",
  description:
    "Install the 101webtools PWA for offline access, faster performance, and app-like experience on any device",
};

export default function PWAPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      {/* Hero Section */}

      <PWAHero />

      <Separator className="mb-12" />

      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-2">
          Why Install Our PWA?
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Experience the best of both web and native apps
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Wifi className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Lives in your Desktop</CardTitle>
              <CardDescription>
                Use your favorite tools directly from your desktop
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-green-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
              <CardDescription>
                Instant loading and smooth performance with local caching
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Native Feel</CardTitle>
              <CardDescription>
                App-like experience with home screen installation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-orange-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Secure & Private</CardTitle>
              <CardDescription>
                Your data stays on your device, enhanced security features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-teal-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-2">
                <RefreshCw className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-lg">Auto Updates</CardTitle>
              <CardDescription>
                Always get the latest tools and features automatically
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-red-200 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                <Download className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-lg">Cross Platform</CardTitle>
              <CardDescription>
                Works on iOS, Android, Windows, Mac, and Linux
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* Installation Guide */}
      <section className="mb-12" id="installation-guide">
        <h2 className="text-3xl font-bold text-center mb-2">How to Install</h2>
        <p className="text-muted-foreground text-center mb-8">
          Installing our PWA is quick and easy
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                  1
                </span>
                Desktop (Chrome/Edge)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Look for the install icon in your address bar</p>
              <p>• Click &quot;Install&quot; when prompted</p>
              <p>• Or use Chrome menu → &quot;Install 101webtools&quot;</p>
              <p>• Launch from your desktop or start menu</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                  2
                </span>
                Mobile (iOS/Android)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>• Open in Safari (iOS) or Chrome (Android)</p>
              <p>• Tap the share button</p>
              <p>• Select &quot;Add to Home Screen&quot;</p>
              <p>• Tap the new icon on your home screen</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mb-12" />

      {/* CTA Section */}
      <div className="text-center  bg-card rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-4">Try the Desktop App now!</h3>
        <p className="text-muted-foreground mb-6">
          Experience the full power of 101webtools with our new PWA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="" asChild>
            <Link href="#installation-guide">
              <Download className="w-5 h-5 mr-2" />
              Install PWA Now
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
