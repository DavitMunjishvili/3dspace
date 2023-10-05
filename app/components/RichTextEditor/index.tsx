import { EditorContent, useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

export default function RichTextEditor({
  content = "",
  viewer = true,
  setContent,
}: {
  content: string;
  viewer: boolean;
  setContent?: (e: string) => void;
}) {
  const editor = useEditor(
    {
      extensions: [Color, TextStyle, StarterKit],
      editable: !viewer,
      content: content,
    },
    [content]
  );

  function eventHandler(_: unknown) {
    if (!editor || !setContent) return;
    setContent(editor.getHTML());
  }

  return (
    <div>
      {!viewer && <MenuBar editor={editor} />}
      <EditorContent onBlur={eventHandler} className="prose" editor={editor} />
    </div>
  );
}
