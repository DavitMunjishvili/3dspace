import RichTextEditor from "~/components/RichTextEditor";
import { useOptionalUser } from "~/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@remix-run/react";

type Blog = {
  id: number;
  archive: boolean;
  content: string;
  title: string;
  views: number;
};
export function BlogCard({ blog }: { blog: Blog }) {
  const user = useOptionalUser();

  return (
    <div className="relative max-h-96 w-full overflow-y-auto rounded bg-violet-50 p-4 shadow-lg">
      {user?.role === "dev" && (
        <Link
          to={`delete/${blog.id}`}
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded bg-red-500 text-red-50"
        >
          <FontAwesomeIcon size="sm" icon={faTrash} />
        </Link>
      )}
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
