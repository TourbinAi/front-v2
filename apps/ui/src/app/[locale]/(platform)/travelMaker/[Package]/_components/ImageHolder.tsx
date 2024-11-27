import Image from "next/image";



export default function ImageHolder(){
    return(
        <div className="m-1 flex justify-center">
            <Image 
            width={400}
            height={400}
            src={"https://www.imparalingleseconmonica.com/wp-content/uploads/2017/09/man-business-2-1.jpg"}
            alt="dada"
            />
        </div>
    )
}