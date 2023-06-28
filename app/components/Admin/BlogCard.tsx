import RichTextEditor from "~/components/RichTextEditor";

type Blog = {
  id: number;
  archive: boolean;
  content: string;
  title: string;
  views: number;
};
export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="w-full rounded bg-violet-50 p-4 shadow-lg">
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
