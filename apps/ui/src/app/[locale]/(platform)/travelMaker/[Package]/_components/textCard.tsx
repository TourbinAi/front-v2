import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TextCardProps {
    title: string;
    text: string;
}
export default function TextCard(probs: TextCardProps) {
    return (
        <>
            <Card className="h-[48vh] flex items-center flex-col overflow-hidden">
                <CardHeader className="bg-red-500 text-white rounded-t-2xl text-center py-0 w-full ">
                    <CardHeader className="m-0 ">{probs.title}</CardHeader>
                </CardHeader>
                <CardContent className=" border border-t-0 rounded-b-2xl pb-7 pt-2 h-[94%] overflow-y-scroll">
                    {probs.text}
                </CardContent>
            </Card>
        </>
    )
}