"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, RefreshCw } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Lorem ipsum form schema
const loremFormSchema = z.object({
  type: z.enum(["words", "sentences", "paragraphs"]),
  count: z.number().min(1).max(100),
  startWithLorem: z.boolean(),
});

type LoremFormValues = z.infer<typeof loremFormSchema>;

export default function LoremIpsumGenerator() {
  const [generatedText, setGeneratedText] = React.useState<string>("");

  // Initialize form with default values
  const form = useForm<LoremFormValues>({
    resolver: zodResolver(loremFormSchema),
    defaultValues: {
      type: "paragraphs",
      count: 3,
      startWithLorem: true,
    },
  });

  // Lorem ipsum word bank
  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
    "at",
    "vero",
    "eos",
    "accusamus",
    "accusantium",
    "doloremque",
    "laudantium",
    "totam",
    "rem",
    "aperiam",
    "eaque",
    "ipsa",
    "quae",
    "ab",
    "illo",
    "inventore",
    "veritatis",
    "et",
    "quasi",
    "architecto",
    "beatae",
    "vitae",
    "dicta",
    "sunt",
    "explicabo",
    "nemo",
    "ipsam",
    "quia",
    "voluptas",
    "aspernatur",
    "aut",
    "odit",
    "fugit",
    "sed",
    "quia",
    "consequuntur",
    "magni",
    "dolores",
    "ratione",
    "sequi",
    "nesciunt",
    "neque",
    "porro",
    "quisquam",
    "dolorem",
    "adipisci",
    "numquam",
    "eius",
    "modi",
    "tempora",
    "incidunt",
    "magnam",
    "etiam",
    "non",
    "quam",
    "lacus",
    "suspendisse",
    "faucibus",
    "interdum",
    "posuere",
    "morbi",
    "leo",
    "urna",
    "molestie",
    "condimentum",
    "mattis",
    "pellentesque",
    "habitant",
    "tristique",
    "senectus",
    "netus",
    "malesuada",
    "fames",
    "ac",
    "turpis",
    "egestas",
    "integer",
    "feugiat",
    "scelerisque",
    "varius",
    "viverra",
    "nibh",
    "cras",
    "pulvinar",
    "elementum",
    "facilisis",
    "leo",
    "vel",
    "fringilla",
    "est",
    "ullamcorper",
    "eget",
    "nulla",
    "facilisi",
    "morbi",
    "tempus",
    "iaculis",
    "urna",
    "cursus",
    "euismod",
    "quis",
    "viverra",
  ];

  // Generate random words
  const generateWords = (count: number, startWithLorem: boolean): string => {
    const words: string[] = [];

    if (startWithLorem && count >= 2) {
      words.push("Lorem", "ipsum");
      count -= 2;
    }

    for (let i = 0; i < count; i++) {
      const randomWord =
        loremWords[Math.floor(Math.random() * loremWords.length)];
      words.push(randomWord);
    }

    return words.join(" ");
  };

  // Generate sentences
  const generateSentences = (
    count: number,
    startWithLorem: boolean
  ): string => {
    const sentences: string[] = [];

    for (let i = 0; i < count; i++) {
      const wordsInSentence = Math.floor(Math.random() * 10) + 8; // 8-17 words per sentence
      let sentence = generateWords(wordsInSentence, startWithLorem && i === 0);
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
      sentences.push(sentence);
    }

    return sentences.join(" ");
  };

  // Generate paragraphs
  const generateParagraphs = (
    count: number,
    startWithLorem: boolean
  ): string => {
    const paragraphs: string[] = [];

    for (let i = 0; i < count; i++) {
      const sentencesInParagraph = Math.floor(Math.random() * 4) + 3; // 3-6 sentences per paragraph
      const paragraph = generateSentences(
        sentencesInParagraph,
        startWithLorem && i === 0
      );
      paragraphs.push(paragraph);
    }

    return paragraphs.join("\n\n");
  };

  // Generate text based on current form settings
  const generateText = React.useCallback(() => {
    const values = form.getValues();
    let text = "";

    switch (values.type) {
      case "words":
        text = generateWords(values.count, values.startWithLorem);
        break;
      case "sentences":
        text = generateSentences(values.count, values.startWithLorem);
        break;
      case "paragraphs":
        text = generateParagraphs(values.count, values.startWithLorem);
        break;
    }

    setGeneratedText(text);
  }, [form]);

  // Auto-generate text when form values change
  React.useEffect(() => {
    generateText();
  }, [
    form.watch("type"),
    form.watch("count"),
    form.watch("startWithLorem"),
    generateText,
  ]);

  // Copy text to clipboard
  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast("Text copied to clipboard", {
        description: "Your generated lorem ipsum text is now in your clipboard",
        duration: 2000,
      });
    }
  };

  // Get count limits based on type
  const getCountLimits = (type: string) => {
    switch (type) {
      case "words":
        return { min: 1, max: 100, default: 50 };
      case "sentences":
        return { min: 1, max: 20, default: 5 };
      case "paragraphs":
        return { min: 1, max: 10, default: 3 };
      default:
        return { min: 1, max: 100, default: 3 };
    }
  };

  const currentLimits = getCountLimits(form.watch("type"));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-6">
        {/* Generated Text Display Area */}
        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-sm">Generated Lorem Ipsum:</div>
            <div className="flex gap-2">
              <Button
                onClick={generateText}
                variant="default"
                className="hidden lg:flex"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate New Text
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="shrink-0"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          <Textarea
            readOnly
            value={generatedText}
            className="font-sans text-base min-h-[300px] resize-none"
            placeholder="Generated lorem ipsum text will appear here..."
          />

          <div className="mt-4 text-sm text-muted-foreground">
            Word count:{" "}
            {
              generatedText.split(/\s+/).filter((word) => word.length > 0)
                .length
            }{" "}
            | Character count: {generatedText.length}
          </div>

          <div className="mt-2">
            <Button
              onClick={generateText}
              variant="default"
              className="flex lg:hidden w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New Text
            </Button>
          </div>
        </div>

        {/* Text Generation Options */}
        <div>
          <Form {...form}>
            <form className="space-y-6">
              {/* Text Type Selection */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset count to default for new type
                        const limits = getCountLimits(value);
                        form.setValue("count", limits.default);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select text type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="words">Words</SelectItem>
                        <SelectItem value="sentences">Sentences</SelectItem>
                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose whether to generate words, sentences, or paragraphs
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Count Slider */}
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>
                        Number of {form.watch("type")}: {field.value}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Slider
                        min={currentLimits.min}
                        max={currentLimits.max}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      Choose between {currentLimits.min} and {currentLimits.max}{" "}
                      {form.watch("type")}
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Start with Lorem Ipsum option */}
              <FormField
                control={form.control}
                name="startWithLorem"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Start with &quot;Lorem ipsum&quot;
                      </FormLabel>
                      <FormDescription>
                        Begin the generated text with the classic &quot;Lorem
                        ipsum&quot; phrase
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Information Section */}
        <div className="flex flex-col space-y-4 text-xs text-muted-foreground mt-4">
          <div className="w-full">
            <p>
              Lorem ipsum is placeholder text commonly used in the printing and
              typesetting industry. Key benefits:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Focuses attention on visual elements rather than content</li>
              <li>Prevents viewer bias when reviewing designs</li>
              <li>Industry standard for mockups and prototypes</li>
              <li>Available in various lengths for different layout needs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">About Lorem Ipsum</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use this tool:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>
                Select the type of text you need (words, sentences, or
                paragraphs)
              </li>
              <li>Choose how many units you want using the slider</li>
              <li>
                Toggle whether to start with the classic &quot;Lorem ipsum&quot;
                phrase
              </li>
              <li>
                The text will automatically generate as you change options
              </li>
              <li>Copy the generated text with the copy button</li>
              <li>Use the generated text in your designs or mockups</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>What is Lorem Ipsum?</CardTitle>
                <CardDescription>The history and purpose</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">Origins</p>
                  <p>
                    Lorem ipsum is derived from sections 1.10.32 and 1.10.33 of
                    &quot;de Finibus Bonorum et Malorum&quot; (The Extremes of
                    Good and Evil) by Cicero, written in 45 BC.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Modern usage</p>
                  <p>
                    It became popular in the 1960s with Letraset sheets and
                    later with desktop publishing software like Aldus PageMaker,
                    which included versions of Lorem Ipsum.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Why it works</p>
                  <p>
                    The text is pseudo-Latin, making it meaningless to most
                    readers, which prevents distraction from the visual design
                    elements.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  When and how to use lorem ipsum
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">Design mockups</p>
                  <p>
                    Use lorem ipsum in early design phases to focus on layout,
                    typography, and visual hierarchy without content bias.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Content planning</p>
                  <p>
                    Helps estimate space requirements and plan content structure
                    before final copy is available.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Client presentations</p>
                  <p>
                    Prevents clients from focusing on placeholder content
                    instead of design elements during review sessions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Text Length Guidelines:</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Short Content</p>
                <p className="text-sm text-muted-foreground">
                  5-15 words for headlines, 1-2 sentences for brief descriptions
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Medium Content</p>
                <p className="text-sm text-muted-foreground">
                  3-5 sentences for article summaries, 1-2 paragraphs for body
                  text
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Long Content</p>
                <p className="text-sm text-muted-foreground">
                  3+ paragraphs for articles, documentation, or extensive
                  content areas
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Remember to replace lorem ipsum with real content before final
              publication. It should only be used as a temporary placeholder
              during development and design phases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
