"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ClerkLoaded, ClerkLoading, useAuth, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const AuthButtons = () => {
  const { sessionId } = useAuth();

  if (sessionId) {
    return (
      <>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground" />
        </ClerkLoading>
      </>
    );
  }

  return (
    <div className="flex gap-x-2 mr-2 2xl:mr-0">
      <Link href="/sign-in">
        <Button
          size="lg"
          variant="outline"
          className="text-green-500 hover:text-green-700"
        >
          Zaloguj się
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button size="lg" variant="signIn">
          Zarejestruj się
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
