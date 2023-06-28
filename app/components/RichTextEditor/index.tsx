import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
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
      extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle,
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
      ],
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
      <EditorContent onBlur={eventHandler} editor={editor} />
    </div>
  );
}
