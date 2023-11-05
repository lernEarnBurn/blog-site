import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

interface Blog {
  _id: string;
  author: string;
  content: string;
  title: string;
}

export function BlogMenu() {

  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const getAllBlogs = async() =>{
      try {
        const response = await axios.get('http://localhost:3000/posts')
        setBlogs(response.data)
      } catch(err){
        console.log(err)
      }
    }

    getAllBlogs()
  }, [])


  return (
    <>
      <div className="mt-[17vh] mb-[4vh] flex flex-col gap-4 overflow-y-auto h-auto min-w-[99vw] items-center">
        {blogs.map((blog) => {
          return <Link to={`/blogs/${blog._id}`} className="rounded-lg dark:bg-opacity-90 mt-[3vh] py-2 px-3 border-2 light:border-black shadow-sm w-[35vw] h-[80vh] overflow-hidden" key={blog._id}>
                    <h2 className="text-center text-2xl"><strong>{blog.title}</strong></h2>
                    <p className="mt-2 text-md">{blog.content}</p>
                 </Link>
        })}
      </div>
    </>
  )
}