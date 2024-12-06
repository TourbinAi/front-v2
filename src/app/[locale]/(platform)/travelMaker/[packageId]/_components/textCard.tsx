import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypingAnimation } from "@/components/ui/typing";
import { cn } from "@/lib/utils";

interface TextCardProps {
  className?: string;
  title: string;
  text: string;
}
export default function TextCard(props: TextCardProps) {
  return (
    <>
      <Card
        className={cn(
          "flex flex-col items-center rounded-2xl",
          props.className
        )}
      >
        <CardHeader className="w-full rounded-t-2xl bg-red-500 py-0 text-center text-white">
          <CardHeader className="m-0">{props.title}</CardHeader>
        </CardHeader>
        <CardContent className="overflow-y-scroll pb-7 pt-2 text-right">
          <TypingAnimation text={props.text} duration={20} />
        </CardContent>
      </Card>
    </>
  );
}
