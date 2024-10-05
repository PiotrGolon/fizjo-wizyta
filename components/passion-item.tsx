import { cn } from "@/lib/utils";

interface PassionItemProps {
  text: string;
  margin?: string;
}

const PassionItem = ({ text, margin }: PassionItemProps) => {
  return (
    <div
      className={cn(
        "flex p-4 w-full lg:w-auto justify-center text-green-600 hover:text-green-700 border shadow-xl rounded-full hover:translate-y-[-10px] hover:bg-green-50 transition duration-500",
        margin && `${margin}`
      )}
    >
      {text}
    </div>
  );
};

export default PassionItem;
