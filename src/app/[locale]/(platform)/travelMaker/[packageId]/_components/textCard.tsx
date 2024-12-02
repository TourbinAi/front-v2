import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
          "flex max-h-[400px] flex-col items-center",
          props.className
        )}
      >
        <CardHeader className="w-full rounded-t-2xl bg-red-500 py-0 text-center text-white">
          <CardHeader className="m-0">{props.title}</CardHeader>
        </CardHeader>
        <CardContent className="h-[94%] overflow-y-scroll rounded-b-2xl border border-t-0 pb-7 pt-2 text-right">
          {props.text}
        </CardContent>
      </Card>
    </>
  );
}
