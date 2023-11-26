import { motion } from "framer-motion"
import { useContext, useEffect } from "react";
import { RouteHistoryContext } from "@/contexts/routeHistoryContext";


export function CreateBlogPage(){
  const {routeHistory, setRouteHistory } = useContext(RouteHistoryContext)

  useEffect(() => {
    setRouteHistory((prevHistory: string[]) => [...prevHistory, "/createBlog"]);

  }, [])

  return (
      <motion.div 
        className="w-[100vw] h-[100vh] grid place-content-center"
        initial={{x: 1000}}
        animate={{x: 0}}
        exit={{x: 1000}}
        transition={{ duration: .5 }}
      >
        <p>Create Blogs</p>
      </motion.div>
  )
}