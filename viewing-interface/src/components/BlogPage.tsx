import { useParams } from "react-router-dom";

export function BlogPage() {
  const { blogId } = useParams();

  return (
    <>
      <p className="mt-[50vh]">{blogId}</p>
    </>
  )
}