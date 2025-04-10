import { Barcode, IdCard, QrCode, Text, Timer } from "lucide-react";

type Tool = {
  label: string;
  description: string;
  badges: string[];
  category: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type ToolsData = {
  [key: string]: Tool;
};

export type ToolsCategory = {
  name: string;
  tools: Tool[];
};

export const toolsData: ToolsData = {
  base64EncoderDecoder: {
    label: "Base64 Encoder/Decoder",
    description:
      "Encode or decode Base64 strings for data transmission and storage",
    badges: ["Base64", "Encoder", "Decoder"],
    category: "Text_Manipulation",
    url: "/tools/base64-encoder-decoder",
    icon: Text,
  },

  urlEncoderDecoder: {
    label: "URL Encoder/Decoder",
    description:
      "Encode or decode URLs to ensure they are safe for transmission over the internet",
    badges: ["URL", "Encoder", "Decoder"],
    category: "Text_Manipulation",
    url: "/tools/url-encoder-decoder",
    icon: Text,
  },

  javascriptMinifier: {
    label: "JavaScript Minifier",
    description:
      "Minify your JavaScript code to reduce file size and improve load times",
    badges: ["JavaScript", "Minifier"],
    category: "Code_Minifiers",
    url: "/tools/javascript-minifier",
    icon: Text,
  },

  cssMinifier: {
    label: "CSS Minifier",
    description:
      "Minify your CSS code to reduce file size and improve load times",
    badges: ["CSS", "Minifier"],
    category: "Code_Minifiers",
    url: "/tools/css-minifier",
    icon: Text,
  },

  htmlMinifier: {
    label: "HTML Minifier",
    description:
      "Minify your HTML code to reduce file size and improve load times",
    badges: ["HTML", "Minifier"],
    category: "Code_Minifiers",
    url: "/tools/html-minifier",
    icon: Text,
  },

  barcodeGenerator: {
    label: "Barcode Generator",
    description:
      "Generate barcodes in different formats with customizable options",
    badges: ["CODE128", "CODE39", "EAN13", "QR Code"],
    category: "Code_Generators",
    url: "/tools/barcode-generator",
    icon: Barcode,
  },

  qrcodeGenerator: {
    label: "QR Code Generator",
    description:
      "Generate QR codes with customizable options and download them as images",
    badges: ["QR Code"],
    category: "Code_Generators",
    url: "/tools/qrcode-generator",
    icon: QrCode,
  },

  nanoidGenerator: {
    label: "Nano ID Generator",
    description: "Generate random IDs with customizable length and alphabet",
    badges: ["Nano ID", "Random ID"],
    category: "ID_Generators",
    url: "/tools/nanoid-generator",
    icon: IdCard,
  },

  uuidGenerator: {
    label: "UUID Generator",
    description: "Generate UUIDs (Universally Unique Identifiers)",
    badges: ["UUID", "Random ID"],
    category: "ID_Generators",
    url: "/tools/uuid-generator",
    icon: IdCard,
  },

  ulidGenerator: {
    label: "ULID Generator",
    description:
      "Generate ULIDs (Universally Unique Lexicographically Sortable Identifiers)",
    badges: ["ULID", "Random ID"],
    category: "ID_Generators",
    url: "/tools/ulid-generator",
    icon: IdCard,
  },

  typescaleGenerator: {
    label: "Typographic Scale Generator",
    description:
      "Generate a typographic scale based on a base font size and scale factor",
    badges: ["Typography", "Design"],
    category: "Design_Tools",
    url: "/tools/typescale-generator",
    icon: Text,
  },

  pomodoroTimer: {
    label: "Pomodoro Timer",
    description:
      "A simple and effective Pomodoro timer to boost your productivity",
    badges: ["Productivity", "Timer"],
    category: "Productivity_Tools",
    url: "/tools/pomodoro-timer",
    icon: Timer,
  },
};
