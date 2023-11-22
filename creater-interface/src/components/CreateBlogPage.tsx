import { motion } from "framer-motion"


export function CreateBlogPage(){
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