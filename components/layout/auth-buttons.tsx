import { Button } from "../ui/button";

const AuthButtons = () => {
  return (
    <div className="flex gap-x-2 mr-2 2xl:mr-0">
      <Button
        size="lg"
        variant="outline"
        className="text-green-500 hover:text-green-700"
      >
        Zaloguj się
      </Button>
      <Button size="lg" variant="signIn">
        Zarejestruj się
      </Button>
    </div>
  );
};

export default AuthButtons;
