import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type AboutCardProps = {
  title: string;
  content: string;
  description: string;
  footerDescription: string;
};

const AboutCard = ({
  title,
  description,
  content,
  footerDescription,
}: AboutCardProps) => {
  return (
    <Card className="h-full flex flex-col justify-between -mt-10 lg:mt-0">
      <CardHeader>
        <CardTitle className="flex items-center">
          {title}{" "}
          <Image
            src="/images/verified_icon.svg"
            alt="verified icon"
            width={15}
            height={15}
            className="size-4 ml-2"
          />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p>{footerDescription}</p>
      </CardFooter>
    </Card>
  );
};

export default AboutCard;
