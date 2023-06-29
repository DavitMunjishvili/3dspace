import RichTextEditor from "~/components/RichTextEditor";
import { useOptionalUser } from "~/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type Blog = {
  id: number;
  archive: boolean;
  content: string;
  title: string;
  views: number;
};
export function BlogCard({ blog }: { blog: Blog }) {

  const user = useOptionalUser()

  return (
    <div className="relative max-h-96 w-full overflow-y-auto rounded bg-violet-50 p-4 shadow-lg">
      {user?.role === 'dev' && <button className="flex justify-center items-center bg-red-500 w-6 h-6 rounded text-red-50 absolute top-4 right-4">
        <FontAwesomeIcon size="sm" icon={faTrash} />
      </button>}
      <h1 className="font-semibild flex items-center justify-center gap-2 text-2xl">
        {blog.title}
        <span className="text-base font-normal text-gray-400">
          (Views: {blog.views})
        </span>
      </h1>
      <RichTextEditor content={blog.content} viewer />
    </div>
  );
}
