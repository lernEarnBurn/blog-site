import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

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
  
  
  const navigate = useNavigate()
  const itemsRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, blogs.length);
 }, [blogs]);

  function transitionToBlogPage(blog: Blog, index: number): void{
    if (itemsRef.current && itemsRef.current[index]) {
      itemsRef.current[index]?.scrollIntoView({ behavior: "smooth",  block: "center" });
    }
   
    
    setTimeout(() => {
      navigate(`/blogs/${blog._id}`);
    }, 500);
  }


  return (
    <>
      <div className="mt-[17vh] mb-[4vh] flex flex-col gap-4 overflow-y-auto h-auto min-w-[99vw] items-center">
        {blogs.map((blog, index) => {
          return <div 
                    ref={elem => itemsRef.current[index] = elem} 
                    onClick={() => {transitionToBlogPage(blog, index)}} 
                    className=" z-10 rounded-lg dark:bg-opacity-90 mt-[4.5vh] py-2 px-3 border-2 light:border-black shadow-sm w-[35vw] h-[87vh] overflow-hidden" 
                    key={blog._id}>
                    <h2 className="text-center text-2xl"><strong>{blog.title}</strong></h2>
                    <p className="mt-2 text-md">{blog.content}</p>
                 </div>
        })}
      </div>
    </>
  )
}