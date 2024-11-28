import { ImageWithPlaiceholder } from "@/components/elementary/ImageWithPlaiceholder";



export default function Gallery() {
    return (
        <div className="grid grid-cols-2 w-full lg:w-[33vw] h-[48vh] gap-4 m-1 justify-items-center">
            <ImageWithPlaiceholder
                className="object-cover rounded-2xl w-full h-48 xl:h-56 "
                src={"https://images.huffingtonpost.com/2016-02-19-1455895501-3907280-main.jpg"}
                alt={""}
            />
            <ImageWithPlaiceholder
                className="object-cover rounded-2xl w-full h-48 xl:h-56 "
                src={"https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/pass/Paris_GettyImages-601763009.jpg"}
                alt={""}
            />
            <ImageWithPlaiceholder
                className="object-cover rounded-2xl w-full h-48 xl:h-56 "
                src={"https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/pass/Paris_GettyImages-601763009.jpg"}
                alt={""}
            />
            <ImageWithPlaiceholder
                className="object-cover rounded-2xl w-full h-48 xl:h-56 "
                src={"https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/pass/Paris_GettyImages-601763009.jpg"}
                alt={""}
            />
        </div>


    )

}