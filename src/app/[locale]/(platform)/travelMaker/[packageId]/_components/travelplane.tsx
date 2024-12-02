import { ClassNameValue } from "tailwind-merge";
import TextCard from "./textCard";
import { cn } from "@/lib/utils";

interface TravelPlaneProps {
  className?: ClassNameValue;
}

export default function TravelPlane({ className }: TravelPlaneProps) {
  const text = {
    title: "summerize of travel plane ",
    text: "The rain tapped softly against the window, a steady rhythm that filled the quiet room. Outside, the world seemed to blur into shades of gray, the streets glistening with moisture as the last of the sunlight disappeared. Inside, the warmth of the room was a welcome contrast, and for a moment, everything felt still, as though time itself had slowed to match the pace of the rain.",
  };
  return (
    <div className={cn(className)}>
      <TextCard title={text.title} text={text.text} />
    </div>
  );
}
