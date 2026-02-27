import { ReactNode } from "react";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/utils/tailwind";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function SettingsCard({
  title,
  description,
  children,
  className,
  bodyClassName,
}: SettingsCardProps) {
  return (
    <Card className={cn("w-4/5 bg-black/3 backdrop-blur-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-power-ultra">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardBody className={cn("flex flex-col gap-6", bodyClassName)}>
        {children}
      </CardBody>
    </Card>
  );
}
