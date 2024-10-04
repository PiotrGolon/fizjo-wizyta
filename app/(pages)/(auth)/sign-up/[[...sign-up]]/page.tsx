import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex justify-center items-center">
        <ClerkLoaded>
          <SignUp
            path="/sign-up"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-sm ",
              },
            }}
          />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground" />
        </ClerkLoading>
      </div>
    </div>
  );
};

export default SignUpPage;
