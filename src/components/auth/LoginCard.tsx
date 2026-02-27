"use client";

import { authClient } from "@/lib/auth/client";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GitHub, Google } from "@/components/icons/BrandIcons";

type SocialProvider = "google" | "github";

export function LoginCard() {
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(
    null,
  );

  const handleSocialLogin = async (provider: SocialProvider) => {
    setLoadingProvider(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
      setLoadingProvider(null);
    }
  };
  return (
    <Card className="w-3/4 md:w-sm h-fit flex flex-col md:gap-4 backdrop-blur-lg bg-white/1 shadow-xl">
      <CardHeader className="flex flex-col items-center gap-4">
        <Image src="/logo.webp" alt="Slab Logo" width={35} height={35} />
        <CardTitle className="text-lg md:text-2xl">Log in to Slab</CardTitle>
        <CardDescription className="text-3 md:text-3.5 text-center">
          Log in to unlock full management tools and take total control of your
          links.
        </CardDescription>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Button
          variant="outline"
          subject="icon-text"
          size="sm"
          className="flex cursor-pointer w-full gap-3!"
          onClick={() => handleSocialLogin("google")}
          disabled={loadingProvider !== null}
        >
          {loadingProvider === "google" ? (
            <Loader2 className="size-4.5! animate-spin" />
          ) : (
            <Google className="size-4.5!" />
          )}
          {loadingProvider === "google"
            ? "Redirecting..."
            : "Continue with Google"}
        </Button>
        <Button
          variant="outline"
          subject="icon-text"
          size="sm"
          className="flex cursor-pointer w-full gap-3!"
          onClick={() => handleSocialLogin("github")}
          disabled={loadingProvider !== null}
        >
          {loadingProvider === "github" ? (
            <Loader2 className="size-4.5! animate-spin" />
          ) : (
            <GitHub className="size-4.5!" />
          )}
          {loadingProvider === "github"
            ? "Redirecting..."
            : "Continue with Github"}
        </Button>
      </CardBody>
    </Card>
  );
}
