"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth, UserButton } from "@clerk/nextjs";

const AuthButtons = () => {
  const { sessionId } = useAuth();

  if (sessionId) {
    return <UserButton />;
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
