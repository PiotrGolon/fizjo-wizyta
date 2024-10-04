import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <CardTitle>{title}</CardTitle>
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
