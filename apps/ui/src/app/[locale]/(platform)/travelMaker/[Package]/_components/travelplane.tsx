import TextCard from "./textCard"


export default function TravelPlane(){
    const text ={
        title:"summerize of travel plane ",
        text:"The rain tapped softly against the window, a steady rhythm that filled the quiet room. Outside, the world seemed to blur into shades of gray, the streets glistening with moisture as the last of the sunlight disappeared. Inside, the warmth of the room was a welcome contrast, and for a moment, everything felt still, as though time itself had slowed to match the pace of the rain."
    }
    return(
        <div className="w-full lg:w-[34vw]">
            <TextCard title={text.title} text={text.text}/>
        </div>
    )
}