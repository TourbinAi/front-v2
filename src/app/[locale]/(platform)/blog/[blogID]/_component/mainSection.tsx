"use client";
import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import dynamic from "next/dynamic";
import List from "@editorjs/list";
import Image from "next/image";
interface EditorProps {
  data: OutputData; // JSON type for EditorJS
  image: string;
}

const Editor: React.FC<EditorProps> = ({ data, image }) => {
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    // console.log(data);

    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        readOnly: true,
        data: data,
        onReady: () => {
          // console.log("Editor.js is ready!");
        },
        tools: {
          List: List,
          header: {
            class: Header as unknown as ToolConstructable,
            inlineToolbar: true,
          },
          list: {
            class: List as unknown as ToolConstructable,
            inlineToolbar: true, // فعال کردن نوار ابزار برای List
          },
        },
      });
    }
  }, [data]);

  return (
    <>
      {/* Container with Tailwind classes for layout */}
      <div className="relative h-[400px] w-full">
        <Image
          src={process.env.NEXT_PUBLIC_BACKEND_URL + image}
          alt="blog image"
          fill
          className="object-contain" // Prevents image from being zoomed or cropped
        />
      </div>
      <div id="editorjs" />
    </>
  );
};

// Dynamically import Editor component with SSR disabled
export default dynamic(() => Promise.resolve(Editor), { ssr: false });
