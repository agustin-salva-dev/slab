"use client";

import { useState, useEffect } from "react";
import { useForm, Control, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Bug, ArrowRight, Loader2, Info } from "lucide-react";
import { parseOS } from "@/components/settings/utils";
import { Callout, CalloutText } from "@/components/ui/Callout";

const reportSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title max 100 characters"),
  description: z.string().min(10, "Describe the issue (min 10 chars)"),
  steps: z.string().min(10, "List steps to reproduce"),
  expected: z.string().min(5, "What should happen?"),
  actual: z.string().min(5, "What happened?"),
  environment: z.string().optional(),
});

type ReportValues = z.infer<typeof reportSchema>;

type CustomFieldProps = {
  control: Control<ReportValues>;
  name: Path<ReportValues>;
  label: React.ReactNode;
  placeholder?: string;
  isTextarea?: boolean;
  className?: string;
  extraFooter?: React.ReactNode;
};

function CustomField({
  control,
  name,
  label,
  placeholder,
  isTextarea,
  className,
  extraFooter,
}: CustomFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel className="text-sm font-power-med tracking-wide text-white">
            {label}
          </FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder}
                className={className}
                {...field}
              />
            ) : (
              <Input
                placeholder={placeholder}
                className={className}
                {...field}
              />
            )}
          </FormControl>
          {extraFooter}
          <FormMessage className="text-xs text-my-accents-red" />
        </FormItem>
      )}
    />
  );
}

// --- UTILS & HELPERS ---

function getBrowserName(ua: string) {
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edge")) return "Edge";
  return "Unknown Browser";
}

function generateGithubIssueUrl(data: ReportValues) {
  const baseUrl = "https://github.com/agustin-salva-dev/slab/issues/new";
  const title = encodeURIComponent(`[Bug]: ${data.title}`);

  const bodyText = `### Descripción
${data.description}

### Pasos para reproducir
${data.steps}

### Comportamiento Esperado y Actual
**Esperado:** ${data.expected}
**Actual:** ${data.actual}

${data.environment ? `### Entorno\n${data.environment}` : ""}`;

  const body = encodeURIComponent(bodyText);
  const labels = "bug";

  return `${baseUrl}?title=${title}&body=${body}&labels=${labels}`;
}

export function BugReportForm() {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<ReportValues>({
    resolver: zodResolver(reportSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      steps: "",
      expected: "",
      actual: "",
      environment: "",
    },
  });

  const {
    setValue,
    formState: { isValid },
  } = form;

  // Detect user enviroment.
  useEffect(() => {
    const os = parseOS(navigator.userAgent);
    const browser = getBrowserName(navigator.userAgent);

    setValue("environment", `OS: ${os}\nBrowser: ${browser}`);
  }, [setValue]);

  const onSubmit = (data: ReportValues) => {
    setIsGenerating(true);

    try {
      const finalUrl = generateGithubIssueUrl(data);
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("[BUG_REPORT_ERROR] Failed to generate Github URL:", error);
      alert("An error occurred generating the report link. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-white/5 border border-my-border-primary/70 p-6 md:p-8 rounded-2 shadow-2xl backdrop-blur-md">
      {/* --- 1. Form Header Section --- */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-my-accents-red/10 text-my-accents-red border border-my-accents-red/20">
          <Bug className="size-6" />
        </div>
        <div>
          <h2 className="text-2xl font-power-ultra upp text-white">
            Report an Issue
          </h2>
          <p className="text-sm font-sans text-my-secondary">
            Help us fix Slab faster.
          </p>
        </div>
      </div>

      {/* --- 2. Information Context Banner --- */}
      <Callout
        variant="warning"
        className="mb-8 w-full bg-my-accents-blue/10 border-my-accents-blue/20 text-my-secondary"
      >
        <Info className="text-my-accents-blue" />
        <CalloutText className="text-sm text-my-accents-blue/50 font-sans">
          <span className="text-my-accents-blue font-power-ultra tracking-wide">
            Before reporting:
          </span>{" "}
          Provide clear details. We&apos;ll generate a ready-to-submit GitHub
          issue.
        </CalloutText>
      </Callout>

      {/* --- 3. Form Body & Inputs --- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CustomField
            control={form.control}
            name="title"
            label={
              <>
                Brief Title <span className="text-my-accents-red">*</span>
              </>
            }
            placeholder="e.g. Broken redirect on mobile"
            className="bg-black/20"
          />

          <CustomField
            control={form.control}
            name="description"
            label={
              <>
                Detailed Description{" "}
                <span className="text-my-accents-red">*</span>
              </>
            }
            placeholder="What were you trying to do?"
            isTextarea
            className="min-h-[100px] bg-black/20"
          />

          <CustomField
            control={form.control}
            name="steps"
            label={
              <>
                Steps to Reproduce{" "}
                <span className="text-my-accents-red">*</span>
              </>
            }
            placeholder="1. Go to dashboard...&#10;2. Click on...&#10;3. See error"
            isTextarea
            className="min-h-[120px] bg-black/20 font-mono text-sm"
            extraFooter={
              <p className="text-xs text-my-secondary">
                Clear steps means faster fixes.
              </p>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomField
              control={form.control}
              name="expected"
              label={
                <>
                  Expected Behavior{" "}
                  <span className="text-my-accents-red">*</span>
                </>
              }
              placeholder="It should redirect"
              className="bg-black/20"
            />
            <CustomField
              control={form.control}
              name="actual"
              label={
                <>
                  Actual Behavior <span className="text-my-accents-red">*</span>
                </>
              }
              placeholder="It showed a 500 error"
              className="bg-black/20"
            />
          </div>

          <CustomField
            control={form.control}
            name="environment"
            label="Environment (Auto-detected)"
            isTextarea
            className="min-h-[60px] bg-black/20 font-mono text-xs text-my-secondary"
          />

          {/* --- 4. Submit Area --- */}
          <div className="mt-4 pt-6 border-t border-white/10 flex justify-end">
            <Button
              type="submit"
              disabled={!isValid || isGenerating}
              size="lg"
              className="w-full sm:w-auto font-power-med gap-2 tracking-wide"
            >
              {isGenerating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Continue to GitHub <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
