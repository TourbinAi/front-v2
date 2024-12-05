
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import moment from "jalali-moment"
import { SidebarSchema } from "@/lib/validation/travelMaker"

const persianDate = moment().format("jYYYY-jM-jD")
const [year, month, day] = persianDate.split("-").map(Number)

export const useTravelMakerForm = () => {
    return useForm<z.infer<typeof SidebarSchema>>({
        resolver: zodResolver(SidebarSchema),
        defaultValues: {
            origin: "",
            direction: "north",
            distance: "3h",
            duration: "1d",
            tags: [],
            route: "easy",
            vehicle: "car",
            oldPerson: false,
            routStop: "multiple",
            accommodation: "camp",
            date: {
                year: year,
                month: month,
                day: day,
            },
        },
    })
}
