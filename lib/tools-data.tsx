import { Barcode, FileJson, IdCard, QrCode, Text, Timer } from "lucide-react";

type Tool = {
  label: string;
  description: string;
  badges: string[];
  category: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isNew?: boolean;
};

export type ToolsData = {
  [key: string]: Tool;
};

export type ToolsCategory = {
  name: string;
  tools: Tool[];
};

export const toolsData: ToolsData = {
  md5HashGenerator: {
    label: "MD5 Hash Generator",
    description:
      "Generate a MD5 hash for your text using the MD5 hashing algorithm",
    badges: ["MD5", "Hash", "Generator"],
    category: "Encryption_Tools",
    url: "/tools/md5-hash",
    icon: Text,
  },

  sha1HashGenerator: {
    label: "SHA1 Hash Generator",
    description:
      "Generate a SHA1 hash for your text using the SHA1 hashing algorithm",
    badges: ["SHA1", "Hash", "Generator"],
    category: "Encryption_Tools",
    url: "/tools/sha1-hash",
    icon: Text,
  },

  sha224HashGenerator: {
    label: "SHA224 Hash Generator",
    description:
      "Generate a SHA224 hash for your text using the SHA224 hashing algorithm",
    badges: ["SHA224", "Hash", "Generator"],
    category: "Encryption_Tools",
    url: "/tools/sha224-hash",
    icon: Text,
  },

  sha256HashGenerator: {
    label: "SHA256 Hash Generator",
    description:
      "Generate a SHA256 hash for your text using the SHA256 hashing algorithm",
    badges: ["SHA256", "Hash", "Generator"],
    category: "Encryption_Tools",
    url: "/tools/sha256-hash",
    icon: Text,
  },

  sha384HashGenerator: {
    label: "SHA384 Hash Generator",
    description:
      "Generate a SHA384 hash for your text using the SHA384 hashing algorithm",
    badges: ["SHA384", "Hash", "Generator"],
    category: "Encryption_Tools",
    url: "/tools/sha384-hash",
    icon: Text,
  },

  sha512HashGenerator: {
    label: "SHA512 Hash Generator",
    description:
      "Generate a SHA512 hash for your text using the SHA512 hashing algorithm",
    badges: ["SHA512", "Hash", "Generator"],
    category: "Encryption_Tools",
    url: "/tools/sha512-hash",
    icon: Text,
    isNew: true,
  },

  passwordGenerator: {
    label: "Password Generator",
    description:
      "Generate strong and secure passwords with customizable options",
    badges: ["Password", "Generator"],
    category: "Security_Tools",
    url: "/tools/password-generator",
    icon: Text,
  },
  binaryToTextConverter: {
    label: "Binary to Text Converter",
    description:
      "Convert binary data to text and vice versa for easy readability",
    badges: ["Binary", "Text", "Converter"],
    category: "Text_Manipulation",
    url: "/tools/binary-to-text-converter",
    icon: Text,
  },

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
    isNew: true,
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

  jsonViewer: {
    label: "JSON Viewer",
    description:
      "View, validate, and format JSON data with an interactive tree structure",
    badges: ["JSON", "Viewer", "Formatter"],
    category: "Code_Tools",
    url: "/tools/json-viewer",
    icon: FileJson,
    isNew: true,
  },

  loremIpsumGenerator: {
    label: "Lorem Ipsum Generator",
    description:
      "Generate placeholder text in words, sentences, or paragraphs for your designs and mockups",
    badges: ["Lorem Ipsum", "Placeholder", "Text"],
    category: "Text_Manipulation",
    url: "/tools/lorem-ipsum-generator",
    icon: Text,
    isNew: true,
  },
};

// Get tool by name
export function getToolByName(name: string): Tool | undefined {
  return toolsData[name];
}
