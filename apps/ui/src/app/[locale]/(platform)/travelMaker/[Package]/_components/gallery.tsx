import Image from "next/image";



export default function Gallery(){
    return(
        <div className="grid justify-items-center md:grid-cols-2 items-center lg:w-fit gap-4 m-1 ">
                <Image
                    className="object-cover h-full rounded-2xl"
                    width={330}
                    height={110}
                    src={"https://images.huffingtonpost.com/2016-02-19-1455895501-3907280-main.jpg"}
                    alt={""}
                />
                <Image
                    className="object-cover h-full rounded-2xl"
                    width={330}
                    height={110}
                    src={"https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/pass/Paris_GettyImages-601763009.jpg"}
                    alt={""}
                />  
                <Image 
                    className="object-cover h-full rounded-2xl"
                    width={330}
                    height={110}
                    src={"https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/pass/Paris_GettyImages-601763009.jpg"}
                    alt={""}
                />
                <Image 
                    className="object-cover h-full rounded-2xl"
                    width={330}
                    height={110}
                    src={"https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/pass/Paris_GettyImages-601763009.jpg"}
                    alt={""}
                />
        </div>
       
    )
    
}