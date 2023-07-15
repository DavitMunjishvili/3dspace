import { type Editor } from "@tiptap/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  fa4,
  fa5,
  fa6,
  faBold,
  faCode,
  faHeading,
  faItalic,
  faListOl,
  faListUl,
  faParagraph,
  faRedo,
  faStrikethrough,
  faTerminal,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4 flex gap-2 child:flex child:items-center child:justify-center child:overflow-hidden child:rounded-sm child:border child:border-gray-400">
      {/* --- Styling --- */}
      <div className="child:h-full child:p-2 child:duration-75 child-hover:bg-indigo-200/50 child-disabled:pointer-events-none child-disabled:bg-gray-400/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
      </div>

      {/* --- Element --- */}
      <div className="child:h-full child:p-2 child:duration-75 child-hover:bg-indigo-200/50 child-disabled:pointer-events-none child-disabled:bg-gray-400/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "bg-indigo-300/50" : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} />
          <FontAwesomeIcon icon={fa1} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "bg-indigo-300/50" : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} />
          <FontAwesomeIcon icon={fa2} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "bg-indigo-300/50" : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} />
          <FontAwesomeIcon icon={fa3} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "bg-indigo-300/50" : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} />
          <FontAwesomeIcon icon={fa4} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "bg-indigo-300/50" : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} />
          <FontAwesomeIcon icon={fa5} />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "bg-indigo-300/50" : ""
          }
        >
          <FontAwesomeIcon icon={faHeading} />
          <FontAwesomeIcon icon={fa6} />
        </button>
      </div>

      {/* --- List --- */}
      <div className="child:h-full child:p-2 child:duration-75 child-hover:bg-indigo-200/50 child-disabled:pointer-events-none child-disabled:bg-gray-400/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
      </div>

      {/* --- Codes --- */}
      <div className="child:h-full child:p-2 child:duration-75 child-hover:bg-indigo-200/50 child-disabled:pointer-events-none child-disabled:bg-gray-400/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faTerminal} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "bg-indigo-300/50" : ""}
        >
          <FontAwesomeIcon icon={faCode} />
        </button>
      </div>

      {/* --- History --- */}
      <div className="child:h-full child:p-2 child:duration-75 child-hover:bg-indigo-200/50 child-disabled:pointer-events-none child-disabled:bg-gray-400/50">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </div>
  );
}
