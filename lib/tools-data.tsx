import { Barcode, IdCard } from "lucide-react";

export const toolsData = {
  barcodeGenerator: {
    name: "Barcode Generator",
    description:
      "Generate barcodes in different formats with customizable options",
    badges: ["CODE128", "CODE39", "EAN13", "QR Code"],
    url: "/tools/barcode-generator",
    icon: Barcode,
  },
  nanoidGenerator: {
    name: "Nano ID Generator",
    description: "Generate random IDs with customizable length and alphabet",
    badges: ["Nano ID", "Random ID"],
    url: "/tools/nanoid-generator",
    icon: IdCard,
  },

  uuidGenerator: {
    name: "UUID Generator",
    description: "Generate UUIDs (Universally Unique Identifiers)",
    badges: ["UUID", "Random ID"],
    url: "/tools/uuid-generator",
    icon: IdCard,
  },

  ulidGenerator: {
    name: "ULID Generator",
    description:
      "Generate ULIDs (Universally Unique Lexicographically Sortable Identifiers)",
    badges: ["ULID", "Random ID"],
    url: "/tools/ulid-generator",
    icon: IdCard,
  },
};
