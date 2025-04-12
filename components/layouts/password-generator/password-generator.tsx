"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Copy, RefreshCw, XIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Password generator form schema
const passwordFormSchema = z.object({
  length: z.number().min(4).max(50),
  includeUppercase: z.boolean(),
  includeLowercase: z.boolean(),
  includeNumbers: z.boolean(),
  includeSymbols: z.boolean(),
  easyToRead: z.boolean(),
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function PasswordGenerator() {
  const [password, setPassword] = React.useState<string>("");

  // Initialize form with default values
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      easyToRead: false,
    },
  });

  // Character sets
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercaseStandard: "abcdefghijklmnopqrstuvwxyz",
    lowercaseEasyToRead: "abcdefghjkmnpqrstuvwxyz", // without i, l, o
    numbersStandard: "0123456789",
    numbersEasyToRead: "23456789", // without 0, 1
    symbolsStandard: "!@#$^*",
    symbolsEasyToRead: "@#$^*", // easier to distinguish symbols
  };

  // Generate a random password based on the current form settings
  const generatePassword = React.useCallback(() => {
    const values = form.getValues();
    let charset = "";

    // Build character set based on form values
    if (values.includeUppercase) {
      charset += values.easyToRead
        ? charSets.uppercase.replace(/[O0I1]/g, "") // Remove O, I when easy to read
        : charSets.uppercase;
    }

    if (values.includeLowercase) {
      charset += values.easyToRead
        ? charSets.lowercaseEasyToRead
        : charSets.lowercaseStandard;
    }

    if (values.includeNumbers) {
      charset += values.easyToRead
        ? charSets.numbersEasyToRead
        : charSets.numbersStandard;
    }

    if (values.includeSymbols) {
      charset += values.easyToRead
        ? charSets.symbolsEasyToRead
        : charSets.symbolsStandard;
    }

    // If no character set is selected, default to lowercase
    if (charset === "") {
      charset = values.easyToRead
        ? charSets.lowercaseEasyToRead
        : charSets.lowercaseStandard;
    }

    // Generate the password
    let newPassword = "";
    for (let i = 0; i < values.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  }, [form]);

  // Regenerate password when form values change
  React.useEffect(() => {
    generatePassword();
  }, [
    form.watch("length"),
    form.watch("includeUppercase"),
    form.watch("includeLowercase"),
    form.watch("includeNumbers"),
    form.watch("includeSymbols"),
    form.watch("easyToRead"),
    generatePassword,
  ]);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = React.useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

  // Copy password to clipboard
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast("Password copied to clipboard", {
        description: "Your generated password is now in your clipboard",
        duration: 2000,
      });
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-6">
        {/* Password Display Area */}
        <div className="border rounded-lg p-6">
          <div className="font-medium text-sm mb-2">Generated Password:</div>
          <div className="flex gap-2 items-center">
            <Input
              readOnly
              value={password}
              className="font-mono text-base"
              size="lg"
            />
            <Button
              onClick={generatePassword}
              variant="brand"
              className="hidden lg:flex"
            >
              Generate Password
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="shrink-0"
              size="icon"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Password strength indicator */}
          <div
            className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(
                strengthScore
              )} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>
          {/* Password strength description */}
          <p
            id={`pw-description`}
            className="text-foreground mb-2 text-sm font-medium"
          >
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          {/* Password requirements list */}
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <CheckIcon
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <XIcon
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-2">
            <Button
              onClick={generatePassword}
              variant="brand"
              className="flex lg:hidden w-full"
            >
              {" "}
              <RefreshCw className="h-4 w-4" />
              Generate Password
            </Button>
          </div>
        </div>

        {/* Password Options Area */}
        <div>
          <Form {...form}>
            <form className="space-y-6">
              {/* Password Length Slider */}
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password Length: {field.value}</FormLabel>
                    </div>
                    <FormControl>
                      <Slider
                        min={4}
                        max={50}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a length between 4 and 50 characters
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Character Type Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="includeUppercase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Uppercase Letters (A-Z)
                        </FormLabel>
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

                <FormField
                  control={form.control}
                  name="includeLowercase"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Lowercase Letters (a-z)
                        </FormLabel>
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

                <FormField
                  control={form.control}
                  name="includeNumbers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Numbers (0-9)
                        </FormLabel>
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

                <FormField
                  control={form.control}
                  name="includeSymbols"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Special Characters (!@#$%^&*)
                        </FormLabel>
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

                <FormField
                  control={form.control}
                  name="easyToRead"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:col-span-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Easy to Read
                        </FormLabel>
                        <FormDescription>
                          Avoid ambiguous characters like O, 0, 1, l, I
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
              </div>
            </form>
          </Form>
        </div>

        {/* Password Strength Indicator (optional enhancement) */}
        {/* <PasswordStrengthIndicator password={password} /> */}

        {/* Information Section */}
        <div className="flex flex-col space-y-4 text-xs text-muted-foreground mt-4">
          <div className="w-full">
            <p>
              Strong passwords help protect your accounts from unauthorized
              access. A good password should:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Be at least 12 characters long</li>
              <li>
                Include a mix of uppercase letters, lowercase letters, numbers,
                and symbols
              </li>
              <li>Avoid common words, phrases, or personal information</li>
              <li>Use a unique password for each account</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Explanation Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">About Password Security</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">How to use this tool:</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Choose your desired password length using the slider</li>
              <li>Select which character types to include in your password</li>
              <li>
                Enable &quot;Easy to Read&quot; if you need to manually type the
                password
              </li>
              <li>
                Check the strength indicator to ensure your password is secure
              </li>
              <li>
                Click &quot;Generate Password&quot; to create a new random
                password
              </li>
              <li>Copy the generated password with the copy button</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Password Strength</CardTitle>
                <CardDescription>What makes a password strong?</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">Length matters most</p>
                  <p>
                    The longer a password is, the harder it is to crack. A
                    16-character password is exponentially more secure than an
                    8-character one, even with complex characters.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Entropy</p>
                  <p>
                    Password entropy measures unpredictability. Higher entropy
                    means more security. A password with 80+ bits of entropy is
                    considered very strong against brute force attacks.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Character variety</p>
                  <p>
                    Using a mix of character types (uppercase, lowercase,
                    numbers, symbols) increases entropy and makes passwords
                    harder to guess or crack.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Password Mistakes</CardTitle>
                <CardDescription>Practices to avoid</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-semibold">Password reuse</p>
                  <p>
                    Using the same password across multiple sites means one
                    breach can compromise many of your accounts. Use unique
                    passwords for each service.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Predictable patterns</p>
                  <p>
                    Replacing letters with numbers (e.g., &quot;p@ssw0rd&quot;)
                    is a well-known pattern that attackers check. Avoid common
                    substitutions and patterns.
                  </p>
                </div>
                <p className="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded border-l-2 border-yellow-400">
                  <span className="font-semibold">Tip:</span> Use a password
                  manager to store and generate unique complex passwords for all
                  your accounts.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-2">Password Security Facts:</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Cracking Time</p>
                <p className="text-sm text-muted-foreground">
                  A 12-character random password would take centuries to crack
                  with current technology
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Breach Protection</p>
                <p className="text-sm text-muted-foreground">
                  2FA/MFA provides an additional security layer even if your
                  password is compromised
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="font-medium mb-1">Dictionary Attacks</p>
                <p className="text-sm text-muted-foreground">
                  Random passwords are immune to dictionary attacks that target
                  common words and phrases
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              This tool generates passwords locally in your browser - nothing is
              sent to a server. For maximum security, consider using a reputable
              password manager to store and generate passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
