import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./ui/icon";

const about = [
  { label: "About", href: "/about" },
  { label: "Github Repo", href: "https://github.com/mnove/101webtools" },
];

type FooterProps = {
  hideTopSeparator?: boolean;
  className?: string;
};

export const Footer = ({
  hideTopSeparator = false,
  className,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        `flex items-center justify-between px-4 mb-4  ${
          !hideTopSeparator && "border-t"
        } border-fd-border pt-6`,
        className
      )}
    >
      <div className="flex w-full flex-col justify-around gap-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="col-span-1 flex flex-col gap-4">
            <Icons.LogoFull />
            <p className="text-sm text-muted-foreground">
              101webtools is a free online collection of tools to help you with
              your daily tasks. We are constantly adding new tools and features
              to make your life easier. If you have any suggestions, please feel
              free to contact us.
            </p>
          </div>
          <ButtonLinkList title="about" links={about} />
        </div>

        <Separator />

        <div>
          <p className="text-center text-muted-foreground">
            {new Date().getFullYear()} - 101webtools.com - All rights reserved.
          </p>
        </div>

        <div className="text-center text-muted-foreground">
          Made in 🇪🇺 and around the world
        </div>
      </div>
    </footer>
  );
};

interface ButtonLinkListProps {
  title: string;
  links: { label: string; href: string; badge?: React.ReactNode }[];
}

export const ButtonLinkList = ({ title, links }: ButtonLinkListProps) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="mb-3 font-semibold uppercase">{title}</h3>
      {links.map((link, index) => (
        <div key={index} className="flex flex-row gap-2">
          <Button key={index} variant="link" size="sm" className="p-0">
            <Link href={link.href}>{link.label}</Link>
          </Button>
          {link.badge && link.badge}
        </div>
      ))}
    </div>
  );
};
